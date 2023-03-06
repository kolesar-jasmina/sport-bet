import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

const useStyles = makeStyles({
    formControl: {
      minWidth: 120,
      marginRight: '16px',
    },
  });

const BBSelect = ({options, onChange, gameBlockHeight}) => {

    const classes = useStyles();

    const menuItems = options.map(opt => <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>);

    return (
        <FormControl className={classes.formControl}>
            <InputLabel id="game-block-height-select-label">Game block height</InputLabel>
            <Select
                labelId="game-block-height-select-label"
                id="game-block-height-select"
                value={gameBlockHeight}
                onChange={onChange}
            >
                {menuItems}
            </Select>
        </FormControl>
    );
};

export default BBSelect;
