declare global {
  namespace NodeJS {
    interface ProcessEnv {
      JIRA_OAUTH_CLIENT_ID: string;
      JIRA_OAUTH_CLIENT_SECRET: string;
      JIRA_OAUTH_CALLBACK_URL: string;
      NODE_ENV: 'development' | 'production';
      PORT: string;
    }
  }
}

export {}