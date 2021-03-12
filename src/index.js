import RovingTabindex from "./RovingTabindex";
import RovingTabindexContainer from "./RovingTabindexContainer";

const VueRovingTabindex = {
  install(app, options) {
    app.directive("roving-tabindex-container", RovingTabindexContainer);
    app.directive("roving-tabindex", RovingTabindex);
  }
};

export default VueRovingTabindex;
export { RovingTabindexContainer, RovingTabindex };
