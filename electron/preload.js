const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getFullscreenState: () => ipcRenderer.invoke('fullscreen:get'),
  setFullscreenState: (value) => ipcRenderer.invoke('fullscreen:set', value),
  onFullscreenChanged: (callback) => {
    const listener = (_event, isFullscreen) => callback(isFullscreen);
    ipcRenderer.on('fullscreen-changed', listener);
    return () => ipcRenderer.removeListener('fullscreen-changed', listener);
  },
});
