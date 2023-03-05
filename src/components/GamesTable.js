import React, { useState } from 'react';
import styled from 'styled-components';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { palette } from '../css-constants';

const TeamNameTableCell = styled(TableCell)`
  && {
    background-color: ${({ iswinner, mixed }) =>
      mixed && iswinner ? palette.warningLight : iswinner ? palette.successLight : palette.errorLight};
    color: white;
  }
`;
const HighlightCell = styled(TableCell)`
  && {
    background-color: ${({ color }) => color};
  }
`;
const AcordionCell = styled(TableCell)`
  && {
    .MuiAccordionSummary-content {
      margin: 0!important;
    }
    .MuiAccordionSummary-expandIcon {
      padding: 10px 10px 10px 0;
    }
    .MuiAccordionSummary-root {
      background-color: #90caf9;
    }
    .MuiAccordionDetails-root {
      background-color: #90caf9;
    }
  }
`;

function GamesTable({ data }) {
  const [expandedRow, setExpandedRow] = useState(null);

  const handleExpandClick = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

return (
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell style={{ padding: 0 }}>
            <div style={{ display: 'flex', width: '100%'}}>
              <span style={{ width: '35%', padding: '14px 0 0 14px'}}>Home</span>
              <span style={{ width: '35%', padding: '14px 0 14px 14px'}}>Away</span>
              <span style={{ width: '15%', padding: '14px'}}>M1</span>
              <span style={{ width: '15%', padding: '14px'}}>M2</span>
            </div>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data?.map((game, index) => (
          <>
            <TableRow>
              <AcordionCell style={{ padding: 0 }} colSpan={4}>
                <Accordion
                  expanded={expandedRow === index}
                  onChange={() => handleExpandClick(index)}
                  style={{ backgroundColor: 'white' }}
                >
                  <AccordionSummary style={{margin: 0, padding: 0}} expandIcon={<ExpandMoreIcon />}>
                    <TeamNameTableCell style={{width: '35%'}}
                      iswinner={game.xgb.winner === 'home_team' || game.nn.winner === 'home_team'}
                      mixed={game.xgb.winner === 'away_team' || game.nn.winner === 'away_team'}
                    >
                      {game.home_team}
                    </TeamNameTableCell>
                    <TeamNameTableCell style={{width: '35%'}}
                      iswinner={game.xgb.winner === 'away_team' || game.nn.winner === 'away_team'}
                      mixed={game.xgb.winner === 'home_team' || game.nn.winner === 'home_team'}
                    >
                      {game.away_team}
                    </TeamNameTableCell>
                    <HighlightCell style={{width: '15%'}} color={palette.primaryMain}>
                      {`${game.xgb.percentage}${
                        (game.xgb.winner === 'away_team' || game.nn.winner === 'away_team') &&
                        (game.xgb.winner === 'home_team' || game.nn.winner === 'home_team')
                          ? game.xgb.winner
                          : ''
                      }`}
                      %
                    </HighlightCell>
                    <HighlightCell style={{width: '15%'}} color={palette.primaryMain}>
                      {`${game.nn.percentage}${
                        (game.xgb.winner === 'away_team' || game.nn.winner === 'away_team') &&
                        (game.xgb.winner === 'home_team' || game.nn.winner === 'home_team')
                          ? game.nn.winner
                          : ''
                      }`}
                      %
                    </HighlightCell>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div>
                      <li>TODO:</li>
                      <li>user comments</li>
                      <li>user likes</li>
                      <li>oter data from the internet</li>
                      <li>twitter data...</li>
                    </div>
                  </AccordionDetails>
                </Accordion>
              </AcordionCell>
            </TableRow>
          </>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
)};

export default GamesTable;