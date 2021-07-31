import React from 'react';
import { ms } from 'react-native-size-matters';
import { lightTheme } from '../../Config';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Box from '../Box';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';

type SafeAreaParams = { horizontal: boolean; vertical: boolean };

type ScreenContainerProps = {
  scroll?: boolean;
  safeArea?: boolean | SafeAreaParams;
  fetching?: boolean;
  style?: any;
};

const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  scroll = false,
  safeArea = true,
  fetching,
}) => {
  if (fetching) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
        }}>
        <Box flex={1} alignItems="center" justifyContent="center"></Box>
      </SafeAreaView>
    );
  }

  // TODO test this on all screen sizes for floatingbutton
  const paddingBottom = ms(150);

  return (
    <View
      style={{
        flex: 1,
        minHeight: '100%',
        backgroundColor: '#FFFFFF',
      }}>
      {scroll ? (
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps="handled"
          style={{
            marginBottom: paddingBottom,
            minHeight: '95%',
          }}
          showsVerticalScrollIndicator={false}>
          {children}
        </KeyboardAwareScrollView>
      ) : (
        <View
          style={{
            padding: safeArea ? lightTheme.safeArea : 0,
            paddingBottom,
          }}>
          {children}
        </View>
      )}
    </View>
  );
};

export default ScreenContainer;
