(function(document) {
  var metas = document.getElementsByTagName("meta");

  function changeViewportContent(content) {
    for (var i = 0; i < metas.length; i++) {
      if (metas[i].name === "viewport") {
        metas[i].content = content;
      }
    }
  }

  function initialize() {
    changeViewportContent("width=device-width, minimum-scale=1.0, maximum-scale=1.0");
  }

  function gestureStart() {
    changeViewportContent("width=device-width, minimum-scale=0.25, maximum-scale=1.6");
  }

  function gestureEnd() {
    initialize();
  }

  if (navigator.userAgent.match(/iPhone/i)) {
    initialize();
    document.addEventListener("touchstart", gestureStart, false);
    document.addEventListener("touchend", gestureEnd, false);
  }
})(document);

(function(document) {
  var icons = {
    "fa-moon": "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill='black' d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z'/></svg>",
    "fa-sun": "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><g fill='none' stroke='black' stroke-width='2' stroke-linecap='round'><circle cx='12' cy='12' r='4'/><path d='M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41'/></g></svg>",
    "fa-envelope": "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' d='M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z'/><path fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' d='m22 6-10 7L2 6'/></svg>",
    "fa-github": "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><path fill='black' d='M8 0C3.58 0 0 3.64 0 8.13c0 3.59 2.29 6.64 5.47 7.71.4.08.55-.18.55-.39 0-.2-.01-.85-.01-1.54-2.01.38-2.53-.5-2.69-.96-.09-.23-.48-.96-.82-1.15-.28-.15-.68-.53-.01-.54.63-.01 1.08.59 1.23.83.72 1.23 1.87.88 2.33.67.07-.53.28-.88.51-1.08-1.78-.21-3.64-.91-3.64-4.02 0-.89.31-1.62.82-2.19-.08-.21-.36-1.04.08-2.16 0 0 .67-.22 2.2.84A7.48 7.48 0 0 1 8 3.88c.68 0 1.36.09 2 .27 1.53-1.06 2.2-.84 2.2-.84.44 1.12.16 1.95.08 2.16.51.57.82 1.3.82 2.19 0 3.12-1.87 3.81-3.65 4.02.29.25.54.74.54 1.51 0 1.09-.01 1.97-.01 2.25 0 .22.15.47.55.39A8.08 8.08 0 0 0 16 8.13C16 3.64 12.42 0 8 0Z'/></svg>",
    "fa-linkedin-in": "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill='black' d='M6.94 8.5H3.56V19h3.38V8.5ZM5.25 3A1.96 1.96 0 1 0 5.25 6.92 1.96 1.96 0 0 0 5.25 3ZM20.44 13.04c0-3.16-1.69-4.63-3.94-4.63-1.82 0-2.63 1-3.09 1.7V8.5h-3.38c.04 1.07 0 10.5 0 10.5h3.38v-5.86c0-.31.02-.63.12-.85.25-.63.82-1.28 1.78-1.28 1.25 0 1.75.96 1.75 2.36V19h3.38v-5.96Z'/></svg>",
    "fa-file-pdf": "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z'/><path fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' d='M14 2v6h6M8 15h1.5a1.5 1.5 0 0 0 0-3H8v6M13 18v-6h1.5a3 3 0 0 1 0 6H13ZM19 12h-2v6'/></svg>"
  };

  var classNames = Object.keys(icons);
  var selectors = classNames.map(function(name) { return "." + name; }).join(",");
  var beforeSelectors = classNames.map(function(name) { return "." + name + "::before"; }).join(",");
  var css = selectors + "{display:inline-block!important;width:1em;height:1em;flex:0 0 auto;background-color:currentColor!important;vertical-align:-0.125em;}";
  css += beforeSelectors + "{content:''!important;display:none!important;}";

  classNames.forEach(function(name) {
    var uri = "url(\"data:image/svg+xml," + encodeURIComponent(icons[name]) + "\")";
    css += "." + name + "{-webkit-mask-image:" + uri + "!important;mask-image:" + uri + "!important;-webkit-mask-repeat:no-repeat!important;mask-repeat:no-repeat!important;-webkit-mask-position:center!important;mask-position:center!important;-webkit-mask-size:contain!important;mask-size:contain!important;}";
  });

  var style = document.createElement("style");
  style.id = "local-icon-fallback";
  style.textContent = css;
  document.head.appendChild(style);
})(document);
