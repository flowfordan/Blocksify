(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[783],{6861:function(e,t,n){"use strict";var r,i,a,l,s,c,o=n(7294);function u(){return(u=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}t.Z=function(e){return o.createElement("svg",u({xmlns:"http://www.w3.org/2000/svg",width:70,height:40,fill:"none"},e),r||(r=o.createElement("path",{fill:"#fff",d:"M0 10h8v12H0zM0 0h4v8H0z"})),i||(i=o.createElement("path",{stroke:"#fff",strokeWidth:2,d:"M11 0v21h8M40 1h-7v20h7"})),a||(a=o.createElement("path",{fill:"#fff",d:"M21 0h8v22h-8z"})),l||(l=o.createElement("path",{stroke:"#fff",strokeWidth:2,d:"M31 24v6h8v9h-9M43 24v16M47 24v16M48 30h7M48 23h10M45 0v24M46 11h9l4 19h6M50 10.5 52 1h4"})),s||(s=o.createElement("path",{stroke:"#fff",strokeWidth:6,d:"M67 24v16"})),c||(c=o.createElement("path",{stroke:"#fff",strokeWidth:2,d:"M66 39h-7"})))}},9436:function(e,t,n){"use strict";n.d(t,{v7:function(){return O},FS:function(){return P},zs:function(){return E},Uq:function(){return V},Q5:function(){return M},yw:function(){return k},zl:function(){return w},T0:function(){return o}});var r=n(8564),i=n(2267),a=n(2722),l=[{id:a.aU.LINE,title:"Line",isActive:!1,isAvailable:!0,lvl:"top",type:"draw",activity:"continous",activeCursor:"crosshair"},{id:a.aU.PLINE,title:"Polyline",isActive:!1,isAvailable:!0,lvl:"top",type:"draw",activity:"continous",activeCursor:"crosshair"},{id:a.aU.POLYGON,title:"Polygon",isActive:!1,isAvailable:!0,lvl:"top",type:"draw",activity:"continous",activeCursor:"crosshair"},{id:a.aU.SELECTOR,title:"Selector",isActive:!1,isAvailable:!0,lvl:"top",type:"select",activity:"continous",activeCursor:"pointer",autoTriggerFor:a.aU.INSPECTOR},{id:a.aU.INSPECTOR,title:"Inspector",isActive:!1,isAvailable:!1,lvl:"middle",type:"other",activity:"continous",activeCursor:"pointer"},{id:a.aU.EDITOR,title:"Editor",isActive:!1,isAvailable:!1,lvl:"low",type:"other",activity:"continous",activeCursor:"wait"}],s={inspector:{selectedObjData:null,intersectedObjData:null,dataToSet:null},editor:{currentData:"",newData:""}},c=n(8949),o=new(function(){function e(){var t=this;(0,r._)(this,e),this.toggleInstrumentActive=function(e){var n=t._getInstrument(e);if(n){if(n.isActive=!n.isActive,n.isActive&&"top"===n.lvl){var r=n.lvl,i=!0,a=!1,l=void 0;try{for(var s,c=t.instruments[Symbol.iterator]();!(i=(s=c.next()).done);i=!0){var o=s.value;o.lvl===r&&o.isActive&&o.id!==e&&(o.isActive=!1)}}catch(e){a=!0,l=e}finally{try{i||null==c.return||c.return()}finally{if(a)throw l}}}var u=n.autoTriggerFor;u&&t.toggleInstrumentActive(u)}},this.toggleInstrumentAvailable=function(e){var n=t._getInstrument(e);n&&(n.isAvailable=!n.isAvailable)},this.setInstrumentsAvailable=function(e){var n=!(arguments.length>1)||void 0===arguments[1]||arguments[1],r=t._getInstrument(e);r&&(r.isAvailable=n||!1)},this._getInstrument=function(e){return t.instruments.find(function(t){return t.id===e})||null},this.setInstrumentData=function(e,n,r){"int"===r?t.instrumentsData[n].intersectedObjData=e:t.instrumentsData[n].selectedObjData=e},this.instruments=l,this.instrumentsData=s,this.currentLvlInstrument={top:null,middle:null,low:null},(0,c.ky)(this)}return(0,i._)(e,[{key:"currentInstrument",get:function(){return this.instruments.find(function(e){return e.isActive&&"top"===e.lvl})||null}}]),e}()),u=n(4586),d=n(1639),p=n(5766),h=n(2253),v=n(4932),f=[{id:d.m.SNAP_STEP,type:"snapping",title:"Step",isActive:!1,options:{controller:"range",value:2,rangeMin:.5,rangeMax:5,rangeStep:.5,selValues:[],selVariants:[]}},{id:d.m.SNAP_ANGLE,type:"snapping",title:"Angle",isActive:!1,options:{controller:"selection",value:2,rangeMin:0,rangeMax:0,rangeStep:0,selVariants:[1,2,5,10,15,30,45,90],selValues:[2]}},{id:d.m.SNAP_GRID,type:"snapping",title:"Grid",isActive:!1,options:{controller:"none",value:10,rangeMin:0,rangeMax:0,rangeStep:0,selValues:[],selVariants:[]}}],m=f.reduce(function(e,t){var n=t.id,r=t.isActive;return(0,v._)((0,h._)({},e),(0,p._)({},n,r))},{}),g=n(9477),_=function(e){var t={},n=(0,u._)(Array(181).keys()),r=[],i=!0,a=!1,l=void 0;try{for(var s,c=n[Symbol.iterator]();!(i=(s=c.next()).done);i=!0){var o=s.value,d=!0,p=!1,h=void 0;try{for(var v,f=e[Symbol.iterator]();!(d=(v=f.next()).done);d=!0){var m=v.value;o%m!=0||r.includes(o)||r.push(o)}}catch(e){p=!0,h=e}finally{try{d||null==f.return||f.return()}finally{if(p)throw h}}}}catch(e){a=!0,l=e}finally{try{i||null==c.return||c.return()}finally{if(a)throw l}}var _=!0,w=!1,b=void 0;try{for(var y,x=r[Symbol.iterator]();!(_=(y=x.next()).done);_=!0){var j=y.value,O=j*(Math.PI/180),E=parseFloat((1*Math.cos(O)).toFixed(9)),k=parseFloat((1*Math.sin(O)).toFixed(9));t[j]=[new g.Pa4(E,0,k),new g.Pa4(E,0,-1*k)]}}catch(e){w=!0,b=e}finally{try{_||null==x.return||x.return()}finally{if(w)throw b}}return t},w=new function e(){var t=this;(0,r._)(this,e),this._getItem=function(e){return t.helpers.find(function(t){return t.id===e})||null},this.toggleHelperActive=function(e){var n=t._getItem(e);n&&(n.isActive=!n.isActive,t.isHelpersActive[n.id]=n.isActive)},this.setHelperValue=function(e,n){var r=t._getItem(e);if(r){if("range"===r.options.controller)r.options.value=n;else if("selection"===r.options.controller){var i=r.options.selValues.indexOf(n);i>-1?r.options.selValues=(0,u._)(r.options.selValues.slice(0,i)).concat((0,u._)(r.options.selValues.slice(i+1))):r.options.selValues.push(n),r.id===d.m.SNAP_ANGLE&&(t.anglesSnapV3s=_(t.helpers[1].options.selValues))}}},this.isHelpersActive=m,this.helpers=f,this.anglesSnapV3s=_(this.helpers[1].options.selValues),(0,c.ky)(this)},b=n(5893),y=n(7294),x=n(6670),j=n(8132),O=(0,x.Pi)(function(e){var t=e.instrId,n=o._getInstrument(t);if(!n)return null;var r=function(){o.toggleInstrumentActive(t)},i=(0,y.useCallback)(function(){switch(n.id){case a.aU.LINE:return"line";case a.aU.PLINE:return"pLine";case a.aU.POLYGON:return"polygon";default:return"line"}},[]);return(0,b.jsx)(j.Ph,{title:n.title,isChecked:n.isActive,icon:i(),disabled:!n.isAvailable,onClick:n.isAvailable?function(){return r()}:function(){}})}),E=(0,x.Pi)(function(e){var t=e.helperId,n=w._getItem(t);if(!n)return null;var r=function(){w.toggleHelperActive(t)},i=function(e){var n=parseInt(e.target.value);isNaN(n)||w.setHelperValue(t,n)},a=function(e){w.setHelperValue(t,e)},l=(0,x.Pi)(function(){return"range"===n.options.controller?(0,b.jsx)(j.Fo,{minVal:n.options.rangeMin,maxVal:n.options.rangeMax,stepVal:n.options.rangeStep,val:n.options.value,valName:n.options.rangeTitle,onSliderChange:i}):"selection"===n.options.controller?(0,b.jsx)(j.Kj,{items:n.options.selVariants,selected:n.options.selValues,handleCollectionUpd:a}):null});return(0,b.jsx)(j.Ph,{title:n.title,isChecked:n.isActive,onDoubleClick:function(){return r()},children:(0,b.jsx)(l,{})})}),k=(0,x.Pi)(function(){var e=o._getInstrument(a.aU.SELECTOR);return e?(0,b.jsx)(j.pS,{iconKey:"selector",isActive:e.isActive,title:e.title,onClick:function(){return o.toggleInstrumentActive(a.aU.SELECTOR)}}):null}),N=n(7702),S=n(1309),I=n(4566),C=n.n(I),M=function(e){var t=e.propName,n=e.propValue,r=e.isEditable,i=e.controls,a=e.propId;(0,N._)(e,["propName","propValue","isEditable","controls","propId"]);var l=(0,S._)((0,y.useState)(n.toString()),2),s=l[0],c=l[1],o=(0,y.useRef)(null),u=i?i[a]:null,d=function(e){o.current&&clearTimeout(o.current),c(e.target.value),console.log("change value",s),o.current=setTimeout(function(){console.log("change value throttle",e.target.value)},500)};return(0,b.jsxs)("div",{className:C().objDataProp,children:[(0,b.jsx)("span",{className:C().objDataProp__name,children:void 0===t?"_":t}),(0,b.jsx)("span",{className:C().objDataProp__value,children:r&&(null==u?void 0:u.controlType)==="slide"?(0,b.jsx)(j.Fo,{minVal:u.minVal,maxVal:u.maxVal,stepVal:u.step,val:parseInt(s),valName:"width",onSliderChange:function(e){return d(e)},variant:"dark",disabled:!0}):"number"==typeof n?n.toFixed(2):n})]})},A=function(e){switch(e){case a.aU.LINE:return"line";case a.aU.PLINE:return"pLine";case a.aU.SELECTOR:case a.aU.EDITOR:return"selector";case a.aU.POLYGON:return"polygon";default:return"line"}},P=(0,x.Pi)(function(e){var t=o.instruments.find(function(e){return e.isActive&&"draw"===e.type});return(0,b.jsx)(j.pS,{isSelected:!!e.isOpened,isExpandable:!0,iconKey:A(null==t?void 0:t.id),isActive:!!t,title:t?t.title:"Drawing Tools"})}),V=(0,x.Pi)(function(e){var t=Object.values(w.isHelpersActive).includes(!0);return(0,b.jsx)(j.pS,{isSelected:!!e.isOpened,isExpandable:!0,iconKey:"helper",isActive:t,title:"Helpers"})})},1510:function(e,t,n){"use strict";n.d(t,{u:function(){return W}});var r,i,a,l,s,c,o,u,d,p,h,v,f,m,g,_,w,b,y,x,j,O,E,k,N,S,I,C=n(7294);function M(){return(M=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function A(){return(A=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function P(){return(P=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function V(){return(V=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function D(){return(D=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function L(){return(L=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function T(){return(T=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function R(){return(R=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function U(){return(U=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function H(){return(H=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function z(){return(z=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function Z(){return(Z=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function G(){return(G=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var B=n(6861);function F(){return(F=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var K=function(e){return C.createElement("svg",F({xmlns:"http://www.w3.org/2000/svg",width:8,height:8,fill:"none",stroke:"#fff"},e),N||(N=C.createElement("path",{d:"m1 4 2 2 4-4"})))};function Y(){return(Y=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}var W={logo:B.Z,polygon:function(e){return C.createElement("svg",M({xmlns:"http://www.w3.org/2000/svg",width:17,height:17,fill:"#fff"},e),r||(r=C.createElement("circle",{cx:1.545,cy:15.455,r:1.545})),i||(i=C.createElement("circle",{cx:15.455,cy:1.545,r:1.545})),a||(a=C.createElement("circle",{cx:15.455,cy:15.455,r:1.545})),l||(l=C.createElement("path",{fillRule:"evenodd",d:"M15.455 3.09a1.54 1.54 0 0 1-1.093-.452l1.093-1.093v1.546ZM3.345 13.656l10.31-10.31c.46.461 1.097.746 1.8.746v8.818a2.545 2.545 0 0 0-2.546 2.545H4.091c0-.702-.285-1.339-.746-1.8Zm-.254 1.8a1.54 1.54 0 0 0-.453-1.093l-1.092 1.092H3.09Zm10.818 0h1.546v-1.546c-.854 0-1.546.692-1.546 1.545Z",clipRule:"evenodd"})))},pLine:function(e){return C.createElement("svg",A({xmlns:"http://www.w3.org/2000/svg",width:17,height:17,fill:"#fff"},e),s||(s=C.createElement("path",{fillRule:"evenodd",d:"M13.336 2.957 9.912 6.381c.28.187.52.428.707.708l3.424-3.425a2.559 2.559 0 0 1-.707-.707ZM8.5 6.955a1.54 1.54 0 0 1 1.388.864A1.545 1.545 0 1 1 8.5 6.954ZM6.382 9.912c.186.28.427.52.707.707l-3.425 3.424a2.56 2.56 0 0 0-.707-.707l3.425-3.424Zm-4.156 4.155a1.545 1.545 0 1 0-1.362 2.775 1.545 1.545 0 0 0 1.362-2.775Zm11.84-11.84a1.552 1.552 0 0 0 1.388.864 1.545 1.545 0 1 0-1.393-.876l.006.011Z",clipRule:"evenodd"})))},line:function(e){return C.createElement("svg",P({xmlns:"http://www.w3.org/2000/svg",width:17,height:17,fill:"#fff"},e),c||(c=C.createElement("path",{fillRule:"evenodd",d:"M15.454 3.09a1.545 1.545 0 1 0 0-3.09 1.545 1.545 0 0 0 0 3.09ZM2.957 13.337l10.379-10.38c.187.28.427.521.707.708L3.664 14.043a2.559 2.559 0 0 0-.707-.707Zm-.024 1.438a1.545 1.545 0 1 1-.707-.707c.307.15.556.4.707.707Z",clipRule:"evenodd"})))},selector:function(e){return C.createElement("svg",V({xmlns:"http://www.w3.org/2000/svg",width:28,height:28,fill:"none"},e),o||(o=C.createElement("path",{stroke:"#fff",strokeLinecap:"round",d:"m18.185 5.74-4.691 5.675c.26-.315.592-1.102-.164-1.727-.757-.626-1.467-.152-1.728.164l-.782.945c.26-.315.629-1.072-.164-1.727-.946-.782-2.249.794-2.51 1.11.261-.316.593-1.103-.163-1.728-.757-.626-1.467-.152-1.728.164 0 0-1.727 2.4-2.655 4.174-.928 1.774-1.152 2.55-1.4 3.62-.247 1.069.165 1.727.638 2.118l2.837 2.346c1.892 1.563 2.83 1.637 3.62 1.4h0c.79-.238 2.118-.637 3.373-1.192.562-.25 2.591-.246 2.591-.246l3.065.145c2.2.227 1.954-2.365-.246-2.592l-2.2-.227c-.28 0-2.007-.04-2.363-.954-.31-.799.062-1.704.583-2.334l5.979-7.57c.26-.315.592-1.102-.164-1.728-.757-.625-1.468-.151-1.728.164Zm-2.97-1.782c1.09-1.32 3.982-3.37 6.826-1.02 2.843 2.351 1.373 5.577.282 6.897"})))},helper:function(e){return C.createElement("svg",D({xmlns:"http://www.w3.org/2000/svg",width:20,height:20,fill:"none"},e),u||(u=C.createElement("circle",{cx:10,cy:10,r:9.5,stroke:"#fff"})),d||(d=C.createElement("path",{stroke:"#fff",d:"m8.586 8.586 5.657-2.829-2.829 5.657-5.657 2.829 2.829-5.657ZM.5 10H4m15.5 0H16M10 .5V4m0 15.5V16"})),p||(p=C.createElement("circle",{cx:10,cy:10,r:.5,stroke:"#fff"})))},arrowHead:function(e){return C.createElement("svg",H({xmlns:"http://www.w3.org/2000/svg",width:8,height:8,fill:"none",stroke:"#fff"},e),y||(y=C.createElement("path",{d:"m1 3 3 2 3-2"})))},eye:function(e){return C.createElement("svg",z({xmlns:"http://www.w3.org/2000/svg",width:16,height:16,fill:"none",stroke:"#686868"},e),x||(x=C.createElement("path",{strokeLinecap:"round",d:"M2 7.77c.77.922 3.046 2.769 6 2.769s5.23-1.847 6-2.77"})),j||(j=C.createElement("path",{d:"M2 7.77C2.77 6.845 5.046 5 8 5s5.23 1.846 6 2.77"})),O||(O=C.createElement("path",{d:"M8 5.923c-1.477 0-1.846 1.23-1.846 1.846 0 .616.37 1.846 1.846 1.846 1.477 0 1.846-1.23 1.846-1.846 0-.615-.37-1.846-1.846-1.846Z"})))},eyeClosed:function(e){return C.createElement("svg",Z({xmlns:"http://www.w3.org/2000/svg",width:16,height:16,fill:"none",stroke:"#686868"},e),E||(E=C.createElement("path",{d:"M14 8c-.278.361-.752.853-1.385 1.334M8 11v2m0-2a7.047 7.047 0 0 0 2.77-.586M8 11a7.047 7.047 0 0 1-2.77-.586M2 8c.278.361.752.853 1.385 1.334m7.384 1.08L11.692 12m-.923-1.586a8.725 8.725 0 0 0 1.846-1.08m0 0 .924 1.08m-8.308 0L4.308 12m.923-1.586a8.726 8.726 0 0 1-1.846-1.08m0 0-.923 1.08"})))},lock:function(e){return C.createElement("svg",G({xmlns:"http://www.w3.org/2000/svg",width:16,height:16,fill:"none",stroke:"#686868"},e),k||(k=C.createElement("path",{d:"M4.5 6.5h7v6h-7zM6 6.5C6 5.5 6.4 4 8 4s2 1.5 2 2.5"})))},cameraTop:function(e){return C.createElement("svg",L({xmlns:"http://www.w3.org/2000/svg",width:18,height:18,fill:"none",stroke:"#fff"},e),h||(h=C.createElement("path",{strokeDasharray:"2 1",d:"M.5.5h17v17H.5z"})),v||(v=C.createElement("path",{strokeWidth:2,d:"M0 1h18"})))},cameraPerspective:function(e){return C.createElement("svg",T({xmlns:"http://www.w3.org/2000/svg",width:22,height:21,fill:"none"},e),f||(f=C.createElement("path",{stroke:"#fff",d:"m1 4.333 11.111 3.334L21 4.333"})),m||(m=C.createElement("path",{stroke:"#fff",strokeDasharray:"2 1",d:"m1 16.556 11.111 3.333L21 16.556M21 4.333 9.889 1 1 4.333M1 4.333v12.223M21 4.333v12.223"})),g||(g=C.createElement("path",{stroke:"#fff",d:"M12.111 7.667v12.222"})))},viewAll:function(e){return C.createElement("svg",R({xmlns:"http://www.w3.org/2000/svg",width:20,height:18,fill:"none",stroke:"#fff"},e),_||(_=C.createElement("path",{d:"M5 1H1v16h4M15 17h4V1h-4"})),w||(w=C.createElement("path",{d:"M12.5 3.5h3v3h-3zM4.5 11.5h3v3h-3zM14 10.879 16.12 13 14 15.122 11.878 13z"})))},viewCenter:function(e){return C.createElement("svg",U({xmlns:"http://www.w3.org/2000/svg",width:20,height:18,fill:"none"},e),b||(b=C.createElement("path",{stroke:"#fff",d:"M5 1H1v16h4M15 17h4V1h-4M10 12V6M7 9h6"})))},tick:K,sceneEnv:function(e){return C.createElement("svg",Y({xmlns:"http://www.w3.org/2000/svg",width:24,height:18,fill:"none"},e),S||(S=C.createElement("path",{stroke:"#fff",d:"M13.111 16.833 2 13.5l9-3.5 11 3.5-8.889 3.333Z"})),I||(I=C.createElement("path",{stroke:"#fff",strokeDasharray:"1 1",d:"M3.028 14S2.03 1 12 1c9.97 0 8.972 13 8.972 13"})))},temp:K}},2722:function(e,t,n){"use strict";n.d(t,{A2:function(){return u},mO:function(){return d.m},aU:function(){return s},po:function(){return o}}),(l=s||(s={})).LINE="line",l.PLINE="pLine",l.POLYGON="polygon",l.SELECTOR="selector",l.EDITOR="editor",l.INSPECTOR="inspector",l.CLEANER="cleaner";var r,i,a,l,s,c,o,u,d=n(1639);(r=c||(c={}))[r.init=0]="init",r[r.borders=2]="borders",r[r.streets=3]="streets",r[r.blocks=4]="blocks",r[r.buildings=5]="buildings",(i=o||(o={})).GRID_VIS="grid_vis",i.GRID_SIZE="grid_size",i.GRID_COLOR="grid_color",i.GRID_DIST="grid_dist",i.AXIS_VIS="axis-vis",i.SUN_POS="sun_pos",i.SUN_INTENSITY="sun_intensity",i.SKY_COLOR="sky_color",(a=u||(u={})).PERSPECTIVE="perspective",a.TOP="top"},1639:function(e,t,n){"use strict";var r,i;n.d(t,{m:function(){return r}}),(i=r||(r={})).SNAP_GRID="snap_grid",i.SNAP_ANGLE="snap_angle",i.SNAP_STEP="snap_step"},8132:function(e,t,n){"use strict";n.d(t,{pS:function(){return _},Zb:function(){return y},Kj:function(){return G},Fo:function(){return H},dJ:function(){return O},JO:function(){return g},Ph:function(){return P},O:function(){return N},pA:function(){return T}});var r=n(5766),i=n(2253),a=n(4932),l=n(7702),s=n(5893),c=n(7294),o=n(4184),u=n.n(o),d=n(4107),p=n.n(d),h=function(e){var t=e.children,n=e.className,c=e.heightConfiguration,o=void 0===c?"spilled":c,d=(0,l._)(e,["children","className","heightConfiguration"]);return(0,s.jsx)("button",(0,a._)((0,i._)({className:u()(n,p().btn,(0,r._)({},p().spilled,"spilled"===o))},d),{children:t}))},v=n(1794),f=n.n(v),m=n(1510),g=function(e){var t=e.className,n=e.name,r=e.size,i=void 0===r?24:r;e.fill;var a=m.u[n];return(0,s.jsx)(a,{className:t,width:i,height:i,viewBox:"0 0 ".concat(i," ").concat(i)})},_=function(e){e.children;var t,n=e.className,c=e.iconKey,o=e.btnName,d=e.isExpandable,p=void 0!==d&&d,v=e.isSelected,m=void 0!==v&&v,_=e.isActive,w=(0,l._)(e,["children","className","iconKey","btnName","isExpandable","isSelected","isActive"]);return(0,s.jsxs)(h,(0,a._)((0,i._)({className:u()(n,f().btnBar,(t={},(0,r._)(t,f().expandable,p),(0,r._)(t,f().active,_),(0,r._)(t,f().selected,m),t)),heightConfiguration:"spilled"},w),{children:[o&&(0,s.jsx)("span",{className:f().main,children:o}),c&&(0,s.jsx)("span",{className:f().main,children:(0,s.jsx)(g,{name:c})}),p&&(0,s.jsx)("span",{className:f().arrow,children:(0,s.jsx)(g,{name:"arrowHead",size:8})})]}))},w=n(7744),b=n.n(w),y=function(e){var t=e.children,n=e.className,c=e.colorVariant,o=void 0===c?"black":c,d=(0,l._)(e,["children","className","colorVariant"]);return(0,s.jsx)("div",(0,a._)((0,i._)({className:u()(b().card,n,(0,r._)({},b().white,"white"===o))},d),{children:t}))},x=n(8354),j=n.n(x),O=function(e){var t=e.children,n=e.header;return(0,l._)(e,["children","header"]),(0,s.jsxs)("div",{className:j().division,children:[(0,s.jsx)("div",{className:j().header,children:n}),(0,s.jsx)("div",{className:j().content,children:t})]})},E=n(5219),k=n.n(E),N=function(e){var t=e.children,n=e.header,r=(0,l._)(e,["children","header"]);return(0,s.jsxs)("div",(0,a._)((0,i._)({className:k().panelDivision},r),{children:[(0,s.jsx)("div",{className:k().header,children:n&&n}),(0,s.jsx)("div",{className:k().content,children:t})]}))},S=n(8219),I=n.n(S),C=function(e){var t=e.minVal,n=e.maxVal,a=e.stepVal,c=e.val,o=e.onSliderChange,d=e.onSliderChanged,p=e.variant,h=(0,l._)(e,["minVal","maxVal","stepVal","val","onSliderChange","onSliderChanged","variant"]);return(0,s.jsx)("input",(0,i._)({className:u()(I().slider,(0,r._)({},I().dark,"dark"===p)),type:"range",min:t,max:n,step:a,value:c,onChange:function(e){return o(e)},onMouseUp:d?function(e){return d(e)}:function(){}},h))},M=n(550),A=n.n(M),P=function(e){var t,n=e.title,c=e.isChecked,o=e.icon,d=e.children,p=e.disabled,h=(0,l._)(e,["title","isChecked","icon","children","disabled"]);return(0,s.jsxs)("div",(0,a._)((0,i._)({className:u()(A().listItemCheck,(t={},(0,r._)(t,A().bold,!o),(0,r._)(t,A().disabled,p),t))},h),{children:[(0,s.jsx)("span",{className:A().check,children:c&&(0,s.jsx)(g,{name:"tick",size:8})}),o&&(0,s.jsx)("span",{className:A().icon,children:(0,s.jsx)(g,{name:o})}),(0,s.jsx)("span",{className:A().title,children:n}),d&&(0,s.jsx)("span",{className:A().content,children:d})]}))},V=n(1309),D=n(7514),L=n.n(D),T=function(e){return function(t){var n=t.wrapped,r=t.contentClickType,o=void 0===r?"regular":r,u=(0,l._)(t,["wrapped","contentClickType"]),d=(0,V._)((0,c.useState)(!1),2),p=d[0],h=d[1],v=(0,c.useRef)(null),f=(0,c.useRef)(null),m=(0,V._)((0,c.useState)({x:0,y:0}),2),g=m[0],_=m[1],w=function(){if(!p&&v.current){var e=v.current.getBoundingClientRect();_(function(t){return(0,a._)((0,i._)({},t),{x:e.left,y:e.bottom})})}h(!p)},b=(0,c.useCallback)(function(e){var t=e.target;v.current&&v.current.contains(t)||(f.current&&f.current.contains(t)?"regular"===o&&h(!1):h(!1))},[]),y=(0,c.useCallback)(function(e){"Escape"===e.key&&h(!1)},[]);return(0,c.useEffect)(function(){p?(window.addEventListener("click",b),window.addEventListener("keydown",y)):(window.removeEventListener("click",b),window.removeEventListener("keydown",y))},[b,y,p]),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("span",{onClick:function(){return w()},ref:v,children:(0,s.jsx)(e,(0,i._)({isOpened:p},u))}),p&&(0,s.jsx)("span",{className:L().list,style:{left:"".concat(g.x,"px"),top:"".concat(g.y,"px")},ref:f,children:n})]})}},R=n(2082),U=n.n(R),H=function(e){var t=e.minVal,n=e.maxVal,i=e.stepVal,a=e.val,c=(e.uiItemId,e.valName),o=e.onSliderChange,d=e.onSliderChanged,p=e.variant,h=void 0===p?"default":p,v=e.disabled;return(0,l._)(e,["minVal","maxVal","stepVal","val","uiItemId","valName","onSliderChange","onSliderChanged","variant","disabled"]),(0,s.jsxs)("div",{className:u()(U().complexSlider,(0,r._)({},U().dark,"dark"===h)),children:[(0,s.jsx)("span",{className:U().value,children:a}),(0,s.jsx)("span",{className:U().slider,children:(0,s.jsx)(C,{minVal:t,maxVal:n,stepVal:i,val:a,onSliderChange:o,onSliderChanged:d,variant:h,disabled:v})}),c&&(0,s.jsx)("span",{className:U().valName,children:c})]})},z=n(3050),Z=n.n(z),G=(0,n(6670).Pi)(function(e){var t=e.items,n=e.selected,c=e.handleCollectionUpd,o=(0,l._)(e,["items","selected","handleCollectionUpd"]),d=[],p=!0,h=!1,v=void 0;try{for(var f,m=n[Symbol.iterator]();!(p=(f=m.next()).done);p=!0){var g=f.value,_=!0,w=!1,b=void 0;try{for(var y,x=t[Symbol.iterator]();!(_=(y=x.next()).done);_=!0){var j=y.value;j%g==0&&j>g&&!n.includes(j)&&d.push(j)}}catch(e){w=!0,b=e}finally{try{_||null==x.return||x.return()}finally{if(w)throw b}}}}catch(e){h=!0,v=e}finally{try{p||null==m.return||m.return()}finally{if(h)throw v}}var O=function(e){console.log("upd collect","item",e),c(e)};return(0,s.jsx)("div",(0,a._)((0,i._)({className:Z().checkMatrix},o),{children:t.map(function(e,t){var i;return(0,s.jsx)("span",{onClick:function(){return O(e)},className:u()(Z().item,(i={},(0,r._)(i,Z().closed,d.includes(e)),(0,r._)(i,Z().selected,n.includes(e)),i)),children:e},t)})}))})},1783:function(e,t,n){"use strict";n.d(t,{s:function(){return s}});var r=n(5893);n(7294);var i=n(9436),a=n(6670),l=n(8132),s=(0,a.Pi)(function(e){var t=e.menuType,n="drawing"===t?i.T0.instruments.filter(function(e){return"draw"===e.type}):i.zl.helpers;return(0,r.jsx)(l.Zb,{children:"drawing"===t?(0,r.jsx)(function(){return(0,r.jsx)(r.Fragment,{children:n.map(function(e){return(0,r.jsx)(i.v7,{instrId:e.id},e.id)})})},{}):(0,r.jsx)(function(){return(0,r.jsx)(l.dJ,{header:"snapping",children:n.map(function(e){return(0,r.jsx)(i.zs,{helperId:e.id},e.id)})})},{})})})},4566:function(e){e.exports={objDataProp:"inspector_objDataProp__g6WDh",objDataProp__value:"inspector_objDataProp__value__TBh6n"}},1794:function(e){e.exports={btnBar:"btnBar_btnBar__ziJfg",arrow:"btnBar_arrow__Jr6HM",main:"btnBar_main__wzp9G",active:"btnBar_active__Wzb1e",selected:"btnBar_selected__g3_LG",expandable:"btnBar_expandable__X3eKQ"}},4107:function(e){e.exports={btn_spilled:"btn_btn_spilled__ATltN"}},7744:function(e){e.exports={card:"card_card__BKIYD",white:"card_white__jADja"}},3050:function(e){e.exports={checkMatrix:"checkMatrix_checkMatrix__k1rcu",item:"checkMatrix_item__viuIV",itemSelected:"checkMatrix_itemSelected__phfC4",itemClosed:"checkMatrix_itemClosed__7Y9D3"}},2082:function(e){e.exports={complexSlider:"complexSlider_complexSlider__kcC7t",dark:"complexSlider_dark__5sTyR",value:"complexSlider_value__Y7ztm",slider:"complexSlider_slider__f1rfH",valName:"complexSlider_valName__PSK2R"}},8354:function(e){e.exports={division:"division_division__leVFz",header:"division_header__38I3R"}},7514:function(e){e.exports={list:"dropDown_list__DjgGD",appear:"dropDown_appear__cpoJ4"}},550:function(e){e.exports={listItemCheck:"listItemCheck_listItemCheck__BPM2T",disabled:"listItemCheck_disabled__gOEWj",bold:"listItemCheck_bold__TnO3w",check:"listItemCheck_check__4bTf6",icon:"listItemCheck_icon__1umdm",title:"listItemCheck_title__NxnyH",content:"listItemCheck_content__05ntX"}},5219:function(e){e.exports={panelDivision:"panelDivision_panelDivision__Bn0Co",header:"panelDivision_header___rtwq"}},8219:function(e){e.exports={slider:"slider_slider__pzpna",dark:"slider_dark__vwQFd"}}}]);