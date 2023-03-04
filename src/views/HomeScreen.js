import React from 'react';
import { Container, Typography } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { parseData } from '../helpers/parseData';
import GamesTable from '../components/GamesTable';
import { todaysGames } from '../assets/games';

const HomeScreen = () => {
  const navigate = useNavigate();
  
  const data = parseData(todaysGames);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Home Page
      </Typography>
      <GamesTable data={data} />
    </Container>
  );
};

export default HomeScreen;
