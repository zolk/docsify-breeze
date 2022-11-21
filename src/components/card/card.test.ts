import { fixture, html, expect } from "@open-wc/testing";
import DsCard from "./card";
import "./card";

describe("ds-card", () => {
  it("renders", async () => {
    const el = await fixture<DsCard>(html`<ds-card>My Card</ds-card>`);

    expect(el).to.exist;
  });

  it("shows a header if the slot is provided", async () => {
    const el = await fixture<DsCard>(
      html`
        <ds-card>
          <div slot="header">Foo</div>
          Bar
        </ds-card>
      `
    );

    const headerClass = el.shadowRoot?.querySelector('[part="header"]');
    expect(headerClass).to.exist;
  });
});
