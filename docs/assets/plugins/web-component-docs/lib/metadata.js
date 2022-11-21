/*
 * Copyright (c) 2021 Kevin Zolkiewicz.
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

 * This code builds upon a similar plugin developed for use with Shoelace <https://shoelace.style/>.
 * Copyright (c) 2020 A Beautiful Site, LLC
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
function renderPropertiesTable(props) {
  return `
    <table>
      <thead>
        <tr>
          <th scope="col">Property</th>
          <th scope="col">Description</th>
          <th scope="col">Type</th>
          <th scope="col">Default</th>
        </tr>
      </thead>
      <tbody>
        ${props
          .map((prop) => {
            return `<tr>
                <th scope="row">
                  <code>${prop.name}</code>
                  ${
                    prop.attribute && prop.name !== prop.attribute
                      ? `<div class="attr">
                          <code>${prop.attribute}</code>
                        </div>`
                      : ``
                  }
                </th>
                <td>${prop.description.replace(
                  /`(.*?)`/g,
                  "<code>$1</code>"
                )}</td>
                <td><code>${prop.type.text.replace(/^\| /m, "")}</code></td>
                <td>${
                  prop.default ? `<code>${prop.default}</code>` : "&ndash;"
                }</td>
              </tr>`;
          })
          .join("")}
      </tbody>
    </table>
  `;
}

function renderMethodsList(methods) {
  let result = "";

  methods.map((method) => {
    const hasParams = method.parameters?.length;

    const renderParamsSignature = () =>
      method.parameters
        .map(
          (param) =>
            `${param.name}${param.optional ? "?" : ""}: ${param.type.text}`
        )
        .join(", ");

    const renderParamDescription = (param) => `
      <dt><code>${param.name}</code></dt>
      <dd>${param.description}</dd>
    `;

    const renderParamsList = `
      <dl class="component-method-options">
        ${method.parameters?.map((param) =>
          param.description ? renderParamDescription(param) : ""
        )}
      </dl>
    `;

    result += `
      <h4 class="component-method-signature">
        <code>
          ${method.name}(${hasParams ? renderParamsSignature() : ""})
          =>
          ${method.return ? method.return.type.text : "void"}
        </code>
      </h4>

      <p>${method.description}</p>
      ${hasParams ? renderParamsList : ""}
    `;
  });

  return result;
}

function renderEventsTable(events) {
  return `
    <table>
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Description</th>
          <th scope="col">Event Detail</th>
        </tr>
      </thead>
      <tbody>
        ${events
          .map((event) => {
            return `
              <tr>
                <th scope="row">
                  <code>${event.name}</code>
                </th>
                <td>${event.description}</td>
                <td>${
                  event.type?.text ? `<code>${event.type?.text}</code>` : "-"
                }</td>
              </tr>
            `;
          })
          .join("")}
      </tbody>
    </table>
  `;
}

function renderSlotsTable(slots) {
  return `
    <table>
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Description</th>
        </tr>
      </thead>
      <tbody>
        ${slots
          .map((slot) => {
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
              </tr>
            `;
          })
          .join("")}
      </tbody>
    </table>
  `;
}

function renderCssPartsTable(parts) {
  return `
    <table>
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Description</th>
        </tr>
      </thead>
      <tbody>
        ${parts
          .map((part) => {
            return `
              <tr>
                <th scope="row"><code>${part.name}</code></th>
                <td>${part.description}</td>
              </tr>
            `;
          })
          .join("")}
      </tbody>
    </table>
  `;
}

function renderCssPropertiesTable(properties) {
  return `
    <table>
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Description</th>
        </tr>
      </thead>
      <tbody>
        ${properties
          .map((property) => {
            return `
              <tr>
                <th scope="row"><code>${property.name}</code></th>
                <td>${property.description}</td>
              </tr>
            `;
          })
          .join("")}
      </tbody>
    </table>
  `;
}

export function renderMetadata(metadata) {
  let result = "";

  const members = metadata.members?.filter(
    (member) => member.description && member.privacy !== "private"
  );
  const props = members?.filter((prop) => {
    return prop.kind === "field";
  });
  const methods = members?.filter(
    (member) => member.kind === "method" && member.privacy !== "private"
  );

  const descriptions = window.$docsify.componentDocs?.docDescriptions;

  const maybeRenderDescription = (category) => {
    if (descriptions && descriptions[category]) {
      return `<p class="meta-desc">${descriptions[category]}</p>`;
    }

    return "";
  };

  if (props?.length) {
    result += `
      ### Properties

      ${maybeRenderDescription("properties")}
      ${renderPropertiesTable(props)}
    `;
  }

  if (methods?.length) {
    result += `
      ### Methods

      ${maybeRenderDescription("methods")}
      ${renderMethodsList(methods)}
    `;
  }

  if (metadata.events?.length) {
    result += `
      ### Events

      ${maybeRenderDescription("events")}
      ${renderEventsTable(metadata.events)}
    `;
  }

  if (metadata.slots?.length) {
    result += `
      ### Slots

      ${maybeRenderDescription("slots")}
      ${renderSlotsTable(metadata.slots)}
    `;
  }

  if (metadata.cssProperties?.length) {
    result += `
      ### CSS Custom Properties

      ${maybeRenderDescription("cssprops")}
      ${renderCssPropertiesTable(metadata.cssProperties)}
    `;
  }

  if (metadata.cssParts?.length) {
    result += `
      ### CSS Parts

      ${maybeRenderDescription("cssparts")}
      ${renderCssPartsTable(metadata.cssParts)}
    `;
  }

  return result;
}
