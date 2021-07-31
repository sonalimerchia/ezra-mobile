import firebaseStore from '@react-native-firebase/firestore';
import { Job, SimpleContact } from 'common-types';
import { useState } from 'react';
import useFirebaseAuth from '../useFirebaseAuth';

type ReturnType = [
  {
    data?: any;
    error?: any;
    fetching: boolean;
  },
  (job: Omit<Job, 'id'>) => Promise<void>,
];

const useCreateJob = (): ReturnType => {
  const { userId } = useFirebaseAuth();
  const [data, setData] = useState<any>();
  const [error, setError] = useState<any>();
  const [fetching, setFetching] = useState<boolean>(false);

  const createJob = async (job: Omit<Job, 'id'>) => {
    setFetching(true);
    if (!userId) return;

    try {
      const result = await firebaseStore()
        .collection('users')
        .doc(userId)
        .collection('jobs')
        .add(job);

      setData(result);
    } catch (error) {
      console.log(error);
      setError(error);
    }
    setFetching(false);
  };

  return [{ data, error, fetching }, createJob];
};

export default useCreateJob;
