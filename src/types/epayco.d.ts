export {};

declare global {
  interface Window {
    ePayco: {
      checkout: {
        configure: (config: {
          key: string;
          test: boolean;
        }) => {
          open: (data: {
            name: string;
            description: string;
            invoice: string;
            currency: string;
            amount: string;
            tax_base: string;
            tax: string;
            country: string;
            lang: string;
            external: string;
            // Callbacks:
            response: (response: unknown) => void;
          }) => void;
        };
      };
    };
  }
}

