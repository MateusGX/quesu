import '@blocksuite/blocks';
import '@blocksuite/editor';
import React, { useEffect, useState } from 'react';
import './scss/Editor.scss';
import { icons } from './Icons';
import format from 'date-fns/format';
import { nanoid } from 'nanoid';
import { createEditor, createPage } from '@src/quesu/utils';
import { CustomNavigationPanel } from '@src/quesu/components/custom-navigation-panel';
import { createEvent } from 'react-event-hook';
import { base64StringToBlob, blobToBase64String } from 'blob-util';
// import { ipcRenderer } from 'electron';

import * as Y from 'yjs';
// import { writeFileSync, existsSync, mkdirSync } from 'fs';
// import { join } from 'path';
// import electron from 'electron';
import quesuContext from '../../../misc/window/quesuContextApi';
import {
  redirect,
  useLoaderData,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { Id, toast } from 'react-toastify';
import { MyBlockSchema } from '@src/quesu/custom-block';
import {
  Generator,
  Page,
  PageMeta,
  Schema,
  Workspace,
} from '@blocksuite/store';
import { EditorContainer } from '@blocksuite/editor';
import {
  AffineSchemas,
  Transformer,
  __unstableSchemas,
} from '@blocksuite/blocks';
// const { ipcRenderer } = window.require('electron');

const Editor: React.FC = () => {
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [editor, setEditor] = useState<EditorContainer | null>(null);
  const { useNewPageListener } = createEvent('new-page')();
  const { useSaveWorkspaceListener } = createEvent('save-workspace')<Id>();
  const { emitListPage } = createEvent('list-page')<Array<PageMeta>>();
  const { useSelectPageListener } = createEvent('select-page')<string>();
  const { useOpenWorkspaceListener } = createEvent('open-workspace')<{
    id: string;
    notification: Id;
  }>();
  const { useCreateWorkspaceListener } = createEvent('create-workspace')<Id>();

  const [darkTheme, setDarkTheme] = useState(true);

  const { useThemeChangedListener } = createEvent('theme-changed')();

  const { emitCurrentWorkspace } = createEvent('current-workspace')<string>();

  const update = () => {
    const useDarkTheme = parseInt(localStorage.getItem('dark-mode'));
    if (isNaN(useDarkTheme)) {
      setDarkTheme(true);
    } else if (useDarkTheme == 1) {
      setDarkTheme(true);
    } else if (useDarkTheme == 0) {
      setDarkTheme(false);
    }
  };

  useThemeChangedListener(() => {
    update();
  });

  const createWorkSpace = () => {
    document.getElementById('editor').innerHTML = '';

    const schema = new Schema();
    schema.register(AffineSchemas).register(__unstableSchemas);
    // .register([MyBlockSchema]);
    // schema.register([MyBlockSchema]);
    const _workspace = new Workspace({
      id: 'Untitled',
      schema,
      idGenerator: Generator.NanoID,
      defaultFlags: {},
    });

    _workspace.meta.pageMetasUpdated.on(() => {
      emitListPage(_workspace.meta.pageMetas);
    });

    _workspace.slots.pageAdded.on(async (pageId) => {
      const page = _workspace.getPage(pageId) as Page;
      console.log('page added', page);
      emitListPage(_workspace.meta.pageMetas);
      await page.waitForLoaded();
    });

    _workspace.slots.pageAdded.once((pageId) => {
      const app = document.getElementById('editor');
      if (!app) {
        return;
      }
      const page = _workspace.getPage(pageId) as Page;

      const _editor = createEditor(page, app);

      setEditor(_editor);
      //const contentParser = new ContentParser(page);
      //const debugMenu = new DebugMenu();
      const navigationPanel = new CustomNavigationPanel();
      //debugMenu.workspace = _workspace;
      //debugMenu.editor = _editor;
      //debugMenu.navigationPanel = navigationPanel;
      navigationPanel.editor = _editor;
      //document.getElementById('editor').appendChild(debugMenu);
      document.getElementById('editor').appendChild(navigationPanel);
    });

    return _workspace;
  };

  useNewPageListener(async () => {
    const page = await createPage(workspace, { title: 'Untitled' });
    editor.page = page;
  });

  useSelectPageListener(async (pageId) => {
    const page = workspace.getPage(pageId) as Page;
    editor.page = page;
  });

  useSaveWorkspaceListener(async (notification) => {
    const blob = await Transformer.Zip.exportPages(
      workspace,
      Array.from(workspace.pages.values()),
    );
    const base64 = await blobToBase64String(blob);
    const ls_work = localStorage.getItem('workspace');
    const w_name = localStorage.getItem('workspace-name') || 'Untitled';
    quesuContext.save_workspace(base64, ls_work, w_name);
    toast.update(notification, {
      autoClose: 1500,
      type: 'success',
      render: 'Workspace Created',
      theme: darkTheme ? 'dark' : 'light',
    });
  });

  const loadAll = async () => {
    const _workspace = createWorkSpace();
    let wName = 'Untitled';
    const id_work = localStorage.getItem('workspace');
    if (id_work) {
      const buffer = await quesuContext.open_workspace(id_work);
      if (buffer) {
        const blob = base64StringToBlob(buffer.content, 'application/zip');
        await Transformer.Zip.importPages(_workspace, blob);
        wName = buffer.name;
      } else {
        await createPage(_workspace, { title: 'Untitled' });
      }
    } else {
      await createPage(_workspace, { title: 'Untitled' });
    }
    console.log('load all', _workspace.id);
    localStorage.setItem('workspace-name', wName);
    emitCurrentWorkspace(wName);
    setWorkspace(_workspace);
  };

  useOpenWorkspaceListener(async ({ id, notification }) => {
    console.log('open workspace', id);
    localStorage.setItem('workspace', id);
    loadAll();
    toast.update(notification, {
      autoClose: 1500,
      type: 'success',
      render: 'Workspace Opened',
      theme: darkTheme ? 'dark' : 'light',
    });
  });

  useCreateWorkspaceListener((notification) => {
    console.log('create workspace');
    localStorage.removeItem('workspace');
    loadAll();
    toast.update(notification, {
      autoClose: 1500,
      type: 'success',
      render: 'Workspace Created',
      theme: darkTheme ? 'dark' : 'light',
    });
  });

  useEffect(() => {
    loadAll();
    // const editor = new SimpleAffineEditor();
    // document.getElementById('editor').innerHTML = '';
    // document.getElementById('editor').appendChild(editor);
  }, []);

  return <div id='editor'></div>;
};

export default Editor;
