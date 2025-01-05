"use strict";

const lst = [
  {
    name: "URL Encode",
    function: function (a) {
      return encodeURIComponent(a);
    },
  },
  {
    name: "URL Decode",
    function: function (a) {
      return decodeURIComponent(a);
    },
  },
  {
    name: "Base64 Encode",
    function: function (str) {
      return window.btoa(unescape(encodeURIComponent(str)));
    },
  },
  {
    name: "Base64 Decode",
    function: function (str) {
      return decodeURIComponent(escape(window.atob(str)));
    },
  },
];

lst.push({
  name: "Unicode Encode",
  function: function (theString) {
    let unicodeString = "";
    for (let i = 0; i < theString.length; i++) {
      let theUnicode = theString.charCodeAt(i).toString(16).toUpperCase();
      while (theUnicode.length < 4) {
        theUnicode = "0" + theUnicode;
      }
      theUnicode = "\\u" + theUnicode;
      unicodeString += theUnicode;
    }

    return unicodeString;
  },
});

lst.push({
  name: "Unicode Decode",
  function: function (text) {
    return text.replace(/\\u[\dA-F]{4}/gi, function (match) {
      return String.fromCharCode(parseInt(match.replace(/\\u/g, ""), 16));
    });
  },
});
