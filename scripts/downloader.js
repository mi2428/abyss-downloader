$(function(){
  'use strict';

  // Note: Synchronous XMLHttpRequest on the main thread is deprecated.
  // https://xhr.spec.whatwg.org/
  function request(url, reg) {
    let res;
    $.ajax(url, { async: false }).done((body) => {
      res = body.match(reg);
    });
    if (!res) return [];
    return res;
  }

  function getImageUrls(pageurl) {
    let urls = [];
    const match = /https:\/\/images\d+\.alphacoders\.com\/\d+\/thumb-\d+-\d+\.\w+/g;
    for (let url of request(pageurl, match)) {
      urls.push(url.replace(/thumb-\d+-/g, ""));
    }
    return urls;
  }

  function downloadAll(baseurl) {
    let urls = [];
    const match = /Last Page \((\d+)\)/;
    const last = Number(request(baseurl, match)[1]);
    for (let p = 1; p <= last; p++) {
      const pageurl = baseurl + "&page=" + p;
      for (let url of getImageUrls(pageurl)) {
        urls.push(url);
      }
    }
    console.info(urls);
    for (let url of urls) {
      chrome.downloads.download({ url: url });
    }
  }

  chrome.runtime.onMessage.addListener((m) => {
    const baseurl = m.url.replace(/&page=\d+/, "");
    downloadAll(baseurl);
  });
});
