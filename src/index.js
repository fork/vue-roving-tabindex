import ApplyRovingTabindex from "./RovingTabindex";
import ApplyRovingTabindexContainer from "./RovingTabindexContainer";

const VueRovingTabindex = {
  install(app, { direction }) {
    app.directive(
      "roving-tabindex-container",
      ApplyRovingTabindexContainer({ direction })
    );
    app.directive("roving-tabindex", ApplyRovingTabindex());
  },
};

export default VueRovingTabindex;
export { ApplyRovingTabindexContainer, ApplyRovingTabindex };
