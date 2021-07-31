import React, { useState, useEffect } from 'react';
import useFirebaseAuth from '../useFirebaseAuth';
import { Campaign } from 'common-types';
import firebaseStore from '@react-native-firebase/firestore';

type HookReturnType = {
  campaigns: Campaign[];
  fetching: boolean;
  createCampaign: (data: Omit<Campaign, 'id'>) => Promise<void>;
  updateCampaign: (id: string, data: Partial<Campaign>) => Promise<void>;
  deleteCampaign: (id: string) => Promise<void>;
};

const useCampaigns = (): HookReturnType => {
  const { userId } = useFirebaseAuth();
  const [fetching, setFetching] = useState<boolean>(true);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  const templatesRef = firebaseStore()
    .collection('users')
    .doc(userId)
    .collection('campaigns');

  const listener = () =>
    templatesRef.onSnapshot(snapshot => {
      if (!snapshot) return;

      try {
        const docs: any = [];
        snapshot.forEach(doc => {
          const item = doc.data();
          if (!item.deleted) {
            delete item.queryStrings;
            docs.push({ ...item, id: doc.id } as Campaign);
          }
        });
        setFetching(false);
        setCampaigns(docs);
      } catch (error) {
        console.log('error in listenToQuery inside:', error);
      }
    });

  useEffect(() => {
    listener();
  }, [userId]);

  const createCampaign = async (data: Omit<Campaign, 'id'>) => {
    await templatesRef.add(data);
  };

  const updateCampaign = async (id: string, data: Partial<Campaign>) => {
    try {
      await templatesRef.doc(id).update(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCampaign = async (id: string) => {
    await templatesRef.doc(id).delete();
  };

  return {
    campaigns,
    fetching,
    createCampaign,
    updateCampaign,
    deleteCampaign,
  };
};

export default useCampaigns;
