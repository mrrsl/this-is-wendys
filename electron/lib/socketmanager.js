const Types = [
    "image/gif",
    "image/webp",
    "image/png",
    "image/jpeg",
    "text/plain",
]


export const SocketManager = class {
    /** @type {WebSocket} */
    socketRef;

    /** @type {HTMLButtonElement | null} */
    copyButton;
    /** @type {HTMLButtonElement | null} */
    pasteButton;
    /** @type {HTMLButtonElement | null} */
    pairButton;

    /** @type {HTMLInputElement | null} */
    pairInput;
    /** @type {HTMLInputElement | null} */
    displayInput;

    /** Associated group ID. */
    groupId;

    /**
     * Last JSON object recieved from the server.
     * `lastMessage.data` will have type string or ArrayBuffer.
     */
    lastMessage;

    messageCb;
    openCb;
    closeCb;

    constructor(elements) {
        this.copyButton = (elements) ? elements.copyButton : null;
        this.pasteButton = (elements) ? elements.pasteButton : null;
        this.pairButton = (elements) ? elements.pairButton : null;
        this.pairInput = (elements) ? elements.pairInput : null;
        this.displayInput = (elements) ? elements.displayInput: null;

        this.groupId = null;
        this.socketRef = null;
        this.lastMessage = null;

        this.messageCb = null;
        this.closeCb = null;
        this.openCb = null;
    }

    isReady() {
        if (this.socketRef) return true;
        return false;
    }

    initConnection(groupId) {
        if (this.socketRef) {
            this.socketRef.close();
            this.groupId = null;
        }
        this.groupId = groupId;

        let url = "wss://this-is-wendys-socket-service-dkc8eyd7bzc9hndh.canadacentral-01.azurewebsites.net/ws";

        if (groupId) url = `${url}?group=${groupId}`;

        this.socketRef = new WebSocket(url);
        this.socketRef.addEventListener("message", this.onMessage.bind(this));
        this.socketRef.addEventListener("close", this.onClose.bind(this));
        this.socketRef.addEventListener("open", this.onOpen.bind(this));
    }
    /** Internal */
    onMessage(msg) {
        debugger;
        if (!this.groupId) {
            this.groupId = msg.data;
        } else {
            let data = JSON.parse(msg.data);
            this.lastMessage = data;
            if (this.lastMessage.type !== "text/plain") {
                let u8 = Uint8Array.fromBase64(this.lastMessage.data);
                this.lastMessage.data = u8;
            }
            this.messageCb && this.messageCb(this.lastMessage);
        }
    }
    /** Internal. */
    onClose(ev) {
        this.socketRef = null;
        this.groupId = null;
        this.closeCb && this.closeCb(ev);
    }
    /** Internal. */
    onOpen(ev) {
        this.openCb && this.openCb(ev);

    }
    /** Attach an event listener that gets called after internal ones. */
    attachListener(event, cb) {
        switch(event) {
            case "message":
                this.messageCb = cb;
                break;
            case "close":
                this.closeCb = cb;
                break;
            case "open":
                this.openCb = cb;
                break;
            default:
                break;
        }
    }
    /**
     * Sends the data through the connected socket
     * @param {*} payload 
     * @param {string} mime 
     * @returns 
     */
    send(payload, mime) {
        debugger;
        if (!this.socketRef) return false;

        if (payload && payload.match) {
            let socketPayload = {
                data: payload,
                type: (mime) ? mime : "text/plain"
            }
            this.socketRef.send(JSON.stringify(socketPayload));

        } else {
            // Check that payload is an array buffer
            if (payload.search) {
            
                let socketPayload = {
                    data: payload,
                    type: (mime) ? mime : "text/plain",
                }
                this.socketRef.send(JSON.stringify(socketPayload));
            
            } else {
                console.error("Attempting to send non-text, non base64 payload");
            }
        }
    }
}

/**
 * Takes a Clipboard Item and returns an included mime type according to a given priority;
 * @param {*} cbtypes
 * @return {MimeType}
 */
export const mimePriority = function(cbtypes) {
    for (let type of Types) {
        if (cbtypes.includes(type)) return type;
    }
}