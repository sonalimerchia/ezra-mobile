import React, { createContext, useState, useContext, useEffect } from 'react';
import { Contact } from 'common-types';
import firebaseStore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import useFirebaseAuth from '../useFirebaseAuth';
import {
  extractPhoneNumber,
  makeName,
} from '../../Screens/Contacts/contacts.utils';
import { default as NativeContacts } from 'react-native-contacts';
import { deepEqual } from '../../Utils';

type RefType =
  FirebaseFirestoreTypes.CollectionReference<FirebaseFirestoreTypes.DocumentData>;

type HookReturnType = {
  contacts: Contact[];
  fetching: boolean;
  updateContacts: () => Promise<void>;
  updateContact: (id: string, data: Partial<Contact>) => Promise<void>;
};

const useContacts = (): HookReturnType => {
  const { userId } = useFirebaseAuth();
  const [fetching, setFetching] = useState<boolean>(true);
  const [contacts, setContacts] = useState<Contact[]>([]);

  let contactsRef: RefType = firebaseStore()
    .collection('users')
    .doc(userId)
    .collection('contacts');

  const listener = () =>
    contactsRef.onSnapshot(snapshot => {
      if (!snapshot) return;

      try {
        const docs: any = [];
        snapshot.forEach(doc => {
          const item = doc.data();
          if (!item.deleted) {
            delete item.queryStrings;
            docs.push({ ...item, id: doc.id } as Contact);
          }
        });
        setFetching(false);
        setContacts(docs);
      } catch (error) {
        console.log('error in listenToQuery inside:', error);
      }
    });

  useEffect(() => {
    if (userId) {
      console.log(userId);
      contactsRef = firebaseStore()
        .collection('users')
        .doc(userId)
        .collection('contacts');
      updateContacts();
      listener();
    }
  }, [userId]);

  const matchFirebaseToContacts = async (c: any) => {
    const cRef = contactsRef.doc(c.recordID);
    const doc = await cRef.get();

    if (!doc.exists) {
      // Create new contacts
      const phoneNumber = extractPhoneNumber(c);
      if (phoneNumber) {
        const firebaseContact: Contact = {
          id: c.recordID,
          appleData: c,
          phoneNumber,
          name: makeName(c),
          categories: [],
        };
        return cRef.set(firebaseContact);
      }
    } else {
      // Update existing contacts
      // const firebaseContact = doc.data() as Contact;
      // if (!deepEqual(firebaseContact.appleData, c)) {
      //   if (!firebaseContact.preferredNumber) {
      return cRef.update({
        name: makeName(c),
        phoneNumber: extractPhoneNumber(c),
        appleData: c,
      });
      // } else {
      //   return cRef.update({
      //     name: makeName(c),
      //     appleData: c,
      //   });
      // }
      // }
    }
  };

  const updateContacts = async () => {
    if (contactsRef) {
      try {
        console.log(contactsRef.path);
        const data = await NativeContacts.getAll();
        const promises = data.map((c: any) => matchFirebaseToContacts(c));
        await Promise.all(promises);
      } catch (error) {
        console.log('hi', error);
      }
    }
  };

  const updateContact = async (id: string, data: Partial<Contact>) => {
    if (contactsRef) {
      await contactsRef.doc(id).update(data);
      await (await contactsRef.doc(id).get()).data();
    }
  };

  return {
    contacts,
    fetching,
    updateContacts,
    updateContact,
  };
};

export default useContacts;
