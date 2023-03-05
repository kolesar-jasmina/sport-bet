export const parseData = (data) => {
  let parsedGames = [];
  console.log(data)
  const parseSingleEntry = (entry) => {
    const parsed = entry.xgboost.map((xgbGame, index) => {
      const nnIndex = entry.nn.findIndex(el => el.home_team === xgbGame.home_team && el.away_team === xgbGame.away_team);
  
      const game = {
        id: `${entry.id}-${xgbGame.home_team}-${xgbGame.away_team}`,
        home_team: xgbGame.home_team,
        away_team: xgbGame.away_team,
        xgb: {
          percentage: xgbGame.winner_confidence,
          ev_home: xgbGame.ev_home,
          ev_away: xgbGame.ev_away,
          winner: xgbGame.winner === '0' ? 'home_team' : 'away_team'
        },
      };
      if (nnIndex !== -1) {
        const nnGame = entry.nn[nnIndex];
        game.nn = {
          percentage: nnGame.winner_confidence,
          ev_home: nnGame.ev_home,
          ev_away: nnGame.ev_away,
          winner: nnGame.winner === '0' ? 'home_team' : 'away_team'
        };
      }
      return game;
    });
    return { data: parsed, id: entry.id };
  };

  if (data?.length) {
    data.forEach(element => {
      parsedGames.push(parseSingleEntry(element));
    });
  }
  return parsedGames;
};
