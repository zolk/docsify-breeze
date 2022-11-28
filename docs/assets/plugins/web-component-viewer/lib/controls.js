/* Copyright (c) 2021 Kevin Zolkiewicz.
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { highlightCode } from "./highlight.js";
import { customElements, getComponent } from "./cem.js";

export function renderSlotControl(slot, element) {
  const isDefault = slot.name === "";
  const slotName = isDefault ? "default" : slot.name;
  const slotNodes = element.shadowRoot
    ?.querySelector(isDefault ? "slot:not([name])" : `slot[name=${slotName}]`)
    ?.assignedNodes({ flatten: true });

  let slotContents = "";

  slotNodes?.map((node) => {
    if (node.nodeName === "#text") {
      slotContents += node.textContent.trim();
    } else {
      slotContents += isDefault ? node.outerHTML.trim() : node.innerHTML.trim();
    }
  });

  return `<textarea name="${slotName}" rows="4">${slotContents}</textarea>`;
}

export function renderPropControl(prop, element) {
  const defaultFromCodeSnippet = element.attributes[prop.attribute];

  const getDefaultProp = (isStringInput) => {
    if (defaultFromCodeSnippet) {
      return defaultFromCodeSnippet.value === ""
        ? isStringInput
          ? ""
          : true
        : defaultFromCodeSnippet.value;
    } else {
      return prop.default?.replace(/(['])/g, "") || "";
    }
  };

  const renderMultipleChoice = (options) => {
    const optionsArray = options.split("|").filter((o) => o.length > 0);

    if (optionsArray.length > 5) {
      // Use a `select` if there are more than 5 options
      return `<select name="${prop.attribute}">${optionsArray
        .map((option) => {
          const value = option.replace(/([('|") ])/g, "");
          return `
              <option
                value="${value.trim()}"
                ${getDefaultProp() === value ? "selected" : ""}
              >
                ${value.trim()}
              </option>`;
        })
        .join("")}</select>`;
    } else {
      // Use an `input[type=radio]` if there are fewer than 5 options
      return optionsArray
        .map((option) => {
          const value = option.replace(/([('|") ])/g, "");
          return `
              <label>
                <input
                  type="radio"
                  name="${prop.attribute}"
                  value="${value.trim()}"
                  ${getDefaultProp() === value ? "checked" : ""}
                ></input>
                ${value.trim()}
              </label>`;
        })
        .join("");
    }
  };

  switch (prop.type.text) {
    case "string":
      return `
          <label>
            <span>${prop.attribute}</span>
            <input
              type="text"
              name="${prop.attribute}"
              value="${getDefaultProp(true)}"
              placeholder="${prop.attribute}"
            ></input>
          </label>`;
    case "number":
      return `
          <label>
            <span>${prop.attribute}</span>
            <input
              type="number"
              name="${prop.attribute}"
              value="${getDefaultProp()}"
              placeholder="${prop.attribute}"
            ></input>
          </label>`;
    case "boolean":
      return `
          <label>
            <input
              type="checkbox"
              name="${prop.attribute}"
              ${getDefaultProp() === true ? `checked` : ""}
            ></input>
            ${prop.attribute}
          </label>`;
    default:
      return renderMultipleChoice(prop.type.text);
  }
}

export async function renderControlsPanel(tagName) {
  const metadata = await customElements;
  const componentMeta = getComponent(metadata, tagName);
  const element = document.querySelector(tagName);
  const slots = componentMeta.slots;
  const members = componentMeta.members?.filter(
    (member) => member.description && member.privacy !== "private"
  );
  const controllableTypes = ["boolean", "number", "string", "|"];
  const isControllable = (type) =>
    controllableTypes.some((i) => type.includes(i));

  const props = members?.filter((prop) => {
    return prop.kind === "field" && isControllable(prop.type.text);
  });

  const renderSlotTable = `
    <table>
      <thead>
        <tr>
          <th scope="col">Slot</th>
          <th scope="col">Description</th>
          <th scope="col">Control</th>
        </tr>
      </thead>
      <tbody>
        ${slots
          ?.map((slot) => {
            return `
                <tr>
                  <th scope="row">
                    ${
                      slot.name === ""
                        ? "Default slot"
                        : `<code>${slot.name}</code>`
                    }
                  </th>
                  <td>${slot.description}</td>
                  <td>${renderSlotControl(slot, element)}</td>
                </tr>
              `;
          })
          .join("")}
      </tbody>
    </table>
  `;

  return `
    ${slots?.length ? renderSlotTable : ""}
    <table>
      <thead>
        <tr>
          <th scope="col">Attribute</th>
          <th scope="col">Description</th>
          <th scope="col">Default</th>
          <th scope="col">Control</th>
        </tr>
      </thead>
      <tbody>
        ${props
          .map((prop) => {
            return `<tr>
                <th scope="row"><code>${prop.attribute}</code></th>
                <td>${prop.description.replace(
                  /`(.*?)`/g,
                  "<code>$1</code>"
                )}</td>
                <td>${
                  prop.default ? `<code>${prop.default}</code>` : "&ndash;"
                }</td>
                <td><div class="controls__group">${renderPropControl(
                  prop,
                  element
                )}</div></td>
              </tr>`;
          })
          .join("")}
      </tbody>
    </table>
  `;
}

export function handleControlInputs(inputs, element, code) {
  [...inputs].map((input) => {
    const handleCheckbox = (input) => {
      if (input.checked) {
        element.setAttribute(input.name, "");
      } else {
        element.removeAttribute(input.name);
      }
    };

    const updateDefaultSlot = (newValue) => {
      const defaultSlot = element.querySelectorAll("*:not([slot])");

      if (defaultSlot.length) {
        // If there are more than one nodes, update just the first one
        // with the new HTML and remove the rest.
        [...defaultSlot].map((node, i) => {
          if (i === 0) {
            node.outerHTML = newValue;
          } else {
            node.remove();
          }
        });
      } else {
        // Handle updates of single nodes.
        // Note: This method is problematic if there are named slots.
        element.innerHTML = newValue;
      }
    };

    const updateNamedSlot = (slot, textareaName, newValue) => {
      if (slot) {
        // Update existing named slot if it exists
        slot.innerHTML = newValue;
      } else {
        // Create a new named slot
        const newSlot = document.createElement("div");
        newSlot.setAttribute("slot", textareaName);
        newSlot.innerHTML = newValue;
        element.appendChild(newSlot);
      }

      if (!newValue) {
        // Remove the named slot if the new value is empty
        slot.remove();
      }
    };

    const handleTextarea = (textarea) => {
      if (textarea.name === "default") {
        updateDefaultSlot(textarea.value);
      } else {
        const namedSlot = element.querySelector(`[slot=${textarea.name}]`);
        updateNamedSlot(namedSlot, textarea.name, textarea.value);
      }
    };

    const handleInput = (input) => {
      if (input.value === "") {
        element.removeAttribute(input.name);
      } else {
        element.setAttribute(input.name, input.value);
      }
    };

    input.addEventListener("input", (event) => {
      switch (event.target.type) {
        case "checkbox":
          handleCheckbox(event.target);
          break;
        case "textarea":
          handleTextarea(event.target);
          break;
        default:
          handleInput(event.target);
          break;
      }

      const codeBlock = code.querySelector("code");
      codeBlock.innerHTML = `${highlightCode(element)}`;
    });
  });
}

export async function renderControlsInterface(tagName, code) {
  // Render controls pane.
  const controlsInterface = document.createElement("div");
  controlsInterface.classList.add("controls__inputs", "markdown-section");
  controlsInterface.innerHTML = await renderControlsPanel(tagName);
  document.body.appendChild(controlsInterface);

  // Render code pane.
  code.classList.add("controls__code");
  code.classList.remove("code-preview__source");
  document.body.appendChild(code);

  // Attach input handlers.
  const inputs = document.querySelectorAll("input, select, textarea");
  const element = document.querySelector(tagName);
  handleControlInputs(inputs, element, code);
}
