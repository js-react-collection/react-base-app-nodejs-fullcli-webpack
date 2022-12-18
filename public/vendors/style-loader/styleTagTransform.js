"use strict";
(self["webpackChunkreact_base_app_nodejs_fullcli_2"] = self["webpackChunkreact_base_app_nodejs_fullcli_2"] || []).push([["vendors/style-loader/styleTagTransform"],{

/***/ 589:
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

}]);