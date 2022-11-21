/**
 * Checks if content has been passed to a named slot on a particular element.
 *
 * @param el The host element to check
 * @param name A named slot on the host element
 * @returns A boolean indicating if the named slot has been used
 */
export function hasNamedSlot(el: HTMLElement, name: string) {
  return el.querySelector(`:scope > [slot="${name}"]`) !== null;
}
