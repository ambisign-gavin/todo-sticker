// @flow
import stickerHandler from './sticker/stickerHandler';
const { app, BrowserWindow } = require('electron');

let win;

declare var __dirname: any;
declare var process: any;

function createWindow() {
    win = new BrowserWindow({ 
        width: 1024, 
        height: 768,
        minWidth: 600,
        minHeight: 480,
    });
    win.loadURL(`file://${__dirname}/app.html`);

    if (process.env.NODE_ENV === 'development') {
        win.webContents.openDevTools();
    }

    win.on('closed', () => {
        win = null;
    });

}

stickerHandler.registerListener();

app.on('ready', () => {
    createWindow();
    if (/^win/i.test(process.platform)) {
        app.setAppUserModelId('com.gavin.todosticker');
    }
});


app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});