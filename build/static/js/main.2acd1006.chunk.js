(this.webpackJsonpnotes=this.webpackJsonpnotes||[]).push([[0],{15:function(t,e,n){t.exports=n(39)},38:function(t,e,n){},39:function(t,e,n){"use strict";n.r(e);var a=n(0),r=n.n(a),o=n(14),c=n.n(o),u=n(4),i=n(2),l=function(t){var e=t.note,n=t.toggleImportance,a=e.important?"make not important":"make important";return r.a.createElement("li",{className:"note"},e.content,r.a.createElement("button",{onClick:n},a))},m=n(3),f=n.n(m),s=function(){return f.a.get("/api/notes").then((function(t){return t.data}))},p=function(t){return f.a.post("/api/notes",t).then((function(t){return t.data}))},d=function(t,e){return f.a.put("".concat("/api/notes","/").concat(t),e).then((function(t){return t.data}))},E=function(){return r.a.createElement("div",{style:{color:"green",fontStyle:"italic",fontSize:16}},r.a.createElement("br",null),r.a.createElement("em",null,"Note app, Department of Computer Science, University of Helsinki 2020"))},b=function(){var t=Object(a.useState)([]),e=Object(i.a)(t,2),n=e[0],o=e[1],c=Object(a.useState)(""),m=Object(i.a)(c,2),f=m[0],b=m[1],v=Object(a.useState)(!0),h=Object(i.a)(v,2),g=h[0],O=h[1],j=Object(a.useState)(null),S=Object(i.a)(j,2),k=S[0],y=S[1];Object(a.useEffect)((function(){s().then((function(t){o(t)}))}),[]);var w=g?n:n.filter((function(t){return t.important})),N=function(t){var e=t.message;return null===e?null:r.a.createElement("div",{className:"error"},e)};return r.a.createElement("div",null,r.a.createElement("h1",null,"Notes"),r.a.createElement(N,{message:k}),r.a.createElement("div",null,r.a.createElement("button",{onClick:function(){return O(!g)}},"show ",g?"important":"all")),r.a.createElement("ul",null,w.map((function(t,e){return r.a.createElement(l,{key:e,note:t,toggleImportance:function(){return function(t){var e=n.find((function(e){return e.id===t})),a=Object(u.a)(Object(u.a)({},e),{},{important:!e.important});d(t,a).then((function(e){o(n.map((function(n){return n.id!==t?n:e})))})).catch((function(a){y("Note '".concat(e.content," was already removed from the server")),setTimeout((function(){y(null)}),5e3),o(n.filter((function(e){return e.id!==t})))}))}(t.id)}})}))),r.a.createElement("form",{onSubmit:function(t){t.preventDefault();var e={content:f,date:(new Date).toISOString(),important:Math.random()>.5,id:n.length+1};p(e).then((function(t){o(n.concat(t))}))}},r.a.createElement("input",{value:f,onChange:function(t){b(t.target.value)}}),r.a.createElement("button",{type:"submit"},"save")),r.a.createElement(E,null))};n(38);c.a.render(r.a.createElement(b,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.2acd1006.chunk.js.map