// import { Editor } from '@renderer/components/quesu/Editor'
import React from 'react'
import Editor from '@stfy/react-editor.js'

export const EditorScreen: React.FC = () => {
  return (
    <div className="tw-h-screen tw-w-full">
      <Editor
        autofocus
        onChange={() => console.log('Something is changing!!')}
        onData={(data) => console.log(data)}
        onReady={() => console.log('Start!')}
        data={{
          time: 1554920381017,
          blocks: [
            {
              type: 'header',
              data: {
                text: 'Hello Editor.js',
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
