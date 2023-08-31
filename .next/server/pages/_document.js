"use strict";
(() => {
var exports = {};
exports.id = 660;
exports.ids = [660];
exports.modules = {

/***/ 3320:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  config: () => (/* binding */ config),
  "default": () => (/* binding */ next_route_loaderpage_2F_document_absolutePagePath_private_next_pages_2F_document_tsx_preferredRegion_middlewareConfig_e30_3D_),
  getServerSideProps: () => (/* binding */ getServerSideProps),
  getStaticPaths: () => (/* binding */ getStaticPaths),
  getStaticProps: () => (/* binding */ getStaticProps),
  reportWebVitals: () => (/* binding */ reportWebVitals),
  routeModule: () => (/* binding */ routeModule),
  unstable_getServerProps: () => (/* binding */ unstable_getServerProps),
  unstable_getServerSideProps: () => (/* binding */ unstable_getServerSideProps),
  unstable_getStaticParams: () => (/* binding */ unstable_getStaticParams),
  unstable_getStaticPaths: () => (/* binding */ unstable_getStaticPaths),
  unstable_getStaticProps: () => (/* binding */ unstable_getStaticProps)
});

// NAMESPACE OBJECT: ./pages/_document.tsx
var _document_namespaceObject = {};
__webpack_require__.r(_document_namespaceObject);
__webpack_require__.d(_document_namespaceObject, {
  "default": () => (_document)
});

// EXTERNAL MODULE: ./node_modules/next/dist/server/future/route-modules/pages/module.js
var pages_module = __webpack_require__(3185);
var module_default = /*#__PURE__*/__webpack_require__.n(pages_module);
// EXTERNAL MODULE: ./node_modules/next/dist/build/webpack/loaders/next-route-loader/helpers.js
var helpers = __webpack_require__(7182);
// EXTERNAL MODULE: ./node_modules/react/jsx-runtime.js
var jsx_runtime = __webpack_require__(5893);
// EXTERNAL MODULE: ./node_modules/next/document.js
var next_document = __webpack_require__(6859);
var document_default = /*#__PURE__*/__webpack_require__.n(next_document);
;// CONCATENATED MODULE: ./pages/_document.tsx


class MyDocument extends (document_default()) {
    static async getInitialProps(ctx) {
        const initialProps = await document_default().getInitialProps(ctx);
        return {
            ...initialProps
        };
    }
    render() {
        return /*#__PURE__*/ (0,jsx_runtime.jsxs)(next_document.Html, {
            children: [
                /*#__PURE__*/ (0,jsx_runtime.jsxs)(next_document.Head, {
                    children: [
                        /*#__PURE__*/ jsx_runtime.jsx("link", {
                            rel: "preconnect",
                            href: "https://fonts.googleapis.com"
                        }),
                        /*#__PURE__*/ jsx_runtime.jsx("link", {
                            rel: "preconnect",
                            href: "https://fonts.gstatic.com",
                            crossOrigin: "anonymous"
                        }),
                        /*#__PURE__*/ jsx_runtime.jsx("link", {
                            href: "https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;600;700;800&display=swap",
                            rel: "stylesheet"
                        })
                    ]
                }),
                /*#__PURE__*/ (0,jsx_runtime.jsxs)("body", {
                    children: [
                        /*#__PURE__*/ jsx_runtime.jsx(next_document.Main, {}),
                        /*#__PURE__*/ jsx_runtime.jsx(next_document.NextScript, {})
                    ]
                })
            ]
        });
    }
}
/* harmony default export */ const _document = (MyDocument);

;// CONCATENATED MODULE: ./node_modules/next/dist/build/webpack/loaders/next-route-loader/index.js?page=%2F_document&absolutePagePath=private-next-pages%2F_document.tsx&preferredRegion=&middlewareConfig=e30%3D!

        // Next.js Route Loader
        
        

        // Import the userland code.
        

        // Re-export the component (should be the default export).
        /* harmony default export */ const next_route_loaderpage_2F_document_absolutePagePath_private_next_pages_2F_document_tsx_preferredRegion_middlewareConfig_e30_3D_ = ((0,helpers/* hoist */.l)(_document_namespaceObject, "default"));

        // Re-export methods.
        const getStaticProps = (0,helpers/* hoist */.l)(_document_namespaceObject, "getStaticProps")
        const getStaticPaths = (0,helpers/* hoist */.l)(_document_namespaceObject, "getStaticPaths")
        const getServerSideProps = (0,helpers/* hoist */.l)(_document_namespaceObject, "getServerSideProps")
        const config = (0,helpers/* hoist */.l)(_document_namespaceObject, "config")
        const reportWebVitals = (0,helpers/* hoist */.l)(_document_namespaceObject, "reportWebVitals")

        // Re-export legacy methods.
        const unstable_getStaticProps = (0,helpers/* hoist */.l)(_document_namespaceObject, "unstable_getStaticProps")
        const unstable_getStaticPaths = (0,helpers/* hoist */.l)(_document_namespaceObject, "unstable_getStaticPaths")
        const unstable_getStaticParams = (0,helpers/* hoist */.l)(_document_namespaceObject, "unstable_getStaticParams")
        const unstable_getServerProps = (0,helpers/* hoist */.l)(_document_namespaceObject, "unstable_getServerProps")
        const unstable_getServerSideProps = (0,helpers/* hoist */.l)(_document_namespaceObject, "unstable_getServerSideProps")

        // Create and export the route module that will be consumed.
        const options = {"definition":{"kind":"PAGES","page":"/_document","pathname":"/_document","bundlePath":"","filename":""}}
        const routeModule = new (module_default())({ ...options, userland: _document_namespaceObject })
        
        
    

/***/ }),

/***/ 3076:
/***/ ((module) => {

module.exports = require("next/dist/server/future/route-modules/route-module.js");

/***/ }),

/***/ 4140:
/***/ ((module) => {

module.exports = require("next/dist/server/get-page-files.js");

/***/ }),

/***/ 9716:
/***/ ((module) => {

module.exports = require("next/dist/server/htmlescape.js");

/***/ }),

/***/ 3100:
/***/ ((module) => {

module.exports = require("next/dist/server/render.js");

/***/ }),

/***/ 6368:
/***/ ((module) => {

module.exports = require("next/dist/server/utils.js");

/***/ }),

/***/ 6724:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/constants.js");

/***/ }),

/***/ 8743:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/html-context.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [812,859], () => (__webpack_exec__(3320)));
module.exports = __webpack_exports__;

})();