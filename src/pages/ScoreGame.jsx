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

// Most common plays — always visible above the category tabs
const QUICK_PLAY_CODES = ['H1', 'H2', 'HR', 'BB', 'K', 'GO43', 'F8', 'E6'];

const QUICK_NOTE_CHIPS = [
  'Cambio defensivo',
  'Jugada dudosa',
  'Error revisado',
  'Lesión',
  'Comentario del inning',
];

// Maps PLAY_CODES[code].category → quick-play button CSS class
const QP_CLASS = {
  hit: styles.qpHit,
  walk: styles.qpWalk,
  out: styles.qpOut,
  error: styles.qpError,
  sacrifice: styles.qpSpecial,
  other: styles.qpSpecial,
};

export default function ScoreGame({ onNavigate }) {
  const [currentGame, setCurrentGame, removeCurrentGame] = useLocalStorage('currentGame', null);
  const [, setCompletedGames] = useLocalStorage('dugout_completed_games', []);
  const [activeGroup, setActiveGroup] = useState(0);
  const [noteText, setNoteText] = useState('');

  const game = currentGame || MOCK_CURRENT_GAME;

  const homeTeam = MOCK_TEAMS.find(t => t.id === game.homeTeamId);
  const awayTeam  = MOCK_TEAMS.find(t => t.id === game.awayTeamId);

  const homeLineup = (game.homeLineup && game.homeLineup.length > 0) ? game.homeLineup : MOCK_HOME_LINEUP;
  const awayLineup = (game.awayLineup && game.awayLineup.length > 0) ? game.awayLineup : MOCK_AWAY_LINEUP;
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
    saveGame(applyPlayToGameState(game, code, currentPlayer?.id, homeLineup, awayLineup));
  };

  const handleUndo       = () => {
    if (!game.history || game.history.length === 0) return;
    saveGame(undoLastPlay(game));
  };
  const handleEndHalf    = () => saveGame(endHalfInning(game));
  const handleAddRun     = () => saveGame(addManualRun(game));
  const handleAddOut     = () => saveGame(addManualOut(game));
  const handleClearBases = () => saveGame({ ...game, bases: [false, false, false] });

  const handleFinishGame = () => {
    if (!window.confirm('¿Terminar el juego? Esta acción no se puede deshacer.')) return;
    const finished = finishGame(game);
    setCompletedGames(prev => [...(prev || []), finished]);
    removeCurrentGame();
    onNavigate('game-summary');
  };

  /* ── Scorebook notes ── */
  const notes = game.scorebookNotes || [];

  // Chips append to the textarea — user still decides when to save
  const appendChip = (chip) => {
    setNoteText(prev => prev.trim() ? `${prev.trim()} · ${chip}` : chip);
  };

  const saveNote = (text) => {
    if (!text.trim()) return;
    const noteSeq = (game.noteSeq || 0) + 1;
    const note = {
      id: `note-${noteSeq}`,
      inning: game.currentInning,
      isTopInning: game.isTopInning,
      text: text.trim(),
    };
    saveGame({ ...game, scorebookNotes: [...notes, note], noteSeq });
    setNoteText('');
  };

  const deleteNote = (id) => {
    saveGame({ ...game, scorebookNotes: notes.filter(n => n.id !== id) });
  };

  const recentPlays = [...(game.playEvents || [])].reverse().slice(0, 8);
  const canUndo = game.history && game.history.length > 0;
  const isOver  = game.status === 'final';

  return (
    <div className={styles.page}>

      {/* Scoreboard — always full width */}
      <Scoreboard game={game} homeTeam={homeTeam} awayTeam={awayTeam} />

      {/* Two-column console: left=plays, right=log+notes */}
      <div className={styles.consoleGrid}>

        {/* ── Left / Main column ── */}
        <div className={styles.mainCol}>

          {/* Current situation: bases diamond + batter card */}
          <div className={styles.situationRow}>
            <BasesDiamond bases={game.bases} />
            <CurrentBatterCard
              player={currentPlayer}
              order={currentEntry?.order}
              position={currentEntry?.position}
              nextPlayer={nextPlayer}
            />
          </div>

          {/* Quick plays — most common, thumb-friendly, always visible */}
          <div className={styles.quickPanel}>
            <div className={styles.quickHeader}>
              <span className={styles.quickLabel}>Jugadas rápidas</span>
            </div>
            <div className={styles.quickGrid}>
              {QUICK_PLAY_CODES.map(code => {
                const play = PLAY_CODES[code];
                if (!play) return null;
                return (
                  <button
                    key={code}
                    className={`${styles.quickBtn} ${QP_CLASS[play.category] || styles.qpSpecial}`}
                    onClick={() => handlePlay(code)}
                    disabled={isOver}
                    title={play.description}
                  >
                    {play.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Full categorized play panel */}
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

          {/* Action controls */}
          <div className={styles.controls}>
            <div className={styles.controlsRow}>
              <button className={`${styles.ctrl} ${styles.ctrlGreen}`} onClick={handleAddRun} disabled={isOver}>
                <span className={styles.ctrlIcon}>+1</span>Carrera
              </button>
              <button className={`${styles.ctrl} ${styles.ctrlSlate}`} onClick={handleAddOut} disabled={isOver}>
                <span className={styles.ctrlIcon}>+1</span>Out
              </button>
              <button className={`${styles.ctrl} ${styles.ctrlSecondary}`} onClick={handleClearBases} disabled={isOver}>
                Limpiar Bases
              </button>
            </div>
            <div className={styles.controlsRow}>
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
          </div>

        </div>

        {/* ── Right / Side column ── */}
        <div className={styles.sideCol}>

          {/* Play-by-play log */}
          <div className={styles.recentPlays}>
            <h3 className={styles.playsTitle}>Registro de Jugadas</h3>
            {recentPlays.length === 0 && (
              <p className={styles.noPlays}>No hay jugadas registradas aún.</p>
            )}
            {recentPlays.map(ev => {
              const player = MOCK_PLAYERS.find(p => p.id === ev.playerId);
              return (
                <div key={ev.id} className={styles.playRow}>
                  <span className={styles.playInning}>{ev.isTop ? '▲' : '▼'}{ev.inning}</span>
                  <span className={styles.playCode}>{ev.code}</span>
                  <span className={styles.playPlayer}>{player ? player.lastName : 'N/A'}</span>
                  <span className={styles.playDesc}>{ev.description}</span>
                  {ev.runsScored > 0 && <span className={styles.playRuns}>+{ev.runsScored}R</span>}
                </div>
              );
            })}
          </div>

          {/* Scorebook notes */}
          <div className={styles.notesPanel}>
            <h3 className={styles.notesTitle}>Apuntes del juego</h3>
            <div className={styles.noteChips}>
              {QUICK_NOTE_CHIPS.map(chip => (
                <button key={chip} className={styles.noteChip} onClick={() => appendChip(chip)}>
                  {chip}
                </button>
              ))}
            </div>
            <div className={styles.noteInputRow}>
              <textarea
                className={styles.noteInput}
                placeholder="Nota del juego..."
                value={noteText}
                onChange={e => setNoteText(e.target.value)}
                rows={2}
              />
              <button
                className={styles.noteSaveBtn}
                onClick={() => saveNote(noteText)}
                disabled={!noteText.trim()}
              >
                Guardar
              </button>
            </div>
            {notes.length > 0 && (
              <div className={styles.notesList}>
                {[...notes].reverse().slice(0, 6).map(note => (
                  <div key={note.id} className={styles.noteItem}>
                    <span className={styles.noteInning}>{note.isTopInning ? '▲' : '▼'}{note.inning}</span>
                    <span className={styles.noteText}>{note.text}</span>
                    <button className={styles.noteDelete} onClick={() => deleteNote(note.id)}>×</button>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
