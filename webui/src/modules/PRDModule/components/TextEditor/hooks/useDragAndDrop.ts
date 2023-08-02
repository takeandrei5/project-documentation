import {useRef} from 'react'
import type {EditorEvent, Editor as TinyMCEEditor} from 'tinymce'
import {useTextEditor} from './useTextEditor'
import {parse} from 'node-html-parser'
import {dragElementSvg} from '../../../../../assets/svg'

const useDragAndDrop = () => {
  const {covertStringToHTMElement, getTinyMceDocumentElement, getTinyMceFirstLineElement} = useTextEditor()
  const currentMouseOveredElement = useRef<Element | null>(null)

  const initializeDragAndDrop = (editor:TinyMCEEditor):void => {
    editor.on('mouseover', function (e:EditorEvent<MouseEvent>) {
      const element = e.target as Element
      const documentElement:Document = getTinyMceDocumentElement()
      const draggableSvgIcon:HTMLElement = covertStringToHTMElement(dragElementSvg)

      if (element.nodeName === 'HTML' || element.nodeName === 'BODY' || element === getTinyMceFirstLineElement()) {
        return
      }

      if (element.nodeName === 'P') {
        currentMouseOveredElement.current = element
      }

      const boundingClientRect:DOMRect = currentMouseOveredElement.current!.getBoundingClientRect()

      const dragElement = documentElement.createElement('div')

      dragElement.setAttribute('id', 'drag-element-container')
      dragElement.setAttribute('draggable', 'true')
      dragElement.setAttribute('role', 'button')
      dragElement.setAttribute('tabIndex', '-1')
      dragElement.setAttribute('aria-label', 'Drag')

      dragElement.style.top = `${boundingClientRect.top}px`
      dragElement.style.left = `${boundingClientRect.left - 27}px`

      dragElement.appendChild(draggableSvgIcon)
      dragElement.addEventListener('dragstart', (e:DragEvent) => {
        if (!currentMouseOveredElement.current) {
          return
        }

        e.dataTransfer?.setDragImage(currentMouseOveredElement.current, 10, 10)
        e.dataTransfer?.setData('text/html', currentMouseOveredElement.current.innerHTML)
      })

      dragElement.addEventListener('dragend', (e:DragEvent) => {
        if (e.dataTransfer?.dropEffect === 'copy' && currentMouseOveredElement.current) {
          currentMouseOveredElement.current.remove()
          editor.selection.collapse()
          editor.undoManager.data.pop()
        }
      })

      if (element.id === 'drag-element-container' || element.id === 'drag-element-svg' || element.id === 'drag-element-path') {
        return
      }
      documentElement.getElementById('drag-element-container')?.remove()

      element.insertAdjacentElement('afterend', dragElement)
    })
  }

  return initializeDragAndDrop
}

export {useDragAndDrop}
