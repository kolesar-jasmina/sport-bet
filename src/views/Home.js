import React, { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent } from '@material-ui/core';
import GamesTable from '../components/GamesTable';
import GamesHistoryTable from '../components/GamesHistoryTable';
import { getAllPredictions, getMetadataForToday } from '../api/API';

const Home = () => {
  const [data, setData] = useState([]);
  const [metadata, setMetadata] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllPredictions();
      setData(transformData(data))

      // const metadata = await getMetadataForToday();
      // console.log('metadata', metadata);
      // setMetadata(metadata)
    };
    fetchData();
  }, []);

  const transformData = (data) => {
    data.forEach(element => {
      element.games.forEach(game => {
        // add date to each game, not sure if this is the best way to do it
        game.date = element.date;
      });
      element.games.sort((a, b) => new Date(a.date) - new Date(b.date));
    });

    return data;
  };
  console.log('data', data);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Welcome to BB, bro! - (working title)
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="body1" component="div">
            <div>Here in BB, we use machine learning, AI, and other resources to make the best possible guess which team will win the game.</div>
            <div style={{ marginTop: '14px' }}>The first table is the Todays Games table, updated each day. It shows the two AI models used to make predictions (M1 and M2), the percentage chance that the green team will win from each model, and if the home and away team names are orange, that means that the models have picked opposite teams.</div>
            <ul>
              <li>
                M1 - XGBoost model
              </li>
              <li>
                M2 - Neural Network model.
              </li>
            </ul>
            <div>The second table shows previous games where the model made predictions, initially sorted by date from yesterday to the past. </div>
          </Typography>
        </CardContent>
      </Card>
      <GamesTable data={data?.[0]?.games} />
      {/* <GamesHistoryTable data={data} /> */}
    </Container>
  );
};

export default Home;
