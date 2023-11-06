/* eslint-disable @typescript-eslint/no-restricted-imports */
import '@shoelace-style/shoelace/dist/components/button-group/button-group.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/color-picker/color-picker.js';
import '@shoelace-style/shoelace/dist/components/divider/divider.js';
import '@shoelace-style/shoelace/dist/components/dropdown/dropdown.js';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js';
import '@shoelace-style/shoelace/dist/components/menu/menu.js';
import '@shoelace-style/shoelace/dist/components/select/select.js';
import '@shoelace-style/shoelace/dist/components/tab-group/tab-group.js';
import '@shoelace-style/shoelace/dist/components/tab/tab.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';
import '@shoelace-style/shoelace/dist/themes/light.css';
import '@shoelace-style/shoelace/dist/themes/dark.css';

import {
  COLOR_VARIABLES,
  createPage,
  extractCssVariables,
  FONT_FAMILY_VARIABLES,
  SIZE_VARIABLES,
  Transformer,
  VARIABLES,
} from '@blocksuite/blocks';
import { NOTE_WIDTH } from '@blocksuite/blocks';
import type { ContentParser } from '@blocksuite/blocks/content-parser';
import { EditorContainer } from '@blocksuite/editor';
import { ShadowlessElement } from '@blocksuite/lit';
import { Utils, type Workspace } from '@blocksuite/store';
import type { SlDropdown, SlTab, SlTabGroup } from '@shoelace-style/shoelace';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';
import { css, html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { Pane } from 'tweakpane';

import { registerFormatBarCustomElement } from './custom-format-bar';
import type { CustomNavigationPanel } from './custom-navigation-panel';
import { th } from 'date-fns/locale';

const cssVariablesMap = extractCssVariables(document.documentElement);
const plate: Record<string, string> = {};
COLOR_VARIABLES.forEach((key: string) => {
  plate[key] = cssVariablesMap[key];
});
const OTHER_CSS_VARIABLES = VARIABLES.filter(
  (variable) =>
    !SIZE_VARIABLES.includes(variable) &&
    !COLOR_VARIABLES.includes(variable) &&
    !FONT_FAMILY_VARIABLES.includes(variable),
);

const basePath = true
  ? '/node_modules/@shoelace-style/shoelace/dist'
  : 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.0.0-beta.87/dist';
setBasePath(basePath);

@customElement('debug-menu')
export class DebugMenu extends ShadowlessElement {
  static override styles = css`
    :root {
      --sl-font-size-medium: var(--affine-font-xs);
      --sl-input-font-size-small: var(--affine-font-xs);
    }

    .dg.ac {
      z-index: 1001 !important;
    }
  `;

  @property({ attribute: false })
  workspace!: Workspace;

  @property({ attribute: false })
  editor!: EditorContainer;

  @property({ attribute: false })
  contentParser!: ContentParser;

  @property({ attribute: false })
  navigationPanel!: CustomNavigationPanel;

  @property({ attribute: false })
  mode: 'page' | 'edgeless' = 'page';

  @property({ attribute: false })
  readonly = false;

  @state()
  private _hasOffset = false;

  @query('#block-type-dropdown')
  blockTypeDropdown!: SlDropdown;

  @state()
  private _showTabMenu = true;

  get page() {
    return this.editor.page;
  }

  override update(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('mode')) {
      const mode = this.mode;
      this.editor.mode = mode;
    }
    if (changedProperties.has('_hasOffset')) {
      const appRoot = document.getElementById('app');
      if (!appRoot) return;
      const style: Partial<CSSStyleDeclaration> = this._hasOffset
        ? {
            margin: '60px 40px 240px 40px',
            overflow: 'auto',
            height: '400px',
            boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)',
          }
        : {
            margin: '0',
            overflow: 'initial',
            // edgeless needs the container height
            height: '100%',
            boxShadow: 'initial',
          };
      Object.assign(appRoot.style, style);
    }
    super.update(changedProperties);
  }

  override render() {
    return html`
      <style>
        .debug-menu {
          display: flex;
          flex-wrap: nowrap;
          position: fixed;
          top: 45px;
          left: 20px;
          width: 100%;
          overflow: auto;
          z-index: 1000; /* for debug visibility */
          pointer-events: none;
        }

        @media print {
          .debug-menu {
            display: none;
          }
        }

        .default-toolbar {
          display: flex;
          gap: 5px;
          padding: 8px;
        }

        .default-toolbar > * {
          pointer-events: auto;
        }

        .edgeless-toolbar {
          align-items: center;
          margin-right: 17px;
          pointer-events: auto;
        }

        .edgeless-toolbar sl-select,
        .edgeless-toolbar sl-color-picker,
        .edgeless-toolbar sl-button {
          margin-right: 4px;
        }
        .block-type-dropdown {
          width: 180px;
          gap: 4px;
        }
        .block-type-text {
          max-width: 120px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }
      </style>
      <div class="debug-menu default">
        <div class="default-toolbar">
          <sl-dropdown class="block-type-dropdown" placement="bottom" hoist>
            <sl-button
              size="small"
              class="block-type-dropdown"
              slot="trigger"
              caret
            >
              <div class="block-type-text">
                ${this.page.meta.title || 'Untitled'}
              </div>
            </sl-button>
            ${getTabGroupTemplate({
              workspace: this.workspace,
              editor: this.editor,
              requestUpdate: () => this.requestUpdate(),
            })}
          </sl-dropdown>
          <sl-button
            size="small"
            content="Add New Page"
            @click=${async () => {
              const page = await createPage(this.workspace);
              this.editor.page = page;
            }}
          >
            <sl-icon name="file-earmark-plus"></sl-icon>
          </sl-button>
        </div>
      </div>
    `;
  }
}

function getTabGroupTemplate({
  workspace,
  editor,
  requestUpdate,
}: {
  workspace: Workspace;
  editor: EditorContainer;
  requestUpdate: () => void;
}) {
  workspace.meta.pageMetasUpdated.on(requestUpdate);
  const pageList = workspace.meta.pageMetas;

  return html` <sl-menu class="block-type-dropdown">
    ${pageList.map(
      (page) =>
        html`<sl-menu-item
          @click=${() => {
            const otherPage = workspace.getPage(page.id);
            if (otherPage) {
              editor.page = otherPage;
            }
          }}
        >
          ${page.title || 'Untitled'}
        </sl-menu-item>`,
    )}
  </sl-menu>`;
}

declare global {
  interface HTMLElementTagNameMap {
    'debug-menu': DebugMenu;
  }
}
