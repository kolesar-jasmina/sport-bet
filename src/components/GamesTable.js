import React from 'react';
import styled from 'styled-components';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import {palette} from '../constants';

const TeamNameTableCell = styled(TableCell)`
  && {
    background-color: ${({ iswinner, mixed }) => mixed && iswinner ? palette.warningLight : iswinner ? palette.successLight : palette.errorLight};
    color: white;
  }
`;
const HighlightCell = styled(TableCell)`
  && {
    background-color: ${({color}) => color};
  }
`;

function GamesTable({ data }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Home</TableCell>
            <TableCell>Away</TableCell>
            <TableCell>XGB pick</TableCell>
            <TableCell>XGB chance</TableCell>
            <TableCell>NN pick</TableCell>
            <TableCell>NN chance</TableCell>
            <TableCell>XGB Ev Home</TableCell>
            <TableCell>XGB EV Avay</TableCell>
            <TableCell>NN Ev Home</TableCell>
            <TableCell>NN EV Avay</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((game) => (
            <TableRow key={`${game.team1}-${game.team2}`}>
              <TeamNameTableCell
                iswinner={game.xgb.winner === 'team1' || game.nn.winner === 'team1'}
                mixed={game.xgb.winner === 'team2' || game.nn.winner === 'team2'}
              >
                {game.team1}
              </TeamNameTableCell>
              <TeamNameTableCell
                iswinner={game.xgb.winner === 'team2' || game.nn.winner === 'team2'}
                mixed={game.xgb.winner === 'team1' || game.nn.winner === 'team1'}
              >
                {game.team2}
              </TeamNameTableCell>
              <HighlightCell color={palette.primaryLight}>{game.xgb.winner === 'team1' ? '1' : '2'}</HighlightCell>
              <HighlightCell color={palette.primaryMain}>{game.xgb.percentage}</HighlightCell>
              <HighlightCell color={palette.primaryLight}>{game.nn.winner === 'team1' ? '1' : '2'}</HighlightCell>
              <HighlightCell color={palette.primaryMain}>{game.nn.percentage}</HighlightCell>
              <TableCell>{game.xgb.expectedValue1}</TableCell>
              <TableCell>{game.xgb.expectedValue2}</TableCell>
              <TableCell>{game.nn.expectedValue1}</TableCell>
              <TableCell>{game.nn.expectedValue2}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}


export default GamesTable;
