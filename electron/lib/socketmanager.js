

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

    /** Last message received from the server. */
    lastMessage;

    messageCb;
    openCb;
    closeCb;

    constructor(elements) {
        this.copyButton = (elements) ? elements.copyButton : null;
        this.pasteButton = (elements) ? elements.pasteButton : null;
        this.pairButton = (elements) ? elements.pairButton : null;
        this.pairInput = (elements) ? elements.pairInput : null;
        this.displayInput = (elements) ? elements.displayInpu: null;

        this.groupId = null;
        this.socketRef = null;
        this.lastMessage = null;

        this.messageCb = null;
        this.closeCb = null;
        this.openCb = null;
    }

    isReady() {
        if (socketRef) return true;
        return false;
    }

    initConnection(groupId) {
        if (socketRef) {
            this.socketRef.close();
            this.groupId = null;
        }
        var url = "wss://this-is-wendys-socket-service-dkc8eyd7bzc9hndh.canadacentral-01.azurewebsites.net/ws";
        if (groupId) url = `${url}?group=${groupId}`;
        this.socketRef = new WebSocket(url);
        this.socketRef.addEventListener("message", this.onMessage);
    }

    onMessage(msg) {
        if (!this.groupId) {
            this.groupId = msg.data;
        } else {
            let data = JSON.parse(msg.data);
            this.messageCb && this.messageCb(msg);
        }
    }

    onClose(ev) {
        this.socketRef = null;
        this.groupId = null;
        this.closeCb && this.closeCb(ev);
    }

    onOpen(ev) {
        this.openCb && this.openCb(ev);

    }

    addEventListener(event, cb) {
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

    send(payload, mime) {

        if (!this.socketRef) return false;

        if (payload && payload.match) {
            let socketPayload = {
                data: payload,
                type: (mime) ? mime : "text/plain"
            }
            this.socketRef.send(JSON.stringify(socketPayload));

        } else {

            if (payload.arrayBuffer) {
                payload.arrayBuffer.then((buffer) => {
                    let socketPayload = {
                        data: buffer,
                        type: (mime) ? mime : "text/plain",
                    }
                    this.socketRef.send(JSON.stringify(socketPayload));
                });
            }
        }
    }

}