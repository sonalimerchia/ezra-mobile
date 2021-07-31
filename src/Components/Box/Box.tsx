import React from 'react';
import { ms } from 'react-native-size-matters';
import styled, { css } from 'styled-components/native';
import {
  BackgroundColors,
  BorderRadius,
  BorderColors,
  BorderWidths,
  BoxShadows,
  Spacings,
  ShapeFills,
} from 'styled-components/native';
import { lightTheme } from '../../Config';

type PositionValue = number | string;

const Container = styled.View<{
  center?: boolean;
}>`
  ${({ center }) =>
    center &&
    css`
      align-items: center;
      justify-content: center;
    `};
`;

export type BoxProps = {
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  alignSelf?:
    | 'auto'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'stretch'
    | 'baseline';
  backgroundColor?: BackgroundColors;
  borderBottomLeftRadius?: BorderRadius;
  borderBottomRightRadius?: BorderRadius;
  borderColor?: BorderColors;
  borderRadius?: BorderRadius;
  borderTopLeftRadius?: BorderRadius;
  borderTopRightRadius?: BorderRadius;
  borderWidth?: BorderWidths;
  borderBottomWidth?: BorderWidths;
  borderTopWidth?: BorderWidths;
  borderRightWidth?: BorderWidths;
  borderLeftWidth?: BorderWidths;
  bottom?: PositionValue;
  boxShadow?: BoxShadows;
  center?: boolean;
  children?: React.ReactNode;
  flex?: number;
  flexBasis?: number | string;
  flexGrow?: number;
  flexShrink?: number;
  flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
  height?: number | string;
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  left?: PositionValue;
  margin?: Spacings;
  marginBottom?: Spacings;
  marginHorizontal?: Spacings;
  marginLeft?: Spacings;
  marginRight?: Spacings;
  marginTop?: Spacings;
  marginVertical?: Spacings;
  padding?: Spacings;
  paddingBottom?: Spacings;
  paddingHorizontal?: Spacings;
  paddingLeft?: Spacings;
  paddingRight?: Spacings;
  paddingTop?: Spacings;
  paddingVertical?: Spacings;
  position?: 'absolute' | 'relative';
  right?: PositionValue;
  row?: boolean;
  shapeFill?: ShapeFills;
  testID?: string;
  top?: PositionValue;
  width?: number | string;
  minWidth?: number | string;
  minHeight?: number | string;
  maxWidth?: number | string;
  maxHeight?: number | string;
  zIndex?: number;
  style?: object;
  opacity?: number;
  overflow?: 'hidden' | 'scroll' | 'visible' | undefined;
};

const Box = ({
  alignItems,
  alignSelf,
  backgroundColor,
  borderBottomLeftRadius,
  borderBottomRightRadius,
  borderColor = 'transparent',
  borderRadius,
  borderTopLeftRadius,
  borderTopRightRadius,
  borderWidth,
  borderBottomWidth,
  borderTopWidth,
  borderRightWidth,
  borderLeftWidth,
  bottom,
  boxShadow = 'none',
  center,
  children,
  flex,
  flexBasis,
  flexGrow,
  flexShrink,
  flexWrap,
  height,
  justifyContent,
  left,
  margin,
  marginBottom,
  marginHorizontal,
  marginLeft,
  marginRight,
  marginTop,
  marginVertical,
  padding,
  paddingBottom,
  paddingHorizontal,
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingVertical,
  position,
  right,
  row,
  shapeFill,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  testID,
  top,
  width,
  zIndex,
  style,
  opacity,
  overflow,
}: BoxProps) => {
  const theme = lightTheme;

  const getBackground = () => {
    if (shapeFill) {
      return theme.shapeFills[shapeFill];
    }

    if (backgroundColor) {
      return theme.backgroundColors[backgroundColor];
    }

    return undefined;
  };

  const boxShadowStyles = theme.boxShadows[boxShadow];

  return (
    <Container
      style={{
        ...boxShadowStyles,
        alignItems,
        alignSelf,
        backgroundColor: getBackground(),
        borderBottomLeftRadius:
          borderBottomLeftRadius && theme.borderRadius[borderBottomLeftRadius],
        borderBottomRightRadius:
          borderBottomRightRadius &&
          theme.borderRadius[borderBottomRightRadius],
        borderColor: borderColor && theme.borderColors[borderColor],
        borderRadius: borderRadius && theme.borderRadius[borderRadius],
        borderTopLeftRadius:
          borderTopLeftRadius && theme.borderRadius[borderTopLeftRadius],
        borderTopRightRadius:
          borderTopRightRadius && theme.borderRadius[borderTopRightRadius],
        borderWidth: borderWidth && theme.borderWidths[borderWidth],
        borderBottomWidth:
          borderBottomWidth && theme.borderWidths[borderBottomWidth],
        borderTopWidth: borderTopWidth && theme.borderWidths[borderTopWidth],
        borderRightWidth:
          borderRightWidth && theme.borderWidths[borderRightWidth],
        borderLeftWidth: borderLeftWidth && theme.borderWidths[borderLeftWidth],
        bottom: typeof bottom === 'number' ? ms(bottom) : bottom,
        flex,
        flexBasis,
        flexDirection: row ? 'row' : 'column',
        flexGrow,
        flexShrink,
        flexWrap,
        height: typeof height === 'number' ? ms(height) : height,
        justifyContent,
        left: typeof left === 'number' ? ms(left) : left,
        margin: margin && theme.spacings[margin],
        marginBottom: marginBottom && theme.spacings[marginBottom],
        marginHorizontal: marginHorizontal && theme.spacings[marginHorizontal],
        marginLeft: marginLeft && theme.spacings[marginLeft],
        marginRight: marginRight && theme.spacings[marginRight],
        marginTop: marginTop && theme.spacings[marginTop],
        marginVertical: marginVertical && theme.spacings[marginVertical],
        padding: padding && theme.spacings[padding],
        paddingBottom: paddingBottom && theme.spacings[paddingBottom],
        paddingHorizontal:
          paddingHorizontal && theme.spacings[paddingHorizontal],
        paddingLeft: paddingLeft && theme.spacings[paddingLeft],
        paddingRight: paddingRight && theme.spacings[paddingRight],
        paddingTop: paddingTop && theme.spacings[paddingTop],
        paddingVertical: paddingVertical && theme.spacings[paddingVertical],
        position,
        right: typeof right === 'number' ? ms(right) : right,
        top,
        width: typeof width === 'number' ? ms(width) : width,
        zIndex,
        minWidth: typeof minWidth === 'number' ? ms(minWidth) : minWidth,
        minHeight: typeof minHeight === 'number' ? ms(minHeight) : minHeight,
        maxWidth: typeof maxWidth === 'number' ? ms(maxWidth) : maxWidth,
        maxHeight: typeof maxHeight === 'number' ? ms(maxHeight) : maxHeight,
        opacity,
        overflow,
        ...style,
      }}
      center={center}
      testID={testID}>
      {children}
    </Container>
  );
};

export default Box;
