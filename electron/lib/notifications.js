const timeoutMs = 3000;

export const Notifier = class {

    wrapper;

    constructor(wrapper) {
        this.wrapper = (wrapper) ? wrapper : null;
    }

    notifyText(text) {
        let notibox = document.createElement("div");
        notibox.classList.add("text-notification");

        let titleP = document.createElement("h4");
        titleP.textContent = "Received text:";
        let textP = document.createElement("p");
        textP.textContent = text;

        notibox.append(titleP);
        notibox.append(textP);
        notibox.addEventListener("click", this.notifyClick.bind(null, notibox));
        setTimeout(this.notifyClick.bind(null, notibox), timeoutMs);

        this.wrapper && this.wrapper.append(notibox);
    }

    notifyImage(imgUrl) {
        debugger;
        let notibox = document.createElement("div");
        notibox.classList.add("img-notification");

        let titleP = document.createElement("h4");
        titleP.textContent = "Image received";

        let imgWrapper = document.createElement("div");

        let img = document.createElement("img");
        img.style.width = "100%";
        img.style.height = "100%";
        img.setAttribute("alt", "notification image");
        img.setAttribute("src", imgUrl);

        imgWrapper.append(img);
        notibox.append(titleP);
        notibox.append(imgWrapper);
        notibox.addEventListener("click", this.notifyClick.bind(null, notibox));
        setTimeout(this.notifyClick.bind(null, notibox), timeoutMs);

        this.wrapper && this.wrapper.append(notibox);
    }

    notifyClick(element, event) {
        element.remove();
    }
}