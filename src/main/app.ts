import { app, BrowserWindow } from 'electron';
import { createAppWindow } from './appWindow';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from 'fs';
import { join } from 'path';
import { updateQuesuWorkspaces } from '@utils/file';

const refreshDatabase = () => {
  console.log('refreshing database');
  const userDataPath = app.getPath('userData');
  const workspacesPath = join(userDataPath, 'workspaces');
  if (!existsSync(workspacesPath)) mkdirSync(workspacesPath);
  const configPath = join(workspacesPath, 'quesu-workspaces.json');

  let workspaces = {} as any;

  const files = readdirSync(workspacesPath).filter((f) => f.endsWith('.qsw'));
  files.forEach((f) => {
    try {
      const buffer = readFileSync(join(workspacesPath, f), {
        encoding: 'utf-8',
      });
      const data = JSON.parse(buffer);
      workspaces[f.replace('.qsw', '')] = data.name;
    } catch (e) {
      console.log(e);
    }
  });

  writeFileSync(configPath, JSON.stringify(workspaces), { encoding: 'utf-8' });
};

refreshDatabase();

/** Handle creating/removing shortcuts on Windows when installing/uninstalling. */
if (require('electron-squirrel-startup')) {
  app.quit();
}

/**
 * This method will be called when Electron has finished
 * initialization and is ready to create browser windows.
 * Some APIs can only be used after this event occurs.
 */
app.on('ready', createAppWindow);

/**
 * Emitted when the application is activated. Various actions can
 * trigger this event, such as launching the application for the first time,
 * attempting to re-launch the application when it's already running,
 * or clicking on the application's dock or taskbar icon.
 */
app.on('activate', () => {
  /**
   * On OS X it's common to re-create a window in the app when the
   * dock icon is clicked and there are no other windows open.
   */
  if (BrowserWindow.getAllWindows().length === 0) {
    createAppWindow();
  }
});

/**
 * Emitted when all windows have been closed.
 */
app.on('window-all-closed', () => {
  /**
   * On OS X it is common for applications and their menu bar
   * to stay active until the user quits explicitly with Cmd + Q
   */
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

/**
 * In this file you can include the rest of your app's specific main process code.
 * You can also put them in separate files and import them here.
 */
