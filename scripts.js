"use strict";

(function () {
  let i = 0;
  while (i < lst.length) {
    lst[i]["value"] = `V${i}`;
    i++;
  }
  let q = "<option>Select Options</option>";
  lst.forEach(function (v) {
    q = q + '<option value="' + v["value"] + '">' + v["name"] + "</option>";
  });
  document.getElementById("opc").innerHTML = q;
})();

document.getElementById("subm").addEventListener("click", function () {
  const val = document.getElementById("opc").value;
  const inp1 = document.getElementById("inp1");
  const inp2 = document.getElementById("inp2");
  lst.forEach((t) => {
    try {
      if (val === t["value"] && inp2.value && !inp1.value) {
        inp1.value = t["function"](inp2.value);
      } else if (val === t["value"] && !inp2.value && inp1.value) {
        inp2.value = t["function"](inp1.value);
      } else if (val === t["value"] && inp2.value && inp1.value) {
        try {
          inp2.value = t["function"](inp1.value);
        } catch (errr) {
          inp1.value = t["function"](inp2.value);
        }
      }
    } catch (err) {
      console.error(err);
    }
  });
});

document.getElementById("clear1").addEventListener("click", () => {
  document.getElementById("inp1").value = "";
});
document.getElementById("clear2").addEventListener("click", () => {
  document.getElementById("inp2").value = "";
});
document.getElementById("download1").addEventListener("click", () => {
  // source: https://javascript.info/blob
  const elm = document.getElementById("inp1");
  if (elm.value) {
    let link = document.createElement("a");
    link.download = prompt("Enter file name >>") + ".txt";
    let blob = new Blob([elm.value], { type: "text/plain" });
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
  }
});
document.getElementById("download2").addEventListener("click", () => {
  const elm = document.getElementById("inp2");
  if (elm.value) {
    let link = document.createElement("a");
    link.download = prompt("Enter file name >>") + ".txt";
    let blob = new Blob([elm.value], { type: "text/plain" });
    link.href = URL.createObjectURL(blob);
    link.click();
    URL.revokeObjectURL(link.href);
  }
});

async function copy(_elm_) {
  let text = typeof _elm_ === "object" ? _elm_.value : _elm_;
  let result_ = false;
  try {
    if (_elm_.value) {
      await navigator.permissions
        .query({ name: "clipboard-write" })
        .then(async function (result) {
          if (result.state === "granted" || result.state === "prompt") {
            await navigator.clipboard.writeText(text).then(
              () => {
                result_ = true;
              },
              () => {
                result_ = false;
              }
            );
          }
        });
    }
  } catch (err) {
    if (_elm_.value) {
      try {
        await _elm_.select();
        await document.execCommand("copy");
        result_ = true;
        if (window.getSelection) {
          window.getSelection().removeAllRanges();
        } else if (document.selection) {
          document.selection.empty();
        }
      } catch (err1) {}
    }
  }
  return Promise.resolve(result_);
}

function cpxx(w, x) {
  copy(x).then((a) => {
    if (a) {
      w.innerHTML = "copied";
      setTimeout(() => {
        w.innerHTML = "copy";
      }, 1500);
    }
  });
}

document.getElementById("copy1").addEventListener("click", () => {
  cpxx(document.getElementById("copy1"), document.getElementById("inp1"));
});
document.getElementById("copy2").addEventListener("click", () => {
  cpxx(document.getElementById("copy2"), document.getElementById("inp2"));
});

async function paste() {
  let _text_;
  let result_ = false;
  await navigator.clipboard
    .readText()
    .then((text) => {
      _text_ = text;
      result_ = true;
    })
    .catch((err) => {
      console.log("Something went wrong", err);
    });
  if (result_) {
    return Promise.resolve(_text_);
  }
}

document.getElementById("paste1").addEventListener("click", () => {
  paste().then((txt) => {
    if (txt) {
      document.getElementById("inp1").value = txt;
    }
  });
});

document.getElementById("file1").addEventListener("click", () => {
  let setFile = document.getElementById("popDsp");
  let compStyles = window.getComputedStyle(setFile);
  if (/none/i.test(compStyles.getPropertyValue("display"))) {
    setFile.className = "file1";
    setFile.style.display = "block";
  } else {
    setFile.style.display = "none";
  }
});

document.getElementById("pop1").addEventListener("click", () => {
  document.getElementById("popDsp").style.display = "none";
});

document.getElementById("setFile1").addEventListener("change", function () {
  if (this.files && this.files[0]) {
    const myFile = this.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", function (e) {
      document.getElementById("inp1").value = e.target.result;
      document.getElementById("popDsp").style.display = "none";
    });

    reader.readAsBinaryString(myFile);
  }
});
