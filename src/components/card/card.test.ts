import { fixture, html, expect } from '@open-wc/testing';
import DsCard from './card';
import './card';

describe('ds-button', () => {
  it('renders', async () => {
    const el = await fixture<DsCard>(html`<ds-card>My Card</ds-card>`);

    expect(el).to.exist;
  });

  it('sets the class name when a header is present', async () => {
    const el = await fixture<DsCard>(
      html`
        <ds-card>
          <div slot="header">Foo</div>
          Bar
        </ds-card>
      `
    );

    const headerClass = el.shadowRoot?.querySelector('.card--has-header');
    expect(headerClass).to.exist;
  });
});
