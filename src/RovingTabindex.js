import { nextTick } from "vue";

import { ATTR_CONTAINER, ATTR_ITEM } from "./constants";
import { getContainerConfig } from "./RovingTabindexContainer";

/**
 * Get roving tabindex siblings including self
 * @param {HTMLElement} el - Current [data-roving-tabindex] element
 * @returns {HTMLElement[]} Sibling tabindex elements
 */
const getSiblings = (el) =>
  Array.from(
    el.closest(`[${ATTR_CONTAINER}]`).querySelectorAll(`[${ATTR_ITEM}]`)
  ).filter(
    ($el) =>
      $el.closest(`[${ATTR_CONTAINER}]`) === el.closest(`[${ATTR_CONTAINER}]`)
  );

/**
 * Enable an an element's tabindex by it's index
 * Negative and overflowing index is allowed so just adding/subtracting from the current index works
 * @param {HTMLElement[]} $siblings - Array of elements
 * @param {Number} idx - Index of the to-be-enabled element
 * @returns {void}
 */
const goTo = ($siblings, idx) => {
  const $next = $siblings.slice(idx % $siblings.length)[0];
  $siblings.forEach(($sibling) =>
    $sibling.setAttribute("tabindex", $sibling === $next ? "0" : "-1")
  );
  $next.focus();
};

/**
 * Keydown event handler for [data-roving-tabindex] elements
 * @param {KeyboardEvent} ev - Event handler
 * @returns {void}
 */
const onKeydown = (ev) => {
  const { isHorizontal, isRTL } = getContainerConfig(ev.target);

  // Get our desired keys
  const keyNext = isRTL
    ? isHorizontal
      ? "ArrowLeft"
      : "ArrowDown"
    : isHorizontal
    ? "ArrowRight"
    : "ArrowDown";
  const keyPrev = isRTL
    ? isHorizontal
      ? "ArrowRight"
      : "ArrowUp"
    : isHorizontal
    ? "ArrowLeft"
    : "ArrowUp";

  switch (ev.key) {
    case keyPrev: {
      ev.preventDefault();
      const $siblings = getSiblings(ev.target);
      const cur = $siblings.indexOf(ev.target);
      goTo($siblings, cur - 1);
      break;
    }

    case keyNext: {
      ev.preventDefault();
      const $siblings = getSiblings(ev.target);
      const cur = $siblings.indexOf(ev.target);
      goTo($siblings, cur + 1);
      break;
    }

    case "Home": {
      ev.preventDefault();
      const $siblings = getSiblings(ev.target);
      goTo($siblings, 0);
      break;
    }

    case "End": {
      ev.preventDefault();
      const $siblings = getSiblings(ev.target);
      goTo($siblings, -1);
      break;
    }

    default: {
      break;
    }
  }
};

/**
 * Click handler for [data-roving-tabindex] elements
 * TODO reset on e.g. popups
 * @param {MouseEvent} ev - Event handler
 * @returns {void}
 */
const onClick = (ev) => {
  const $siblings = getSiblings(ev.target);
  const cur = $siblings.indexOf(ev.target);
  goTo($siblings, cur);
};

/**
 * Register an element to the roving tabindex
 * @param {HTMLElement} el - Element that should be in a roving tabindex
 * @returns {void}
 */
const bindRovingTabindex = (el) => {
  el.setAttribute(ATTR_ITEM, "");
  el.addEventListener("keydown", onKeydown);

  // Initialize the tabindex
  nextTick().then(() => {
    const $siblings = getSiblings(el);
    el.setAttribute("tabindex", $siblings.indexOf(el) === 0 ? "0" : "-1");
  });
};

/**
 * Unregister an element from the roving tabindex
 * @param {HTMLElement} el - Element that should unregistered
 * @returns {void}
 */
const unbindRovingTabindex = (el) => {
  el.removeAttribute(ATTR_ITEM);
  el.removeAttribute("tabindex");
  el.removeEventListener("keydown", onKeydown);
};

const ApplyRovingTabindex = () => {
  return {
    mounted(el, { value = true }) {
      if (value) {
        bindRovingTabindex(el);
      }
    },
    updated(el, { value = true, oldValue = true }) {
      if (value !== oldValue) {
        unbindRovingTabindex(el);

        if (value) {
          bindRovingTabindex(el);
        }
      }
    },
    unmounted(el) {
      unbindRovingTabindex(el);
    },
  };
};

export default ApplyRovingTabindex;
