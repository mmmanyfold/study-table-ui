(this["webpackJsonpsculpture-directory"]=this["webpackJsonpsculpture-directory"]||[]).push([[0],{183:function(e,t,n){},184:function(e,t,n){"use strict";n.r(t);var i=n(1),c=n.n(i),r=n(67),a=n.n(r),s=(n(73),n(8)),l=n(25),o=n(14),d=n(35),u=n.n(d),j=n(68),b=n(5),v=function(){var e=Object(i.useState)({width:void 0,height:void 0}),t=Object(b.a)(e,2),n=t[0],c=t[1];return Object(i.useEffect)((function(){function e(){c({width:window.innerWidth,height:window.innerHeight})}return window.addEventListener("resize",e),e(),function(){return window.removeEventListener("resize",e)}}),[]),n},h=n(26),f=n.n(h),m=n(0),O=function(e){var t=e.item,n=e.mobile,i=e.selectedArtist,c=e.setSelectedArtist,r=e.getThumbnailStyle,a=(null===i||void 0===i?void 0:i.id)===t.id,s=r(n||!a,t),l=t.fields,o=l.Name,d=l.Info,u=l.Tags;return Object(m.jsx)("div",{className:"grid-item",children:Object(m.jsxs)("div",{onClick:function(){c(t)},className:"artist-card ".concat(a?"selected":""),children:[Object(m.jsxs)("div",{style:{position:"relative"},children:[Object(m.jsx)("div",{className:"artist-thumb",style:s,children:a&&!n&&Object(m.jsx)("div",{className:"artist-info",children:d?Object(m.jsx)(f.a,{linkTarget:"_blank",children:d}):Object(m.jsx)("p",{children:"No information at this time."})})}),a&&!n&&Object(m.jsx)("div",{role:"button",onClick:function(e){e.stopPropagation(),c(null)},className:"artist-return-btn",children:"\u2190"})]}),Object(m.jsxs)("div",{className:"artist-heading",children:[Object(m.jsx)("div",{className:"artist-name",children:o}),Object(m.jsx)("div",{className:"artist-tags",tabIndex:"0",children:null===u||void 0===u?void 0:u.map((function(e,t){return Object(m.jsx)("div",{className:"artist-tag",children:e},"".concat(e,"-").concat(t))}))})]})]})})},g=function(e){var t=e.artist,n=e.windowSize,i=e.setSelectedArtist,c=e.getThumbnailStyle;if(!t)return null;var r=t.fields,a=r.Name,s=r.Info,l=c(!0,t),d=n.height-64;return Object(m.jsxs)("div",{className:"artist-selected-mobile",style:{height:d},children:[Object(m.jsx)("div",{className:"artist-selected-return",role:"button",onClick:function(){i(null)},children:"\u2190 Back to Artists"}),Object(m.jsxs)("div",{className:"artist-selected-inner",children:[Object(m.jsx)("div",{style:Object(o.a)(Object(o.a)({},l),{},{height:.55*(d-32)})}),Object(m.jsxs)("div",{className:"artist-selected-info",children:[Object(m.jsx)("div",{className:"artist-selected-name",children:a}),s?Object(m.jsx)(f.a,{linkTarget:"_blank",children:s}):Object(m.jsx)("p",{children:"No information at this time."})]})]})]})};var x=function(e){var t=e.data,n=e.mobile,i=e.windowSize,c=e.selectedArtist,r=e.setSelectedArtist;return Object(m.jsxs)(m.Fragment,{children:[Object(m.jsxs)("div",{className:"grid",children:[null===t||void 0===t?void 0:t.map((function(e,t){return Object(m.jsx)(O,{item:e,mobile:n,selectedArtist:c,setSelectedArtist:r,getThumbnailStyle:p},"".concat(e.id,"-").concat(t))})),!t.length&&Object(m.jsx)("div",{className:"no-results",children:"No artists match your criteria."})]}),Object(m.jsx)("div",{className:"site-description",children:Object(m.jsxs)("div",{children:["This tagged directory of sculptors was developed by Gordon Hall as an open resource. To suggest an artist or an edit, please email"," ",Object(m.jsx)("a",{href:"mailto:gordonhall@vassar.edu",target:"_blank",rel:"noopener noreferrer",children:"gordonhall@vassar.edu"}),".",Object(m.jsx)("br",{}),"Website by"," ",Object(m.jsx)("a",{href:"https://mmmanyfold.com",target:"_blank",rel:"noopener noreferrer",children:"mmmanyfold"}),"."]})}),n&&Object(m.jsx)(g,{artist:c,setSelectedArtist:r,windowSize:i,getThumbnailStyle:p})]})},p=function(e,t){var n;if(!e)return null;var i=null===t||void 0===t||null===(n=t.fields)||void 0===n?void 0:n.Image;if(!(null===i||void 0===i?void 0:i.length))return{backgroundColor:"#f8f8f8"};var c=i[0].thumbnails.large.url;return{backgroundImage:"url(".concat(c,")"),backgroundSize:"contain",backgroundPosition:"center",backgroundRepeat:"no-repeat"}},w=n.p+"static/media/close-icon.7f549529.svg",N=function(e){var t=e.data,n=e.active,i=e.visible,c=e.windowSize,r=e.onSelect,a=e.onClear,s=n.length;return Object(m.jsxs)("div",{children:[i&&Object(m.jsx)("div",{className:"tags-header",children:s?Object(m.jsxs)("div",{role:"button",onClick:a,style:{cursor:"pointer"},children:["Clear all (",s,")",Object(m.jsx)("img",{src:w,alt:"X Icon",style:{marginLeft:"8px"}})]}):Object(m.jsx)("div",{children:"Tags"})}),Object(m.jsx)("div",{className:"tags-scrollview",style:{height:c.height,display:i?"block":"none"},tabIndex:"0",children:Object(m.jsx)("div",{className:"tags-container",children:t.map((function(e){return Object(m.jsxs)("div",{className:"tag-wrapper",children:[Object(m.jsx)("input",{type:"checkbox",id:e.id,name:"tag",value:y(e,n),style:{display:"none"}}),Object(m.jsx)("div",{htmlFor:e.id,onClick:function(){return r(e)},className:S(e,n),children:Object(m.jsx)("div",{children:e.name})})]},e.id)}))})})]})},y=function(e,t){return t.some((function(t){return t.id===e.id}))},S=function(e,t){var n="tag";return y(e,t)&&(n+=" selected"),n},C=function(e){var t=e.value,n=e.onChange,i=e.onClear,c=e.visible;return Object(m.jsxs)("div",{className:"search-container",style:c?null:{display:"none"},children:[Object(m.jsx)("input",{type:"text",value:t,onChange:function(e){return n(e.target.value)},placeholder:"Search",className:"search-input"}),i&&Object(m.jsx)("div",{role:"button",onClick:i,className:"search-clear-icon",children:Object(m.jsx)("img",{src:w,alt:"X Icon"})})]})},k=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"artists";return"artists"===t?e.sort((function(e,t){var n,i;return(null===(n=e.fields)||void 0===n?void 0:n.Name)>(null===(i=t.fields)||void 0===i?void 0:i.Name)?1:-1})):"tags"===t?e.sort((function(e,t){return e.name>t.name?1:-1})):void 0},T=function(e,t,n,i){var c,r=e.toLowerCase().trim(),a=r.split(" "),l=a.length>1,o=n.filter((function(e){return e.fields.Name.toLowerCase().includes(r)})),d=l?t.filter((function(e){return r.includes(e.name.toLowerCase())})):[];if(o.length&&l)c=[];else if(d.length)c=L(d,n);else if(l){var u=a.reduce((function(e,n){var i=t.filter((function(e){return n.includes(e.name.toLowerCase())}));return[].concat(Object(s.a)(e),Object(s.a)(i))}),[]);c=L(u,n)}else{c=t.filter((function(e){return e.name.toLowerCase().includes(r)})).reduce((function(e,t){return e.concat(i[t.name])}),[])}var j,b=(j=[].concat(Object(s.a)(c),Object(s.a)(o)),Object(s.a)(new Map(j.map((function(e){return[e.id,e]}))).values()));return k(b)},L=function(e,t){var n=e.length,i=t.reduce((function(t,i){var c=0;return e.forEach((function(e){var t;(null===(t=i.fields.Tags)||void 0===t?void 0:t.includes(e.name))&&c++})),c===n?[].concat(Object(s.a)(t),[i]):t}),[]);return k(i)};n(183);var A=function(){var e=Object(i.useState)(!0),t=Object(b.a)(e,2),n=t[0],c=t[1],r=Object(i.useState)(!1),a=Object(b.a)(r,2),d=a[0],h=a[1],f=Object(i.useState)([]),O=Object(b.a)(f,2),g=O[0],p=O[1],w=Object(i.useState)([]),y=Object(b.a)(w,2),S=y[0],A=y[1],E=Object(i.useState)([]),I=Object(b.a)(E,2),z=I[0],F=I[1],P=Object(i.useState)([]),_=Object(b.a)(P,2),B=_[0],D=_[1],H=Object(i.useState)(""),J=Object(b.a)(H,2),M=J[0],R=J[1],V=Object(i.useState)(null),W=Object(b.a)(V,2),X=W[0],G=W[1],q=Object(i.useRef)(null),K=Object(i.useState)(null),Q=Object(b.a)(K,2),U=Q[0],Y=Q[1],Z=v(),$=Z.width<=800,ee=Object(i.useState)(!1),te=Object(b.a)(ee,2),ne=te[0],ie=te[1],ce=!$||!ne;Object(i.useEffect)((function(){ae()}),[]),Object(i.useEffect)((function(){Z.width>800&&ie(!0)}),[Z]),Object(i.useEffect)((function(){var e,t=function(e){var t;Y(null===(t=e.target.documentElement)||void 0===t?void 0:t.scrollTop)};return null===q||void 0===q||null===(e=q.current)||void 0===e||e.addEventListener("scroll",t),function(){var e;return null===q||void 0===q||null===(e=q.current)||void 0===e?void 0:e.removeEventListener("scroll",t)}}),[U,q]);var re,ae=function(){var e=Object(j.a)(u.a.mark((function e(){var t,n,i,r,a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return h(!1),c(!0),e.prev=2,e.next=5,fetch("https://study-table-service-assets.s3.us-east-1.amazonaws.com/airtable.json");case 5:return t=e.sent,e.next=8,t.json();case 8:n=e.sent,i=n.tags,r=n.records,F(k(i,"tags")),a=k(r),p(a),A(a),e.next=20;break;case 17:e.prev=17,e.t0=e.catch(2),h(!0);case 20:return e.prev=20,c(!1),e.finish(20);case 23:case"end":return e.stop()}}),e,null,[[2,17,20,23]])})));return function(){return e.apply(this,arguments)}}(),se=z.reduce((function(e,t){var n=g.filter((function(e){var n,i;return null===(n=e.fields)||void 0===n||null===(i=n.Tags)||void 0===i?void 0:i.includes(t.name)}));return Object(o.a)(Object(o.a)({},e),{},Object(l.a)({},t.name,n))}),{}),le=function(e){if(D([]),R(e),e.length){var t=T(e,z,g,se);A(t)}else A(g)},oe=function(){return le("")},de=!X&&Object(m.jsxs)(m.Fragment,{children:[Object(m.jsxs)("div",{onClick:function(){return ie(!ne)},className:"tag-toggle-mobile",style:ne?{justifyContent:"flex-start",paddingLeft:"1em"}:{},children:[ne?"\u2190 View Artists":"+ View Tags",!ne&&!!B.length&&" (".concat(B.length,")")]}),Object(m.jsx)(C,{value:M,onChange:le,onClear:oe,visible:U<50&&!ne})]});return re=n?Object(m.jsx)("div",{className:"loading",children:Object(m.jsx)("div",{children:"Loading Artists..."})}):d?Object(m.jsx)("div",{className:"loading",children:Object(m.jsx)("div",{children:"Something went wrong. Please try reloading the page."})}):Object(m.jsxs)("div",{className:"main",children:[Object(m.jsx)(N,{data:z,active:B,onSelect:function(e){var t;if(R(""),t=B.some((function(t){return t.id===e.id}))?B.filter((function(t){return t.id!==e.id})):[].concat(Object(s.a)(B),[e]),D(t),t.length){var n=L(t,g);A(n)}else A(g)},onClear:function(){D([]),A(g)},visible:ne,windowSize:Z}),Object(m.jsx)("div",{ref:function(e){Y(null===e||void 0===e?void 0:e.scrollTop),q.current=e},className:"grid-scrollview",style:{height:$?Z.height-64:Z.height-84,display:ce?"flex":"none"},tabIndex:"0",children:Object(m.jsx)(x,{data:S,visible:ce,windowSize:Z,mobile:$,selectedArtist:X,setSelectedArtist:G})})]}),Object(m.jsxs)("div",{className:"app",children:[Object(m.jsx)("header",{children:Object(m.jsx)("h1",{children:"Sculpture.Directory"})}),Object(m.jsxs)("main",{children:[$?!n&&!d&&de:Object(m.jsx)(C,{visible:!0,value:M,onChange:le,onClear:oe}),re]})]})},E=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,185)).then((function(t){var n=t.getCLS,i=t.getFID,c=t.getFCP,r=t.getLCP,a=t.getTTFB;n(e),i(e),c(e),r(e),a(e)}))};a.a.render(Object(m.jsx)(c.a.StrictMode,{children:Object(m.jsx)(A,{})}),document.getElementById("root")),E()},73:function(e,t,n){}},[[184,1,2]]]);
//# sourceMappingURL=main.55073bad.chunk.js.map