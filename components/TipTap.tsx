import { EditorContent, FloatingMenu, useEditor } from '@tiptap/react'

import StarterKit from '@tiptap/starter-kit'
import { useEffect, useState } from 'react'
import { BiCodeBlock } from 'react-icons/bi'
import { FaListOl, FaListUl } from 'react-icons/fa'
import { IoIosQuote } from 'react-icons/io'

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
        class:
          'prose prose-sm w-full prose-neutral m-5 rounded-md border border-solid border-stone-500 p-5 dark:prose-invert sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none',
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
          <div className="flex h-7 items-center space-x-2">
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={`h-full rounded-md border border-solid border-stone-500 px-1 font-bold text-stone-600
            ${editor.isActive('heading', { level: 1 }) ? 'bg-stone-200' : ''}`}
            >
              h1
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={`h-full rounded-md border border-solid border-stone-500 px-1 font-bold text-stone-600
              ${editor.isActive('heading', { level: 2 }) ? 'bg-stone-200' : ''}`}
            >
              h2
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={
                `h-full w-7 cursor-pointer rounded-md border border-solid border-stone-500 fill-stone-600 px-1` +
                `${editor.isActive('bulletList') ? 'bg-stone-200' : ''}`
              }
            >
              <FaListUl className={'fill-stone-600'} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={
                `h-full w-7 cursor-pointer rounded-md border border-solid border-stone-500 fill-stone-600 px-1` +
                `${editor.isActive('bulletList') ? 'bg-stone-200' : ''}`
              }
            >
              <FaListOl className={'fill-stone-600'} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={
                `h-full w-7 cursor-pointer rounded-md border border-solid border-stone-500 fill-stone-600 px-1` +
                `${editor.isActive('bulletList') ? 'bg-stone-200' : ''}`
              }
            >
              <IoIosQuote className={'fill-stone-600'} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={
                `h-full w-7 cursor-pointer rounded-md border border-solid border-stone-500 fill-stone-600 px-1` +
                `${editor.isActive('bulletList') ? 'bg-stone-200' : ''}`
              }
            >
              <BiCodeBlock className={'fill-stone-600'} />
            </button>
          </div>
        </FloatingMenu>
      )}
      <EditorContent editor={editor} />
    </>
  )
}

export default Tiptap
