import 'styled-components';

// type BoxShadow =
//   | {
//       shadowColor: string;
//       shadowOffset: { width: number; height: number };
//       shadowOpacity: number;
//       shadowRadius: number;
//       elevation: number;
//     }
//   | {};
// declare module 'styled-components/native' {
//   type ThemeOverlay = {
//     backgroundColor: string;
//     opacity: number;
//   };

//   type ThemeBorderRadius = {
//     round: number;
//     base: number;
//     medium: number;
//     large: number;
//     xLarge: number;
//   };

//   type ThemeDisable = {
//     opacity: number;
//   };

//   type ThemeBackgroundColors = {
//     primary: string;
//     secondary: string;
//     overlay: string;
//   } & ThemeUIColors;

//   type ThemeBorderColors = {
//     transparent: string;
//     primary: string;
//     secondary: string;
//     tertiary: string;
//     quaternary: string;
//     quinary: string;
//     senary: string;
//     error: string;
//   } & ThemePrimaryColors &
//     ThemeNeutralColors;

//   type ThemeBorderWidths = {
//     none: number;
//     base: number;
//     large: number;
//     xLarge: number;
//   };

//   type ThemeGreenColors = {
//     'green-100': string;
//     'green-400': string;
//   };

//   type ThemePurpleColors = {
//     'purple-500': string;
//   };

//   type ThemeRedColors = {
//     'red-100': string;
//   };

//   type ThemeNeutralColors = {
//     'neutral-100': string;
//     'neutral-200': string;
//     'neutral-300': string;
//     'neutral-400': string;
//     'neutral-500': string;
//     'neutral-600': string;
//     'neutral-700': string;
//     'neutral-800': string;
//     'neutral-900': string;
//   };

//   type ThemePrimaryColors = {
//     'primary-100': string;
//     'primary-200': string;
//     'primary-300': string;
//     'primary-400': string;
//     'primary-500': string;
//     'primary-600': string;
//     'primary-700': string;
//     'primary-800': string;
//     'primary-900': string;
//     'theme-blue': string;
//   };

//   type ThemeUIColors = {
//     success: string;
//     warning: string;
//     error: string;
//     information: string;
//   };

//   type ThemeShapeFills = {
//     transparent: string;
//     primary: string;
//     secondary: string;
//     tertiary: string;
//     quaternary: string;
//     quinary: string;
//     senary: string;
//     septernary: string;
//     octanery: string;
//   } & ThemeNeutralColors &
//     ThemeUIColors &
//     ThemePrimaryColors &
//     ThemeGreenColors &
//     ThemePurpleColors &
//     ThemeRedColors;

//   type ThemeColors = {
//     primary: string;
//     secondary: string;
//     tertiary: string;
//     quaternary: string;
//     quinary: string;
//   } & ThemeNeutralColors &
//     ThemeUIColors &
//     ThemePrimaryColors;

//   type ThemeSpacings = {
//     none: number;
//     xxTiny: number;
//     xTiny: number;
//     tiny: number;
//     xSmall: number;
//     small: number;
//     base: number;
//     large: number;
//     xLarge: number;
//     xxLarge: number;
//     xxxLarge: number;
//     xxxxLarge: number;
//     xxxxxLarge: number;
//   };

//   type ThemeBoxShadows = {
//     none: BoxShadow;
//     base: BoxShadow;
//     dark: BoxShadow;
//     darker: BoxShadow;
//     darken: BoxShadow;
//   };

//   type ThemeTypographyProps = {
//     fontSize: number;
//     lineHeight: number;
//     fontFamily: string;
//   };

//   type ThemeTypographies =
//     | 'pin-entry'
//     | 'title-1'
//     | 'title-2'
//     | 'title-3'
//     | 'headline'
//     | 'body-1'
//     | 'body-2'
//     | 'body-3'
//     | 'body-3-semibold'
//     | 'body-4'
//     | 'label-1'
//     | 'label-2'
//     | 'caption-1'
//     | 'body-1-semibold'
//     | 'body-2-semibold';

//   export type Colors = keyof ThemeColors;

//   export type Spacings = keyof ThemeSpacings;

//   export type ShapeFills = keyof ThemeShapeFills;

//   export type Typographies = ThemeTypographies;

//   export type BorderRadius = keyof ThemeBorderRadius;

//   export type BackgroundColors = keyof ThemeBackgroundColors;

//   export type BorderWidths = keyof ThemeBorderWidths;

//   export type BorderColors = keyof ThemeBorderColors;

//   export type BoxShadows = keyof ThemeBoxShadows;

//   export interface DefaultTheme {
//     overlay: ThemeOverlay;
//     safeArea: number;
//     disable: ThemeDisable;
//     borderRadius: ThemeBorderRadius;
//     backgroundColors: ThemeBackgroundColors;
//     colors: ThemeColors;
//     borderColors: ThemeBorderColors;
//     borderWidths: ThemeBorderWidths;
//     shapeFills: ThemeShapeFills;
//     spacings: ThemeSpacings;
//     boxShadows: ThemeBoxShadows;
//     typographies: {
//       [key in ThemeTypographies]: ThemeTypographyProps;
//     };
//   }
// }

type BoxShadow =
  | {
      shadowColor: string;
      shadowOffset: { width: number; height: number };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    }
  | {};

declare module 'styled-components/native' {
  type ThemeBorderRadius = {
    round: number;
    base: number;
    medium: number;
    large: number;
    xLarge: number;
  };

  type ThemeBorderWidths = {
    small: number;
    none: number;
    base: number;
    large: number;
    xLarge: number;
  };

  type ThemeSpacings = {
    none: number;
    xxTiny: number;
    xTiny: number;
    tiny: number;
    xSmall: number;
    small: number;
    base: number;
    large: number;
    xLarge: number;
    xxLarge: number;
    xxxLarge: number;
    xxxxLarge: number;
    xxxxxLarge: number;
  };

  type ThemeBoxShadows = {
    none: BoxShadow;
    base: BoxShadow;
    dark: BoxShadow;
    darker: BoxShadow;
    darken: BoxShadow;
  };

  type ThemeTextStyleProps = {
    fontSize: number;
    lineHeight: number;
  };

  type ThemeTextStyles =
    | 'title-1'
    | 'title-2'
    | 'title-3'
    | 'headline'
    | 'body-1'
    | 'body-2'
    | 'body-3'
    | 'body-3-semibold'
    | 'body-4'
    | 'label-1'
    | 'label-2'
    | 'caption-1'
    | 'body-1-semibold'
    | 'body-2-semibold';

  type ThemeGreenColors = {
    'green-100': string;
    'green-200': string;
    'green-400': string;
    'green-600': string;
    'green-700': string;
  };

  type ThemeBlueColors = {
    'blue-100': string;
    'blue-200': string;
    'blue-300': string;
    'blue-400': string;
  };

  type ThemeNeutralColors = {
    'neutral-100': string;
    'neutral-200': string;
    'neutral-300': string;
    'neutral-400': string;
    'neutral-500': string;
    'neutral-600': string;
    'neutral-700': string;
    'neutral-900': string;
  };

  type ThemeBorderColors = {
    transparent: string;
    primary: string;
    secondary: string;
    error: string;
  };

  type ImportantThemeColors = {
    error: string;
  };

  type ThemePrimaryColors = ThemeGreenColors &
    ThemeBlueColors &
    ImportantThemeColors &
    ThemeNeutralColors;

  type ThemeShapeFills = {
    transparent: string;
  } & ThemePrimaryColors;

  export type Colors = keyof ThemePrimaryColors;

  export type Spacings = keyof ThemeSpacings;

  export type ShapeFills = keyof ThemeShapeFills;

  export type TextStyles = ThemeTextStyles;

  export type BorderRadius = keyof ThemeBorderRadius;

  export type BackgroundColors = keyof ThemeNeutralColors;

  export type BorderWidths = keyof ThemeBorderWidths;

  export type BorderColors = keyof ThemeBorderColors;

  export type BoxShadows = keyof ThemeBoxShadows;

  export interface DefaultTheme {
    safeArea: number;
    primaryColors: ThemePrimaryColors;
    borderRadius: ThemeBorderRadius;
    backgroundColors: ThemeNeutralColors;
    borderColors: ThemeBorderColors;
    borderWidths: ThemeBorderWidths;
    shapeFills: ThemeShapeFills;
    spacings: ThemeSpacings;
    boxShadows: ThemeBoxShadows;
    fontStyles: {
      [key in ThemeTextStyles]: ThemeTextStyleProps;
    };
  }
}
