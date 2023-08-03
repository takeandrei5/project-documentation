import {Editor} from '@tinymce/tinymce-react'
import {useRef} from 'react'
import type {EditorEvent, Events, Editor as TinyMCEEditor} from 'tinymce'
import {useAi} from './hooks/useAi'
import {useCallout} from './hooks/useCallout'
import {useDragAndDrop} from './hooks/useDragAndDrop'
import {useSlashCommand} from './hooks/useSlashCommand'
import {useTextEditor} from './hooks/useTextEditor'

import './tinyMce.css'
import {useComponent} from './hooks/useComponent'

const TextEditor:React.FC = () => {
  const editorRef = useRef<TinyMCEEditor | null>(null)
  const currentFocusedElement = useRef<Element | null>(null)

  const {getQuickToolbarElement, getTinyMceBodyElement, getTinyMceDocumentElement, getTinyMceFirstLineNode, getTinyMceFirstLineElement, isCharacterInsertedInFirstLineElement} =
          useTextEditor()
  const initializeSlashCommand = useSlashCommand()
  const initializeCallout = useCallout()
  const initializeAiRequest = useAi()
  const initializeDragAndDrop = useDragAndDrop()
  const initializeComponent = useComponent()

  const log = function () {
    if (editorRef.current) {
      console.log(editorRef.current.getContent())
    }
  }

	return (
		<>
			<Editor
				apiKey={import.meta.env.VITE_TINY_MCE_API_KEY}
				onInit={(_, editor: TinyMCEEditor) => (editorRef.current = editor)}
				initialValue='This is the initial content of the editor.'
				plugins={['ai', 'quickbars', 'autoresize', 'table', 'advtable', 'link', 'lists', 'checklist', 'code', 'advlist', 'accordion']}
				init={{
					menubar: false,
					toolbar: false,
					statusbar: false,
					placeholder: 'Untitled',
					font_size_input_default_unit: 'px',
					font_size_formats: '8px 10px 12px 14px 16px 18px 24px 36px 48px 72px',
					table_toolbar: 'tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol',
					quickbars_selection_toolbar:
						'aishortcuts bold italic underline strikethrough link fontsize blockquote callout | indent outdent | alignleft aligncenter alignjustify alignright | backcolor forecolor | bullist numlist checklist',
					quickbars_insert_toolbar: false,
					noneditable_noneditable_class: 'callout',
					content_style: `
          * {
            box-sizing: border-box !important;
            font-family: ui-sans-serif, -apple-system, 'system-ui', 'Segoe UI', Helvetica, 'Apple Color Emoji', Arial, sans-serif, 'Segoe UI Emoji', 'Segoe UI Symbol';
          }

          html {
            padding: 2rem 4rem 2rem 4rem;
          }

          body {
            margin: 0;
          }

          body table {
            word-break: break-word;
            white-space: pre-wrap;
            background-color: transparent;
          }

          body > p:first-child {
            font-size: 2.5rem;
            line-height: 1.2;
            font-weight: 700;
            color: #37352F;
          }

          body[aria-placeholder="Untitled"] {
            font-size: 2.5rem;
            line-height: 1.2;
            opacity: 0.3;
          }

          p {
            margin: 0;
          }

          .callout {
            margin: 1rem 0;
            padding: .5rem 1rem .5rem 1.5rem;
            background: #EEF4F8;
            border-left: 3px solid #9FCCE9;
            color: #5D7F95;
            font-size: 14px;
          }

          .callout.yellow {
              background: #FCF8F0;
              border-left-color: #F9DDA4;
              color: #B49A64;
          }

          .callout.red {
              background: #FCF0F0;
              border-left-color: #FFABAB;
              color: #AA6464;
          }

          .callout.orange {
            background: #FCF5F0;
            border-left-color: #FFd2ab;
            color: #AA8664;
          }

          .callout p {
            margin: 0;
          }

          details.mce-accordion {
            outline: 0 !important;
            width: fit-content;
          }

          .component {
            padding: .5rem 1rem .5rem 1.5rem;
            background: transparent;
            border: 3px solid #ff9494;
            border-radius:4px;
            color: #5D7F95;
            font-size: 14px;
          }

          details.mce-accordion summary.mce-accordion-summary {
            outline: 0 !important;
          }

          details.mce-accordion div.mce-accordion-body {
            margin-left: 0.875rem;
          }

          div.divider {
            display: flex;
            align-items:
            center;
            justify-content:
            center; pointer-events:
            auto; width: 100%;
            height: 1rem;
            flex: 0 0 auto;
            color: rgba(55, 53, 47, 0.16);
            cursor: default
          }

          div.divider > div[role="separator"] {
            width: 100%;
            height: 1px;
            visibility: visible;
            border-top: 1px solid rgba(55, 53, 47, 0.16);
          }

          div#drag-element-container {
            height: 1.5rem;
            width: 1.25rem;
            border-radius: 0.25rem;
            cursor: grab;
            display: flex;
            justify-content: center;
            align-items: center;
            fill: rgba(55, 53, 47, 0.35);
            user-select: none;
            pointer-events: cursor;
            position: absolute;
            z-index: 1000;
            margin-right: 0.125rem;
          }

          div#drag-element-container:hover {
            background: rgba(55, 53, 47, 0.08);
          }
          `,
          icons: 'material',
          init_instance_callback: (editor) => {
            editor.on('ExecCommand', (e) => {
              console.log(`The ${e.command} command was fired.`)
            })
          },
          setup: function (editor:TinyMCEEditor) {
            editor.on('dblclick', function (e:EditorEvent<MouseEvent>) {
              const quickToolbarElement:Element = getQuickToolbarElement()
              const firstChildNode:ChildNode = getTinyMceFirstLineNode()

              if (e.target === firstChildNode) {
                quickToolbarElement.setAttribute('style', 'display: none')
              } else {
                quickToolbarElement.setAttribute('style', 'position: relative')
              }
            })

            editor.on('click', function (e:EditorEvent<MouseEvent>) {
              if (e.target.nodeName === 'SUMMARY') {
                editor.execCommand('ToggleAccordion', false)
              }
            })

            editor.on('keydown', function (e:EditorEvent<KeyboardEvent>) {
              if (e.key === 'Enter' && e.shiftKey && isCharacterInsertedInFirstLineElement(editor)) {
                e.preventDefault()
              }

              if (currentFocusedElement.current && e.key === 'a') {
                editor.selection.select(currentFocusedElement.current, true)
              } else {
                currentFocusedElement.current = null
              }

              if (e.ctrlKey || e.metaKey) {
                currentFocusedElement.current = editor.selection.getNode()
              }
            })

            editor.on('NodeChange', function (e:EditorEvent<Events.NodeChangeEvent>) {
              const quickToolbarElement:Element = getQuickToolbarElement()
              const firstChildElement:Element = getTinyMceFirstLineElement()

              if (e.element === firstChildElement || !e.element.innerHTML) {
                quickToolbarElement.setAttribute('style', 'display: none')
              } else {
                quickToolbarElement.setAttribute('style', 'position: relative')
              }
            })

            initializeCallout(editor)
            initializeSlashCommand(editor)
            initializeDragAndDrop(editor)
            initializeComponent(editor)
          },
          ai_request: initializeAiRequest
        }}
      />
      <button onClick={log}>Log editor content</button>
    </>
  )
}

export default TextEditor
