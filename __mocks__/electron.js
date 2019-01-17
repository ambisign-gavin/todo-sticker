// @flow
let listeners: Map<string, Function> = new Map();

class IpcMain {   

    on(channel: string, listener: Function) {
        listeners.set(channel, listener);
    }
    
}

class IpcRenderer {   

    send(channel: string, ...args: Array<mixed>) {
        const listener = listeners.get(channel);
        if (listener != null) {
            listener({}, ...args);
        }
    }
    
}

class BrowserWindow {
    _listeners: Map<string, Function> = new Map();

    webContents = {
        openDevTools() {

        },
        on(channel: string, listener: Function) {
            listeners.set(channel, listener);
        },
        emit(channel: string, ...args: Array<mixed>) {
            const listener = listeners.get(channel);
            if (listener != null) {
                listener(...args);
            }
        },
        destroy() {

        }
    }

    constructor() {
        this._listeners = new Map();
    }

    loadURL() {

    }

    on(channel: string, listener: Function) {
        this._listeners.set(channel, listener);
    }

    emit(channel: string, ...args: Array<mixed>) {
        const listener = this._listeners.get(channel);
        if (listener != null) {
            listener(...args);
        }
    }
}

const ipcMain = new IpcMain();
const ipcRenderer = new IpcRenderer();

export {
    ipcMain,
    ipcRenderer,
    BrowserWindow
};