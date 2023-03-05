import React, { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { parseData } from '../helpers/parseData';
import GamesTable from '../components/GamesTable';
import { getAllPredictions } from '../api/API';

const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    (() => {
      async function fectchData() {
        const data = await getAllPredictions();
        const parsedData = parseData(data);
        setData(parsedData);
      }
      fectchData()
    })()
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Welcome to BB, bro! - (working title)
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="body1" component="p">
            <div>Here in BB, we use machine learning, AI and all other resources that we can find to make the best possible guess witch team will win the game.</div>
            <div>First table is the Todays Games table. Updated each day.</div>
            <div>Currently we use two different AI models to get predictions (in table M1 and M2).</div>
            <div>Precentage is the chance that the green team will WIN of each model respectfully.</div>
            <div>If Home and Away team names are orange, that means that the models have picked oposite teams</div>
            <ul>
              <li>
                M1 - XGBoost model
              </li>
              <li>
                M2 - Neural Network model.
              </li>
            </ul>
          </Typography>
        </CardContent>
      </Card>
      <GamesTable data={data?.[0]?.data} />
      <Card>
        <CardContent>
          <Typography variant="body1" component="p">
            <div>TODO: season history of the models performance. Kolko su pogadjali u proslosti poredjano od juce pa na dogle god ima podataka</div>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Home;
