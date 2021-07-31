import React, { useState } from 'react';
import { ContactParamTypes } from '../../Navigation/StackParamList';
import { Box, Button, Pressable, Text } from '../../Components';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { formatNumber } from './contacts.utils';
import { Contact } from 'common-types';
import { useSingleContact } from '../../Hooks';
import { CategoriesBottomSheet, PhoneOptionsBottomSheet } from './BottomSheets';

type RouteProps = RouteProp<ContactParamTypes, 'ViewContact'>;

const ViewContact = () => {
  const { goBack } = useNavigation();
  const [selectedField, setSelectedField] = useState<keyof Contact>();
  const { params } = useRoute<RouteProps>();
  let { id } = params;
  const { contact } = useSingleContact(id);

  return (
    <>
      {contact && (
        <>
          <PhoneOptionsBottomSheet
            contact={contact}
            visible={selectedField === 'phoneNumber'}
            onClose={() => setSelectedField(undefined)}
          />
          <CategoriesBottomSheet
            contact={contact}
            visible={selectedField === 'categories'}
            onClose={() => setSelectedField(undefined)}
          />

          <Box backgroundColor="neutral-100" height="100%">
            <Box width="90%" alignSelf="center" marginVertical="small">
              <Box justifyContent="space-between" marginBottom="small" row>
                <Box width="40%">
                  <Text variant="body-1">Preferred Phone Number: </Text>
                </Box>
                <Pressable onPress={() => setSelectedField('phoneNumber')}>
                  <Text variant="body-1" color="blue-400">
                    {formatNumber(
                      contact.preferredNumber || contact.phoneNumber,
                    )}
                  </Text>
                </Pressable>
              </Box>
              <Box justifyContent="space-between" row>
                <Box width="40%">
                  <Text variant="body-1">Categories:</Text>
                </Box>
                <Pressable onPress={() => setSelectedField('categories')}>
                  {contact.categories.length > 0 ? (
                    contact.categories.map(cat => (
                      <Text variant="body-1" color="blue-400" key={cat}>
                        {cat}
                      </Text>
                    ))
                  ) : (
                    <Text variant="body-1" color="blue-400">
                      None
                    </Text>
                  )}
                </Pressable>
              </Box>
            </Box>
          </Box>
          <Box position="absolute" width="100%" bottom={0} marginBottom="base">
            <Button onPress={goBack}>Back</Button>
          </Box>
        </>
      )}
    </>
  );
};

export default ViewContact;
