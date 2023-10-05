import { useEffect, useRef } from 'react';
import type { Editor as TinyMCEEditor } from 'tinymce';

const useUpdater = (onContentChangedHandler: (content: string) => void) => {
	const mutationObserver = useRef<MutationObserver | null>(null);
	const avoidableNodeMutations = ['drag-element-hook'];

	const initializeUpdater = (editor: TinyMCEEditor) => {
		mutationObserver.current = new MutationObserver((mutations: MutationRecord[]) => {
			mutations.forEach((mutation: MutationRecord) => {
				if (mutation.addedNodes.item(0)) {
					const id = (mutation.addedNodes.item(0) as Element).id;
					if (avoidableNodeMutations.find((node) => node === id)) {
						return;
					}
				}

				if (mutation.removedNodes.item(0)) {
					const id = (mutation.removedNodes.item(0) as Element).id;
					if (avoidableNodeMutations.find((node) => node === id)) {
						return;
					}
				}
				onContentChangedHandler(editor.getContent());
			});
		});

		mutationObserver.current.observe(editor.dom.getRoot(), {
			attributes: true,
			characterData: true,
			childList: true,
			subtree: true,
			attributeOldValue: true,
			characterDataOldValue: true
		});
	};

	useEffect(() => {
		return () => {
      if (mutationObserver.current) {
				mutationObserver.current.disconnect();
			}
		};
	}, []);

	return initializeUpdater;
};

export default useUpdater;
