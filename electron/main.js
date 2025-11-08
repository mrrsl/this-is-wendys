const { app, BrowserWindow } = require("electron/main");

const createWindow = () => {
	
	let targetFile = (process.env.PREVIEW) ? "./preview/preview.html" : "index.html";
	console.log("PREVIEW=", process.env.PREVIEW);
 	const win = new BrowserWindow({
		width: 800,
		height: 600,
  	});

  	win.loadFile(targetFile);
};

app.whenReady().then(() => {
  	createWindow();

  	app.on("activate", () => {
		const windows = BrowserWindow.getAllWindows();
		if (windows.length === 0) {
	  		createWindow();
		} else {
	  
		}
  	});
});

app.on("window-all-closed", () => {
  	if (process.platform !== "darwin") {
		app.quit();
  	}
});
