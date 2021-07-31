import React, { createContext, useState, useContext, useEffect } from 'react';
import useFirebaseAuth from '../useFirebaseAuth';
import { Template } from 'common-types';
import firebaseStore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

type RefType =
  FirebaseFirestoreTypes.CollectionReference<FirebaseFirestoreTypes.DocumentData>;

type HookReturnType = {
  templates: Template[];
  fetching: boolean;
  createTemplate: (data: Omit<Template, 'id'>) => Promise<void>;
  updateTemplate: (data: Template) => Promise<void>;
  deleteTemplate: (id: string) => Promise<void>;
};

const useTemplates = (): HookReturnType => {
  const { userId } = useFirebaseAuth();
  const [fetching, setFetching] = useState<boolean>(true);
  const [templates, setTemplates] = useState<Template[]>([]);

  let templatesRef: RefType = firebaseStore()
    .collection('users')
    .doc(userId)
    .collection('templates');

  const listener = () =>
    templatesRef.onSnapshot(snapshot => {
      if (!snapshot) return;

      try {
        const docs: any = [];
        snapshot.forEach(doc => {
          const item = doc.data();
          if (!item.deleted) {
            delete item.queryStrings;
            docs.push({ ...item, id: doc.id } as Template);
          }
        });
        setFetching(false);
        setTemplates(docs);
      } catch (error) {
        console.log('error in listenToQuery inside:', error);
      }
    });

  useEffect(() => {
    if (userId) {
      templatesRef = firebaseStore()
        .collection('users')
        .doc(userId)
        .collection('templates');
      listener();
    }
  }, [userId]);

  const createTemplate = async (data: Omit<Template, 'id'>) => {
    if (templatesRef) templatesRef.add(data);
  };

  const updateTemplate = async (data: Template) => {
    if (templatesRef) templatesRef.doc(data.id).update(data);
  };

  const deleteTemplate = async (id: string) => {
    if (templatesRef) templatesRef.doc(id).delete();
  };

  return {
    templates,
    fetching,
    createTemplate,
    updateTemplate,
    deleteTemplate,
  };
};

export default useTemplates;
