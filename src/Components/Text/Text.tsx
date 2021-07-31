import React from 'react';
import { Text as NativeText } from 'react-native';
import { lightTheme } from '../../Config';
import styled, { css, Colors, TextStyles } from 'styled-components/native';

export type TextProps = Readonly<{
  center?: boolean;
  children: string;
  color?: Colors;
  testID?: string;
  variant: TextStyles;
  numberOfLines?: number;
  weight?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  style?: any;
  parseable?: boolean;
}>;

const Text = ({
  center = false,
  children,
  color = 'neutral-900',
  testID,
  variant = 'body-1',
  numberOfLines,
  ellipsizeMode,
  style,
}: TextProps) => {
  return (
    <TextComponent
      center={center}
      color={color}
      testID={testID}
      variant={variant}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      style={style}>
      {children}
    </TextComponent>
  );
};

const TextComponent = styled(NativeText)<{
  color: Colors;
  variant: TextStyles;
  center: boolean;
}>`
  ${({ color, variant }) => css`
    color: ${lightTheme.primaryColors[color] ||
    lightTheme.primaryColors['neutral-900']};
    font-size: ${lightTheme.fontStyles[variant].fontSize}px;
    line-height: ${lightTheme.fontStyles[variant].lineHeight}px;
    ${variant === 'label-2' && 'text-transform: uppercase'};
    overflow: hidden;
  `}
  ${({ center }) => center && 'text-align: center;'};
`;

export default Text;
