declare global {
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface ProcessEnv {
      FIREBASE_API_KEY: string;
      FIREBASE_AUTH_DOMAIN: string;
      FIREBASE_DB_URL: string;
      FIREBASE_PROJECT_ID: string;
      FIREBASE_STORAGE_BUCKET: string;
      FIREBASE_MESSAGE_SENDER_ID: string;
      FIREBASE_APP_ID: string;
      FIREBASE_MEASUREMENT_ID: string;

      STORYBOOK_FIREBASE_API_KEY: string;
      STORYBOOK_FIREBASE_AUTH_DOMAIN: string;
      STORYBOOK_FIREBASE_DB_URL: string;
      STORYBOOK_FIREBASE_PROJECT_ID: string;
      STORYBOOK_FIREBASE_STORAGE_BUCKET: string;
      STORYBOOK_FIREBASE_MESSAGE_SENDER_ID: string;
      STORYBOOK_FIREBASE_APP_ID: string;
      STORYBOOK_FIREBASE_MEASUREMENT_ID: string;

      REACT_APP_FIREBASE_API_KEY: string;
      REACT_APP_FIREBASE_AUTH_DOMAIN: string;
      REACT_APP_FIREBASE_DB_URL: string;
      REACT_APP_FIREBASE_PROJECT_ID: string;
      REACT_APP_FIREBASE_STORAGE_BUCKET: string;
      REACT_APP_FIREBASE_MESSAGE_SENDER_ID: string;
      REACT_APP_FIREBASE_APP_ID: string;
      REACT_APP_FIREBASE_MEASUREMENT_ID: string;
    }
  }
}

export {};
