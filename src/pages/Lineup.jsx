import { useState } from 'react';
import { MOCK_PLAYERS } from '../data/mockData';
import { useTeams } from '../hooks/useTeams';
import { POSITIONS } from '../data/playCodes';
import { initializePlayerGameStats } from '../utils/gameHelpers';
import { useLocalStorage } from '../hooks/useLocalStorage';
import SectionHeader from '../components/ui/SectionHeader';
import Button from '../components/ui/Button';
import styles from './Lineup.module.css';

const MIN_BATTERS = 9;
const MAX_SLOTS   = 12;

function emptySlot() { return { playerId: '', position: '' }; }

function getDupIds(slots) {
  const ids = slots.map(s => s.playerId).filter(Boolean);
  return ids.filter((id, i) => ids.indexOf(id) !== i);
}

function lineupToSlots(lineup) {
  if (!lineup || lineup.length === 0)
    return Array.from({ length: MIN_BATTERS }, emptySlot);
  const sorted = [...lineup].sort((a, b) => a.order - b.order);
  const slots = sorted.map(e => ({ playerId: e.playerId || '', position: e.position || '' }));
  while (slots.length < MIN_BATTERS) slots.push(emptySlot());
  return slots;
}

function slotsToLineup(slots) {
  return slots
    .map((s, i) => ({ order: i + 1, playerId: s.playerId, position: s.position }))
    .filter(e => e.playerId);
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function Lineup({ onNavigate }) {
  // Use hook directly so we always read from localStorage after NewGame writes.
  const [currentGame, setCurrentGame] = useLocalStorage('currentGame', null);
  const [saved, setSaved] = useState(false);
  const { getTeamById } = useTeams();

  const game = currentGame || {
    homeTeamId: 'team-titanes',
    awayTeamId: 'team-veron',
    homeLineup: [],
    awayLineup: [],
  };

  const [homeSlots, setHomeSlots] = useState(() => lineupToSlots(game.homeLineup));
  const [awaySlots, setAwaySlots] = useState(() => lineupToSlots(game.awayLineup));

  const homeTeam = getTeamById(game.homeTeamId);
  const awayTeam  = getTeamById(game.awayTeamId);
  const homePlayers = MOCK_PLAYERS.filter(p => p.teamId === game.homeTeamId && p.active);
  const awayPlayers = MOCK_PLAYERS.filter(p => p.teamId === game.awayTeamId && p.active);

  const homeActive    = homeSlots.filter(s => s.playerId).length;
  const awayActive    = awaySlots.filter(s => s.playerId).length;
  const homeDupIds    = getDupIds(homeSlots);
  const awayDupIds    = getDupIds(awaySlots);
  const homeMissingPos = homeSlots.some(s => s.playerId && !s.position);
  const awayMissingPos = awaySlots.some(s => s.playerId && !s.position);

  const saveBlocker = !currentGame
    ? 'No active game found. Create a new game first.'
    : homeActive < MIN_BATTERS
      ? `Home Team needs at least ${MIN_BATTERS} active batters (${homeActive}/${MIN_BATTERS}).`
      : awayActive < MIN_BATTERS
        ? `Away Team needs at least ${MIN_BATTERS} active batters (${awayActive}/${MIN_BATTERS}).`
        : homeDupIds.length > 0
          ? 'Home lineup has duplicate players.'
          : awayDupIds.length > 0
            ? 'Away lineup has duplicate players.'
            : homeMissingPos
              ? 'All Home batters must have a position assigned.'
              : awayMissingPos
                ? 'All Away batters must have a position assigned.'
                : null;

  const canSave = saveBlocker === null;

  const markChanged = () => setSaved(false);

  const handleSave = () => {
    if (!canSave) return;
    const hl = slotsToLineup(homeSlots);
    const al = slotsToLineup(awaySlots);
    setCurrentGame({
      ...currentGame,
      homeLineup: hl,
      awayLineup: al,
      playerGameStats: initializePlayerGameStats(hl, al),
      homeLineupIndex: 0,
      awayLineupIndex: 0,
      updatedAt: new Date().toISOString(),
    });
    setSaved(true);
  };

  return (
    <div className={styles.page}>
      <SectionHeader title="Lineup Editor" />

      {!currentGame && (
        <div className={styles.notice}>
          No active game found. Create a new game first.
        </div>
      )}

      <div className={styles.panels}>
        <LineupPanel
          team={awayTeam}
          label="Away"
          players={awayPlayers}
          slots={awaySlots}
          dupIds={awayDupIds}
          onChange={(next) => { setAwaySlots(next); markChanged(); }}
        />
        <LineupPanel
          team={homeTeam}
          label="Home"
          players={homePlayers}
          slots={homeSlots}
          dupIds={homeDupIds}
          onChange={(next) => { setHomeSlots(next); markChanged(); }}
        />
      </div>

      <div className={styles.saveArea}>
        {saveBlocker && (
          <div className={styles.notice}>{saveBlocker}</div>
        )}
        {saved && (
          <div className={styles.success}>Lineups saved successfully!</div>
        )}
        <Button size="xl" fullWidth onClick={handleSave} disabled={!canSave}>
          Save Both Lineups
        </Button>
        {saved && (
          <Button size="xl" fullWidth variant="secondary" onClick={() => onNavigate('score-game')}>
            Go to Score Game →
          </Button>
        )}
      </div>
    </div>
  );
}

// ─── Panel ─────────────────────────────────────────────────────────────────────

function LineupPanel({ team, label, players, slots, dupIds, onChange }) {
  const usedIds = slots.map(s => s.playerId).filter(Boolean);
  const benchPlayers = players.filter(p => !usedIds.includes(p.id));
  const activeCount  = usedIds.length;

  const update = (idx, field, value) => {
    const next = [...slots];
    next[idx] = { ...next[idx], [field]: value };
    onChange(next);
  };

  const addSlot = () => {
    if (slots.length < MAX_SLOTS) onChange([...slots, emptySlot()]);
  };

  const removeSlot = (idx) => {
    if (slots.length <= MIN_BATTERS) return;
    onChange(slots.filter((_, i) => i !== idx));
  };

  const autoFill = () => {
    const filled = players.slice(0, slots.length).map(p => ({
      playerId: p.id,
      position: p.position || '',
    }));
    while (filled.length < slots.length) filled.push(emptySlot());
    onChange(filled);
  };

  const clearSlots = () => onChange(Array.from({ length: MIN_BATTERS }, emptySlot));

  return (
    <div className={styles.panel}>
      {/* Header */}
      <div className={styles.panelHeader} style={{ background: team?.color }}>
        <div className={styles.panelLogo}>{team?.shortName?.slice(0, 2)}</div>
        <div className={styles.panelInfo}>
          <div className={styles.panelTeam}>{team?.name || label}</div>
          <div className={styles.panelLabel}>{label} · {activeCount} batter{activeCount !== 1 ? 's' : ''}</div>
        </div>
        <div className={styles.panelBtns}>
          <button className={styles.panelBtn} onClick={autoFill} type="button">Auto Fill</button>
          <button className={styles.panelBtn} onClick={clearSlots} type="button">Clear</button>
        </div>
      </div>

      {/* No-player guidance */}
      {players.length === 0 && (
        <div className={styles.notice}>
          Este equipo no tiene jugadores aún. Necesitas agregar jugadores antes de poder crear la alineación.
        </div>
      )}

      {/* Slot rows */}
      <div className={styles.slotList}>
        {slots.map((slot, idx) => {
          const isDup = slot.playerId && dupIds.includes(slot.playerId);
          return (
            <div key={idx} className={`${styles.slotRow} ${isDup ? styles.slotDup : ''}`}>
              <span className={styles.order}>{idx + 1}</span>
              <select
                className={styles.playerSel}
                value={slot.playerId}
                onChange={e => update(idx, 'playerId', e.target.value)}
              >
                <option value="">— Select —</option>
                {players.map(p => (
                  <option key={p.id} value={p.id}>
                    #{p.number} {p.lastName}
                  </option>
                ))}
              </select>
              <select
                className={styles.posSel}
                value={slot.position}
                onChange={e => update(idx, 'position', e.target.value)}
              >
                <option value="">-</option>
                {POSITIONS.map(pos => (
                  <option key={pos.code} value={pos.code}>{pos.code}</option>
                ))}
              </select>
              <button
                className={styles.removeBtn}
                onClick={() => removeSlot(idx)}
                disabled={slots.length <= MIN_BATTERS}
                type="button"
                aria-label="Remove slot"
              >
                ×
              </button>
            </div>
          );
        })}
      </div>

      {/* Dup warning */}
      {dupIds.length > 0 && (
        <div className={styles.dupWarn}>
          This player is already in the lineup.
        </div>
      )}

      {/* Add / Remove slot controls */}
      <div className={styles.slotCtrl}>
        <button
          className={styles.addBtn}
          onClick={addSlot}
          disabled={slots.length >= MAX_SLOTS}
          type="button"
        >
          + Add Batting Slot
        </button>
        <button
          className={styles.removeLastBtn}
          onClick={() => removeSlot(slots.length - 1)}
          disabled={slots.length <= MIN_BATTERS}
          type="button"
        >
          Remove Slot
        </button>
      </div>

      {/* Bench */}
      {benchPlayers.length > 0 && (
        <div className={styles.bench}>
          <span className={styles.benchTitle}>Bench (not in batting order)</span>
          <div className={styles.benchList}>
            {benchPlayers.map(p => (
              <span key={p.id} className={styles.benchPlayer}>
                #{p.number} {p.lastName}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
