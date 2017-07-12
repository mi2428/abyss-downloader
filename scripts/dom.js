$(function(){
  'use strict';

  const s = $("a:contains('Finding Wallpapers')");
  if (s.length) {
    const d = $("<a></a>", {
      id: "abyss-downloader",
      class: "btn btn-success",
      style: "margin-top: 3px;",
      text: " Download All Wallpapers"
    });
    d.prepend($("<span></span>", {
      class: "glyphicon glyphicon-download-alt"
    }));
    d.click(() => {
      chrome.runtime.sendMessage({ url: document.location.href });
    });
    s.parent().append(d);
  }
});
