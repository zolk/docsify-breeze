import { fixture, html, expect } from '@open-wc/testing';
import DsButton from './button';
import './ds-button';

describe('ds-button', () => {
  it('renders', async () => {
    const el = await fixture<DsButton>(
      html`<ds-button variant="primary"></ds-button>`
    );

    expect(el).to.exist;
  });

  it('sets name and value attributes', async () => {
    const el = await fixture<DsButton>(
      html`<ds-button name="foo" value="bar"></ds-button>`
    );

    const button = el.shadowRoot?.querySelector('button') as HTMLButtonElement;
    expect(button.name).to.equal('foo');
    expect(button.value).to.equal('bar');
  });

  it("sets `type='submit'` when `submit` is `true`", async () => {
    const el = await fixture<DsButton>(
      html`<ds-button name="foo" submit></ds-button>`
    );

    const button = el.shadowRoot?.querySelector('button') as HTMLButtonElement;
    expect(button.type).to.equal('submit');
  });

  it('renders a disabled button when `disabled` is set', async () => {
    const el = await fixture<DsButton>(html`<ds-button disabled></ds-button>`);

    const button = el.shadowRoot?.querySelector('button') as HTMLButtonElement;
    expect(button.disabled).to.be.true;
  });

  it('renders a link when `href` is set', async () => {
    const el = await fixture<DsButton>(
      html`<ds-button href="http://example.com"></ds-button>`
    );

    const link = el.shadowRoot?.querySelector("a[href='http://example.com']");
    expect(link).to.exist;
  });

  it('sets the `target` attribute when rendering as a link', async () => {
    const el = await fixture<DsButton>(
      html`<ds-button href="http://example.com" target="_top"></ds-button>`
    );

    const link = el.shadowRoot?.querySelector(
      "a[href='http://example.com']"
    ) as HTMLAnchorElement;
    expect(link.target).to.equal('_top');
  });
});
