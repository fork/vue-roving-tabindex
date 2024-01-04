import RovingTabindex from "./RovingTabindex";
import RovingTabindexContainer from "./RovingTabindexContainer";

export default {
  install(app) {
    app.directive("roving-tabindex-container", RovingTabindexContainer);
    app.directive("roving-tabindex", RovingTabindex);
  },
};

export { RovingTabindexContainer, RovingTabindex };
