import { ATTR_CONTAINER } from "./constants";

const containers = new WeakMap();

/**
 * Get the config of the related [data-roving-tabindex-container]
 * @param {HTMLElement} el - Current [data-roving-tabindex] element
 * @returns {Object} Container config
 */
export const getContainerConfig = (el) =>
  containers.get(el.closest(`[${ATTR_CONTAINER}]`));

/**
 * Register an element as roving tabindex container
 * @param {HTMLElement} el - Element that shold be a roving tabindex container
 * @param {Object} modifiers - Vue Directive Modifiers
 * @returns {void}
 */
const bindContainer = (el, modifiers) => {
  el.setAttribute(ATTR_CONTAINER, "");

  const isHorizontal = modifiers.horizontal;
  containers.set(el, {
    isHorizontal,
  });
};

/**
 * Unregister an element as being a roving tabindex container
 * @param {HTMLElement} el - Element that should be unregistered
 * @returns {void}
 */
const unbindContainer = (el) => {
  el.removeAttribute(ATTR_CONTAINER);
  containers.delete(el);
};

const RovingTabindexContainer = {
  mounted(el, { modifiers }) {
    bindContainer(el, modifiers);
  },
  updated(el, { modifiers }) {
    bindContainer(el, modifiers);
  },
  unmounted(el) {
    unbindContainer(el);
  },
};

export default RovingTabindexContainer;
