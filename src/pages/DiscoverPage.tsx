import React, { useState } from 'react';
import { useFetchPlaces } from '../hooks/useFetchPlaces';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const DiscoverPage: React.FC = () => {
  const [categoryId, setCategoryId] = useState('');
  const [location, setLocation] = useState('');
  const { data: places, isLoading, error } = useFetchPlaces(categoryId, location);

  const handleSearch = () => {
    // Trigger React Query fetching with updated categoryId and location
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
        Discover Places
      </Typography>

      <Box
        display="flex"
        flexDirection={{ xs: 'column', sm: 'row' }}
        gap={2}
        mb={4}
        alignItems={{ sm: 'flex-end' }}
      >
        <TextField
          label="Category ID"
          variant="outlined"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          fullWidth
        />
        <TextField
          label="Location"
          variant="outlined"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          sx={{ alignSelf: { xs: 'stretch', sm: 'unset' } }}
        >
          Search
        </Button>
      </Box>

      {isLoading && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Typography color="error" textAlign="center" my={2}>
          Error loading places.
        </Typography>
      )}

      <List>
        {places?.map((place) => (
          <ListItem key={place.id}>
            <ListItemText primary={place.name} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default DiscoverPage;
