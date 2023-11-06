import { EditorContainer } from '@blocksuite/editor';
import { Page, Workspace } from '@blocksuite/store';

export const createEditor = (page: Page, element: HTMLElement) => {
  const editor = new EditorContainer();
  editor.page = page;
  editor.slots.pageLinkClicked.on(({ pageId }: any) => {
    const target = page.workspace.getPage(pageId);
    if (!target) {
      throw new Error(`Failed to jump to page ${pageId}`);
    }
    editor.page = target;
  });
  element.append(editor);

  editor.createBlockHub().then((blockHub) => {
    document.getElementById('editor').appendChild(blockHub);
  });
  return editor;
};

export async function createPage(
  workspace: Workspace,
  options: { title?: string } = {},
) {
  const page = workspace.createPage();
  await page.waitForLoaded();

  const pageBlockId = page.addBlock('affine:page', {
    title: new page.Text(options.title ?? ''),
  });
  page.addBlock('affine:surface', {}, pageBlockId);
  const noteId = page.addBlock('affine:note', {}, pageBlockId);
  page.addBlock('affine:paragraph', {}, noteId);
  // To make sure the content of new page would not be clear
  // By undo operation for the first time
  page.resetHistory();
  return page;
}
