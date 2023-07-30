import type { Editor as TinyMCEEditor } from 'tinymce';

const useCallout = () => {
  const initializeCallout = (editor: TinyMCEEditor): void => {
    editor.ui.registry.addIcon(
      'callout',
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><g><path d="M20 7a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h16zm0 2H4v6h16V9z"/><path d="M7 10.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z"/></g></svg>'
    );
    editor.ui.registry.addIcon('callout-swatch-blue', '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><rect width="18" height="18" x="3" y="3" fill="#76B8E4" fill-rule="evenodd" rx="2"/></svg>');
    editor.ui.registry.addIcon('callout-swatch-yellow', '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><rect width="18" height="18" x="3" y="3" fill="#FAD281" fill-rule="evenodd" rx="2"/></svg>');
    editor.ui.registry.addIcon('callout-swatch-red', '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><rect width="18" height="18" x="3" y="3" fill="#FF8686" fill-rule="evenodd" rx="2"/></svg>');
    editor.ui.registry.addIcon('callout-swatch-orange', '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"><rect width="18" height="18" x="3" y="3" fill="#FFC286" fill-rule="evenodd" rx="2"/></svg>');

    editor.ui.registry.addButton('callout', {
      icon: 'callout',
      tooltip: 'Insert callout',
      onAction: function () {
        editor.insertContent(`
          <div class="callout">
              <div class="content"><p>${editor.selection.getContent()}</p></div>
          </div>
        `);
      }
    });

    editor.ui.registry.addButton('calloutyellow', {
      icon: 'callout-swatch-yellow',
      tooltip: 'Yellow callout',
      onAction: function () {
        const node: HTMLElement = editor.selection.getNode();
        const callout: Element | null = editor.dom.getParent(node, '.callout');

        if (!callout) {
          return;
        }

        callout.removeAttribute('class');
        editor.dom.addClass(callout, 'callout');
        editor.dom.addClass(callout, 'yellow');
      }
    });

    editor.ui.registry.addButton('calloutred', {
      icon: 'callout-swatch-red',
      tooltip: 'Red callout',
      onAction: function () {
        const node: HTMLElement = editor.selection.getNode();
        const callout: Element | null = editor.dom.getParent(node, '.callout');

        if (!callout) {
          return;
        }

        callout.removeAttribute('class');
        editor.dom.addClass(callout, 'callout');
        editor.dom.addClass(callout, 'red');
      }
    });

    editor.ui.registry.addButton('calloutblue', {
      icon: 'callout-swatch-blue',
      tooltip: 'Blue callout',
      onAction: function () {
        const node: HTMLElement = editor.selection.getNode();
        const callout: Element | null = editor.dom.getParent(node, '.callout');

        if (!callout) {
          return;
        }

        callout.removeAttribute('class');
        editor.dom.addClass(callout, 'callout');
        editor.dom.addClass(callout, 'blue');
      }
    });

    editor.ui.registry.addButton('calloutorange', {
      icon: 'callout-swatch-orange',
      tooltip: 'Orange callout',
      onAction: function () {
        const node: HTMLElement = editor.selection.getNode();
        const callout: Element | null = editor.dom.getParent(node, '.callout');

        if (!callout) {
          return;
        }

        callout.removeAttribute('class');
        editor.dom.addClass(callout, 'callout');
        editor.dom.addClass(callout, 'orange');
      }
    });

    editor.ui.registry.addButton('removecallout', {
      icon: 'remove',
      tooltip: 'Remove callout',
      onAction: function () {
        const node: HTMLElement = editor.selection.getNode();
        const callout: Element | null = editor.dom.getParent(node, '.callout');

        if (!callout) {
          return;
        }

        callout.remove();
      }
    });

    editor.ui.registry.addContextToolbar('callout', {
      predicate: function (node: Element) {
        return node.classList.contains('callout');
      },
      items: 'calloutblue calloutyellow calloutred calloutorange | removecallout',
      position: 'node',
      scope: 'node'
    });

    editor.ui.registry.addNestedMenuItem('callout', {
      text: 'Callout',
      icon: 'callout',
      getSubmenuItems: function () {
        return [
          {
            type: 'menuitem',
            text: 'Blue',
            icon: 'callout-swatch-blue',
            onAction: function () {
              editor.insertContent(`
                <div class="callout">
                    <div class="content"><p>${editor.selection.getContent()}</p></div>
                </div>
              `);
            }
          },
          {
            type: 'menuitem',
            text: 'Yellow',
            icon: 'callout-swatch-yellow',
            onAction: function () {
              editor.insertContent(`
                <div class="callout yellow">
                    <div class="content"><p>${editor.selection.getContent()}</p></div>
                </div>
              `);
            }
          },
          {
            type: 'menuitem',
            text: 'Red',
            icon: 'callout-swatch-red',
            onAction: function () {
              editor.insertContent(`
                <div class="callout red">
                    <div class="content"><p>${editor.selection.getContent()}</p></div>
                </div>
              `);
            }
          },
          {
            type: 'menuitem',
            text: 'Orange',
            icon: 'callout-swatch-orange',
            onAction: function () {
              editor.insertContent(`
                <div class="callout orange">
                    <div class="content"><p>${editor.selection.getContent()}</p></div>
                </div>
              `);
            }
          }
        ];
      }
    });
  }

  return initializeCallout;
}

export { useCallout };