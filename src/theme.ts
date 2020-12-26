import { Azureus, Noctis, White, Market, FireBrick } from './colors';

export enum ThemeNames {
  light = 'light',
  dark = 'dark',
}

export type Theme = {
  name: ThemeNames;
  backgroundColor: string;
  textColor: string;
  textColorSad: string;
  textColorCelebrate: string;
  textColorSadAsia: string;
  textColorCelebrateAsia: string;
  headerColor: string;
  bannerColor: string;
};

type Themes = {
  [key in ThemeNames]: Theme;
};

export const lightTheme: Theme = {
  name: ThemeNames.light,
  backgroundColor: White,
  textColor: Azureus.black1,
  textColorSad: FireBrick,
  textColorCelebrate: Noctis.Viridian,
  textColorSadAsia: Noctis.Viridian,
  textColorCelebrateAsia: FireBrick,
  headerColor: 'purple',
  bannerColor: 'purple',
};

export const darkTheme: Theme = {
  name: ThemeNames.dark,
  backgroundColor: Noctis.bgAzureus,
  textColor: White,
  textColorSad: Market.red,
  textColorCelebrate: Market.green,
  textColorSadAsia: Market.green,
  textColorCelebrateAsia: Market.red,
  headerColor: Noctis.CornflowerBlue,
  bannerColor: Noctis.CornflowerBlue,
};

export const themes: Themes = {
  [ThemeNames.light]: lightTheme,
  [ThemeNames.dark]: darkTheme,
};
