System.config({
  "baseURL": "./",
  "transpiler": "babel",
  "babelOptions": {
    "optional": [
      "runtime"
    ]
  },
  "paths": {
    "*": "*.js",
    "collector/*": "src/collector/*.js",
    "github:*": "jspm_packages/github/*.js",
    "npm:*": "jspm_packages/npm/*.js"
  },
  "bundles": {
    "collector": [
      "npm:core-js@0.9.16/library/modules/$.fw",
      "npm:core-js@0.9.16/library/modules/$.def",
      "npm:core-js@0.9.16/library/modules/$.get-names",
      "npm:core-js@0.9.16/library/fn/object/define-property",
      "npm:babel-runtime@5.5.6/helpers/class-call-check",
      "npm:core-js@0.9.16/library/modules/$.shared",
      "npm:core-js@0.9.16/library/modules/$.uid",
      "npm:core-js@0.9.16/library/modules/$.redef",
      "npm:core-js@0.9.16/library/modules/$.string-at",
      "npm:core-js@0.9.16/library/modules/$.assert",
      "npm:core-js@0.9.16/library/modules/$.iter-define",
      "npm:core-js@0.9.16/library/modules/$.unscope",
      "npm:core-js@0.9.16/library/modules/$.ctx",
      "npm:core-js@0.9.16/library/modules/$.iter-call",
      "npm:core-js@0.9.16/library/modules/$.set-proto",
      "npm:core-js@0.9.16/library/modules/$.same",
      "npm:core-js@0.9.16/library/modules/$.species",
      "npm:core-js@0.9.16/library/modules/$.invoke",
      "npm:core-js@0.9.16/library/modules/$.dom-create",
      "npm:process@0.10.1/browser",
      "npm:core-js@0.9.16/library/modules/$.mix",
      "npm:core-js@0.9.16/library/modules/$.iter-detect",
      "npm:docuri@4.1.1/index",
      "npm:events@1.0.2/events",
      "npm:asap@1.0.0/asap",
      "npm:localforage@1.2.3/src/drivers/indexeddb",
      "npm:localforage@1.2.3/src/utils/serializer",
      "npm:localforage@1.2.3/src/drivers/websql",
      "npm:react@0.14.0-alpha3/lib/ReactCurrentOwner",
      "npm:react@0.14.0-alpha3/lib/invariant",
      "npm:react@0.14.0-alpha3/lib/escapeTextContentForBrowser",
      "npm:react@0.14.0-alpha3/lib/emptyFunction",
      "npm:react@0.14.0-alpha3/lib/CSSProperty",
      "npm:react@0.14.0-alpha3/lib/ExecutionEnvironment",
      "npm:react@0.14.0-alpha3/lib/camelize",
      "npm:react@0.14.0-alpha3/lib/dangerousStyleValue",
      "npm:react@0.14.0-alpha3/lib/hyphenate",
      "npm:react@0.14.0-alpha3/lib/memoizeStringOnly",
      "npm:react@0.14.0-alpha3/lib/toArray",
      "npm:react@0.14.0-alpha3/lib/getMarkupWrap",
      "npm:react@0.14.0-alpha3/lib/keyMirror",
      "npm:react@0.14.0-alpha3/lib/setInnerHTML",
      "npm:react@0.14.0-alpha3/lib/EventConstants",
      "npm:react@0.14.0-alpha3/lib/EventPluginRegistry",
      "npm:react@0.14.0-alpha3/lib/EventPluginUtils",
      "npm:react@0.14.0-alpha3/lib/accumulateInto",
      "npm:react@0.14.0-alpha3/lib/forEachAccumulated",
      "npm:react@0.14.0-alpha3/lib/ReactEventEmitterMixin",
      "npm:react@0.14.0-alpha3/lib/ViewportMetrics",
      "npm:react@0.14.0-alpha3/lib/Object.assign",
      "npm:react@0.14.0-alpha3/lib/isEventSupported",
      "npm:react@0.14.0-alpha3/lib/emptyObject",
      "npm:react@0.14.0-alpha3/lib/ReactFragment",
      "npm:react@0.14.0-alpha3/lib/ReactPropTypeLocations",
      "npm:react@0.14.0-alpha3/lib/ReactPropTypeLocationNames",
      "npm:react@0.14.0-alpha3/lib/ReactNativeComponent",
      "npm:react@0.14.0-alpha3/lib/getIteratorFn",
      "npm:react@0.14.0-alpha3/lib/ReactInstanceMap",
      "npm:react@0.14.0-alpha3/lib/ReactRootIndex",
      "npm:react@0.14.0-alpha3/lib/adler32",
      "npm:react@0.14.0-alpha3/lib/ReactPerf",
      "npm:react@0.14.0-alpha3/lib/ReactOwner",
      "npm:react@0.14.0-alpha3/lib/ReactLifeCycle",
      "npm:react@0.14.0-alpha3/lib/PooledClass",
      "npm:react@0.14.0-alpha3/lib/Transaction",
      "npm:react@0.14.0-alpha3/lib/isNode",
      "npm:react@0.14.0-alpha3/lib/ReactComponentEnvironment",
      "npm:react@0.14.0-alpha3/lib/shouldUpdateReactComponent",
      "npm:react@0.14.0-alpha3/lib/validateDOMNesting",
      "npm:react@0.14.0-alpha3/lib/traverseAllChildren",
      "npm:react@0.14.0-alpha3/lib/keyOf",
      "npm:react@0.14.0-alpha3/lib/shallowEqual",
      "npm:react@0.14.0-alpha3/lib/EventPropagators",
      "npm:react@0.14.0-alpha3/lib/getTextContentAccessor",
      "npm:react@0.14.0-alpha3/lib/getEventTarget",
      "npm:react@0.14.0-alpha3/lib/SyntheticInputEvent",
      "npm:react@0.14.0-alpha3/lib/isTextInputElement",
      "npm:react@0.14.0-alpha3/lib/ClientReactRootIndex",
      "npm:react@0.14.0-alpha3/lib/DefaultEventPluginOrder",
      "npm:react@0.14.0-alpha3/lib/SyntheticUIEvent",
      "npm:react@0.14.0-alpha3/lib/getEventModifierState",
      "npm:react@0.14.0-alpha3/lib/HTMLDOMPropertyConfig",
      "npm:react@0.14.0-alpha3/lib/findDOMNode",
      "npm:react@0.14.0-alpha3/lib/ReactComponent",
      "npm:react@0.14.0-alpha3/lib/ReactErrorUtils",
      "npm:react@0.14.0-alpha3/lib/ReactDefaultBatchingStrategy",
      "npm:react@0.14.0-alpha3/lib/focusNode",
      "npm:react@0.14.0-alpha3/lib/LocalEventTrapMixin",
      "npm:react@0.14.0-alpha3/lib/ReactDOMImg",
      "npm:react@0.14.0-alpha3/lib/ReactDOMIframe",
      "npm:react@0.14.0-alpha3/lib/ReactPropTypes",
      "npm:react@0.14.0-alpha3/lib/ReactChildren",
      "npm:react@0.14.0-alpha3/lib/ReactDOMSelect",
      "npm:react@0.14.0-alpha3/lib/ReactDOMTextarea",
      "npm:react@0.14.0-alpha3/lib/EventListener",
      "npm:react@0.14.0-alpha3/lib/getUnboundedScrollPosition",
      "npm:react@0.14.0-alpha3/lib/ReactInjection",
      "npm:react@0.14.0-alpha3/lib/getNodeForCharacterOffset",
      "npm:react@0.14.0-alpha3/lib/getActiveElement",
      "npm:react@0.14.0-alpha3/lib/SelectEventPlugin",
      "npm:react@0.14.0-alpha3/lib/ServerReactRootIndex",
      "npm:react@0.14.0-alpha3/lib/SyntheticClipboardEvent",
      "npm:react@0.14.0-alpha3/lib/SyntheticFocusEvent",
      "npm:react@0.14.0-alpha3/lib/getEventCharCode",
      "npm:react@0.14.0-alpha3/lib/getEventKey",
      "npm:react@0.14.0-alpha3/lib/SyntheticDragEvent",
      "npm:react@0.14.0-alpha3/lib/SyntheticTouchEvent",
      "npm:react@0.14.0-alpha3/lib/SyntheticWheelEvent",
      "npm:react@0.14.0-alpha3/lib/SVGDOMPropertyConfig",
      "npm:react@0.14.0-alpha3/lib/createFullPageComponent",
      "npm:react@0.14.0-alpha3/lib/ReactDefaultPerfAnalysis",
      "npm:react@0.14.0-alpha3/lib/performance",
      "npm:react@0.14.0-alpha3/lib/ReactServerRenderingTransaction",
      "npm:react@0.14.0-alpha3/lib/mapObject",
      "npm:react@0.14.0-alpha3/lib/onlyChild",
      "npm:director@1.2.8/build/director",
      "src/collector/config/Config",
      "src/collector/config/defaults",
      "npm:classnames@2.1.2/index",
      "npm:react-bootstrap@0.24.0-alpha.2/lib/FormGroup",
      "npm:react-bootstrap@0.24.0-alpha.2/lib/utils/CustomPropTypes",
      "npm:react-bootstrap@0.24.0-alpha.2/lib/utils/deprecationWarning",
      "collector/shape/form/Field",
      "npm:react-bootstrap@0.24.0-alpha.2/lib/Grid",
      "npm:react-bootstrap@0.24.0-alpha.2/lib/styleMaps",
      "npm:react-bootstrap@0.24.0-alpha.2/lib/utils/TransitionEvents",
      "npm:react-bootstrap@0.24.0-alpha.2/lib/utils/domUtils",
      "npm:react-bootstrap@0.24.0-alpha.2/lib/utils/ValidComponentChildren",
      "npm:react-bootstrap@0.24.0-alpha.2/lib/utils/createChainedFunction",
      "npm:react-bootstrap@0.24.0-alpha.2/lib/Navbar",
      "npm:react-bootstrap@0.24.0-alpha.2/lib/SafeAnchor",
      "src/collector/component/Brand",
      "src/collector/store/Value",
      "github:twbs/bootstrap@3.3.5/css/bootstrap.css!github:systemjs/plugin-css@0.1.13",
      "npm:core-js@0.9.16/library/modules/$",
      "npm:core-js@0.9.16/library/modules/es6.object.statics-accept-primitives",
      "npm:babel-runtime@5.5.6/core-js/object/define-property",
      "npm:core-js@0.9.16/library/modules/$.wks",
      "npm:core-js@0.9.16/library/modules/$.iter",
      "npm:core-js@0.9.16/library/modules/es6.array.iterator",
      "npm:core-js@0.9.16/library/modules/$.for-of",
      "npm:process@0.10.1",
      "npm:docuri@4.1.1",
      "npm:events@1.0.2",
      "npm:asap@1.0.0",
      "npm:localforage@1.2.3/src/drivers/localstorage",
      "npm:react@0.14.0-alpha3/lib/DOMProperty",
      "npm:react@0.14.0-alpha3/lib/quoteAttributeValueForBrowser",
      "npm:react@0.14.0-alpha3/lib/warning",
      "npm:react@0.14.0-alpha3/lib/camelizeStyleName",
      "npm:react@0.14.0-alpha3/lib/hyphenateStyleName",
      "npm:react@0.14.0-alpha3/lib/createArrayFromMixed",
      "npm:react@0.14.0-alpha3/lib/ReactMultiChildUpdateTypes",
      "npm:react@0.14.0-alpha3/lib/setTextContent",
      "npm:react@0.14.0-alpha3/lib/EventPluginHub",
      "npm:react@0.14.0-alpha3/lib/ReactContext",
      "npm:react@0.14.0-alpha3/lib/ReactElementValidator",
      "npm:react@0.14.0-alpha3/lib/ReactEmptyComponent",
      "npm:react@0.14.0-alpha3/lib/ReactInstanceHandles",
      "npm:react@0.14.0-alpha3/lib/ReactMarkupChecksum",
      "npm:react@0.14.0-alpha3/lib/ReactRef",
      "npm:react@0.14.0-alpha3/lib/CallbackQueue",
      "npm:react@0.14.0-alpha3/lib/isTextNode",
      "npm:react@0.14.0-alpha3/lib/ReactCompositeComponent",
      "npm:react@0.14.0-alpha3/lib/flattenChildren",
      "npm:react@0.14.0-alpha3/lib/FallbackCompositionState",
      "npm:react@0.14.0-alpha3/lib/SyntheticEvent",
      "npm:react@0.14.0-alpha3/lib/ChangeEventPlugin",
      "npm:react@0.14.0-alpha3/lib/SyntheticMouseEvent",
      "npm:react@0.14.0-alpha3/lib/ReactBrowserComponentMixin",
      "npm:react@0.14.0-alpha3/lib/ReactClass",
      "npm:react@0.14.0-alpha3/lib/AutoFocusMixin",
      "npm:react@0.14.0-alpha3/lib/ReactDOMForm",
      "npm:react@0.14.0-alpha3/lib/LinkedValueUtils",
      "npm:react@0.14.0-alpha3/lib/ReactDOMOption",
      "npm:react@0.14.0-alpha3/lib/ReactEventListener",
      "npm:react@0.14.0-alpha3/lib/ReactDOMSelection",
      "npm:react@0.14.0-alpha3/lib/SyntheticKeyboardEvent",
      "npm:react@0.14.0-alpha3/lib/performanceNow",
      "npm:react@0.14.0-alpha3/lib/ReactServerRendering",
      "npm:react@0.14.0-alpha3/lib/ReactDOM",
      "npm:director@1.2.8",
      "npm:classnames@2.1.2",
      "npm:react-bootstrap@0.24.0-alpha.2/lib/utils/childrenValueInputValidation",
      "npm:react-bootstrap@0.24.0-alpha.2/lib/BootstrapMixin",
      "npm:react-bootstrap@0.24.0-alpha.2/lib/CollapsibleMixin",
      "npm:react-bootstrap@0.24.0-alpha.2/lib/NavItem",
      "npm:core-js@0.9.16/library/fn/object/create",
      "npm:core-js@0.9.16/library/fn/object/get-own-property-descriptor",
      "npm:babel-runtime@5.5.6/helpers/create-class",
      "npm:core-js@0.9.16/library/modules/$.cof",
      "npm:core-js@0.9.16/library/modules/es6.string.iterator",
      "npm:core-js@0.9.16/library/modules/web.dom.iterable",
      "github:jspm/nodelibs-process@0.1.1/index",
      "github:jspm/nodelibs-events@0.1.1/index",
      "npm:promise@5.0.0/core",
      "npm:react@0.14.0-alpha3/lib/DOMPropertyOperations",
      "npm:react@0.14.0-alpha3/lib/CSSPropertyOperations",
      "npm:react@0.14.0-alpha3/lib/createNodesFromMarkup",
      "npm:react@0.14.0-alpha3/lib/ReactBrowserEventEmitter",
      "npm:react@0.14.0-alpha3/lib/ReactElement",
      "npm:react@0.14.0-alpha3/lib/ReactReconciler",
      "npm:react@0.14.0-alpha3/lib/ReactUpdates",
      "npm:react@0.14.0-alpha3/lib/containsNode",
      "npm:react@0.14.0-alpha3/lib/instantiateReactComponent",
      "npm:react@0.14.0-alpha3/lib/ReactChildReconciler",
      "npm:react@0.14.0-alpha3/lib/SyntheticCompositionEvent",
      "npm:react@0.14.0-alpha3/lib/EnterLeaveEventPlugin",
      "npm:react@0.14.0-alpha3/lib/ReactDOMButton",
      "npm:react@0.14.0-alpha3/lib/ReactDOMInput",
      "npm:react@0.14.0-alpha3/lib/ReactInputSelection",
      "npm:react@0.14.0-alpha3/lib/SimpleEventPlugin",
      "npm:react@0.14.0-alpha3/lib/ReactDefaultPerf",
      "npm:react@0.14.0-alpha3/lib/ReactDOMServer",
      "npm:react@0.14.0-alpha3/lib/ReactIsomorphic",
      "npm:react-bootstrap@0.24.0-alpha.2/lib/InputBase",
      "npm:react-bootstrap@0.24.0-alpha.2/lib/FormControls/Static",
      "npm:react-bootstrap@0.24.0-alpha.2/lib/Nav",
      "npm:babel-runtime@5.5.6/core-js/object/create",
      "npm:babel-runtime@5.5.6/core-js/object/get-own-property-descriptor",
      "npm:core-js@0.9.16/library/modules/es6.object.to-string",
      "github:jspm/nodelibs-process@0.1.1",
      "github:jspm/nodelibs-events@0.1.1",
      "npm:promise@5.0.0/index",
      "npm:react@0.14.0-alpha3/lib/Danger",
      "npm:react@0.14.0-alpha3/lib/ReactUpdateQueue",
      "npm:react@0.14.0-alpha3/lib/ReactMultiChild",
      "npm:react@0.14.0-alpha3/lib/BeforeInputEventPlugin",
      "npm:react@0.14.0-alpha3/lib/ReactReconcileTransaction",
      "npm:react-bootstrap@0.24.0-alpha.2/lib/FormControls/index",
      "src/collector/component/nav/NavBar",
      "npm:babel-runtime@5.5.6/helpers/inherits",
      "npm:babel-runtime@5.5.6/helpers/get",
      "npm:core-js@0.9.16/library/modules/$.task",
      "npm:promise@5.0.0",
      "npm:react@0.14.0-alpha3/lib/DOMChildrenOperations",
      "npm:react@0.14.0-alpha3/lib/ReactMount",
      "npm:react@0.14.0-alpha3/lib/ReactDOMComponent",
      "npm:react@0.14.0-alpha3/lib/ReactDefaultInjection",
      "npm:react-bootstrap@0.24.0-alpha.2/lib/Input",
      "npm:core-js@0.9.16/library/modules/es6.promise",
      "npm:localforage@1.2.3/src/localforage",
      "npm:react@0.14.0-alpha3/lib/ReactDOMIDOperations",
      "src/collector/component/form/Form",
      "npm:core-js@0.9.16/library/fn/promise",
      "npm:localforage@1.2.3",
      "npm:react@0.14.0-alpha3/lib/ReactComponentBrowserEnvironment",
      "npm:babel-runtime@5.5.6/core-js/promise",
      "npm:react@0.14.0-alpha3/lib/ReactDOMTextComponent",
      "npm:react@0.14.0-alpha3/lib/ReactDOMClient",
      "npm:react@0.14.0-alpha3/lib/React",
      "npm:react@0.14.0-alpha3/react",
      "npm:react@0.14.0-alpha3",
      "src/collector/Application",
      "src/main"
    ]
  }
});

System.config({
  "map": {
    "babel": "npm:babel-core@5.5.6",
    "babel-runtime": "npm:babel-runtime@5.5.6",
    "bootstrap": "github:twbs/bootstrap@3.3.5",
    "chai": "npm:chai@3.0.0",
    "clean-css": "npm:clean-css@3.3.5",
    "core-js": "npm:core-js@0.9.16",
    "css": "github:systemjs/plugin-css@0.1.13",
    "director": "npm:director@1.2.8",
    "docuri": "npm:docuri@4.1.1",
    "events": "github:jspm/nodelibs-events@0.1.1",
    "localforage": "npm:localforage@1.2.3",
    "mocha": "npm:mocha@2.2.5",
    "pouchdb": "github:pouchdb/pouchdb@3.6.0",
    "react": "npm:react@0.14.0-alpha3",
    "react-bootstrap": "npm:react-bootstrap@0.24.0-alpha.2",
    "rx": "npm:rx@2.5.3",
    "github:jspm/nodelibs-assert@0.1.0": {
      "assert": "npm:assert@1.3.0"
    },
    "github:jspm/nodelibs-buffer@0.1.0": {
      "buffer": "npm:buffer@3.3.1"
    },
    "github:jspm/nodelibs-events@0.1.1": {
      "events": "npm:events@1.0.2"
    },
    "github:jspm/nodelibs-http@1.7.1": {
      "Base64": "npm:Base64@0.2.1",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "url": "github:jspm/nodelibs-url@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "github:jspm/nodelibs-https@0.1.0": {
      "https-browserify": "npm:https-browserify@0.0.0"
    },
    "github:jspm/nodelibs-os@0.1.0": {
      "os-browserify": "npm:os-browserify@0.1.2"
    },
    "github:jspm/nodelibs-path@0.1.0": {
      "path-browserify": "npm:path-browserify@0.0.0"
    },
    "github:jspm/nodelibs-process@0.1.1": {
      "process": "npm:process@0.10.1"
    },
    "github:jspm/nodelibs-querystring@0.1.0": {
      "querystring": "npm:querystring@0.2.0"
    },
    "github:jspm/nodelibs-stream@0.1.0": {
      "stream-browserify": "npm:stream-browserify@1.0.0"
    },
    "github:jspm/nodelibs-url@0.1.0": {
      "url": "npm:url@0.10.3"
    },
    "github:jspm/nodelibs-util@0.1.0": {
      "util": "npm:util@0.10.3"
    },
    "github:twbs/bootstrap@3.3.5": {
      "jquery": "github:components/jquery@2.1.4"
    },
    "npm:amdefine@1.0.0": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "module": "github:jspm/nodelibs-module@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:asap@1.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:assert@1.3.0": {
      "util": "npm:util@0.10.3"
    },
    "npm:babel-runtime@5.5.6": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:buffer@3.3.1": {
      "base64-js": "npm:base64-js@0.0.8",
      "ieee754": "npm:ieee754@1.1.6",
      "is-array": "npm:is-array@1.0.1"
    },
    "npm:chai@3.0.0": {
      "assertion-error": "npm:assertion-error@1.0.1",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "deep-eql": "npm:deep-eql@0.1.3",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0",
      "type-detect": "npm:type-detect@1.0.0"
    },
    "npm:classnames@2.1.2": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:clean-css@3.3.5": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "commander": "npm:commander@2.8.1",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "http": "github:jspm/nodelibs-http@1.7.1",
      "https": "github:jspm/nodelibs-https@0.1.0",
      "os": "github:jspm/nodelibs-os@0.1.0",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "source-map": "npm:source-map@0.4.3",
      "url": "github:jspm/nodelibs-url@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:commander@2.8.1": {
      "child_process": "github:jspm/nodelibs-child_process@0.1.0",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "graceful-readlink": "npm:graceful-readlink@1.0.1",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:core-js@0.9.16": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "systemjs-json": "github:systemjs/plugin-json@0.1.0"
    },
    "npm:core-util-is@1.0.1": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:deep-eql@0.1.3": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "type-detect": "npm:type-detect@0.1.1"
    },
    "npm:director@1.2.8": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "http": "github:jspm/nodelibs-http@1.7.1",
      "querystring": "github:jspm/nodelibs-querystring@0.1.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:envify@3.4.0": {
      "jstransform": "npm:jstransform@10.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "through": "npm:through@2.3.7"
    },
    "npm:esprima-fb@13001.1001.0-dev-harmony-fb": {
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:graceful-readlink@1.0.1": {
      "fs": "github:jspm/nodelibs-fs@0.1.2"
    },
    "npm:https-browserify@0.0.0": {
      "http": "github:jspm/nodelibs-http@1.7.1"
    },
    "npm:inherits@2.0.1": {
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:jstransform@10.1.0": {
      "base62": "npm:base62@0.1.1",
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "esprima-fb": "npm:esprima-fb@13001.1001.0-dev-harmony-fb",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "source-map": "npm:source-map@0.1.31"
    },
    "npm:localforage@1.2.3": {
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "promise": "npm:promise@5.0.0"
    },
    "npm:mocha@2.2.5": {
      "css": "github:systemjs/plugin-css@0.1.13"
    },
    "npm:os-browserify@0.1.2": {
      "os": "github:jspm/nodelibs-os@0.1.0"
    },
    "npm:path-browserify@0.0.0": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:promise@5.0.0": {
      "asap": "npm:asap@1.0.0"
    },
    "npm:punycode@1.3.2": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:react-bootstrap@0.24.0-alpha.2": {
      "classnames": "npm:classnames@2.1.2",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "react": "npm:react@0.14.0-alpha3"
    },
    "npm:react@0.14.0-alpha3": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "envify": "npm:envify@3.4.0",
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:readable-stream@1.1.13": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0",
      "core-util-is": "npm:core-util-is@1.0.1",
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "isarray": "npm:isarray@0.0.1",
      "process": "github:jspm/nodelibs-process@0.1.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0",
      "stream-browserify": "npm:stream-browserify@1.0.0",
      "string_decoder": "npm:string_decoder@0.10.31",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:rx@2.5.3": {
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:source-map@0.1.31": {
      "amdefine": "npm:amdefine@1.0.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:source-map@0.4.3": {
      "amdefine": "npm:amdefine@1.0.0",
      "fs": "github:jspm/nodelibs-fs@0.1.2",
      "path": "github:jspm/nodelibs-path@0.1.0",
      "process": "github:jspm/nodelibs-process@0.1.1"
    },
    "npm:stream-browserify@1.0.0": {
      "events": "github:jspm/nodelibs-events@0.1.1",
      "inherits": "npm:inherits@2.0.1",
      "readable-stream": "npm:readable-stream@1.1.13"
    },
    "npm:string_decoder@0.10.31": {
      "buffer": "github:jspm/nodelibs-buffer@0.1.0"
    },
    "npm:through@2.3.7": {
      "process": "github:jspm/nodelibs-process@0.1.1",
      "stream": "github:jspm/nodelibs-stream@0.1.0"
    },
    "npm:url@0.10.3": {
      "assert": "github:jspm/nodelibs-assert@0.1.0",
      "punycode": "npm:punycode@1.3.2",
      "querystring": "npm:querystring@0.2.0",
      "util": "github:jspm/nodelibs-util@0.1.0"
    },
    "npm:util@0.10.3": {
      "inherits": "npm:inherits@2.0.1",
      "process": "github:jspm/nodelibs-process@0.1.1"
    }
  }
});

