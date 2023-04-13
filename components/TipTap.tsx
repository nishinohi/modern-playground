import { EditorContent, FloatingMenu, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect, useState } from 'react'
import { RiMapPinAddLine } from 'react-icons/ri'

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: `
      <p>
        This is an example of a Medium-like editor. Enter a new line and some buttons will appear.
      </p>
      <p></p>
    `,
    editorProps: {
      attributes: {
        class: 'prose prose-neutral m-5 rounded-md border border-solid p-5 focus:outline-none',
        // 'prose prose-neutral dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
      },
    },
  })

  const [isEditable, setIsEditable] = useState(true)

  useEffect(() => {
    if (editor) {
      editor.setEditable(isEditable)
    }
  }, [isEditable, editor])

  return (
    <>
      <div>
        <input type="checkbox" checked={isEditable} onChange={() => setIsEditable(!isEditable)} />
        Editable
      </div>
      {editor && (
        <FloatingMenu editor={editor} tippyOptions={{ duration: 100, placement: 'left' }}>
          <RiMapPinAddLine className={'h-6 w-6 fill-stone-700 hover:cursor-pointer'} />
          {/* <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`rounded-md border border-solid border-gray-500 px-1
            ${editor.isActive('heading', { level: 1 }) ? 'bg-slate-300' : ''}`}
          >
            h1
          </button> */}
          {/* <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={`rounded-md border border-solid border-gray-500 px-1
              ${editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}`}
            >
              h2
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`rounded-md border border-solid border-gray-500 px-1
                ${editor.isActive('bulletList') ? 'is-active' : ''}`}
            >
              bullet list
            </button> */}
          {/* </div> */}
        </FloatingMenu>
      )}
      <EditorContent editor={editor} />
    </>
  )
}

export default Tiptap
