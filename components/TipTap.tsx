import Highlight from '@tiptap/extension-highlight'
import { BubbleMenu, EditorContent, FloatingMenu, useEditor } from '@tiptap/react'

import StarterKit from '@tiptap/starter-kit'
import { useEffect, useState } from 'react'
import { BiBold, BiCodeBlock, BiItalic } from 'react-icons/bi'
import { FaListOl, FaListUl } from 'react-icons/fa'
import { GoCode } from 'react-icons/go'
import { IoIosQuote } from 'react-icons/io'
import { MdOutlineFormatClear, MdStrikethroughS } from 'react-icons/md'
import { RiMarkPenFill } from 'react-icons/ri'

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit, Highlight.configure({ multicolor: true })],
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
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="flex h-7 items-center space-x-2">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`h-full rounded-md border border-solid border-stone-500 px-1 font-bold text-stone-600
            ${editor.isActive('bold') ? 'bg-stone-200' : 'bg-white'}`}
            >
              <BiBold className={'fill-stone-600'} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`h-full rounded-md border border-solid border-stone-500 px-1 font-bold text-stone-600
            ${editor.isActive('italic') ? 'bg-stone-200' : 'bg-white'}`}
            >
              <BiItalic className={'fill-stone-600'} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={`h-full rounded-md border border-solid border-stone-500 px-1 font-bold text-stone-600
            ${editor.isActive('strike') ? 'bg-stone-200' : 'bg-white'}`}
            >
              <MdStrikethroughS className={'fill-stone-600'} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleCode().run()}
              className={`h-full rounded-md border border-solid border-stone-500 px-1 font-bold text-stone-600
            ${editor.isActive('code') ? 'bg-stone-200' : 'bg-white'}`}
            >
              <GoCode className={'fill-stone-600'} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHighlight({ color: '#fde68a' }).run()}
              className={`h-full rounded-md border border-solid border-stone-500 px-1 font-bold text-stone-600
            ${editor.isActive('highlight') ? 'bg-stone-200' : 'bg-white'}`}
            >
              <RiMarkPenFill className={'fill-stone-600'} />
            </button>
            <button
              onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
              className={`h-full rounded-md border border-solid border-stone-500 bg-white px-1 font-bold text-stone-600`}
            >
              <MdOutlineFormatClear className={'fill-stone-600'} />
            </button>
          </div>
        </BubbleMenu>
      )}
      {editor && (
        <FloatingMenu editor={editor} tippyOptions={{ duration: 100, placement: 'left' }}>
          <div className="flex h-7 items-center space-x-2">
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={`h-full rounded-md border border-solid border-stone-500 px-1 font-bold text-stone-600 
              ${editor.isActive('heading', { level: 1 }) ? 'bg-stone-200' : 'bg-white'}`}
            >
              h1
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={`h-full rounded-md border border-solid border-stone-500 px-1 font-bold text-stone-600 
              ${editor.isActive('heading', { level: 2 }) ? 'bg-stone-200' : 'bg-white'}`}
            >
              h2
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`h-full w-7 cursor-pointer rounded-md border border-solid border-stone-500 fill-stone-600 px-1 
                ${editor.isActive('bulletList') ? 'bg-stone-200' : 'bg-white'}`}
            >
              <FaListUl className={'fill-stone-600'} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={`h-full w-7 cursor-pointer rounded-md border border-solid border-stone-500 fill-stone-600 px-1 
              ${editor.isActive('bulletList') ? 'bg-stone-200' : 'bg-white'}`}
            >
              <FaListOl className={'fill-stone-600'} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={`h-full w-7 cursor-pointer rounded-md border border-solid border-stone-500 fill-stone-600 px-1 
              ${editor.isActive('bulletList') ? 'bg-stone-200' : 'bg-white'}`}
            >
              <IoIosQuote className={'fill-stone-600'} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={`h-full w-7 cursor-pointer rounded-md border border-solid border-stone-500 fill-stone-600 px-1 
              ${editor.isActive('bulletList') ? 'bg-stone-200' : 'bg-white'}`}
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
