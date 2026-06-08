import { useState } from 'react';
import { Calendar, MapPin, Users, Settings } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import SectionHeader from '../components/ui/SectionHeader';
import { MOCK_TEAMS } from '../data/mockData';
import { useLocalStorage } from '../hooks/useLocalStorage';
import styles from './NewGame.module.css';

const GAME_TYPES = ['Amistoso', 'Liga', 'Torneo', 'Práctica'];
const INNINGS_OPTIONS = [5, 6, 7, 9, 'Custom'];

export default function NewGame({ onNavigate }) {
  const [, setCurrentGame] = useLocalStorage('currentGame', null);

  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    location: 'Estadio Juan Marichal',
    homeTeamId: 'team-titanes',
    awayTeamId: 'team-veron',
    type: 'Liga',
    innings: 7,
    customInnings: '',
    freeSubstitutions: true,
    trackPositions: true,
    quickScoring: true,
  });

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const handleTeamChange = (side, newId) => {
    setForm(f => {
      const next = { ...f, [`${side}TeamId`]: newId };
      const otherKey = side === 'home' ? 'awayTeamId' : 'homeTeamId';
      if (next[otherKey] === newId) {
        const alt = MOCK_TEAMS.find(t => t.id !== newId);
        if (alt) next[otherKey] = alt.id;
      }
      return next;
    });
  };

  const sameTeam = form.homeTeamId === form.awayTeamId;

  const handleStart = () => {
    const totalInnings = form.innings === 'Custom'
      ? (parseInt(form.customInnings, 10) || 7)
      : form.innings;

    const now = new Date().toISOString();
    const game = {
      id: `game-${Date.now()}`,
      date: form.date,
      location: form.location,
      homeTeamId: form.homeTeamId,
      awayTeamId: form.awayTeamId,
      type: form.type,
      totalInnings,
      status: 'in_progress',
      currentInning: 1,
      isTopInning: true,
      outs: 0,
      bases: [false, false, false],
      homeScore: 0,
      awayScore: 0,
      homeLineupIndex: 0,
      awayLineupIndex: 0,
      lineScore: {
        home: Array(totalInnings).fill(null),
        away: Array(totalInnings).fill(null),
      },
      totals: { home: { runs: 0, hits: 0, errors: 0 }, away: { runs: 0, hits: 0, errors: 0 } },
      homeLineup: [],
      awayLineup: [],
      playerGameStats: {},
      playEvents: [],
      history: [],
      createdAt: now,
      updatedAt: now,
      finishedAt: null,
    };

    setCurrentGame(game);
    onNavigate('lineup');
  };

  return (
    <div className={styles.page}>
      <SectionHeader title="Nuevo Juego" />

      <Card padding="lg">
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}><Calendar size={16} /> Detalles del Juego</h3>
          <div className={styles.row}>
            <label className={styles.label}>Fecha</label>
            <input
              type="date"
              className={styles.input}
              value={form.date}
              onChange={e => set('date', e.target.value)}
            />
          </div>
          <div className={styles.row}>
            <label className={styles.label}><MapPin size={14} /> Lugar</label>
            <input
              className={styles.input}
              value={form.location}
              onChange={e => set('location', e.target.value)}
              placeholder="Estadio / Parque"
            />
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}><Users size={16} /> Equipos</h3>
          <div className={styles.teamsGrid}>
            <div>
              <label className={styles.label}>Equipo Local</label>
              <select
                className={styles.select}
                value={form.homeTeamId}
                onChange={e => handleTeamChange('home', e.target.value)}
              >
                {MOCK_TEAMS.filter(t => t.id !== form.awayTeamId).map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
            <div className={styles.vs}>VS</div>
            <div>
              <label className={styles.label}>Equipo Visitante</label>
              <select
                className={styles.select}
                value={form.awayTeamId}
                onChange={e => handleTeamChange('away', e.target.value)}
              >
                {MOCK_TEAMS.filter(t => t.id !== form.homeTeamId).map(t => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
          </div>
          {sameTeam && (
            <div className={styles.sameTeamWarn}>
              Home and Away teams must be different.
            </div>
          )}
        </div>

        <div className={styles.divider} />

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}><Settings size={16} /> Configuración</h3>

          <div className={styles.row}>
            <label className={styles.label}>Tipo de Juego</label>
            <div className={styles.chips}>
              {GAME_TYPES.map(t => (
                <button
                  key={t}
                  className={`${styles.chip} ${form.type === t ? styles.chipActive : ''}`}
                  onClick={() => set('type', t)}
                  type="button"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.row}>
            <label className={styles.label}>Entradas</label>
            <div className={styles.chips}>
              {INNINGS_OPTIONS.map(i => (
                <button
                  key={i}
                  className={`${styles.chip} ${form.innings === i ? styles.chipActive : ''}`}
                  onClick={() => set('innings', i)}
                  type="button"
                >
                  {i}
                </button>
              ))}
            </div>
            {form.innings === 'Custom' && (
              <input
                type="number"
                className={styles.input}
                style={{ marginTop: 8, width: 100 }}
                placeholder="# entradas"
                value={form.customInnings}
                onChange={e => set('customInnings', e.target.value)}
                min={1}
                max={15}
              />
            )}
          </div>

          <div className={styles.toggleRow}>
            <span className={styles.label}>Sustituciones libres</span>
            <button
              className={`${styles.toggle} ${form.freeSubstitutions ? styles.toggleOn : ''}`}
              onClick={() => set('freeSubstitutions', !form.freeSubstitutions)}
              type="button"
            >
              <div className={styles.toggleThumb} />
            </button>
          </div>

          <div className={styles.toggleRow}>
            <span className={styles.label}>Rastrear posiciones defensivas</span>
            <button
              className={`${styles.toggle} ${form.trackPositions ? styles.toggleOn : ''}`}
              onClick={() => set('trackPositions', !form.trackPositions)}
              type="button"
            >
              <div className={styles.toggleThumb} />
            </button>
          </div>

          <div className={styles.toggleRow}>
            <span className={styles.label}>Modo Quick Scoring</span>
            <button
              className={`${styles.toggle} ${form.quickScoring ? styles.toggleOn : ''}`}
              onClick={() => set('quickScoring', !form.quickScoring)}
              type="button"
            >
              <div className={styles.toggleThumb} />
            </button>
          </div>
        </div>
      </Card>

      <Button size="xl" fullWidth onClick={handleStart} disabled={sameTeam}>
        Comenzar Juego →
      </Button>
    </div>
  );
}
