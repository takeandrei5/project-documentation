import { fetchEventSource, type EventSourceMessage, type FetchEventSourceInit } from '@microsoft/fetch-event-source';
import type { AiMessage, AiRequest, AiRequestBody, AiResponse, StreamMessage, Thread } from '../types';

const useAi = () => {
	const initializeAiRequest = (request: AiRequest, response: AiResponse): void => {
		response.stream((signal: AbortSignal, streamMessage: StreamMessage) => {
			const conversation = request.thread.flatMap((event: Thread) => {
				if (event.response) {
					return [
						{ role: 'user', content: event.request.query },
						{ role: 'assistant', content: event.response.data }
					];
				} else {
					return [];
				}
			});

			const content: string = request.context.length === 0 || conversation.length > 0 ? request.query : `Question: ${request.query} Context: """${request.context}"""`;

			const messages: AiMessage[] = [...conversation, { role: 'system', content: request.system.join('\n') }, { role: 'user', content }];

			const requestBody: AiRequestBody = {
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
					Authorization: `Bearer ${import.meta.env.VITE_OPEN_AI_API_KEY}`
				},
				body: JSON.stringify(requestBody)
			};

			const onmessage = (e: EventSourceMessage): void => {
				const data = e.data;
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
				console.log(error);
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
