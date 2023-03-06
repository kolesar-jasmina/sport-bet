import React, { useEffect, useState } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem, Grid } from '@material-ui/core';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import GamesTable from './GamesTable';
import BBSelect from './BBSelect';
const GameBlockWrapper = styled(Grid)(({ gameBlockHeight }) => ({
  height: gameBlockHeight,
  padding: '16px',
}));
const useStyles = makeStyles({
  formControl: {
    minWidth: 120,
    marginRight: '16px',
  },
});
const GamesHistoryTable = ({ data }) => {
  const classes = useStyles();
  const [selectedGames, setSelectedGames] = useState([]);
  const [startDate, setStartDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 6);
    return date.toISOString().substr(0, 10);
  });
  const [endDate, setEndDate] = useState(() => new Date().toISOString().substr(0, 10));
  const [gameBlockHeight, setGameBlockHeight] = useState('720');
  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };
  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };
  useEffect(() => {
    handleSearch();
  }, [startDate, endDate]);
  const handleSearch = () => {
    const filteredGames = data.filter(({ id }) => {
      const [day, month, year] = id.split('-');
      const parsedDate = new Date(`${year}-${month}-${day}`);
      const gameDate = new Date(parsedDate);
      return (
        (startDate === '' || gameDate >= new Date(startDate)) &&
        (endDate === '' || gameDate <= new Date(endDate))
      );
    });
    setSelectedGames(filteredGames);
  };
  const viewOptions = [
    { value: 120, label: '1x1' },
    { value: 640, label: '3x1' },
    { value: 1280, label: '6x1' },
  ];
  return (
    <Grid container spacing={2}>
    <Grid item xs={12}>
        <TextField
        id="start-date"
        label="Start date"
        type="date"
        value={startDate}
        onChange={handleStartDateChange}
        className={classes.formControl}
        InputLabelProps={{
            shrink: true,
        }}
        />
        <TextField
        id="end-date"
        label="End date"
        type="date"
        value={endDate}
        onChange={handleEndDateChange}
        className={classes.formControl}
        InputLabelProps={{
            shrink: true,
        }}
        />
        <BBSelect options={viewOptions} onChange={(e) => setGameBlockHeight(e.target.value)} gameBlockHeight={gameBlockHeight} />
    </Grid>
    <Grid item xs={12}>
        <Grid container spacing={2}>
        {selectedGames.map(game => (
            <GameBlockWrapper item xs={12} sm={6}>
                <GamesTable data={game.data}/>
            </GameBlockWrapper>
        ))}
        </Grid>
    </Grid>
    </Grid>
  );
};
export default GamesHistoryTable;
