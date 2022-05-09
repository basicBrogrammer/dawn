String.prototype.toBinary = function () {
  return this.replace(/ /g, "")
    .split("")
    .map(function (letter) {
      return "0" + letter.charCodeAt(0).toString(2);
    })
    .join("");
};

let container = document.getElementById("tee-container");
container.style = "height: " + container.offsetWidth + "px";
let dems = {
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
};

document.getElementById("words").addEventListener("keyup", function (input) {
  // let binary = 'ruby'.toBinary();
  let binary = input.target.value.toBinary();
  let initContainerClass = "border border-sky-500 sm:w-5/6 md:w-3/4 md:m-auto grid gap-4";
  let demensions = dems[binary.length];
  container.className = initContainerClass;
  container.innerHTML = null;
  container.style["height"] = container.offsetWidth + "px";
  if (demensions[1] <= 4) {
    container.style["font-size"] = "4rem";
  } else if (demensions[1] <= 6) {
    container.style["font-size"] = "3.5rem";
  } else if (demensions[1] === 7) {
    container.style["font-size"] = "3rem";
  } else {
    container.style["font-size"] = "2.5rem";
  }
  binary.split("").forEach(function (char) {
    let newSpan = document.createElement("span");
    let newContent = document.createTextNode(char);
    newSpan.appendChild(newContent);
    container.appendChild(newSpan);
  });
  container.classList.add(`grid-cols-${demensions[0]}`);
});

// if item already exists go to that item
// else generate PNG
