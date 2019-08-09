const {ipcMain, BrowserWindow}=require('electron');
let mainWindow = BrowserWindow.getFocusedWindow();

//接收渲染进程广播的数据

ipcMain.on('toMain',(event,data)=>{
    console.log(11111)
    console.log(data)
    event.sender.send('reply', data);
});

// 自定义窗口最小化
ipcMain.on('windowMin',() => {
    console.log('window-min');
    mainWindow.minimize();
});

ipcMain.on('windowMax',() => {
    console.log('window-max');
    if(mainWindow.isMaximized()){
        mainWindow.restore();
    }else{
        mainWindow.maximize();
    }
});

ipcMain.on('windowClose',() => {
    console.log('window-close');
    mainWindow.close();
});