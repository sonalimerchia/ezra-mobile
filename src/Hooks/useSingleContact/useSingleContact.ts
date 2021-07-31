import { useState, useEffect } from 'react';
import { Contact } from 'common-types';
import firebaseStore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import useFirebaseAuth from '../useFirebaseAuth';

type RefType =
  FirebaseFirestoreTypes.Query<FirebaseFirestoreTypes.DocumentData>;

type HookReturnType = {
  contact?: Contact;
  fetching: boolean;
};

const useContacts = (id: string): HookReturnType => {
  const { userId } = useFirebaseAuth();
  const [fetching, setFetching] = useState<boolean>(true);
  const [contact, setContact] = useState<Contact>();

  let contactRef: RefType = firebaseStore()
    .collection('users')
    .doc(userId)
    .collection('contacts')
    .where('id', '==', id);

  const listener = () =>
    contactRef.onSnapshot(snapshot => {
      if (!snapshot) return;

      try {
        snapshot.docs.forEach(doc => {
          const item = doc.data();
          setContact(item as Contact);
        });
        setFetching(false);
      } catch (error) {
        console.log('error in listenToQuery inside:', error);
      }
    });

  useEffect(() => {
    if (userId) {
      contactRef = firebaseStore()
        .collection('users')
        .doc(userId)
        .collection('contacts')
        .where('id', '==', id);
      return listener();
    }
  }, [userId]);

  return {
    contact,
    fetching,
  };
};

export default useContacts;
