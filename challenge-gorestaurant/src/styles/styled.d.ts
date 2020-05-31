import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme { //eslint-disable-line
    title: string;

    colors: {
      background: string;
      cardBackground: string;
      footer: string;
      body: string;
      title: string;
      text: string;
    };
  }
}
