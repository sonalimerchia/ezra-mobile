import { Contact } from 'common-types';
import React from 'react';
import { useContacts } from '../../../Hooks';
import {
  BottomSheet,
  Box,
  Checkboxes,
  CheckboxOptionProps,
} from '../../../Components';
import { getPhoneNumbers } from '../contacts.utils';

type ContactOptionsBottomSheetProps = {
  contact: Contact;
  visible: boolean;
  onClose: () => void;
};

const PhoneOptionsBottomSheet = ({
  contact,
  visible,
  onClose,
}: ContactOptionsBottomSheetProps) => {
  const { updateContact } = useContacts();
  const onPress = (o: CheckboxOptionProps) => {
    updateContact(contact.id, { preferredNumber: o.value });
  };

  return (
    <BottomSheet visible={visible} onClose={onClose}>
      <Box padding="base">
        <Checkboxes
          onPressOption={onPress}
          options={getPhoneNumbers(contact.appleData).map(number => ({
            name: number,
            value: number,
            selected: contact.phoneNumber === number,
          }))}
        />
      </Box>
    </BottomSheet>
  );
};
export default PhoneOptionsBottomSheet;
