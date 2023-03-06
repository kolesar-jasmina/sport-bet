import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@material-ui/core';
import { palette } from '../css-constants';
import SubRow from './SubRow';

const TeamNameTableCell = styled(TableCell)(({ isWinner, mixed }) => ({
  backgroundColor: mixed && isWinner ? palette.warningLight : isWinner ? palette.successLight : palette.errorLight,
  color: 'white',
//   fontSize: '14px',
  padding: '8px',
  cursor: 'pointer'
}));

const HighlightCell = styled(TableCell)(({ color }) => ({
  backgroundColor: color,
  fontSize: '14px',
  padding: '8px',
  cursor: 'pointer'
}));

const GamesTable = ({ data }) => {
    const [expandedRow, setExpandedRow] = useState(null);
    const onRowClick = (game) => {
        const id = `${game.date}-${game.home_team}-${game.away_team}`;
        const expanded = expandedRow === id ? false : id;
        setExpandedRow(expanded)
    };

  return (
    <TableContainer component={Paper} >
      <Table>
        <TableHead>
          <TableCell>Home</TableCell>
          <TableCell>Away</TableCell>
          <TableCell>M1</TableCell>
          <TableCell>M2</TableCell>
        </TableHead>
        <TableBody>
          {data?.map((game) => {
            const isHomeWinner = game.xgboost.winner === 1 || game.nn.winner === 1;
            const isAwayWinner = game.xgboost.winner === 0 || game.nn.winner === 0;
            return (
            <>
                <TableRow>
                <TeamNameTableCell onClick={() => onRowClick(game)} isWinner={isHomeWinner} mixed={isAwayWinner}>
                    {game.home_team}
                </TeamNameTableCell>
                <TeamNameTableCell onClick={() => onRowClick(game)} isWinner={isAwayWinner} mixed={isHomeWinner}>
                    {game.away_team}
                </TeamNameTableCell>
                <HighlightCell onClick={() => onRowClick(game)} color={palette.primaryMain}>
                    {`${game.xgboost.winner_confidence}${(isAwayWinner) && (isHomeWinner) ? game.xgboost.winner : '' }%`}
                </HighlightCell>
                <HighlightCell onClick={() => onRowClick(game)} color={palette.primaryMain} >
                    {`${game.nn.winner_confidence}${(isAwayWinner) && (isHomeWinner) ? game.nn.winner : ''}%`}
                </HighlightCell>
                </TableRow>
                {expandedRow === `${game.date}-${game.home_team}-${game.away_team}` && (
                <SubRow />
                )}
            </>
          )})}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GamesTable;
