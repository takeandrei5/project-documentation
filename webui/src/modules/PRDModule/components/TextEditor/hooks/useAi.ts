import { fetchEventSource, type EventSourceMessage, type FetchEventSourceInit } from '@microsoft/fetch-event-source';
import type { AiRequest, AiResponse, StreamMessage } from '../types';

const useAi = () => {
	const initializeAiRequest = (request: AiRequest, response: AiResponse) => {
		response.stream((signal: AbortSignal, streamMessage: StreamMessage) => {
			const conversation = request.thread.flatMap((event) => {
				if (event.response) {
					return [
						{ role: 'user', content: event.request.query },
						{ role: 'assistant', content: event.response.data }
					];
				} else {
					return [];
				}
			});

			const content = request.context.length === 0 || conversation.length > 0 ? request.query : `Question: ${request.query} Context: """${request.context}"""`;

			const messages = [...conversation, { role: 'system', content: request.system.join('\n') }, { role: 'user', content }];

			const requestBody = {
				model: 'gpt-3.5-turbo',
				temperature: 0.7,
				max_tokens: 800,
				messages,
				stream: true
			};

			const openAiOptions: FetchEventSourceInit = {
				signal,
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${import.meta.env.OPENAI_API_KEY}`
				},
				body: JSON.stringify(requestBody)
			};

			const onmessage = (ev: EventSourceMessage): void => {
				const data = ev.data;

				if (data === '[DONE]') {
					return;
				}

				const parsedData = JSON.parse(data);
				const firstChoice = parsedData?.choices[0];
				const message = firstChoice?.delta?.content;

				if (message) {
					streamMessage(message);
				}
			};

			const onerror = (error: Error): void => {
				throw error;
			};

			return fetchEventSource('https://api.openai.com/v1/chat/completions', {
				...openAiOptions,
				openWhenHidden: true,
				onmessage,
				onerror
			});
		});
	};

	return initializeAiRequest;
};

export { useAi };
