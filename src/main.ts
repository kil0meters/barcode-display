import * as bwipjs from 'bwip-js'

export type BarcodeSettings = {
  name: string,
  bcid: string,
  text: string,
}

export function renderBarcode(settings: BarcodeSettings) {
  let descriptionElement = document.querySelector("#barcode-description");
  descriptionElement!.textContent = settings.name;

  bwipjs.toCanvas("#barcode-display", {
    bcid: settings.bcid,
    text: settings.text,
    scale: devicePixelRatio * 4,
    height: 18,
    includetext: true,
    textxalign: 'center',
  });
}

function renderBarcodeButtons(settings: BarcodeSettings[]) {
  let buttonsElement = document.querySelector("#buttons")!;

  for (let i = 0; i < settings.length; i++) {
    const button = document.createElement("button");
    button.textContent = settings[i].name;
    button.className = "barcode-button";
    button.addEventListener("click", () => {
      renderBarcode(settings[i]);
    });

    buttonsElement.appendChild(button);
  }
}

export function loadBarcodeFromUrl() {
  const hash = window.location.hash.substring(1);
  
  if (hash) {
    const decodedString = atob(hash);
    const barcodeSettings = JSON.parse(decodedString) as BarcodeSettings[];
    console.log(barcodeSettings);

    renderBarcode(barcodeSettings[0])
    renderBarcodeButtons(barcodeSettings)
  }

  return false;
}

window.addEventListener('DOMContentLoaded', () => {
  if (loadBarcodeFromUrl()) {
    return;
  }
});