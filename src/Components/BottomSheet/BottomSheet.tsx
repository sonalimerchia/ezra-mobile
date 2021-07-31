import React, { useEffect, useRef } from 'react';
import { Modalize } from 'react-native-modalize';
import { lightTheme } from '../../Config';

type BottomSheetProps = {
  visible: boolean;
  onClose: () => void;
  data?: any;
  renderItem?: any;
  keyExtractor?: any;
  header?: JSX.Element;
};

const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onClose,
  children,
  data,
  renderItem,
  keyExtractor,
  header,
}) => {
  const ref = useRef<Modalize>();
  useEffect(() => {
    if (visible) {
      ref.current?.open();
    } else {
      ref.current?.close();
    }
  }, [visible]);

  if (data || renderItem || keyExtractor) {
    return (
      <Modalize
        ref={ref}
        onClosed={onClose}
        flatListProps={{
          data,
          renderItem,
          keyExtractor,
          ListHeaderComponent: header,
          style: {
            margin: lightTheme.safeArea,
            maxHeight: '80%',
          },
        }}
      />
    );
  }

  return (
    <Modalize
      ref={ref}
      onClosed={onClose}
      adjustToContentHeight={true}
      modalStyle={{ maxHeight: '80%' }}>
      {children}
    </Modalize>
  );
};

export default BottomSheet;
