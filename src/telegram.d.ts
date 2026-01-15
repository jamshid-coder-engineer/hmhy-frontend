export {};

declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        setBackgroundColor(arg0: string): unknown;
        setHeaderColor(arg0: string): unknown;
        disableVerticalSwipes(): unknown;
        ready(): unknown;
        initData: string;
        initDataUnsafe: {
          user?: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
          };
        };
        expand: () => void;
        close: () => void;
      };
    };
  }
}
