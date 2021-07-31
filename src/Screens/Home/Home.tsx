import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useCampaigns, useFirebaseAuth, useJobs } from '../../Hooks';
import {
  Illustration,
  Box,
  Pressable,
  Text,
  ScrollContainer,
  ArrowButton,
  Button,
} from '../../Components';
import { CampaignCard, Card, JobCard } from './Components';
import { StatusBar } from 'react-native';

const Home = () => {
  const { userId } = useFirebaseAuth();
  const { jobs } = useJobs();
  const { navigate } = useNavigation();

  const finishedJobs = jobs.filter((j: any) => j.complete);
  const pendingJobs = jobs.filter((j: any) => !j.complete);

  return (
    <ScrollContainer scroll>
      <Box marginTop="large">
        <Button onPress={() => navigate('Compose')}>Compose</Button>
      </Box>
      <Box width="90%" alignSelf="center" marginTop="large">
        <Text variant="title-2">Pending Jobs</Text>
      </Box>
      {pendingJobs.length > 0 ? (
        pendingJobs.map(j => <JobCard key={j.id} job={j} />)
      ) : (
        <Box width="90%" alignSelf="center">
          <Text variant="body-2">No Pending Jobs</Text>
        </Box>
      )}
      <Box width="90%" alignSelf="center" marginTop="large">
        <Text variant="title-2">Finished Jobs</Text>
      </Box>
      {finishedJobs.length > 0 ? (
        finishedJobs.map(j => <JobCard key={j.id} job={j} />)
      ) : (
        <Box width="90%" alignSelf="center">
          <Text variant="body-2">No Finished Jobs</Text>
        </Box>
      )}

      <Box width="90%" alignItems="center" marginTop="large">
        <Text variant="body-1">{`User Account Key: ${userId || ''}`}</Text>
      </Box>
      {/* <Box width="90%" alignSelf="center" marginTop="large">
        <Text variant="title-2">Active Campaigns</Text>
      </Box>
      {campaigns.map(c => (
        <CampaignCard key={c.id} campaign={c} />
      ))} */}
    </ScrollContainer>
  );
};

export default Home;
