import { BlockElement } from '@blocksuite/lit';
import { SchemaToModel, defineBlockSchema } from '@blocksuite/store';
import { html } from 'lit';
import { customElement } from 'lit/decorators.js';

export const MyBlockSchema = defineBlockSchema({
  flavour: 'my-block',
  props: (internal) => ({
    text: internal.Text(),
    level: 0,
  }),
  metadata: {
    version: 1,
    role: 'content',
  },
});

type MyBlockModel = SchemaToModel<typeof MyBlockSchema>;

@customElement('my-block')
class MyBlockView extends BlockElement<MyBlockModel> {
  override render() {
    return html`
      <div>
        <h3>My Block</h3>
      </div>
    `;
  }
}
