import type { Editor as TinyMCEEditor, Ui } from 'tinymce';

const useSlashCommand = () => {
	const insertActions: Array<Ui.InlineContent.AutocompleterItemSpec | Ui.InlineContent.SeparatorItemSpec> = [
		{
			text: 'Ai',
			value: 'Ai',
			icon: 'ai',
			meta: function (editor: TinyMCEEditor) {
				editor.execCommand('mceAiDialog', false, {});
				setTimeout(() => {
					const aiInput: HTMLInputElement = document.querySelectorAll('[placeholder="Ask AI to edit or generate..."]')[0] as HTMLInputElement;
					aiInput.focus();
				}, 0);
			}
		},
		{
			text: 'Heading 1',
			value: 'Heading 1',
			icon: 'h1',
			meta: function (editor: TinyMCEEditor) {
				editor.execCommand('mceInsertContent', false, '<h1>Heading 1</h1>');
			}
		},
		{
			text: 'Heading 2',
			value: 'Heading 2',
			icon: 'h2',
			meta: function (editor: TinyMCEEditor) {
				editor.execCommand('mceInsertContent', false, '<h2>Heading 2</h2>');
			}
		},
		{
			text: 'Heading 3',
			value: 'Heading 3',
			icon: 'h3',
			meta: function (editor: TinyMCEEditor) {
				editor.execCommand('mceInsertContent', false, '<h3>Heading 3</h3>');
			}
		},
		{
			type: 'separator'
		},
		{
			text: 'Bulleted list',
			value: 'Bulleted list',
			icon: 'unordered-list',
			meta: function (editor: TinyMCEEditor) {
				editor.execCommand('InsertUnorderedList', false);
			}
		},
		{
			text: 'Numbered list',
			value: 'Numbered list',
			icon: 'ordered-list',
			meta: function (editor: TinyMCEEditor) {
				editor.execCommand('InsertOrderedList', false);
			}
		},
		{
			text: 'Check list',
			value: 'Check list',
			icon: 'checklist',
			meta: function (editor: TinyMCEEditor) {
				editor.execCommand('InsertUnorderedList', false, { 'list-attributes': { class: 'tox-checklist' } });
			}
		},
		{
			type: 'separator'
		},
		{
			text: 'Table',
			value: 'Table',
			icon: 'table',
			meta: function (editor: TinyMCEEditor) {
				editor.execCommand('mceInsertTable', false, { rows: 2, columns: 2 });
			}
		},
		{
			text: 'Toggle',
			value: 'Toggle',
			icon: 'accordion',
			meta: function (editor: TinyMCEEditor) {
				editor.execCommand('InsertAccordion', false);
			}
		},
		{
			text: 'Callout',
			value: 'Callout',
			icon: 'callout',
			meta: function (editor: TinyMCEEditor) {
				editor.insertContent(`
          <div class="callout" id="newly_added_callout">
              <div class="content"><p>Callout</p></div>
          </div>
        `);
				editor.selection.select(editor.dom.select('div#newly_added_callout')[0], true);
        editor.selection.collapse(false);
				editor.dom.setAttrib(editor.dom.select('div#newly_added_callout')[0], 'id', '');
			}
		},
		{
			text: 'Component',
			value: 'Component',
			icon: 'component',
			meta: function (editor: TinyMCEEditor) {
				editor.insertContent(`
        <div class="component-wrapper">
          <h3>Add title component</h3>
          <div class="component" id="newly_added_component">
            <div class="content"><p>Create component</p></div>
          </div>
        </div>
        `);

        editor.selection.select(editor.dom.select('div#newly_added_component')[0], true);
        editor.selection.collapse(false);
				editor.dom.setAttrib(editor.dom.select('div#newly_added_component')[0], 'id', '');
			}
		},
		{
			type: 'separator'
		},
		{
			text: 'Page Embed',
			value: 'Page Embed',
			icon: 'embed-page',
			meta: function () {
        const pageEmbedButton = document.querySelector('button[title="Embed iframe"]') as HTMLButtonElement | null;
        if (pageEmbedButton) {
          pageEmbedButton.click();

          const pageEmbedInput = document.querySelector('input[type="url"]') as HTMLInputElement | null;
          if (pageEmbedInput) {
            requestAnimationFrame(() => pageEmbedInput.focus());
          }
        }
			}
		}
	];

	const initializeSlashCommand = (editor: TinyMCEEditor): void => {
		editor.ui.registry.addAutocompleter('slashcommands', {
			ch: '/',
			minChars: 0,
			columns: 1,
			fetch: function (pattern: string): Promise<Ui.InlineContent.AutocompleterContents[]> {
				const matchedActions = insertActions.filter((action: Ui.InlineContent.AutocompleterItemSpec | Ui.InlineContent.SeparatorItemSpec) => {
					return action.type === 'separator' || (action as Ui.InlineContent.AutocompleterItemSpec).value.toLowerCase().indexOf(pattern.toLowerCase()) !== -1;
				});

				return new Promise((resolve) => {
					const results: Ui.InlineContent.AutocompleterContents[] = matchedActions.map(function (action: Record<string, any>) {
						return {
							meta: action,
							text: action.text,
							icon: action.icon,
							value: action.value,
							type: action.type
						};
					});
					resolve(results);
				});
			},
			onAction: function (autocompleteApi: Ui.InlineContent.AutocompleterInstanceApi, rng: Range, _: string, action: Record<string, any>) {
				editor.selection.setRng(rng);
				editor.execCommand('Delete');
				action.meta(editor);
				autocompleteApi.hide();
			}
		});
	};

	return initializeSlashCommand;
};

export { useSlashCommand };
