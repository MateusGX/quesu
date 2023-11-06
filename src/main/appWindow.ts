import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { registerTitlebarIpc } from '@misc/window/titlebarIPC';
import { initSplashScreen, OfficeTemplate } from 'electron-splashscreen';
import { registerQuesuIpc } from '../../misc/window/quesuIPC';
import isDev from 'electron-is-dev';

// Electron Forge automatically creates these entry points
declare const APP_WINDOW_WEBPACK_ENTRY: string;
declare const APP_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

let appWindow: BrowserWindow;

/**
 * Create Application Window
 * @returns {BrowserWindow} Application Window Instance
 */
export function createAppWindow(): BrowserWindow {
  // Create new window instance
  appWindow = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: '#202020',
    show: false,
    autoHideMenuBar: true,
    frame: false,
    titleBarStyle: 'hidden',
    icon: path.resolve('assets/images/appIcon.ico'),
    webPreferences: {
      allowRunningInsecureContent: true,
      webSecurity: false,
      nodeIntegration: false,
      contextIsolation: true,
      nodeIntegrationInWorker: false,
      nodeIntegrationInSubFrames: false,
      preload: APP_WINDOW_PRELOAD_WEBPACK_ENTRY,
      sandbox: false,
    },
  });

  const hideSplashscreen = initSplashScreen({
    mainWindow: appWindow,
    icon: isDev ? path.resolve('assets/icon.ico') : undefined,
    url: OfficeTemplate,
    width: 500,
    height: 300,
    brand: 'mmateus.a',
    productName: 'Quesu',
    logo: path.resolve('assets/logo.svg'),
    website: 'quesu.mateusam.dev',
    text: 'Initializing...',
  });

  // Load the index.html of the app window.
  appWindow.loadURL(APP_WINDOW_WEBPACK_ENTRY);

  // Show window when its ready to
  appWindow.once('ready-to-show', hideSplashscreen);
  //ipcMain.on('ready', hideSplashscreen);

  // Register Inter Process Communication for main process
  registerMainIPC();

  // Close all windows when main window is closed
  appWindow.on('close', () => {
    appWindow = null;
    app.quit();
  });

  return appWindow;
}

/**
 * Register Inter Process Communication
 */
function registerMainIPC() {
  /**
   * Here you can assign IPC related codes for the application window
   * to Communicate asynchronously from the main process to renderer processes.
   */
  registerTitlebarIpc(appWindow);
  registerQuesuIpc(appWindow);
}
