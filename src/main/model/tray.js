
const {Menu, Tray, BrowserWindow, app} = require('electron');
const storage = require('electron-localstorage');
const path = require('path');

const tray = new Tray(path.join(__static,'favicon.ico'));
let winTray = BrowserWindow.getFocusedWindow();

const template = [
    {
        label: '设置',
        click: function(){
            console.log(mainWindow)
            // storage.removeItem('_AuthToken');
        }
    },
    {
        label: '退出',
        click: function(){
            storage.removeItem('_AuthToken');
            app.quit();
        }
    }
];

const trayMenu = Menu.buildFromTemplate(template);
tray.setContextMenu(trayMenu);
tray.setToolTip('project name');

winTray.on('close',(e)=>{        
        if(!winTray.isFocused()){
            winTray=null;
        }else{
            e.preventDefault();  /*阻止应用退出*/
            winTray.hide(); /*隐藏当前窗口*/

        }       
});

//监听托盘的双击事件
tray.on('double-click',()=>{               
    winTray.show();
});
