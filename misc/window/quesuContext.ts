/**
 * Copyright (c) 2021, Guasam
 *
 * This software is provided "as-is", without any express or implied warranty. In no event
 * will the authors be held liable for any damages arising from the use of this software.
 * Read the LICENSE file for more details.
 *
 * @author  : guasam
 * @project : Electron Window
 * @package : Titlebar IPC (Renderer Process)
 */

import electron, { ipcRenderer } from 'electron';

const quesuContext = {
  save_workspace(workspace: any, id: string, name: string) {
    ipcRenderer.invoke('save-workspace', [workspace, id, name]);
  },
  async get_workspaces() {
    const w = await ipcRenderer.invoke('get-workspaces');
    console.log(w);
    return w;
  },
  async open_workspace(id: string) {
    const bin = await ipcRenderer.invoke('open-workspace', id);
    return bin;
  },
  async rename_workspace(id: string, newName: string) {
    console.log(id, newName);
    const bin = await ipcRenderer.invoke('rename-workspace', [id, newName]);
    return bin;
  },
};

export type QuesuContextApi = typeof quesuContext;

export default quesuContext;
