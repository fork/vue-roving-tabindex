import Vue from "vue";

import RovingTabindex from "./RovingTabindex";
import RovingTabindexContainer from "./RovingTabindexContainer";

const VueRovingTabindex = {
  install() {
    Vue.directive("roving-tabindex-container", RovingTabindexContainer);
    Vue.directive("roving-tabindex", RovingTabindex);
  }
};

export default VueRovingTabindex;
export { RovingTabindexContainer, RovingTabindex };
