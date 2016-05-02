var OmniFaces=OmniFaces||{};
OmniFaces.Util={addOnloadListener:function(n){if("complete"===document.readyState)setTimeout(n);else if(window.addEventListener)window.addEventListener("load",n,!1);else if(window.attachEvent)window.attachEvent("onload",n);else if("function"==typeof window.onload){var o=window.onload;window.onload=function(){o(),n()}}else window.onload=n},resolveFunction:function(n){return"function"!=typeof n&&(n=window[n]||function(){}),n}};
OmniFaces.Highlight=function(e){function n(){for(var n=e.getElementsByTagName("LABEL"),t={},a=0;a<n.length;a++){var r=n[a],l=r.htmlFor;l&&(t[l]=r)}return t}function t(n){var t=e.getElementById(n);if(!t){var a=e.getElementsByName(n);a&&a.length&&(t=a[0])}return t}var a={};return a.apply=function(e,a,r){for(var l=n(),i=0;i<e.length;i++){var m=t(e[i]);if(m){m.className+=" "+a;var c=l[m.id];c&&(c.className+=" "+a),r&&(m.focus(),r=!1)}}},a}(document);
OmniFaces.DeferredScript=function(e,n){function r(e){if(!(0>e||e>=t.length)){var o=t[e],c=n.createElement("script"),a=n.head||n.documentElement;c.async=!0,c.src=o.url,c.setAttribute("crossorigin","anonymous"),c.onerror=function(){o.error()},c.onload=c.onreadystatechange=function(n,t){(t||!c.readyState||/loaded|complete/.test(c.readyState))&&(c.onload=c.onreadystatechange=null,t?c.onerror():o.success(),c=null,r(e+1))},o.begin(),a.insertBefore(c,null)}}var t=[],o={};return o.add=function(n,o,c,a){t.push({url:n,begin:e.resolveFunction(o),success:e.resolveFunction(c),error:e.resolveFunction(a)}),1==t.length&&e.addOnloadListener(function(){r(0)})},o}(OmniFaces.Util,document);
OmniFaces.Unload=function(n,e){function t(){for(var n=0;n<e.forms.length;n++){var t=e.forms[n][i];if(t)return t.value}return null}function a(n,e,t){n.addEventListener?n.addEventListener(e,t,!1):n.attachEvent&&n.attachEvent("on"+e,t)}function o(n,e){var t=n[e];t&&(n[e]=function(){c.disable(),t.apply(this,arguments)})}var i="javax.faces.ViewState",r=!1,c={};return c.init=function(s){if(n.XMLHttpRequest){var u=t();u&&(a(n,"beforeunload",function(){if(r)return void(r=!1);try{var e=new XMLHttpRequest;e.open("POST",n.location.href.split(/[?#;]/)[0],!1),e.setRequestHeader("Content-type","application/x-www-form-urlencoded"),e.send("omnifaces.event=unload&id="+s+"&"+i+"="+encodeURIComponent(u))}catch(t){}}),a(e,"submit",function(){c.disable()}),n.mojarra?o(mojarra,"jsfcljs"):n.myfaces&&o(myfaces.oam,"submitForm"))}},c.disable=function(){r=!0},c}(window,document);
OmniFaces.Push=function(n,o){function e(n,o,e,t,i){var c,r,l=this;l.open=function(){c&&1==c.readyState||(c=new WebSocket(n),c.onopen=function(n){null==r&&e(o),r=0},c.onmessage=function(n){t(JSON.parse(n.data),o,n)},c.onclose=function(n){!c||1e3==n.code&&n.reason==u||1008==n.code||null==r||r>=s?i(n.code,o,n):setTimeout(l.open,a*r++)})},l.close=function(){if(c){var n=c;c=null,n.close()}}}function t(n){n=n||"";var e=n&&0!=n.indexOf("/")?0==n.indexOf(":")?o.location.hostname+n:n:o.location.host+n;return c+e+r+"/"}function i(n){var o=l[n];if(o)return o;throw new Error("Unknown channel: "+n)}var c=o.location.protocol.replace("http","ws")+"//",r="/omnifaces.push",a=500,s=25,u="Expired",l={},f={};return f.init=function(i,c,r,a,s,u){s=n.resolveFunction(s);var p=c.split(/\?/)[0];return o.WebSocket?(l[p]||(l[p]=new e(t(i)+c,p,n.resolveFunction(r),n.resolveFunction(a),s)),void(u&&f.open(p))):void s(-1,p)},f.open=function(n){i(n).open()},f.close=function(n){i(n).close()},f}(OmniFaces.Util,window);