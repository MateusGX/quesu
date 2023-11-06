/**
 * Copyright (c) 2021, Guasam
 *
 * This software is provided "as-is", without any express or implied warranty. In no event
 * will the authors be held liable for any damages arising from the use of this software.
 * Read the LICENSE file for more details.
 *
 * @author  : guasam
 * @project : Electron Window
 * @package : Window Controls - Close, Minimize, Maximize (Component)
 */

import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import context from '../titlebarContextApi';
import { faSun, faMoon } from '@fortawesome/free-regular-svg-icons';

import ControlButton from './ControlButton';
import ControlButtonWithIcon from './ControlButtonWithIcon';
import { EditorContainer } from '@blocksuite/editor';
import { createEvent } from 'react-event-hook';

type Props = {
  platform: string;
  tooltips?: boolean;
};

const closePath =
  'M 0,0 0,0.7 4.3,5 0,9.3 0,10 0.7,10 5,5.7 9.3,10 10,10 10,9.3 5.7,5 10,0.7 10,0 9.3,0 5,4.3 0.7,0 Z';
const maximizePath = 'M 0,0 0,10 10,10 10,0 Z M 1,1 9,1 9,9 1,9 Z';
const minimizePath = 'M 0,5 10,5 10,6 0,6 Z';

const SunIcon =
  'M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z';
const MoonIcon =
  'M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z';

const ViewPage =
  'M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z';
const ViewBoard =
  'M3 0h10a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3zm0 8h10a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2zm0 1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1H3z';

const WindowControls: React.FC<Props> = (props) => {
  const [darkTheme, setDarkTheme] = useState(true);
  const [mode, setMode] = useState('page');

  const { emitThemeChanged } = createEvent('theme-changed')();

  useEffect(() => {
    const useDarkTheme = parseInt(localStorage.getItem('dark-mode'));
    if (isNaN(useDarkTheme)) {
      setDarkTheme(true);
    } else if (useDarkTheme == 1) {
      setDarkTheme(true);
    } else if (useDarkTheme == 0) {
      setDarkTheme(false);
    }
  }, []);

  useEffect(() => {
    const html = document.querySelector('html');
    if (darkTheme) {
      localStorage.setItem('dark-mode', '1');
      document.body.classList.add('dark-mode');
      html.classList.add('dark');
      html.classList.add('sl-theme-dark');
    } else {
      localStorage.setItem('dark-mode', '0');
      document.body.classList.remove('dark-mode');
      html.classList.remove('dark');
      html.classList.remove('sl-theme-dark');
    }
    html.setAttribute('data-theme', darkTheme ? 'dark' : 'light');
    emitThemeChanged();
  }, [darkTheme]);

  function toggleTheme() {
    console.log('toggle theme', faSun.icon[4].toString());
    setDarkTheme(!darkTheme);
  }

  function switchEditorMode() {
    const editor = document.querySelector<EditorContainer>('editor-container');
    console.log('switch editor mode', editor);
    if (!editor) return;
    if (editor instanceof EditorContainer) {
      const mode = editor.mode === 'page' ? 'edgeless' : 'page';
      editor.mode = mode;
      setMode(mode);
    }
  }

  return (
    <section
      className={classNames(
        'window-titlebar-controls',
        `type-${props.platform}`,
      )}
    >
      <ControlButtonWithIcon
        name='toggle theme'
        onClick={() => switchEditorMode()}
        path={mode === 'page' ? ViewBoard : ViewPage}
        title={props.tooltips ? `Change view` : null}
      />
      <ControlButtonWithIcon
        name='toggle theme'
        onClick={() => toggleTheme()}
        path={darkTheme ? SunIcon : MoonIcon}
        title={
          props.tooltips
            ? `Change to ${!darkTheme ? 'dark' : 'light'} theme`
            : null
        }
      />
      <ControlButton
        name='minimize'
        onClick={() => context.minimize()}
        path={minimizePath}
        title={props.tooltips ? 'Minimize' : null}
      />
      <ControlButton
        name='maximize'
        onClick={() => context.toggle_maximize()}
        path={maximizePath}
        title={props.tooltips ? 'Maximize' : null}
      />
      <ControlButton
        name='close'
        onClick={() => context.exit()}
        path={closePath}
        title={props.tooltips ? 'Close' : null}
      />
    </section>
  );
};

export default WindowControls;
