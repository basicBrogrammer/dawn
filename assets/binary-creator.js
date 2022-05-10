String.prototype.toBinary = function () {
  return this.replace(/ /g, "")
    .split("")
    .map(function (letter) {
      return "0" + letter.charCodeAt(0).toString(2);
    })
    .join("");
};

import { Application, Controller } from "https://unpkg.com/@hotwired/stimulus/dist/stimulus.js";
window.Stimulus = Application.start();
Stimulus.register(
  "binary-creator",
  class extends Controller {
    static targets = ["compiled"];

    compile(event) {
      console.log("compiling...");
      // let binary = 'ruby'.toBinary();
      let binary = event.target.value.toBinary();
      let dems = this.demensions(binary.length);
      debugger;
      this.compiledTarget.className = this.initContainerClass;
      this.compiledTarget.innerHTML = null;
      if (dems[1] <= 4) {
        this.compiledTarget.style["font-size"] = "4rem";
      } else if (dems[1] <= 6) {
        this.compiledTarget.style["font-size"] = "3.5rem";
      } else if (dems[1] === 7) {
        this.compiledTarget.style["font-size"] = "3rem";
      } else {
        this.compiledTarget.style["font-size"] = "2.5rem";
      }
      binary.split("").forEach((char) => {
        let newSpan = document.createElement("span");
        let newContent = document.createTextNode(char);
        newSpan.appendChild(newContent);
        this.compiledTarget.appendChild(newSpan);
      });
      this.compiledTarget.style["height"] = this.compiledTarget.offsetWidth + "px";
      this.compiledTarget.classList.add(`grid-cols-${dems[0]}`);
    }

    setBackgroundColor(event) {
      this.compiledTarget.style["background-color"] = event.target.value;
    }

    setFontColor(event) {
      this.compiledTarget.style["color"] = event.target.value;
    }

    get initContainerClass() {
      return "border border-sky-500 sm:w-5/6 md:w-3/4 md:mx-auto grid gap-4";
    }

    demensions(binaryLength) {
      return {
        88: [12, 8],
        88: [11, 8],
        80: [10, 8],
        72: [9, 8],
        64: [8, 8],
        56: [8, 7],
        48: [8, 6],
        40: [8, 5],
        32: [8, 4],
        24: [6, 4],
        16: [4, 4],
      }[binaryLength];
    }
  }
);

// if item already exists go to that item
// else generate PNG
