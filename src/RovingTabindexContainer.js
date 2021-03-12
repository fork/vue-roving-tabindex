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
 * @param {HTMLElement} el - Element that should be a roving tabindex container
 * @param {Object} arg - Vue Directive arg
 * @returns {void}
 */
const bindContainer = (el, arg, { direction }) => {
  el.setAttribute(ATTR_CONTAINER, "");

  const isHorizontal = arg === "horizontal";
  const isRTL = direction === "rtl";
  containers.set(el, {
    isHorizontal,
    isRTL,
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

const ApplyRovingTabindexContainer = ({ direction }) => {
  return {
    mounted(el, { arg = {} }) {
      bindContainer(el, arg, { direction });
    },
    updated(el, { arg = {} }) {
      bindContainer(el, arg, { direction });
    },
    unmounted(el) {
      unbindContainer(el);
    },
  };
};

export default ApplyRovingTabindexContainer;
