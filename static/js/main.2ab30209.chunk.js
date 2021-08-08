(this["webpackJsonpstudy-table-ui"]=this["webpackJsonpstudy-table-ui"]||[]).push([[0],{183:function(e,t,n){},184:function(e,t,n){"use strict";n.r(t);var i=n(1),c=n.n(i),a=n(67),r=n.n(a),s=(n(73),n(11)),l=n(25),o=n(14),d=n(34),u=n.n(d),j=n(68),b=n(5),v=function(){var e=Object(i.useState)({width:void 0,height:void 0}),t=Object(b.a)(e,2),n=t[0],c=t[1];return Object(i.useEffect)((function(){function e(){c({width:window.innerWidth,height:window.innerHeight})}return window.addEventListener("resize",e),e(),function(){return window.removeEventListener("resize",e)}}),[]),n},f=n(35),h=n.n(f),O=n(0);var m=function(e){var t=e.data,n=e.visible,c=e.mobile,a=e.windowSize,r=Object(i.useState)(null),s=Object(b.a)(r,2),l=s[0],o=s[1],d=function(e){o(e)};return Object(O.jsxs)("div",{className:"grid-scrollview",style:n?null:{display:"none"},children:[Object(O.jsxs)("div",{className:"grid",children:[null===t||void 0===t?void 0:t.map((function(e,t){return Object(O.jsx)(g,{item:e,mobile:c,onMobileSelect:d},"".concat(e.id,"-").concat(t))})),!t.length&&Object(O.jsx)("div",{className:"no-results",children:"No artists match your criteria."})]}),Object(O.jsx)(x,{artist:l,windowSize:a,onReturn:function(){o(null)}})]})},g=function(e){var t=e.item,n=e.mobile,c=e.onMobileSelect,a=Object(i.useState)(!1),r=Object(b.a)(a,2),s=r[0],l=r[1],o=p(n||!s,t),d=t.fields,u=d.Name,j=d.Info,v=d.Tags;return Object(O.jsx)("div",{className:"grid-item",children:Object(O.jsxs)("div",{onClick:function(){n?c(t):l(t)},className:"artist-card ".concat(s?"selected":""),children:[Object(O.jsxs)("div",{style:{position:"relative"},children:[Object(O.jsx)("div",{className:"artist-thumb",style:o,children:s&&!n&&Object(O.jsx)("div",{className:"artist-info",children:j?Object(O.jsx)(h.a,{linkTarget:"_blank",children:j}):Object(O.jsx)("p",{children:"No information at this time."})})}),s&&!n&&Object(O.jsx)("div",{role:"button",onClick:function(e){e.stopPropagation(),l(null)},className:"artist-return-btn",children:"\u2190"})]}),Object(O.jsxs)("div",{className:"artist-heading",children:[Object(O.jsx)("div",{className:"artist-name",children:u}),Object(O.jsx)("div",{className:"artist-tags",children:null===v||void 0===v?void 0:v.map((function(e,t){return Object(O.jsx)("div",{className:"artist-tag",children:e},"".concat(e,"-").concat(t))}))})]})]})})},x=function(e){var t=e.artist,n=e.windowSize,i=e.onReturn;if(!t)return null;var c=t.fields,a=c.Name,r=c.Info,s=p(!0,t),l=n.height-100;return Object(O.jsxs)("div",{className:"artist-mobile-view",style:{height:l},children:[Object(O.jsx)("div",{className:"artist-mobile-return",role:"button",onClick:i,children:"\u2190 Back to Artists"}),Object(O.jsxs)("div",{className:"artist-mobile-card",children:[Object(O.jsx)("div",{style:Object(o.a)(Object(o.a)({},s),{},{height:.5*(l-32)})}),Object(O.jsxs)("div",{className:"artist-mobile-info",children:[Object(O.jsx)("div",{className:"artist-mobile-name",children:a}),r?Object(O.jsx)(h.a,{linkTarget:"_blank",children:r}):Object(O.jsx)("p",{children:"No information at this time."})]})]})]})},p=function(e,t){var n;if(!e)return null;var i=null===t||void 0===t||null===(n=t.fields)||void 0===n?void 0:n.Image;if(!(null===i||void 0===i?void 0:i.length))return{backgroundColor:"#f8f8f8"};var c=i[0].thumbnails.large.url;return{backgroundImage:"url(".concat(c,")"),backgroundSize:"contain",backgroundPosition:"center",backgroundRepeat:"no-repeat"}},w=n.p+"static/media/close-icon.7f549529.svg",N=function(e){var t=e.data,n=e.active,i=e.visible,c=e.windowSize,a=e.onSelect,r=e.onClear,s=n.length;return Object(O.jsxs)("div",{children:[i&&Object(O.jsx)("div",{className:"filters-header",children:s?Object(O.jsxs)("div",{role:"button",onClick:r,style:{cursor:"pointer"},children:["Clear all (",s,")",Object(O.jsx)("img",{src:w,alt:"X Icon",style:{marginLeft:"8px"}})]}):Object(O.jsx)("div",{children:"Tags"})}),Object(O.jsx)("div",{className:"filters-scrollview",style:{height:c.height,display:i?"block":"none"},children:Object(O.jsx)("div",{className:"filters-container",children:t.map((function(e){return Object(O.jsxs)("div",{className:"tag-wrapper",children:[Object(O.jsx)("input",{type:"checkbox",id:e.id,name:"tag",value:S(e,n),style:{display:"none"}}),Object(O.jsx)("div",{htmlFor:e.id,onClick:function(){return a(e)},className:C(e,n),children:Object(O.jsx)("div",{children:e.name})})]},e.id)}))})})]})},S=function(e,t){return t.some((function(t){return t.id===e.id}))},C=function(e,t){var n="tag";return S(e,t)&&(n+=" selected"),n},k=function(e){var t=e.value,n=e.onChange,i=e.onClear;return Object(O.jsxs)("div",{className:"search-container",children:[Object(O.jsx)("input",{type:"text",value:t,onChange:function(e){return n(e.target.value)},placeholder:"Search",className:"search-input"}),i&&Object(O.jsx)("div",{role:"button",onClick:i,className:"search-clear-icon",children:Object(O.jsx)("img",{src:w,alt:"X Icon"})})]})};n(183);var y=function(){var e=Object(i.useState)(!0),t=Object(b.a)(e,2),n=t[0],c=t[1],a=Object(i.useState)(!1),r=Object(b.a)(a,2),d=r[0],f=r[1],h=Object(i.useState)([]),g=Object(b.a)(h,2),x=g[0],p=g[1],w=Object(i.useState)([]),S=Object(b.a)(w,2),C=S[0],y=S[1],I=Object(i.useState)([]),E=Object(b.a)(I,2),F=E[0],P=E[1],M=Object(i.useState)([]),A=Object(b.a)(M,2),B=A[0],R=A[1],J=Object(i.useState)(""),V=Object(b.a)(J,2),X=V[0],_=V[1],D=v(),H=D.width<=800,W=Object(i.useState)(!1),q=Object(b.a)(W,2),G=q[0],K=q[1],Q=!H||!G;Object(i.useEffect)((function(){Y()}),[]),Object(i.useEffect)((function(){D.width>800&&K(!0)}),[D]);var U,Y=function(){var e=Object(j.a)(u.a.mark((function e(){var t,n,i,a,r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return f(!1),c(!0),e.prev=2,e.next=5,fetch("https://study-table-service-assets.s3.us-east-1.amazonaws.com/airtable.json");case 5:return t=e.sent,e.next=8,t.json();case 8:n=e.sent,i=n.tags,a=n.records,P(L(i,"tags")),r=L(a),p(r),y(r),e.next=20;break;case 17:e.prev=17,e.t0=e.catch(2),f(!0);case 20:return e.prev=20,c(!1),e.finish(20);case 23:case"end":return e.stop()}}),e,null,[[2,17,20,23]])})));return function(){return e.apply(this,arguments)}}(),Z=F.reduce((function(e,t){var n=x.filter((function(e){var n,i;return null===(n=e.fields)||void 0===n||null===(i=n.Tags)||void 0===i?void 0:i.includes(t.name)}));return Object(o.a)(Object(o.a)({},e),{},Object(l.a)({},t.name,n))}),{}),$=function(e){if(R([]),_(e),e.length){var t=z(e,F,x,Z);y(t)}else y(x)},ee=Object(O.jsxs)(O.Fragment,{children:[Object(O.jsxs)("div",{onClick:function(){return K(!G)},className:"mobile-filter-toggle",style:G?{justifyContent:"flex-start",paddingLeft:"1em"}:{},children:[G?"\u2190 View Artists":"+ View Tags",!G&&!!B.length&&" (".concat(B.length,")")]}),!G&&Object(O.jsx)(k,{value:X,onChange:_})]});return U=n?Object(O.jsx)("div",{className:"loading",children:Object(O.jsx)("div",{children:"Loading Artists..."})}):d?Object(O.jsx)("div",{className:"loading",children:Object(O.jsx)("div",{children:"Something went wrong. Please try reloading the page."})}):Object(O.jsxs)("div",{className:"main",children:[Object(O.jsx)(N,{data:F,active:B,onSelect:function(e){var t;if(_(""),t=B.some((function(t){return t.id===e.id}))?B.filter((function(t){return t.id!==e.id})):[].concat(Object(s.a)(B),[e]),R(t),t.length){var n=T(t,x);y(n)}else y(x)},onClear:function(){return R([])},visible:G,windowSize:D}),Object(O.jsx)(m,{data:C,visible:Q,windowSize:D,mobile:H})]}),Object(O.jsxs)("div",{className:"app",children:[H?!n&&!d&&ee:Object(O.jsx)(k,{value:X,onChange:$,onClear:function(){return $("")}}),U]})},L=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"artists";return"artists"===t?e.sort((function(e,t){var n,i;return(null===(n=e.fields)||void 0===n?void 0:n.Name)>(null===(i=t.fields)||void 0===i?void 0:i.Name)?1:-1})):"tags"===t?e.sort((function(e,t){return e.name>t.name?1:-1})):void 0},z=function(e,t,n,i){var c,a=e.toLowerCase().trim(),r=a.split(" "),l=r.length>1,o=n.filter((function(e){return e.fields.Name.toLowerCase().includes(a)}));if(o.length&&l)c=[];else if(l){var d=r.reduce((function(e,n){var i=t.filter((function(e){return n.includes(e.name.toLowerCase())}));return[].concat(Object(s.a)(e),Object(s.a)(i))}),[]);c=T(d,n)}else{c=t.filter((function(e){return e.name.toLowerCase().includes(a)})).reduce((function(e,t){return e.concat(i[t.name])}),[])}var u,j=(u=[].concat(Object(s.a)(c),Object(s.a)(o)),Object(s.a)(new Map(u.map((function(e){return[e.id,e]}))).values()));return L(j)},T=function(e,t){var n=e.length,i=t.reduce((function(t,i){var c=0;return e.forEach((function(e){var t;(null===(t=i.fields.Tags)||void 0===t?void 0:t.includes(e.name))&&c++})),c===n?[].concat(Object(s.a)(t),[i]):t}),[]);return L(i)},I=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,185)).then((function(t){var n=t.getCLS,i=t.getFID,c=t.getFCP,a=t.getLCP,r=t.getTTFB;n(e),i(e),c(e),a(e),r(e)}))};r.a.render(Object(O.jsx)(c.a.StrictMode,{children:Object(O.jsx)(y,{})}),document.getElementById("root")),I()},73:function(e,t,n){}},[[184,1,2]]]);
//# sourceMappingURL=main.2ab30209.chunk.js.map