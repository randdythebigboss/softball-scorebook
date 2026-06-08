import { useState } from 'react';
import Scoreboard from '../components/scorekeeping/Scoreboard';
import BasesDiamond from '../components/scorekeeping/BasesDiamond';
import CurrentBatterCard from '../components/scorekeeping/CurrentBatterCard';
import PlayResultButton from '../components/scorekeeping/PlayResultButton';
import { MOCK_TEAMS, MOCK_PLAYERS, MOCK_HOME_LINEUP, MOCK_AWAY_LINEUP, MOCK_CURRENT_GAME } from '../data/mockData';
import { PLAY_CODES, SCORING_BUTTONS } from '../data/playCodes';
import {
  applyPlayToGameState,
  undoLastPlay,
  endHalfInning,
  addManualRun,
  addManualOut,
  finishGame,
} from '../utils/gameHelpers';
import { useLocalStorage } from '../hooks/useLocalStorage';
import styles from './ScoreGame.module.css';

export default function ScoreGame({ onNavigate }) {
  const [currentGame, setCurrentGame, removeCurrentGame] = useLocalStorage('currentGame', null);
  const [, setCompletedGames] = useLocalStorage('dugout_completed_games', []);
  const [activeGroup, setActiveGroup] = useState(0);

  const game = currentGame || MOCK_CURRENT_GAME;

  const homeTeam = MOCK_TEAMS.find(t => t.id === game.homeTeamId);
  const awayTeam  = MOCK_TEAMS.find(t => t.id === game.awayTeamId);

  const homeLineup = MOCK_HOME_LINEUP;
  const awayLineup = MOCK_AWAY_LINEUP;
  const currentLineup = game.isTopInning ? awayLineup : homeLineup;
  const currentIdx = game.isTopInning ? game.awayLineupIndex : game.homeLineupIndex;
  const currentEntry = currentLineup[currentIdx % currentLineup.length];
  const currentPlayer = currentEntry ? MOCK_PLAYERS.find(p => p.id === currentEntry.playerId) : null;
  const nextIdx = (currentIdx + 1) % currentLineup.length;
  const nextEntry = currentLineup[nextIdx];
  const nextPlayer = nextEntry
    ? { order: nextEntry.order, player: MOCK_PLAYERS.find(p => p.id === nextEntry.playerId) }
    : null;

  const saveGame = (newGame) => setCurrentGame(newGame);

  const handlePlay = (code) => {
    if (game.status === 'final') return;
    const newGame = applyPlayToGameState(game, code, currentPlayer?.id, homeLineup, awayLineup);
    saveGame(newGame);
  };

  const handleUndo = () => {
    if (!game.history || game.history.length === 0) return;
    saveGame(undoLastPlay(game));
  };

  const handleEndHalf = () => saveGame(endHalfInning(game));
  const handleAddRun  = () => saveGame(addManualRun(game));
  const handleAddOut  = () => saveGame(addManualOut(game));
  const handleClearBases = () => saveGame({ ...game, bases: [false, false, false] });

  const handleFinishGame = () => {
    const finished = finishGame(game);
    setCompletedGames(prev => [...(prev || []), finished]);
    removeCurrentGame();
    onNavigate('game-summary');
  };

  const recentPlays = [...(game.playEvents || [])].reverse().slice(0, 8);
  const canUndo = game.history && game.history.length > 0;
  const isOver = game.status === 'final';

  return (
    <div className={styles.page}>
      <Scoreboard game={game} homeTeam={homeTeam} awayTeam={awayTeam} />

      <div className={styles.statusRow}>
        <BasesDiamond bases={game.bases} />
        <CurrentBatterCard
          player={currentPlayer}
          order={currentEntry?.order}
          position={currentEntry?.position}
          nextPlayer={nextPlayer}
        />
      </div>

      {/* Play buttons */}
      <div className={styles.playPanel}>
        <div className={styles.groupTabs}>
          {SCORING_BUTTONS.map((g, i) => (
            <button
              key={i}
              className={`${styles.tab} ${activeGroup === i ? styles.tabActive : ''}`}
              onClick={() => setActiveGroup(i)}
            >
              {g.group}
            </button>
          ))}
        </div>
        <div className={styles.playGrid}>
          {SCORING_BUTTONS[activeGroup]?.plays.map(code => {
            const play = PLAY_CODES[code];
            if (!play) return null;
            return (
              <PlayResultButton
                key={code}
                play={play}
                onClick={handlePlay}
                disabled={isOver}
              />
            );
          })}
        </div>
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <button className={styles.ctrl} onClick={handleAddRun} disabled={isOver}>+1 Carrera</button>
        <button className={styles.ctrl} onClick={handleAddOut} disabled={isOver}>+1 Out</button>
        <button className={styles.ctrl} onClick={handleClearBases} disabled={isOver}>Limpiar Bases</button>
        <button
          className={`${styles.ctrl} ${styles.ctrlUndo}`}
          onClick={handleUndo}
          disabled={!canUndo || isOver}
        >
          ↩ Deshacer
        </button>
        <button
          className={`${styles.ctrl} ${styles.ctrlWarning}`}
          onClick={handleEndHalf}
          disabled={isOver}
        >
          Fin de {game.isTopInning ? 'Alto' : 'Bajo'}
        </button>
        <button
          className={`${styles.ctrl} ${styles.ctrlDanger}`}
          onClick={handleFinishGame}
          disabled={isOver}
        >
          Terminar Juego
        </button>
      </div>

      {/* Recent plays */}
      <div className={styles.recentPlays}>
        <h3 className={styles.playsTitle}>Jugadas Recientes</h3>
        {recentPlays.length === 0 && (
          <p className={styles.noPlays}>No hay jugadas registradas aún.</p>
        )}
        {recentPlays.map(ev => {
          const player = MOCK_PLAYERS.find(p => p.id === ev.playerId);
          return (
            <div key={ev.id} className={styles.playRow}>
              <span className={styles.playInning}>{ev.isTop ? '▲' : '▼'}{ev.inning}</span>
              <span className={styles.playCode}>{ev.code}</span>
              <span className={styles.playPlayer}>
                {player ? `${player.firstName} ${player.lastName}` : 'N/A'}
              </span>
              <span className={styles.playDesc}>{ev.description}</span>
              {ev.runsScored > 0 && (
                <span className={styles.playRuns}>+{ev.runsScored}R</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
