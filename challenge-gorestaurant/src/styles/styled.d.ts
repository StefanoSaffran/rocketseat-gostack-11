import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme { //eslint-disable-line
    title: string;

    colors: {
      background: string;
      cardBackground: string;
      inputBackground: string;
      footer: string;
      body: string;
      text: string;
      placeholder: string;
    };
  }
}
