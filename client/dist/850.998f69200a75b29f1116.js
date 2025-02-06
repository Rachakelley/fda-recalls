"use strict";(self.webpackChunkfda_recalls=self.webpackChunkfda_recalls||[]).push([[850],{8850:(e,t,n)=>{n.d(t,{A:()=>N});var i=n(8168),r=n(8587),o=n(6540),l=n(4164),s=n(9854),a=n(1848),u=n(5607),c=n(6852),p=n(3034),d=n(7992),h=n(4038),f=n(7437),m=n(5487),b=n(4848);const v=function(e){const{className:t,classes:n,pulsate:i=!1,rippleX:r,rippleY:s,rippleSize:a,in:u,onExited:c,timeout:p}=e,[d,h]=o.useState(!1),f=(0,l.A)(t,n.ripple,n.rippleVisible,i&&n.ripplePulsate),m={width:a,height:a,top:-a/2+s,left:-a/2+r},v=(0,l.A)(n.child,d&&n.childLeaving,i&&n.childPulsate);return u||d||h(!0),o.useEffect((()=>{if(!u&&null!=c){const e=setTimeout(c,p);return()=>{clearTimeout(e)}}}),[c,u,p]),(0,b.jsx)("span",{className:f,style:m,children:(0,b.jsx)("span",{className:v})})};var g=n(7104);const y=(0,g.A)("MuiTouchRipple",["root","ripple","rippleVisible","ripplePulsate","child","childLeaving","childPulsate"]),x=["center","classes","className"];let A,R,M,E,k=e=>e;const T=(0,f.i7)(A||(A=k`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`)),C=(0,f.i7)(R||(R=k`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`)),V=(0,f.i7)(M||(M=k`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`)),w=(0,a.Ay)("span",{name:"MuiTouchRipple",slot:"Root"})({overflow:"hidden",pointerEvents:"none",position:"absolute",zIndex:0,top:0,right:0,bottom:0,left:0,borderRadius:"inherit"}),P=(0,a.Ay)(v,{name:"MuiTouchRipple",slot:"Ripple"})(E||(E=k`
  opacity: 0;
  position: absolute;

  &.${0} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  &.${0} {
    animation-duration: ${0}ms;
  }

  & .${0} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${0} {
    opacity: 0;
    animation-name: ${0};
    animation-duration: ${0}ms;
    animation-timing-function: ${0};
  }

  & .${0} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${0};
    animation-duration: 2500ms;
    animation-timing-function: ${0};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`),y.rippleVisible,T,550,(({theme:e})=>e.transitions.easing.easeInOut),y.ripplePulsate,(({theme:e})=>e.transitions.duration.shorter),y.child,y.childLeaving,C,550,(({theme:e})=>e.transitions.easing.easeInOut),y.childPulsate,V,(({theme:e})=>e.transitions.easing.easeInOut)),S=o.forwardRef((function(e,t){const n=(0,u.b)({props:e,name:"MuiTouchRipple"}),{center:s=!1,classes:a={},className:c}=n,p=(0,r.A)(n,x),[d,f]=o.useState([]),v=o.useRef(0),g=o.useRef(null);o.useEffect((()=>{g.current&&(g.current(),g.current=null)}),[d]);const A=o.useRef(!1),R=(0,m.A)(),M=o.useRef(null),E=o.useRef(null),k=o.useCallback((e=>{const{pulsate:t,rippleX:n,rippleY:i,rippleSize:r,cb:o}=e;f((e=>[...e,(0,b.jsx)(P,{classes:{ripple:(0,l.A)(a.ripple,y.ripple),rippleVisible:(0,l.A)(a.rippleVisible,y.rippleVisible),ripplePulsate:(0,l.A)(a.ripplePulsate,y.ripplePulsate),child:(0,l.A)(a.child,y.child),childLeaving:(0,l.A)(a.childLeaving,y.childLeaving),childPulsate:(0,l.A)(a.childPulsate,y.childPulsate)},timeout:550,pulsate:t,rippleX:n,rippleY:i,rippleSize:r},v.current)])),v.current+=1,g.current=o}),[a]),T=o.useCallback(((e={},t={},n=()=>{})=>{const{pulsate:i=!1,center:r=s||t.pulsate,fakeElement:o=!1}=t;if("mousedown"===(null==e?void 0:e.type)&&A.current)return void(A.current=!1);"touchstart"===(null==e?void 0:e.type)&&(A.current=!0);const l=o?null:E.current,a=l?l.getBoundingClientRect():{width:0,height:0,left:0,top:0};let u,c,p;if(r||void 0===e||0===e.clientX&&0===e.clientY||!e.clientX&&!e.touches)u=Math.round(a.width/2),c=Math.round(a.height/2);else{const{clientX:t,clientY:n}=e.touches&&e.touches.length>0?e.touches[0]:e;u=Math.round(t-a.left),c=Math.round(n-a.top)}if(r)p=Math.sqrt((2*a.width**2+a.height**2)/3),p%2==0&&(p+=1);else{const e=2*Math.max(Math.abs((l?l.clientWidth:0)-u),u)+2,t=2*Math.max(Math.abs((l?l.clientHeight:0)-c),c)+2;p=Math.sqrt(e**2+t**2)}null!=e&&e.touches?null===M.current&&(M.current=()=>{k({pulsate:i,rippleX:u,rippleY:c,rippleSize:p,cb:n})},R.start(80,(()=>{M.current&&(M.current(),M.current=null)}))):k({pulsate:i,rippleX:u,rippleY:c,rippleSize:p,cb:n})}),[s,k,R]),C=o.useCallback((()=>{T({},{pulsate:!0})}),[T]),V=o.useCallback(((e,t)=>{if(R.clear(),"touchend"===(null==e?void 0:e.type)&&M.current)return M.current(),M.current=null,void R.start(0,(()=>{V(e,t)}));M.current=null,f((e=>e.length>0?e.slice(1):e)),g.current=t}),[R]);return o.useImperativeHandle(t,(()=>({pulsate:C,start:T,stop:V})),[C,T,V]),(0,b.jsx)(w,(0,i.A)({className:(0,l.A)(y.root,a.root,c),ref:E},p,{children:(0,b.jsx)(h.A,{component:null,exit:!0,children:d})}))}));var $=n(9776);function D(e){return(0,$.Ay)("MuiButtonBase",e)}const j=(0,g.A)("MuiButtonBase",["root","disabled","focusVisible"]),L=["action","centerRipple","children","className","component","disabled","disableRipple","disableTouchRipple","focusRipple","focusVisibleClassName","LinkComponent","onBlur","onClick","onContextMenu","onDragLeave","onFocus","onFocusVisible","onKeyDown","onKeyUp","onMouseDown","onMouseLeave","onMouseUp","onTouchEnd","onTouchMove","onTouchStart","tabIndex","TouchRippleProps","touchRippleRef","type"],B=(0,a.Ay)("button",{name:"MuiButtonBase",slot:"Root",overridesResolver:(e,t)=>t.root})({display:"inline-flex",alignItems:"center",justifyContent:"center",position:"relative",boxSizing:"border-box",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none",textDecoration:"none",color:"inherit","&::-moz-focus-inner":{borderStyle:"none"},[`&.${j.disabled}`]:{pointerEvents:"none",cursor:"default"},"@media print":{colorAdjust:"exact"}}),N=o.forwardRef((function(e,t){const n=(0,u.b)({props:e,name:"MuiButtonBase"}),{action:a,centerRipple:h=!1,children:f,className:m,component:v="button",disabled:g=!1,disableRipple:y=!1,disableTouchRipple:x=!1,focusRipple:A=!1,LinkComponent:R="a",onBlur:M,onClick:E,onContextMenu:k,onDragLeave:T,onFocus:C,onFocusVisible:V,onKeyDown:w,onKeyUp:P,onMouseDown:$,onMouseLeave:j,onMouseUp:N,onTouchEnd:F,onTouchMove:I,onTouchStart:z,tabIndex:O=0,TouchRippleProps:X,touchRippleRef:U,type:Y}=n,K=(0,r.A)(n,L),H=o.useRef(null),W=o.useRef(null),q=(0,c.A)(W,U),{isFocusVisibleRef:_,onFocus:G,onBlur:J,ref:Q}=(0,d.A)(),[Z,ee]=o.useState(!1);g&&Z&&ee(!1),o.useImperativeHandle(a,(()=>({focusVisible:()=>{ee(!0),H.current.focus()}})),[]);const[te,ne]=o.useState(!1);o.useEffect((()=>{ne(!0)}),[]);const ie=te&&!y&&!g;function re(e,t,n=x){return(0,p.A)((i=>{t&&t(i);return!n&&W.current&&W.current[e](i),!0}))}o.useEffect((()=>{Z&&A&&!y&&te&&W.current.pulsate()}),[y,A,Z,te]);const oe=re("start",$),le=re("stop",k),se=re("stop",T),ae=re("stop",N),ue=re("stop",(e=>{Z&&e.preventDefault(),j&&j(e)})),ce=re("start",z),pe=re("stop",F),de=re("stop",I),he=re("stop",(e=>{J(e),!1===_.current&&ee(!1),M&&M(e)}),!1),fe=(0,p.A)((e=>{H.current||(H.current=e.currentTarget),G(e),!0===_.current&&(ee(!0),V&&V(e)),C&&C(e)})),me=()=>{const e=H.current;return v&&"button"!==v&&!("A"===e.tagName&&e.href)},be=o.useRef(!1),ve=(0,p.A)((e=>{A&&!be.current&&Z&&W.current&&" "===e.key&&(be.current=!0,W.current.stop(e,(()=>{W.current.start(e)}))),e.target===e.currentTarget&&me()&&" "===e.key&&e.preventDefault(),w&&w(e),e.target===e.currentTarget&&me()&&"Enter"===e.key&&!g&&(e.preventDefault(),E&&E(e))})),ge=(0,p.A)((e=>{A&&" "===e.key&&W.current&&Z&&!e.defaultPrevented&&(be.current=!1,W.current.stop(e,(()=>{W.current.pulsate(e)}))),P&&P(e),E&&e.target===e.currentTarget&&me()&&" "===e.key&&!e.defaultPrevented&&E(e)}));let ye=v;"button"===ye&&(K.href||K.to)&&(ye=R);const xe={};"button"===ye?(xe.type=void 0===Y?"button":Y,xe.disabled=g):(K.href||K.to||(xe.role="button"),g&&(xe["aria-disabled"]=g));const Ae=(0,c.A)(t,Q,H);const Re=(0,i.A)({},n,{centerRipple:h,component:v,disabled:g,disableRipple:y,disableTouchRipple:x,focusRipple:A,tabIndex:O,focusVisible:Z}),Me=(e=>{const{disabled:t,focusVisible:n,focusVisibleClassName:i,classes:r}=e,o={root:["root",t&&"disabled",n&&"focusVisible"]},l=(0,s.A)(o,D,r);return n&&i&&(l.root+=` ${i}`),l})(Re);return(0,b.jsxs)(B,(0,i.A)({as:ye,className:(0,l.A)(Me.root,m),ownerState:Re,onBlur:he,onClick:E,onContextMenu:le,onFocus:fe,onKeyDown:ve,onKeyUp:ge,onMouseDown:oe,onMouseLeave:ue,onMouseUp:ae,onDragLeave:se,onTouchEnd:pe,onTouchMove:de,onTouchStart:ce,ref:Ae,tabIndex:g?-1:O,type:Y},xe,K,{children:[f,ie?(0,b.jsx)(S,(0,i.A)({ref:q,center:h},X)):null]}))}))},4038:(e,t,n)=>{n.d(t,{A:()=>h});var i=n(8587),r=n(8168);var o=n(5540),l=n(6540),s=n(7241);function a(e,t){var n=Object.create(null);return e&&l.Children.map(e,(function(e){return e})).forEach((function(e){n[e.key]=function(e){return t&&(0,l.isValidElement)(e)?t(e):e}(e)})),n}function u(e,t,n){return null!=n[t]?n[t]:e.props[t]}function c(e,t,n){var i=a(e.children),r=function(e,t){function n(n){return n in t?t[n]:e[n]}e=e||{},t=t||{};var i,r=Object.create(null),o=[];for(var l in e)l in t?o.length&&(r[l]=o,o=[]):o.push(l);var s={};for(var a in t){if(r[a])for(i=0;i<r[a].length;i++){var u=r[a][i];s[r[a][i]]=n(u)}s[a]=n(a)}for(i=0;i<o.length;i++)s[o[i]]=n(o[i]);return s}(t,i);return Object.keys(r).forEach((function(o){var s=r[o];if((0,l.isValidElement)(s)){var a=o in t,c=o in i,p=t[o],d=(0,l.isValidElement)(p)&&!p.props.in;!c||a&&!d?c||!a||d?c&&a&&(0,l.isValidElement)(p)&&(r[o]=(0,l.cloneElement)(s,{onExited:n.bind(null,s),in:p.props.in,exit:u(s,"exit",e),enter:u(s,"enter",e)})):r[o]=(0,l.cloneElement)(s,{in:!1}):r[o]=(0,l.cloneElement)(s,{onExited:n.bind(null,s),in:!0,exit:u(s,"exit",e),enter:u(s,"enter",e)})}})),r}var p=Object.values||function(e){return Object.keys(e).map((function(t){return e[t]}))},d=function(e){function t(t,n){var i,r=(i=e.call(this,t,n)||this).handleExited.bind(function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(i));return i.state={contextValue:{isMounting:!0},handleExited:r,firstRender:!0},i}(0,o.A)(t,e);var n=t.prototype;return n.componentDidMount=function(){this.mounted=!0,this.setState({contextValue:{isMounting:!1}})},n.componentWillUnmount=function(){this.mounted=!1},t.getDerivedStateFromProps=function(e,t){var n,i,r=t.children,o=t.handleExited;return{children:t.firstRender?(n=e,i=o,a(n.children,(function(e){return(0,l.cloneElement)(e,{onExited:i.bind(null,e),in:!0,appear:u(e,"appear",n),enter:u(e,"enter",n),exit:u(e,"exit",n)})}))):c(e,r,o),firstRender:!1}},n.handleExited=function(e,t){var n=a(this.props.children);e.key in n||(e.props.onExited&&e.props.onExited(t),this.mounted&&this.setState((function(t){var n=(0,r.A)({},t.children);return delete n[e.key],{children:n}})))},n.render=function(){var e=this.props,t=e.component,n=e.childFactory,r=(0,i.A)(e,["component","childFactory"]),o=this.state.contextValue,a=p(this.state.children).map(n);return delete r.appear,delete r.enter,delete r.exit,null===t?l.createElement(s.A.Provider,{value:o},a):l.createElement(s.A.Provider,{value:o},l.createElement(t,r,a))},t}(l.Component);d.propTypes={},d.defaultProps={component:"div",childFactory:function(e){return e}};const h=d}}]);