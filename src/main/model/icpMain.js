const {ipcMain}=require('electron');


//接收渲染进程广播的数据

ipcMain.on('toMain',(event,data)=>{
    console.log(11111)
    console.log(data)
    event.sender.send('reply', data);
})