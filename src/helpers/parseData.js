const firstParse = (game, model, expectedValues) => {
  const teams = game.split(': ')[0];
  const [team1, team2] = teams?.split('vs');
  if (team1 && team2) {
    const winner = team1.includes('(') ? 'team1' : team2.includes('(') ? 'team2' : undefined;
    const percentage = team1.split('(')?.[1]?.replace(')', '')?.trim() || team2.split('(')?.[1]?.replace(')', '')?.trim();
    const obj = {
      team1:  (team1.split('(')[0] || team1).trim(),
      team2: (team2.split('(')[0] || team2).trim(),
      [model]: {
        percentage: percentage,
        expectedValue1: expectedValues[team1.replace(' EV', '').trim()] || 0,
        expectedValue2: expectedValues[team2.replace(' EV', '').trim()] || 0,
        winner: winner
      },
    };
    return obj;
  }
  return null;
};

export const parseData = (data) => {
  const xgbExpectedValues = data
  .split('--------------------Expected Value---------------------')[1]
  .split('-------------------------------------------------------')[0]
  .trim()
  .split('\n')
  .map((line) => {
    const [team, expectedValue] = line.split(': ');
    return { [team.replace(' EV', '').trim()]: parseFloat(expectedValue) };
  })
  .reduce((acc, obj) => Object.assign(acc, obj), {});

  const nnExpectedValues = data
    .split('--------------------Expected Value---------------------')[2]
    .split('-------------------------------------------------------')[0]
    .trim()
    .split('\n')
    .map((line) => {
      const [team, expectedValue] = line.split(': ');
      return { [team.replace(' EV', '').trim()]: parseFloat(expectedValue) };
    })
    .reduce((acc, obj) => Object.assign(acc, obj), {});

  const xgbGames = data.split('---------------XGBoost Model Predictions---------------')[1]
    .split('-------------------------------------------------------')[0]
    .trim()
    .split('\n')
    .map((game) => firstParse(game, 'xgb', xgbExpectedValues)).filter((game) => game !== null);

  const nnGames = data.split('------------Neural Network Model Predictions-----------')[1]
    .split('-------------------------------------------------------')[0]
    .trim()
    .split('\n')
    .map((game) => firstParse(game, 'nn', nnExpectedValues)).filter((game) => game !== null);

  const parsedGames = xgbGames.map((xgbGame) => {
    const nnIndex = nnGames.findIndex(el => el.team1 === xgbGame.team1 && el.team2 === xgbGame.team2);
    const game = {
      team1: xgbGame.team1,
      team2: xgbGame.team2,
      xgb: {
        percentage: xgbGame.xgb.percentage,
        expectedValue1: xgbExpectedValues[xgbGame.team1],
        expectedValue2: xgbExpectedValues[xgbGame.team2],
        winner: xgbGame.xgb.winner,
      },
    };
    if (nnIndex !== -1) {
      const nnGame = nnGames[nnIndex];
      game.nn = {
        percentage: nnGame.nn.percentage,
        expectedValue1: nnExpectedValues[nnGame.team1],
        expectedValue2: nnExpectedValues[nnGame.team2],
        winner: nnGame.nn.winner,
      };
    }
    return game;
  });

  return parsedGames;
};
