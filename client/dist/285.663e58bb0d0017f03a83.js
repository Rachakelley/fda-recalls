"use strict";(self.webpackChunkfda_recalls=self.webpackChunkfda_recalls||[]).push([[285],{9067:(e,r,n)=>{n.d(r,{A:()=>v});var t=n(8168),o=n(8587),a=n(6540),l=n(4164),s=n(2532),c=n(3571),i=n(9599),u=n(2858),f=n(4848);const m=["className","component"];var d=n(3494),p=n(6544),b=n(8312);const g=(0,n(7104).A)("MuiBox",["root"]),y=(0,p.A)(),x=function(e={}){const{themeId:r,defaultTheme:n,defaultClassName:d="MuiBox-root",generateClassName:p}=e,b=(0,s.default)("div",{shouldForwardProp:e=>"theme"!==e&&"sx"!==e&&"as"!==e})(c.A);return a.forwardRef((function(e,a){const s=(0,u.A)(n),c=(0,i.A)(e),{className:g,component:y="div"}=c,x=(0,o.A)(c,m);return(0,f.jsx)(b,(0,t.A)({as:y,ref:a,className:(0,l.A)(g,p?p(d):d),theme:r&&s[r]||s},x))}))}({themeId:b.A,defaultTheme:y,defaultClassName:g.root,generateClassName:d.A.generate}),v=x},7285:(e,r,n)=>{n.r(r),n.d(r,{default:()=>d});var t=n(9067),o=n(6540),a=n(5072),l=n.n(a),s=n(749),c={insert:"head",singleton:!1};l()(s.A,c);s.A.locals;function i(e){return i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i(e)}function u(e,r){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);r&&(t=t.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),n.push.apply(n,t)}return n}function f(e){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?u(Object(n),!0).forEach((function(r){m(e,r,n[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(n,r))}))}return e}function m(e,r,n){return(r=function(e){var r=function(e,r){if("object"!=i(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var t=n.call(e,r||"default");if("object"!=i(t))return t;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(e)}(e,"string");return"symbol"==i(r)?r:r+""}(r))in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}const d=function(e){var r=e.selectedClassifications,n=e.setSelectedClassifications;return o.createElement(t.A,{className:"legend-wrapper"},Object.keys(r).map((function(e){return o.createElement("label",{key:e},o.createElement("input",{type:"checkbox",checked:r[e],onChange:function(){return function(e){n((function(r){return f(f({},r),{},m({},e,!r[e]))}))}(e)}}),function(e){return"Class I"===e?o.createElement("div",{className:"legend-item"},o.createElement("div",{className:"color-box class-i"}),o.createElement("span",null,"Class I (Low Risk)")):"Class II"===e?o.createElement("div",{className:"legend-item"},o.createElement("div",{className:"color-box class-ii"}),o.createElement("span",null,"Class II (Medium Risk)")):"Class III"===e?o.createElement("div",{className:"legend-item"},o.createElement("div",{className:"color-box class-iii"}),o.createElement("span",null,"Class III (High Risk)")):void 0}(e))})))}},749:(e,r,n)=>{n.d(r,{A:()=>a});var t=n(6314),o=n.n(t)()((function(e){return e[1]}));o.push([e.id,".legend-wrapper {\r\n    display: flex;\r\n    flex-direction: column;\r\n    background: #ffffffc4;\r\n    padding: 15px;\r\n    border-radius: 8px;\r\n    box-shadow: 0 2px 6px rgba(0,0,0,0.2);\r\n    z-index: 1000;\r\n\r\n    label {\r\n      display: flex;\r\n    }\r\n  }\r\n  \r\n  .legend-item {\r\n    display: flex;\r\n    align-items: center;\r\n    margin: 6px;\r\n    color: black;\r\n    font-size: 12px;\r\n  }\r\n  \r\n  .color-box {\r\n    width: 20px;\r\n    height: 20px;\r\n    margin-right: 10px;\r\n    border-radius: 4px;\r\n  }\r\n  \r\n  .color-box.class-i {\r\n    background-color: #FFD700; /* yellow - Class I */\r\n  }\r\n  \r\n  .color-box.class-ii {\r\n    background-color: #FFA500; /* orange - Class II */\r\n  }\r\n  \r\n  .color-box.class-iii {\r\n    background-color: #FF0000; /* red - Class III */\r\n  }",""]);const a=o}}]);