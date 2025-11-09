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

  const vroom = new Audio("vroom/julia_vroom.m4a");
  const tram = document.querySelector(".tramStyle");

  groupSubmit.addEventListener("click", (event) => {
    if (socketRef) socketRef.close();
    if (groupInput.value.length > 0) {
      socketRef = new WebSocket(generateGroupEndpoint(groupInput.value));
    } else {
      socketRef = new WebSocket(socketEndpoint);
    }
    socketRef.addEventListener("message", async (event) => {
      recData = event.data;
      display.innerHTML = event.data;
      //jason fuck you
    });
  });

  //copy from server
  copyButton.addEventListener("click", async (event) => {
    await navigator.clipboard.writeText(recData);
    if (recData == null) {
      display.innerHTML = "Clipboard is empty.";
      navigator.clipboard.writeText("");
    } else {
      display.innerHTML = recData;
    }
  });

  //paste to server
  pasteButton.addEventListener("click", async (event) => {
    recData = await navigator.clipboard.readText();
    socketRef.send(recData);

    tram.classList.remove("tramCar");
    void tram.offsetWidth; // force reflow
    tram.classList.add("tramCar");

    vroom.play();
  });
}

document.addEventListener("DOMContentLoaded", init);
