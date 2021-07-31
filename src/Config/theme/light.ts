import { DefaultTheme } from 'styled-components';
import { ThemeTextStyles, ThemeTextStyleProps } from 'styled-components/native';
import { ms } from 'react-native-size-matters';

const boxShadows = {
  none: {},
  base: {
    shadowColor: 'rgb(12, 12, 13)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: ms(4),
    elevation: 1,
  },
  dark: {
    shadowColor: 'rgb(12, 12, 13)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: ms(8),
    elevation: 2,
  },
  darker: {
    shadowColor: 'rgb(12, 12, 13)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: ms(16),
    elevation: 3,
  },
  darken: {
    shadowColor: 'rgb(12, 12, 13)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: ms(21),
    elevation: 4,
  },
};

const fontStyles: { [key in ThemeTextStyles]: ThemeTextStyleProps } = {
  'title-1': {
    fontSize: ms(32),
    lineHeight: ms(48),
  },
  'title-2': {
    fontSize: ms(24),
    lineHeight: ms(32),
  },
  'title-3': {
    fontSize: ms(16),
    lineHeight: ms(24),
  },
  headline: {
    fontSize: ms(16),
    lineHeight: ms(24),
  },
  'body-1': {
    fontSize: ms(17),
    lineHeight: ms(24),
  },
  'body-1-semibold': {
    fontSize: ms(17),
    lineHeight: ms(24),
  },
  'body-2-semibold': {
    fontSize: ms(14),
    lineHeight: ms(20),
  },
  'body-2': {
    fontSize: ms(14),
    lineHeight: ms(20),
  },
  'body-3': {
    fontSize: ms(12),
    lineHeight: ms(14),
  },
  'body-3-semibold': {
    fontSize: ms(12),
    lineHeight: ms(14),
  },
  'body-4': {
    fontSize: ms(10),
    lineHeight: ms(14),
  },
  'label-1': {
    fontSize: ms(17),
    lineHeight: ms(20),
  },
  'label-2': {
    fontSize: ms(13),
    lineHeight: ms(16),
  },
  'caption-1': {
    fontSize: ms(11),
    lineHeight: ms(16),
  },
};

const borderWidths = {
  none: 0,
  small: ms(0.5),
  base: ms(1),
  large: ms(2),
  xLarge: ms(3),
};

const spacings = {
  none: ms(0),
  xxTiny: ms(2),
  xTiny: ms(4),
  tiny: ms(8),
  xSmall: ms(12),
  small: ms(16),
  base: ms(24),
  large: ms(32),
  xLarge: ms(48),
  xxLarge: ms(56),
  xxxLarge: ms(64),
  xxxxLarge: ms(128),
  xxxxxLarge: ms(160),
};

const borderRadii = {
  round: 1000,
  base: ms(6),
  medium: ms(8),
  large: ms(10),
  xLarge: ms(12),
};

const themeGreenColors = {
  'green-100': '#F0FFFA',
  'green-200': '#D8FFF1',
  'green-400': '#37F0AD',
  'green-600': '#018D5B',
  'green-700': '#005234',
};

const themeBlueColors = {
  'blue-100': '#EEF7FF',
  'blue-200': '#DAEAFF',
  'blue-300': '#8BBDFF',
  'blue-400': '#2F80ED',
};

const themeNeutralColors = {
  'neutral-100': '#FFFFFF',
  'neutral-200': '#F4F4F4',
  'neutral-300': '#E2E2E2',
  'neutral-400': '#BCBCBC',
  'neutral-500': '#787878',
  'neutral-600': '#8C8C8C',
  'neutral-700': '#5E5E5E',
  'neutral-900': '#000000',
};

const themePrimaryColors = {
  ...themeBlueColors,
  ...themeGreenColors,
  ...themeNeutralColors,
};

const borderColors = {
  transparent: 'none',
  secondary: '#BCBCBC',
  primary: '#2F80ED',
  error: '#EB5757',
};

const importantTheme = {
  error: '#FF8989',
};

const primaryColors = {
  ...themePrimaryColors,
  ...themeNeutralColors,
  ...importantTheme,
};

const shapeFills = {
  transparent: 'none',
  ...primaryColors,
};

const lightTheme: DefaultTheme = {
  fontStyles,
  safeArea: ms(16),
  borderRadius: borderRadii,
  primaryColors,
  backgroundColors: themeNeutralColors,
  borderColors,
  borderWidths,
  shapeFills,
  spacings,
  boxShadows: boxShadows,
};

export default lightTheme;
