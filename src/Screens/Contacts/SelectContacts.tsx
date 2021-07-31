import React, { useEffect, useState } from 'react';
import { useContacts } from '../../Hooks';
import {
  Box,
  Illustration,
  Checkboxes,
  Pressable,
  ArrowButton,
  TagButton,
} from '../../Components';
import { CampaignParamTypes } from '../../Navigation/StackParamList';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Contact } from 'common-types';
import { formatNumber } from './contacts.utils';
import { FilterBottomSheet } from './BottomSheets';

type RouteProps = RouteProp<CampaignParamTypes, 'SelectContacts'>;

const SelectContacts = () => {
  const { goBack, navigate } = useNavigation();
  const { contacts: firebaseContacts, fetching } = useContacts();
  const [allSelected, setSelectAll] = useState<boolean>(false);
  const [values, setValues] = useState<any>({});
  const [isValid, setIsValid] = useState<boolean>(false);
  const [categoryBottomSheetOpen, setCategoryBottomSheetOpen] =
    useState<boolean>(false);
  const { params } = useRoute<RouteProps>();
  const [filterCategory, setFilterCategory] = useState<string>();
  const { message, contacts: initialContacts } = params;

  useEffect(() => {
    if (initialContacts)
      for (const contact of initialContacts) {
        setValue(contact.id, true);
        setIsValid(true);
      }
  }, []);

  useEffect(() => {
    if (!message) {
      goBack();
    }
  }, [message]);

  const setValue = (label: string, value: boolean) => {
    setValues((vals: any) => ({ ...vals, [label]: value }));
  };

  const onSubmit = () => {
    if (isValid) {
      const contacts = [];
      for (const contact of firebaseContacts) {
        if (values[contact.id]) {
          if (params.next === 'ScheduleType') {
            contacts.push(contact);
          } else {
            console.log(contact.name);
            contacts.push({
              name: contact.appleData.givenName || contact.name,
              phoneNumber: contact.preferredNumber || contact.phoneNumber,
            });
          }
        }
      }

      const { next } = params;
      navigate(next || 'Schedule', {
        ...params,
        contacts: contacts,
      });
    }
  };

  const onPress = (c: any) => {
    if (allSelected) setSelectAll(false);
    setValue(c.value, !values[c.value]);

    let found = false;
    for (const v in values) {
      if (values[v] && v !== c.value) {
        found = true;
        break;
      }
    }

    setIsValid(found || !values[c.value]);
  };

  const selectAll = () => {
    if (allSelected) {
      for (const c of firebaseContacts) {
        setValue(c.id, false);
      }
      setSelectAll(false);
      setIsValid(false);
    } else {
      for (const c of firebaseContacts.filter(
        fc => !filterCategory || fc.categories.includes(filterCategory),
      )) {
        setValue(c.id, true);
      }
      setSelectAll(true);
      setIsValid(true);
    }
  };

  return (
    <Box backgroundColor="neutral-100">
      <FilterBottomSheet
        visible={categoryBottomSheetOpen}
        onClose={category => {
          if (category) {
            if (category === filterCategory) {
              setFilterCategory(undefined);
            } else {
              setFilterCategory(category);
            }
          }
          setCategoryBottomSheetOpen(false);
        }}
        selectedCategory={filterCategory}
        contacts={firebaseContacts}
      />
      <>
        <Box
          backgroundColor="neutral-100"
          width="100%"
          paddingVertical="tiny"
          paddingHorizontal="small"
          alignSelf="center"
          row>
          <TagButton label="Select All" onPress={() => selectAll()} />
          <TagButton
            label="Filter"
            onPress={() => setCategoryBottomSheetOpen(true)}
          />
        </Box>
        <Checkboxes
          onPressOption={onPress}
          options={firebaseContacts
            .filter(
              c => !filterCategory || c.categories.includes(filterCategory),
            )
            .map((c: Contact) => ({
              name: c.name,
              subtitle: formatNumber(c.phoneNumber),
              value: c.id,
              selected: values[c.id],
            }))}
        />
        <Box position="absolute" bottom={0} right={0}>
          <ArrowButton onPress={onSubmit} disabled={!isValid} />
        </Box>
      </>
    </Box>
  );
};

export default SelectContacts;
