import React from 'react'
import Editor, { EditorWrapper } from '@stfy/react-editor.js'

import EditorChecklist from '@editorjs/checklist'
import EditorDelimiter from '@editorjs/delimiter'
import EditorHeader from '@editorjs/header'
import EditorInlineCode from '@editorjs/inline-code'
import EditorList from '@editorjs/nested-list'
import EditorMarker from '@editorjs/marker'
import EditorParagraph from '@editorjs/paragraph'
import EditorQuote from '@editorjs/quote'
import EditorSimpleImage from '@editorjs/simple-image'
import EditorTable from '@editorjs/table'
import EditorUnderline from '@editorjs/underline'
import EditorWarning from '@editorjs/warning'

export const EditorScreen: React.FC = () => {
  const editorRef = React.useRef<EditorWrapper>(null)

  return (
    <div className="tw-h-screen tw-w-full tw-typography">
      <Editor
        autofocus
        placeholder="Start writing your document here..."
        defaultBlock='paragraph'
        tools={{
          checklist: EditorChecklist,
          delimiter: EditorDelimiter,
          inlineCode: EditorInlineCode,
          list: EditorList,
          marker: EditorMarker,
          paragraph: EditorParagraph,
          header: {
            class: EditorHeader,
            config: {
              placeholder: 'Enter a title'
            }
          },
          quote: EditorQuote,
          image: EditorSimpleImage,
          table: EditorTable,
          underline: EditorUnderline,
          warning: EditorWarning
        }}
        ref={editorRef}
        onChange={() => console.log('Something is changing!!')}
        onData={(data) => console.log(data)}
        onReady={() => {
          //const editor = editorRef.current?.editor
          console.log('Start!')
        }}
        data={{
          time: 1554920381017,
          blocks: [
            {
              type: 'header',
              data: {
                text: 'Editor.js',
                level: 2
              }
            }
          ],
          version: '2.12.4'
        }}
      />
    </div>
  )
}
