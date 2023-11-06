import { contextBridge } from 'electron';
import titlebarContext from './titlebarContext';
import quesuContext from './quesuContext';

contextBridge.exposeInMainWorld('electron_window', {
  titlebar: titlebarContext,
  quesu: quesuContext,
});
