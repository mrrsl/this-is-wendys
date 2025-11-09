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
  const textInput = document.querySelector("input#textInput");

  const groupSubmit = document.querySelector("#pairSubmit");
  const textSubmit = document.querySelector("button#submit");
  const copyButton = document.querySelector("#copy");

  groupSubmit.addEventListener("click", (event) => {
    if (socketRef) socketRef.close();
    if (groupInput.value.length > 0) {
      socketRef = new WebSocket(generateGroupEndpoint(groupInput.value));
    } else {
      socketRef = new WebSocket(socketEndpoint);
    }
    socketRef.addEventListener("message", async (event) => {
      recData = event.data;
      //jason fuck you
    });
  });

  textSubmit.addEventListener("click", (event) => {
    if (textInput.value.length == 0) return;
    socketRef && socketRef.send(textInput.value);
    textInput.value = "";
  });

  copyButton.addEventListener("click", async (event) => {
    await navigator.clipboard.writeText(recData);
  });
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
