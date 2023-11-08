import {useTheme, type Theme} from '@mui/material'
import {Editor} from '@tinymce/tinymce-react'
import {useRef} from 'react'
import type {Editor as TinyMCEEditor} from 'tinymce'
import {useAccordion, useAi, useCallout, useComponent, useDragAndDrop, usePageEmbed, usePageTitle, useQuickToolbar, useSelectAllBlock, useSlashCommand} from './hooks'
import './tinyMce.css'
import type {TextEditorProps} from './types'
import useUpdater from './hooks/useUpdater'
import FormDialogC from '../../../../components/FormDialogC/FormDialogC.tsx'
import {useDialogControl} from '../../../../hooks'
import {useForm} from 'react-hook-form'
import {CreateOrganizationValidationSchema} from '../../../CreateOrganizationModule/services/FormComponent/schema.ts'
import useCreateComponent from '../CreateComponentFormC/hooks.ts'
import {CreateComponentFormC} from '../CreateComponentFormC'

const TextEditor:React.FC<TextEditorProps> = ({content = '', onContentChangedHandler}) => {
  const editorRef = useRef<TinyMCEEditor | null>(null)

  const initializeAccordion = useAccordion()
  const initializeAiRequest = useAi()
  const initializeCallout = useCallout()
  const initializeComponent = useComponent()
  const initializeDragAndDrop = useDragAndDrop()
  const initializePageEmbed = usePageEmbed()
  const initializePageTitle = usePageTitle()
  const initializeQuickToolbar = useQuickToolbar()
  const initializeSelectAllBlock = useSelectAllBlock()
  const initializeSlashCommand = useSlashCommand()
  const initializeUpdater = useUpdater(onContentChangedHandler)

  const theme:Theme = useTheme()

  const dialogControl = useDialogControl()

  const {control, onSubmitHandler, submitCallback, reset, projectValue, issueValue, componentTitleValue, isComponentTitleDirty} = useCreateComponent(dialogControl.closeHandler)

  return (
    <>
      <Editor
        apiKey={import.meta.env.VITE_TINY_MCE_API_KEY}
        onInit={(_, editor:TinyMCEEditor) => {
          editorRef.current = editor
        }}
        initialValue={content}
        plugins={['pageembed', 'ai', 'quickbars', 'autoresize', 'table', 'advtable', 'link', 'lists', 'checklist', 'code', 'advlist', 'accordion']}
        init={{
          menubar: false,
          toolbar: ['pageembed'],
          statusbar: false,
          placeholder: 'Untitled',
          font_size_input_default_unit: 'px',
          font_size_formats: '8px 10px 12px 14px 16px 18px 24px 36px 48px 72px',
          forced_root_block: 'div',
          table_toolbar: 'tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol',
          quickbars_selection_toolbar:
            'pageembed aishortcuts bold italic underline strikethrough link fontsize blockquote callout | indent outdent | alignleft aligncenter alignjustify alignright | backcolor forecolor | bullist numlist checklist',
          quickbars_insert_toolbar: false,
          noneditable_noneditable_class: 'callout',
          content_style: `
          * :not(p#content-paragraph) {
            color: ${theme.palette.textColor[80]} !important;
          }

          * {
            box-sizing: border-box !important;
            font-family: ${theme.typography.fontFamily} !important;
          }

          html {
            padding-top: 2rem;
            padding-bottom: 2rem;
          }

          body {
            margin: 0;
          }

          body.mce-content-body:before {
            padding-left: 4rem;
          }

          body > * {
            padding-right: 4rem;
            padding-left: 4rem;
          }

          div.mce-visual-caret {
            padding: 0;
          }

          body table {
            word-break: break-word;
            white-space: pre-wrap;
            background-color: transparent;
          }

          body > div:first-child {
            font-size: 2.5rem;
            line-height: 1.2;
            font-weight: 700;
            color: ${theme.palette.textColor[100]} !important;
          }

          body[aria-placeholder="Untitled"] {
            font-size: 2.5rem;
            line-height: 1.2;
            opacity: 0.3;
          }

          div {
            margin: 0;
          }

          .callout {
            margin: 1rem 0;
            padding: .5rem 1rem .5rem 1.5rem;
            background: #CFE8FF;
            border-left: 3px solid #3F9CF2;
            font-size: 14px;
          }

          .callout.yellow {
              background: #FCE9C0;
              border-left-color: #FFCC5A;
              color: #4C4958;
          }

          .callout.red {
              background: #FCDBDB;
              border-left-color: #FF7878;
              color: #4C4958;
          }

          .callout.orange {
            background: #FFECDC;
            border-left-color: #F9BC87;
            color: #4C4958;
          }

          .callout div {
            margin: 0;
          }

          details.mce-accordion {
            outline: 0 !important;
            width: fit-content;
          }

          .component {
            padding: .5rem 1rem .5rem 1.5rem;
            background: transparent;
            border: 3px solid #D5ECF5;
            border-radius:4px;
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

          // div:has(br):before {
          //   content: 'Temporary placeholder for empty lines.'
          // }

          // div:before {
          //   position: absolute;
          // }

          h2:before {
            content: "Heading 2";
          }

          div:after {
            display: inline-block;
            transform: translateY(-100%);
            color: rgba(55, 53, 47, 0.5)
          }

          div#drag-element-hook {
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

          div#drag-element-hook:hover {
            background: rgba(55, 53, 47, 0.08);
          }

          div.mce-resizehandle {
            background-color: #6AB8D6 !important;
          }

          table {
            outline: 3px solid #D5ECF5 !important;
          }
          `,
          icons: 'material',
          init_instance_callback: (editor) => {
            editor.on('ExecCommand', (e) => {
              //              console.log(`The ${e.command} command was fired.`)
            })

            initializeUpdater(editor)
          },
          setup: function (editor:TinyMCEEditor) {
            initializeAccordion(editor)
            initializeCallout(editor)
            initializeComponent(editor)
            initializeDragAndDrop(editor)
            initializePageEmbed(editor)
            initializePageTitle(editor)
            // initializePlaceholder(editor);
            initializeQuickToolbar(editor)
            initializeSelectAllBlock(editor)
            initializeSlashCommand(editor)
          },
          ai_request: initializeAiRequest
        }}
      />
      {/* <button onClick={log}>Log editor content</button> */}
      <FormDialogC control={dialogControl}
                   submitCallback={submitCallback}
                   reset={reset}
                   issueValue={issueValue}
                   componentTitleValue={componentTitleValue} isComponentTitleDirty={isComponentTitleDirty}
                   content={<CreateComponentFormC projectValue={projectValue}
                                                  control={control}
                                                  componentTitleValue={componentTitleValue}
                                                  isComponentTitleDirty={isComponentTitleDirty}
                   />}
                   onSubmitHandler={onSubmitHandler}
                   title={'Create component'}
      />
    </>
  )
}

export default TextEditor
