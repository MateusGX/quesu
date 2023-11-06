/**
 * Copyright (c) 2021, Guasam
 *
 * This software is provided "as-is", without any express or implied warranty. In no event
 * will the authors be held liable for any damages arising from the use of this software.
 * Read the LICENSE file for more details.
 *
 * @author  : guasam
 * @project : Electron Window
 * @package : Titlebar IPC (Main Process)
 */

import electron, { BrowserWindow, ipcMain } from 'electron';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from 'fs';
import { join } from 'path';
import { v4 as uuid } from 'uuid';
import { updateQuesuWorkspaces } from '@utils/file';

export const registerQuesuIpc = (mainWindow: BrowserWindow) => {
  ipcMain.handle('save-workspace', async (e, args) => {
    const [bin, wid, wname] = args as [string, string, string];

    const userDataPath = electron.app.getPath('userData');
    const workspacesPath = join(userDataPath, 'workspaces');
    if (!existsSync(workspacesPath)) mkdirSync(workspacesPath);
    const id = wid || uuid();
    const workspacePath = join(workspacesPath, id + '.qsw');
    const content = {
      name: wname,
      content: bin,
    };

    writeFileSync(workspacePath, JSON.stringify(content), {
      encoding: 'utf-8',
    });
    updateQuesuWorkspaces(id, wname);
    console.log('saved', workspacePath);
  });

  ipcMain.handle('rename-workspace', async (e, args) => {
    const [wid, wname] = args as [string, string];

    const userDataPath = electron.app.getPath('userData');
    const workspacesPath = join(userDataPath, 'workspaces');
    if (!existsSync(workspacesPath)) mkdirSync(workspacesPath);

    const workspacePath = join(workspacesPath, wid + '.qsw');
    if (!existsSync(workspacePath)) return;
    const buffer = readFileSync(workspacePath, { encoding: 'utf-8' });
    const content = JSON.parse(buffer);
    content.name = wname;

    writeFileSync(workspacePath, JSON.stringify(content), {
      encoding: 'utf-8',
    });
    updateQuesuWorkspaces(wid, wname);
    console.log('renamed', workspacePath);
  });

  ipcMain.handle('get-workspaces', async () => {
    const userDataPath = electron.app.getPath('userData');
    const workspacesPath = join(userDataPath, 'workspaces');
    if (!existsSync(workspacesPath)) mkdirSync(workspacesPath);
    const configPath = join(workspacesPath, 'quesu-workspaces.json');
    if (!existsSync(configPath)) return [];
    const buffer = readFileSync(configPath, { encoding: 'utf-8' });
    const bufferJson = JSON.parse(buffer);
    return Object.keys(bufferJson).map((key) => ({
      id: key,
      name: bufferJson[key],
    }));
  });

  ipcMain.handle('open-workspace', async (e, args) => {
    const id = args as string;

    const userDataPath = electron.app.getPath('userData');
    const workspacesPath = join(userDataPath, 'workspaces');
    if (!existsSync(workspacesPath)) mkdirSync(workspacesPath);
    const workspacePath = join(workspacesPath, id + '.qsw');
    if (!existsSync(workspacePath)) return null;

    const buffer = readFileSync(workspacePath, { encoding: 'utf-8' });
    return JSON.parse(buffer);
  });
};
