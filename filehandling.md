## Handling Different Files
#### WebSocket Message Handling
We will be sending data in the following object format:
```ts
payload = {
    // Even if the data isn't text, it should be converted to a string before being sent
    data: "Your data here",
    // Can be one of many recognized types in https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/MIME_types/Common_types
    type: "text/plain"
}
```
Our web socket message handlers will change a little bit:
```js
/*
 *  Assuming we want to display the incoming data, this function
 *  shows how to access the data contained the event handler parameter.
 */
async (mevent) => {
    const dataObject = JSON.parse(mevent.data);
    let typeBreakdown = data.type.split("/");

    if (typeBreakdown[0] === "text") {
        // Just an example here of how to extract the text from the 'data' variable
        console.log(dataObject.data)
    } else {
        // Convert the data string into a Uint8Array and pass its buffer into the Blob constructor
        let enc = new TextEncoder();
        let imageBlob = new Blob(
            [enc.encode(dataObject.data).buffer],
            {type: dataObject.type}
            );
        // Treat images and other files differently
        if (typeBreakdown[0] === "image") {
            let url = URL.createObjectURL(imageBlob);
            // Pretend we have a refrence to an <img> here
            imgElement.setAttribute("src", url);
        } else {
            // Do whatever with the blob
        }
    }
}
```
#### Clipboard facing event handlers
Any event handlers reading and writing the data will need to call `read()`/`write()` which now deal with `ClipboardItem` instead of `string`
```js
// Example of what a clipboard item might look like
var cbItem = {
    "text/plain": "Harry Potter with guns",
    "text/html": "<p> ryan finish ur 1800 </p>",
    types: ["text/plain", "text/html"]
}

// Reading from the clipboard
async (someEvent) => {
    let items = await navigator.clipboard.read();
    // Traverse the clipboard item fields since the clipboard might contain multiple types
    for (let type of Object.keys(items)) {
        if (type === "image/png") {
            // handle png
        } else if (type === "image/jpeg") {
            // handle jpeg
        } else {
            // text/plain takes last priority here
        }
    }
}

// Writing to clipboard
async (someEvent) => {
    // Pretend we got some non-text data from the server here
    let blob;
    let cbItem = {
        types = [blob.type]
    };
    cbItem[blob.type] = blob;
    navigator.clipboard.write(cbItem);
}
```
