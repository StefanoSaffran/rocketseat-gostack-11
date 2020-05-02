import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;

    colors: {
      primary: string;
      secundary: string;

      background: string;
      cardBackground: string;
      cardColor: string;
      title: string;
      textStrong: string;
      text: string;
    };
  }
}
