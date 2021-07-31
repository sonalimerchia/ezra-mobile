import { useNavigation } from '@react-navigation/native';
import { Contact } from 'common-types';
import React from 'react';
import { FlatList } from 'react-native';
import {
  Pressable,
  Illustration,
  Header,
  Box,
  ListItem,
  ScrollContainer,
} from '../../Components';
import { useContacts } from '../../Hooks';
import { formatNumber } from './contacts.utils';

const ContactsHome = () => {
  const { navigate } = useNavigation();
  const { contacts } = useContacts();

  return (
    <Box backgroundColor="neutral-100">
      <FlatList
        data={contacts}
        style={{ height: '100%' }}
        renderItem={({ item }) => (
          <ListItem
            key={item.id}
            title={item.name}
            description={formatNumber(item.phoneNumber)}
            onPress={() => navigate('ViewContact', item)}
          />
        )}
      />
    </Box>
  );
};

export default ContactsHome;
