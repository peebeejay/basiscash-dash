import { Azureus, Noctis, White } from './colors';

export enum ThemeNames {
  light = 'light',
  dark = 'dark',
}

export type Theme = {
  name: ThemeNames;
  backgroundColor: string;
  textColor: string;
  headerColor: string;
  bannerColor: string;
};

type Themes = {
  [key in ThemeNames]: Theme;
};

export const noctisAzureus: Theme = {
  name: ThemeNames.light,
  backgroundColor: White,
  textColor: Azureus.black1,
  headerColor: 'purple',
  bannerColor: 'purple',
};

export const darkTheme: Theme = {
  name: ThemeNames.dark,
  backgroundColor: Noctis.bgAzureus,
  textColor: White,
  headerColor: Noctis.CornflowerBlue,
  bannerColor: Noctis.CornflowerBlue,
};

export const themes: Themes = {
  [ThemeNames.light]: noctisAzureus,
  [ThemeNames.dark]: darkTheme,
};
