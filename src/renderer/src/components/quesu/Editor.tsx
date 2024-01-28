import { EDITOR_JS_TOOLS } from '@renderer/constants/editor'
import { createReactEditorJS } from 'react-editor-js'
import Frame from 'react-frame-component'

interface EditorProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Editor({}: EditorProps) {
  const ReactEditorJS = createReactEditorJS()
  return (
    <div>
      <ReactEditorJS
        tools={EDITOR_JS_TOOLS}
        defaultValue={{
          time: 1635603431943,
          blocks: [
            {
              id: '12iM3lqzcm',
              type: 'paragraph',
              data: {
                text: 'Hey. Meet the new Editor. On this page you can see it in action — try to edit this text.'
              }
            }
          ]
        }}
      />
    </div>
  )
}
