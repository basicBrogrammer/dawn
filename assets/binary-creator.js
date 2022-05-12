String.prototype.toBinary = function () {
  return this.replace(/ /g, "")
    .split("")
    .map(function (letter) {
      return "0" + letter.charCodeAt(0).toString(2);
    })
    .join("");
};

import { Application, Controller } from "https://unpkg.com/@hotwired/stimulus/dist/stimulus.js";
import { toPng } from "https://unpkg.com/html-to-image@1.9.0/es/index.js";
// Example POST method implementation:
async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'no-cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}


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

Stimulus.register(
  "binary-form",
  class extends Controller {
    static targets = ["color", "binary"];

    initialize() {
      this.backgroundColors = "White";
    }

    connect() {
      this.colorTargets.forEach((colorTarget, idx) => {
        colorTarget.title = this.colors[idx][0];
        colorTarget.value = this.colors[idx][0];
        colorTarget.style = this.colors[idx][1];
        colorTarget.classList.add("border");
      });
    }

    setText({ target }) {
      this.text = target.value;
      console.log("text:", this.text);
    }

    setBackgroundColor({ target }) {
      this.binaryTarget.style["background-color"] = target.style["background-color"];
      this.backgroundColor = target.value;
    }

    setFontColor({ target }) {
      this.binaryTarget.style["color"] = target.value;
    }

    createPNG() {
      this.binaryTarget.style["background-color"] = "transparent";
      this.binaryTarget.style["border"] = "none";

      toPng(this.binaryTarget)
        .then((dataUrl) => {
          return postData("http://127.0.0.1:4567/generate", {
            text: "test",
            variant_color: this.backgroundColor,
            image: dataUrl,
          });
        })
        .then((data) => {
          console.log(data); // JSON data parsed by `data.json()` call
        })
        .catch((error) => {
          console.error("oops, something went wrong!", error);
        });
    }

    get colors() {
      return [
        [
          "Aqua",
          'background-color: rgb(48, 148, 180); background-image: url("https://images.printify.com/5853fec7ce46f30f8328200a");',
        ],
        [
          "Army",
          'background-color: rgb(88, 88, 79); background-image: url("https://images.printify.com/5853fec7ce46f30f8328200a");',
        ],
        [
          "Athletic Heather",
          'background-color: rgb(177, 179, 182); background-image: url("https://images.printify.com/5853fed0ce46f30f83282139");',
        ],
        [
          "Baby Blue",
          'background-color: rgb(188, 215, 242); background-image: url("https://images.printify.com/5853fec7ce46f30f8328200a");',
        ],
        [
          "Berry",
          'background-color: rgb(203, 0, 130); background-image: url("https://images.printify.com/5853fec7ce46f30f8328200a");',
        ],
        [
          "Black",
          'background-color: rgb(5, 5, 5); background-image: url("https://images.printify.com/5853fecdce46f30f832820ac");',
        ],
        [
          "Canvas Red",
          'background-color: rgb(159, 25, 49); background-image: url("https://images.printify.com/5853fec7ce46f30f8328200a");',
        ],
        [
          "Cardinal",
          'background-color: rgb(155, 39, 67); background-image: url("https://images.printify.com/5853fec7ce46f30f8328200a");',
        ],
        [
          "Dark Grey Heather",
          'background-color: rgb(34, 33, 39); background-image: url("https://images.printify.com/5853fed0ce46f30f8328213c");',
        ],
        [
          "Deep Heather",
          'background-color: rgb(113, 110, 110); background-image: url("https://images.printify.com/5853fed0ce46f30f8328213f");',
        ],
        [
          "Forest",
          'background-color: rgb(32, 54, 47); background-image: url("https://images.printify.com/5853fec7ce46f30f8328200a");',
        ],
        [
          "Gold",
          'background-color: rgb(255, 161, 0); background-image: url("https://images.printify.com/5853fec7ce46f30f8328200a");',
        ],
        [
          "Heather Green",
          'background-color: rgb(158, 168, 100); background-image: url("https://images.printify.com/5853fed0ce46f30f83282151");',
        ],
        [
          "Heather Kelly",
          'background-color: rgb(0, 150, 96); background-image: url("https://images.printify.com/5853fed0ce46f30f83282154");',
        ],
        [
          "Heather Mint",
          'background-color: rgb(169, 233, 215); background-image: url("https://images.printify.com/5853fed0ce46f30f8328215a");',
        ],
        [
          "Heather Navy",
          'background-color: rgb(59, 69, 89); background-image: url("https://images.printify.com/5853fed0ce46f30f8328215d");',
        ],
        [
          "Heather Raspberry",
          'background-color: rgb(178, 75, 100); background-image: url("https://images.printify.com/5853fed1ce46f30f83282166");',
        ],
        [
          "Heather Red",
          'background-color: rgb(193, 16, 59); background-image: url("https://images.printify.com/5853fed1ce46f30f83282169");',
        ],
        [
          "Heather Team Purple",
          'background-color: rgb(108, 89, 140); background-image: url("https://images.printify.com/5853fed1ce46f30f83282172");',
        ],
        [
          "Heather True Royal",
          'background-color: rgb(43, 96, 164); background-image: url("https://images.printify.com/5853fed1ce46f30f83282175");',
        ],
        [
          "Kelly",
          'background-color: rgb(0, 122, 83); background-image: url("https://images.printify.com/5853fec7ce46f30f8328200a");',
        ],
        [
          "Light Blue",
          'background-color: rgb(169, 186, 197); background-image: url("https://images.printify.com/5853fec7ce46f30f8328200a");',
        ],
        [
          "Maize Yellow",
          'background-color: rgb(255, 199, 0); background-image: url("https://images.printify.com/5853fec7ce46f30f8328200a");',
        ],
        [
          "Maroon",
          'background-color: rgb(98, 21, 44); background-image: url("https://images.printify.com/5853fecdce46f30f832820ac");',
        ],
        [
          "Mint",
          'background-color: rgb(172, 222, 189); background-image: url("https://images.printify.com/5853fec7ce46f30f8328200a");',
        ],
        [
          "Natural",
          'background-color: rgb(228, 216, 184); background-image: url("https://images.printify.com/5853fec7ce46f30f8328200a");',
        ],
        [
          "Navy",
          'background-color: rgb(26, 31, 53); background-image: url("https://images.printify.com/5853fecdce46f30f832820ac");',
        ],
        [
          "Olive",
          'background-color: rgb(64, 69, 24); background-image: url("https://images.printify.com/5853fec7ce46f30f8328200a");',
        ],
        [
          "Orange",
          'background-color: rgb(255, 110, 63); background-image: url("https://images.printify.com/5853fec7ce46f30f8328200a");',
        ],
        [
          "Pink",
          'background-color: rgb(246, 201, 211); background-image: url("https://images.printify.com/5853fec7ce46f30f8328200a");',
        ],
        [
          "Red",
          'background-color: rgb(191, 10, 51); background-image: url("https://images.printify.com/5853fecdce46f30f832820ac");',
        ],
        [
          "Silver",
          'background-color: rgb(210, 207, 202); background-image: url("https://images.printify.com/5853fec7ce46f30f8328200a");',
        ],
        [
          "Soft Pink",
          'background-color: rgb(255, 215, 215); background-image: url("https://images.printify.com/5853fec7ce46f30f8328200a");',
        ],
        [
          "Solid Black Blend",
          'background-color: rgb(5, 5, 5); background-image: url("https://images.printify.com/5853fecdce46f30f83282046");',
        ],
        [
          "Teal",
          'background-color: rgb(0, 216, 159); background-image: url("https://images.printify.com/5853fec7ce46f30f8328200a");',
        ],
        [
          "Team Purple",
          'background-color: rgb(52, 29, 84); background-image: url("https://images.printify.com/5853fec7ce46f30f8328200a");',
        ],
        [
          "True Royal",
          'background-color: rgb(56, 94, 157); background-image: url("https://images.printify.com/5853fecdce46f30f832820ac");',
        ],
        [
          "Vintage Black",
          'background-color: rgb(29, 30, 27); background-image: url("https://images.printify.com/5853fec7ce46f30f8328200a");',
        ],
        [
          "White",
          'background-color: rgb(249, 249, 249); background-image: url("https://images.printify.com/5853fec7ce46f30f8328200a");',
        ],
        [
          "Yellow",
          'background-color: rgb(255, 220, 76); background-image: url("https://images.printify.com/5853fec7ce46f30f8328200a");',
        ],
        ["Ash", "background-color: rgb(197, 199, 199);"],
        [
          "Black Heather",
          'background-color: rgb(43, 38, 34); background-image: url("https://images.printify.com/5853fecdce46f30f832820ac");',
        ],
        [
          "Heather Clay",
          'background-color: rgb(141, 87, 82); background-image: url("https://images.printify.com/5853feccce46f30f8328202e");',
        ],
        [
          "Heather Columbia Blue",
          'background-color: rgb(93, 126, 187); background-image: url("https://images.printify.com/5853feccce46f30f8328202e");',
        ],
        [
          "Heather Ice Blue",
          'background-color: rgb(214, 231, 231); background-image: url("https://images.printify.com/589c2deeb24392481a706a45");',
        ],
        [
          "Heather Peach",
          'background-color: rgb(255, 194, 160); background-image: url("https://images.printify.com/589c2deeb24392481a706a45");',
        ],
        [
          "Heather Slate",
          'background-color: rgb(74, 100, 113); background-image: url("https://images.printify.com/5853fed1ce46f30f8328216c");',
        ],
        [
          "Heather Olive",
          'background-color: rgb(119, 110, 83); background-image: url("https://images.printify.com/589c25a4b24392482214987b");',
        ],
        [
          "Heather Mauve",
          'background-color: rgb(164, 112, 105); background-image: url("https://images.printify.com/5853fecdce46f30f832820ac");',
        ],
        ["Dark Olive", "background-color: rgb(54, 54, 45);"],
        ["Charity Pink", "background-color: rgb(231, 103, 154);"],
      ];
    }
  }
);
