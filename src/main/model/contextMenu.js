var { Menu, ipcMain, BrowserWindow } = require('electron');

// 右键菜单

const contextMenuTemplate = [
    {
        label: '复制',
        role: 'copy'
    },
    {
        label: '粘贴',
        role: 'paste'
    },
    {
        label: '刷新',
        role: 'reload',
        click(){
            console.log(4444)
        }
    }
]; 

const menuList = Menu.buildFromTemplate(contextMenuTemplate);

ipcMain.on('contextmenu', function(){
    menuList.popup(BrowserWindow.getFocusedWindow());
});