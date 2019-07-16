const { ipcRenderer } = require('electron')
ipcRenderer.on('reply', function(event, arg) {
    console.log(arg);
});
