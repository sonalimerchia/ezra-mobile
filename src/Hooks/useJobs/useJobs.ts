import { useState, useEffect } from 'react';
import useFirebaseAuth from '../useFirebaseAuth';
import { Job, Template } from 'common-types';
import firebaseStore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

type RefType =
  FirebaseFirestoreTypes.CollectionReference<FirebaseFirestoreTypes.DocumentData>;

type HookReturnType = {
  jobs: Job[];
  fetching: boolean;
  deleteJob: (id: string) => Promise<void>;
};

const useJobs = (): HookReturnType => {
  const { userId } = useFirebaseAuth();
  const [fetching, setFetching] = useState<boolean>(true);
  const [jobs, setJobs] = useState<Job[]>([]);

  let jobsRef: RefType = firebaseStore()
    .collection('users')
    .doc(userId)
    .collection('jobs');

  const listener = () =>
    jobsRef.orderBy('startTime', 'asc').onSnapshot(snapshot => {
      if (!snapshot) return;

      try {
        const docs: any = [];
        snapshot.forEach(doc => {
          const item = doc.data();
          if (!item.deleted) {
            delete item.queryStrings;
            docs.push({ ...item, id: doc.id } as Job);
          }
        });
        setFetching(false);
        setJobs(docs);
      } catch (error) {
        console.log('error in listenToQuery inside:', error);
      }
    });

  useEffect(() => {
    if (userId) {
      jobsRef = firebaseStore()
        .collection('users')
        .doc(userId)
        .collection('jobs');
      listener();
    }
  }, [userId]);

  const deleteJob = async (id: string) => {
    if (jobsRef) jobsRef.doc(id).delete();
  };

  return {
    jobs,
    fetching,
    deleteJob,
  };
};

export default useJobs;
