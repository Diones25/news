let text = document.querySelector("#textlimited");

let newText = text.innerText.substr(0, 150);

text.innerHTML = `
<span id="textlimited">
  ${newText}
</span>`;