import { TypeMatrix } from "./lib/fileprocessor.js";

const socketEndpoint = "wss://this-is-wendys-socket-service-dkc8eyd7bzc9hndh.canadacentral-01.azurewebsites.net/ws";

/**
 * @type {WebSocket | null}
 */
var socketRef = null;

function generateGroupEndpoint(groupName) {
  return `${socketEndpoint}?group=${groupName}`;
}

function init() {
  const groupInput = document.querySelector("input#pair");
  const textInput = document.querySelector("input#textInput");

  const groupSubmit = document.querySelector("#pairingCode > button");
  const textSubmit = document.querySelector("button#submit");

  groupSubmit.addEventListener("click", (event) => {
    if (socketRef)
      socketRef.close();
    if (groupInput.value.length > 0) {
      socketRef = new WebSocket(generateGroupEndpoint(groupInput.value));
    } else {
      socketRef = new WebSocket(socketEndpoint);
    }
  });

  textSubmit.addEventListener("click", (event) => {
    if (textInput.value.length == 0)
      return;
    socketRef && socketRef.send({data: textInput.value, type: TypeMatrix.STRING});
    textInput.value = "";
  });
}

document.addEventListener("DOMContentLoaded", init);