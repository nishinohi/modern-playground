import Highlight from '@tiptap/extension-highlight'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { BubbleMenu, BubbleMenuProps, EditorContent, FloatingMenu, isTextSelection, useEditor } from '@tiptap/react'

import StarterKit from '@tiptap/starter-kit'
import { ChangeEvent, MouseEventHandler, useCallback, useEffect, useRef, useState } from 'react'
import { BiBold, BiCodeBlock, BiItalic } from 'react-icons/bi'
import { FaListOl, FaListUl, FaRegImage } from 'react-icons/fa'
import { GoCode } from 'react-icons/go'
import { IoIosQuote } from 'react-icons/io'
import { IoLink } from 'react-icons/io5'
import { MdOutlineFormatClear, MdStrikethroughS } from 'react-icons/md'
import { RiMarkPenFill, RiSeparator } from 'react-icons/ri'

const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      StarterKit, //
      Highlight.configure({ multicolor: true }), //
      Link.configure({ openOnClick: false }), //
      Image, //
    ],
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

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageButtonClick: MouseEventHandler<HTMLButtonElement> = () => {
    if (fileInputRef.current) fileInputRef.current.click()
  }

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!editor) return
    const reader = new FileReader()
    reader.onload = () => {
      editor
        .chain()
        .focus()
        .setImage({ src: reader.result as string })
        .run()
    }
    reader.readAsDataURL(file)
  }

  const setLink = useCallback(() => {
    if (!editor) return
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl)

    // cancelled
    if (url === null) {
      return
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()

      return
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor])

  const shuldShow = useCallback<NonNullable<BubbleMenuProps['shouldShow']>>(({ editor, view, state, from, to }) => {
    const { doc, selection } = state
    const { empty } = selection

    // Sometime check for `empty` is not enough.
    // Doubleclick an empty paragraph returns a node size of 2.
    // So we check also for an empty text size.
    const isEmptyTextBlock = !doc.textBetween(from, to).length && isTextSelection(state.selection)
    const hasEditorFocus = view.hasFocus()

    if (
      !hasEditorFocus ||
      empty ||
      isEmptyTextBlock ||
      !editor.isEditable ||
      editor.isActive('horizontalRule') ||
      editor.isActive('image')
    )
      return false

    return true
  }, [])

  const shuldShowLink = useCallback<NonNullable<BubbleMenuProps['shouldShow']>>(({ editor, view, state, from, to }) => {
    const { doc } = state

    // Sometime check for `empty` is not enough.
    // Doubleclick an empty paragraph returns a node size of 2.
    // So we check also for an empty text size.
    const isEmptyTextBlock = !doc.textBetween(from, to).length && isTextSelection(state.selection)
    return isEmptyTextBlock && editor.isActive('link')
  }, [])

  useEffect(() => {
    if (editor) {
      editor.setEditable(isEditable)
      editor.setOptions({
        editorProps: {
          handlePaste: (view, event) => {
            const clipboardItems = event.clipboardData?.items
            if (!clipboardItems) return false

            for (const clipboardItem of Array.from(clipboardItems)) {
              if (clipboardItem.type.indexOf('image') === -1) return false

              const blob = clipboardItem.getAsFile()
              if (!blob) return false

              const reader = new FileReader()
              reader.onload = () => {
                editor
                  .chain()
                  .focus()
                  .setImage({
                    src: reader.result as string,
                  })
                  .run()
              }
              reader.readAsDataURL(blob)
              return true
            }
            return false
          },
        },
      })
    }
  }, [isEditable, editor])

  return (
    <>
      <div>
        <input type="checkbox" checked={isEditable} onChange={() => setIsEditable(!isEditable)} />
        Editable
      </div>
      {editor && (
        <>
          <BubbleMenu
            pluginKey={'link'}
            editor={editor}
            shouldShow={shuldShowLink}
            tippyOptions={{ duration: 100, placement: 'bottom' }}
          >
            <a target={'_blank'} href={editor.getAttributes('link').href} rel="noreferrer">
              {editor.getAttributes('link').href}
            </a>
          </BubbleMenu>
          <BubbleMenu pluginKey={'test'} editor={editor} shouldShow={shuldShow} tippyOptions={{ duration: 100 }}>
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
                onClick={setLink}
                className={`h-full rounded-md border border-solid border-stone-500 px-1 font-bold text-stone-600
            ${editor.isActive('link') ? 'bg-stone-200' : 'bg-white'}`}
              >
                <IoLink className={'fill-stone-600'} />
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
        </>
      )}
      {editor && (
        // <FloatingMenu editor={editor} shouldShow={shuldShow} tippyOptions={{ duration: 100, placement: 'left' }}>
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
              onClick={handleImageButtonClick}
              className={`h-full w-7 cursor-pointer rounded-md border border-solid border-stone-500 fill-stone-600 px-1 
                ${editor.isActive('bulletList') ? 'bg-stone-200' : 'bg-white'}`}
            >
              <FaRegImage className={'fill-stone-600'} />
              <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} hidden />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              className={`h-full w-7 cursor-pointer rounded-md border border-solid border-stone-500 fill-stone-600 px-1 
              ${editor.isActive('bulletList') ? 'bg-stone-200' : 'bg-white'}`}
            >
              <IoIosQuote className={'fill-stone-600'} />
            </button>
            <button
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
              className={`h-full w-7 cursor-pointer rounded-md border border-solid border-stone-500 fill-stone-600 px-1`}
            >
              <RiSeparator className={'fill-stone-600'} />
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
