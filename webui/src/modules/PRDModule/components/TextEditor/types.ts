
export type AiRequest = {
	context: string;
  prompt: string;
	query: string;
	system: string[];
	thread: Thread[];
};

export type Thread = {
  eventUid: string;
  timestamp: Date;
  request: AiRequest;
  response: {
    data: string;
    type: 'stream';
  }
}

export type AiResponse = {
	stream: (arg0: (signal: AbortSignal, streamMessage: StreamMessage) => Promise<void>) => void;
};

export type StreamMessage = (message: string) => void;