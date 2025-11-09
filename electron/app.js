import { TypeMatrix } from "./lib/fileprocessor.js";

const socketEndpoint =
  "wss://this-is-wendys-socket-service-dkc8eyd7bzc9hndh.canadacentral-01.azurewebsites.net/ws";

/**
 * @type {WebSocket | null}
 */
var socketRef = null;
var recData;

function generateGroupEndpoint(groupName) {
  return `${socketEndpoint}?group=${groupName}`;
}

function init() {
  const groupInput = document.querySelector("input#pairing");

  const groupSubmit = document.querySelector("#pairSubmit");
  const copyButton = document.querySelector("#copy");
  const pasteButton = document.querySelector("#paste");
  const display = document.querySelector("#serverText");

  groupSubmit.addEventListener("click", (event) => {
    if (socketRef) socketRef.close();
    if (groupInput.value.length > 0) {
      socketRef = new WebSocket(generateGroupEndpoint(groupInput.value));
    } else {
      socketRef = new WebSocket(socketEndpoint);
    }
    socketRef.addEventListener("message", async (event) => {
      recData = event.data;
      display.value = event.data;
      //jason fuck you
    });
  });

  //copy from server
  copyButton.addEventListener("click", async (event) => {
    await navigator.clipboard.writeText(recData);
    if (recData == null) {
      display.value = "Clipboard is empty.";
      navigator.clipboard.writeText("");
    } else {
      display.value = recData;
    }
  });

  //paste to server
  pasteButton.addEventListener("click", async (event) => {
    recData = await navigator.clipboard.readText();
    socketRef.send(recData);
  });

  //updates serverText upon tabbing in
  window.addEventListener("focus", async (event) => {
    let currentClip = await navigator.clipboard.readText();
    display.value = currentClip;
  });
  navigator.clipboard.readText().then((text) => (display.value = text));
}

document.addEventListener("DOMContentLoaded", init);

async function copyText(textToCopy) {
  try {
    let copiedString = await navigator.clipboard.readText();
    socketRef.send(copiedString);
    console.log("Text copied to clipboard successfully!");
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
}
