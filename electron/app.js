import { SocketManager, mimePriority } from "./lib/socketmanager.js"


const groupInput = document.querySelector("input#pairing");

const groupSubmit = document.querySelector("#pairSubmit");
const copyButton = document.querySelector("#copy");
const pasteButton = document.querySelector("#paste");
const display = document.querySelector("#serverText");

const connection = new SocketManager();

connection.attachListener("message", handleMessage);
groupSubmit.addEventListener("click", groupSubmitHandler);
copyButton.addEventListener("click", copyHandler);
pasteButton.addEventListener("click", pasteHandler);

async function handleMessage(cnLastPayload) {

  if (cnLastPayload.type === "text/plain") {
    display.value = cnLastPayload.data;
  // Assuming image formats exclusively here
  } else {
    let imgBlob = new Blob([cnLastPayload.data], {type: cnLastPayload.type});
    let imgUrl = URL.createObjectURL(imgBlob);
    // TODO: imgUrl is usable as the src for an img element, decide how to show image later
  }
}

async function pasteHandler(clickEvent) {
  let clipData = await navigator.clipboard.read();
  if (!clipData[0] || clipData[0].length < 1) {
    display.value = "No clipboard data";
    return;
  }
  let chosenType = mimePriority(clipData[0].types);

  if (chosenType === "text/plain") {
    let stringBlob = await clipData[0].getType(chosenType);
    connection.send(await stringBlob.text(), chosenType);
    return;
  }

  let data = await clipData[chosenType].getType(chosenType);
  let buff = await data.arrayBuffer();

  connection.send(buff, chosenType);
}

async function copyHandler(clickEvent) {
  if (!connection.lastMessage) {
    display.value = "Clipboard is Empty"
    return;
  }
  let lastPayload = connection.lastMessage;

  if (lastPayload.type === "text/plain") {
    navigator.clipboard.writeText(lastPayload.data);
  } else {
    let blobform = new Blob([lastPayload.data], {type: lastPayload.type})
    let clipItem = new ClipboardItem({
      [blobform.type]: blobform
    });
    navigator.clipboard.write(clipItem);
  }
}

async function groupSubmitHandler(clickEvent) {
  debugger;
  connection.initConnection(groupInput.value);
}
