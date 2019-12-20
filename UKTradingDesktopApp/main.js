const { app, BrowserWindow, ipcMain,Menu,MenuItem } = require('electron')
const path = require('path')
const url = require('url')
const localstorage = require('./helpers/localstorage.helper');
const globalManager = require('./helpers/globalmanager.helper');

let openedWindowsRepo = [];
global.selectedStock = "NASDAQ:INTC";
global.userAuthToken = '';
localstorage.getAuthToken();

function openSplashWindow() {
  winId = "Splash";
  splashWin = new BrowserWindow({
    height: 500,
    width: 850,
    minHeight: 500,
    minWidth: 850,
    resizable: false,
    autoHideMenuBar: true,
    darkTheme: true,
    frame: false,
    closable: true,
    title: "Welcome to UkTrading"
  })
  setWindowInformation(splashWin,winId,winId);  
  // load the dist folder from Angular
  splashWin.loadURL(url.format({
    pathname: path.join(__dirname, 'dist/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  
  // Open the DevTools optionally:
  //splashWin.webContents.openDevTools();

  splashWin.on('closed', () => {
    splashWin = null
  })
  openedWindowsRepo.push(windowsObjGenerator(winId,winId, splashWin));
}

app.on('ready', openSplashWindow)


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

ipcMain.on('authentication', (event, isCallFromSplash) => {
  winId = 'Authentication';
  authenticationWindow = new BrowserWindow({
    height: 500,
    width: 700,
    resizable: false,
    autoHideMenuBar: true,
    darkTheme: true,
    frame: false,
    closable: true,
    maximizable: true,
    title: "Authentiction"
  })

  authenticationWindow.on('closed', () => {
    removeWindow(winId);
  })

  setWindowInformation(authenticationWindow,winId,winId);
  //authenticationWindow.webContents.openDevTools();

  //User request for logout
  if (isCallFromSplash == false) {
    //logout the app and move to registration page
    localstorage.removeAuthToken();
    //close all other opened windows
    closeAllWindows();
    closeWindow("Menu");
    //close all other open window without quiting the app
  } else {
    //close splash window
    closeWindow("Splash");
  }

  authenticationWindow.loadURL(path.join(__dirname, 'dist/index.html'));
  openedWindowsRepo.push(windowsObjGenerator(winId,winId, authenticationWindow));
})

///this will show menu
ipcMain.on('showmenu', (event, authToken, isCallFromSplash) => {
  windowId = "Menu";
  menuwindowObj = findWindow(windowId);
  menuwindow = null;
  var screen = require('electron').screen
  var display = screen.getPrimaryDisplay()  
  if (menuwindowObj == null) {
    menuwindow = new BrowserWindow({
      height: 115,
      width:display.workArea.width,            
      darkTheme: true,
      transparent:true,
      minimizable: true,
      movable: true,
      maximizable: false,
      resizable: true,
      closable: true,
      x:0,
      y:0,
      frame:false,             
      title: "Main Menu"
    })
    
    menuwindow.on('closed', () => {
    })
    menuwindow.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }))
    openedWindowsRepo.push(windowsObjGenerator(windowId,windowId, menuwindow));
  }
  else {
    menuwindow = menuwindowObj.OpenedWindow;
  }
  setWindowInformation(menuwindow,windowId,windowId);  
  menuwindow.webContents.openDevTools();
  
  menuwindow.show();

  var windowToCloseId = 'Splash';

  if (isCallFromSplash == false) {
    //Save token    
    localstorage.setAuthToken(authToken);
    windowToCloseId = 'Authentication';
  }
  closeWindow(windowToCloseId);
})


///this will show chart windows for selected interval
ipcMain.on('createnewchart', (event) => {
  var datetime = new Date();
  var winType="Chart";
  var chartId=datetime.getDate().toString()+datetime.getMonth().toString()+datetime.getFullYear().toString()+datetime.getHours().toString()+datetime.getMinutes().toString()+datetime.getSeconds().toString()+datetime.getMinutes().toString();
    chartwindow = new BrowserWindow({
      height: 600,
      width: 700,
      resizable: true,
      autoHideMenuBar: true,
      darkTheme: true,
      frame: false,
      closable: true,
      maximizable: true,
      title: "Chart-"+chartId
    })

    chartwindow.on('closed', () => {
      removeWindow(chartId);
    })
    setWindowInformation(chartwindow,chartId,winType, { Interval: "D", Stock: global.selectedStock });
    openedWindowsRepo.push(windowsObjGenerator(chartId,winType, chartwindow));
    
    chartwindow.loadURL(path.join(__dirname, 'dist/index.html'));
    chartwindow.show();
    //chartwindow.webContents.openDevTools(); 
})



///this will show chart windows for selected interval
ipcMain.on('anychart', (event) => {
  var datetime = new Date();
  var winType="AnyChart";
  var chartId=datetime.getDate().toString()+datetime.getMonth().toString()+datetime.getFullYear().toString()+datetime.getHours().toString()+datetime.getMinutes().toString()+datetime.getSeconds().toString()+datetime.getMinutes().toString();
    chartwindow = new BrowserWindow({
      height: 600,
      width: 700,
      resizable: true,
      autoHideMenuBar: true,
      darkTheme: true,
      frame: false,
      closable: true,
      maximizable: true,
      title: "AnyChart-"+chartId
    })

    chartwindow.on('closed', () => {
      removeWindow(chartId);
    })
    setWindowInformation(chartwindow,chartId,winType, { Interval: "D", Stock: global.selectedStock });
    openedWindowsRepo.push(windowsObjGenerator(chartId,winType, chartwindow));
    
    chartwindow.loadURL(path.join(__dirname, 'dist/index.html'));
    chartwindow.show();
   // chartwindow.webContents.openDevTools(); 
})



//this will open stock window
ipcMain.on('showstock', () => {
  windowId = "Stock";
  stockwindowObj = findWindow(windowId);
  stockwindow = null;
  if (stockwindowObj == null) {
    stockwindow = new BrowserWindow({
      height: 400,
      width: 710,
      minHeight: 400,
      minWidth: 710,
      resizable: false,
      autoHideMenuBar: true,
      darkTheme: true,
      frame: false,
      closable: true,
      title: "Watchlist"
    })
    stockwindow.on('closed', () => {
      removeWindow(windowId);
    })
    stockwindow.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }))
    openedWindowsRepo.push(windowsObjGenerator(windowId,windowId, stockwindow));
  }
  else {
    stockwindow = stockwindowObj.OpenedWindow;
  }
  //stockwindow.webContents.openDevTools();
  setWindowInformation(stockwindow,windowId,windowId);  

  stockwindow.show();
})

//Whenever new stock will be selected this event will fire and
//this will load new stock urls to all chart windows
ipcMain.on('updatestock', (event, stock) => {
  global.selectedStock = stock;
  chartwindows = getAllChartWindows();
  chartwindows.forEach(chartWindow => {
    setWindowInformation(chartWindow,chartWindow.Id,"Chart", { Interval: "D", Stock: global.selectedStock });    

    chartWindow.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  });  
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})


//this will open stock window
ipcMain.on('closewindow', (event, winId) => {
  if (winId == "Menu") {
    closeAllWindows();
  }
  else {
    windowObj = findWindow(winId);
    if (windowObj != null) {
      windowObj.OpenedWindow.close();
    }
  }

})

ipcMain.on('minimizewindow', (event, winId) => {
  windowObj = findWindow(winId);
  if (windowObj != null) {
    windowObj.OpenedWindow.minimize();
  }

})

//window id
//type: this will sepecify the type of window,that can be stock, menu or chart
//infoobj: each type window might require it is own object data
//infoobj will contain data correspond to each type of window
//as window type index will convert this info Obj to gain data
function windowInformation(id, type, infoObj) {
  return JSON.stringify({ Id: id, Type: type, Info: infoObj });
}

function windowsObjGenerator(windowId,type, openedWindow) {
  return { WindowId: windowId,WinType:type,OpenedWindow: openedWindow };
}

function closeWindow(windowToCloseId) {
  windowToCloseObj = findWindow(windowToCloseId);
  if (windowToCloseObj != null) {
    windowToClose = windowToCloseObj.OpenedWindow;
    windowToClose.close();
    removeWindow(windowToCloseId);
  }
}

//By using window id we can find opened window instance 
//from window array repo
function findWindow(windowid) {
  for (var i = 0; i < openedWindowsRepo.length; i++) {
    var chartwindowObj = openedWindowsRepo[i];
    if (chartwindowObj.WindowId == windowid) {
      return chartwindowObj;
    }
  }
  return null;
}


///When window will close this method will remove
///record of opened windows
function removeWindow(windowid) {
  for (var i = 0; i < openedWindowsRepo.length; i++) {
    var chartwindowObj = openedWindowsRepo[i];
    if (chartwindowObj.WindowId == windowid) {
      openedWindowsRepo.splice(i, 1);
      break;
    }
  }
}

//this method will make all opened window references null
function closeAllWindows(windowid) {
  for (var i = 0; i < openedWindowsRepo.length; i++) {
    var chartwindowObj = openedWindowsRepo[i];
    chartwindowObj.OpenedWindow.close();
    chartwindowObj.OpenedWindow = null;
  }
  openedWindowsRepo = [];
}

function maximizeWindow(winId) {
  win.maximize();
}

//Get all chart windows
function getAllChartWindows() {
  var openedWindowCharts=[];
  for (var i = 0; i < openedWindowsRepo.length; i++) {
    var chartwindowObj = openedWindowsRepo[i];
    if(chartwindowObj.WinType=="Chart")
    {
      openedWindowCharts.push(chartwindowObj.OpenedWindow);
    }    
  }
  return openedWindowCharts;
}

function setWindowInformation(window,winId,chartType,winData={})
{
  window.windowInformation=windowInformation(winId, chartType,winData);
}