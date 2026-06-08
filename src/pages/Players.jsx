import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { MOCK_PLAYERS, MOCK_TEAMS } from '../data/mockData';
import { calcAVG } from '../utils/stats';
import StatBadge from '../components/ui/StatBadge';
import SectionHeader from '../components/ui/SectionHeader';
import styles from './Players.module.css';

export default function Players() {
  const [search, setSearch] = useState('');
  const [teamFilter, setTeamFilter] = useState('all');

  const filtered = MOCK_PLAYERS.filter(p => {
    const matchTeam = teamFilter === 'all' || p.teamId === teamFilter;
    const q = search.toLowerCase();
    const matchSearch = !q ||
      p.firstName.toLowerCase().includes(q) ||
      p.lastName.toLowerCase().includes(q) ||
      (p.nickname && p.nickname.toLowerCase().includes(q)) ||
      String(p.number).includes(q);
    return matchTeam && matchSearch;
  });

  return (
    <div className={styles.page}>
      <SectionHeader title="Jugadores" />

      <div className={styles.filters}>
        <div className={styles.searchWrap}>
          <Search size={16} className={styles.searchIcon} />
          <input
            className={styles.search}
            placeholder="Buscar jugador..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className={styles.filterWrap}>
          <Filter size={16} />
          <select
            className={styles.select}
            value={teamFilter}
            onChange={e => setTeamFilter(e.target.value)}
          >
            <option value="all">Todos los equipos</option>
            {MOCK_TEAMS.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.count}>{filtered.length} jugador{filtered.length !== 1 ? 'es' : ''}</div>

      <div className={styles.list}>
        {filtered.map(player => {
          const team = MOCK_TEAMS.find(t => t.id === player.teamId);
          const avg = calcAVG(player.stats.hits, player.stats.ab);
          return (
            <div key={player.id} className={styles.card}>
              <div className={styles.avatar} style={{ background: team?.color }}>
                {player.number}
              </div>
              <div className={styles.info}>
                <div className={styles.nameRow}>
                  <span className={styles.name}>{player.firstName} {player.lastName}</span>
                  {player.nickname && <span className={styles.nick}>"{player.nickname}"</span>}
                  <span className={`${styles.badge} ${player.active ? styles.active : styles.inactive}`}>
                    {player.active ? 'Activo' : 'Inactivo'}
                  </span>
                </div>
                <div className={styles.meta}>
                  <span style={{ background: team?.color + '20', color: team?.color }} className={styles.teamTag}>
                    {team?.shortName}
                  </span>
                  <span className={styles.pos}>{player.position}</span>
                  <span className={styles.bats}>Bats {player.bats}</span>
                </div>
              </div>
              <div className={styles.statsRow}>
                <StatBadge label="AVG" value={avg} />
                <StatBadge label="HR" value={player.stats.hr} />
                <StatBadge label="RBI" value={player.stats.rbi} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
