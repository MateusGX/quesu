import React from 'react';
import { createRoot } from 'react-dom/client';
import WindowFrame from '@misc/window/components/WindowFrame';
import Application from '@components/Application';
import '@blocksuite/editor/themes/affine.css';
import Editor from '@components/Editor';
import '@components/Application.scss';
import MenuWrapper from '@components/MenuWrapper';
import { HotkeysProvider } from 'react-hotkeys-hook';
import { KBarProvider } from 'kbar';
import { MenuConfig, MenuProvider } from 'kmenu';
import 'kmenu/dist/index.css';
import ProviderMenu from '@components/ProviderMenu';
import {
  HashRouter,
  Routes,
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
  Route,
  Link,
} from 'react-router-dom';
import quesuContext from '../../misc/window/quesuContextApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@components/scss/borderless.scss';

// Say something
console.log('[QUESU] : Renderer execution started');

const router = createHashRouter([
  {
    path: '/',
    element: <Editor />,
  },
  {
    path: '/load/:workspace',
    // loader: async ({ params }) => {
    //   const decoded = atob(params.workspace);
    //   console.log('broute', decoded);
    //   const buffer = await quesuContext.open_workspace(decoded);
    //   console.log('broute', buffer);
    //   return buffer;
    // },
    element: <Editor />,
  },
]);

// Application to Render
const app = (
  <WindowFrame title='Quesu' platform='windows'>
    <HotkeysProvider initiallyActiveScopes={['settings']}>
      <ProviderMenu />
      <Editor />
      <ToastContainer style={{ marginTop: '60px' }} closeButton={false} />
    </HotkeysProvider>
  </WindowFrame>
);

// Render application in DOM
createRoot(document.getElementById('app')).render(app);
