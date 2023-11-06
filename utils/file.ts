import electron, { BrowserWindow, ipcMain } from 'electron';
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from 'fs';
import { join } from 'path';

export const updateQuesuWorkspaces = (id: string, name: string) => {
  const userDataPath = electron.app.getPath('userData');
  const workspacesPath = join(userDataPath, 'workspaces');
  const configPath = join(workspacesPath, 'quesu-workspaces.json');

  let workspaces = {} as any;

  if (!existsSync(workspacesPath)) mkdirSync(workspacesPath);
  if (existsSync(configPath)) {
    const buffer = readFileSync(configPath, { encoding: 'utf-8' });
    const data = JSON.parse(buffer);
    workspaces = data;
  }
  workspaces[id] = name;
  writeFileSync(configPath, JSON.stringify(workspaces), { encoding: 'utf-8' });
};
