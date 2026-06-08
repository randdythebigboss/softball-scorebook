import { MOCK_TEAMS, MOCK_PLAYERS, MOCK_HOME_LINEUP, MOCK_AWAY_LINEUP } from '../data/mockData';
import { POSITIONS } from '../data/playCodes';
import SectionHeader from '../components/ui/SectionHeader';
import Button from '../components/ui/Button';
import styles from './Lineup.module.css';

export default function Lineup({ onNavigate, currentGame }) {
  const game = currentGame || {
    homeTeamId: 'team-titanes',
    awayTeamId: 'team-veron',
  };

  const homeTeam = MOCK_TEAMS.find(t => t.id === game.homeTeamId);
  const awayTeam  = MOCK_TEAMS.find(t => t.id === game.awayTeamId);
  const homePlayers = MOCK_PLAYERS.filter(p => p.teamId === game.homeTeamId && p.active);
  const awayPlayers = MOCK_PLAYERS.filter(p => p.teamId === game.awayTeamId && p.active);

  return (
    <div className={styles.page}>
      <SectionHeader title="Alineación" />

      <div className={styles.panels}>
        <LineupPanel team={awayTeam} lineup={MOCK_AWAY_LINEUP} players={awayPlayers} label="Visitante" />
        <LineupPanel team={homeTeam} lineup={MOCK_HOME_LINEUP} players={homePlayers} label="Local" />
      </div>

      <Button size="xl" fullWidth onClick={() => onNavigate('score-game')}>
        Comenzar a Puntuar →
      </Button>
    </div>
  );
}

function LineupPanel({ team, lineup, players, label }) {
  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader} style={{ background: team?.color }}>
        <div className={styles.panelLogo}>{team?.shortName?.slice(0, 2)}</div>
        <div>
          <div className={styles.panelTeam}>{team?.name}</div>
          <div className={styles.panelLabel}>{label}</div>
        </div>
      </div>

      {lineup.length > 0 ? (
        <div className={styles.lineupList}>
          {lineup.map((entry, i) => {
            const player = players.find(p => p.id === entry.playerId);
            return (
              <div key={i} className={styles.lineupRow}>
                <span className={styles.order}>{entry.order}</span>
                <span className={styles.num}>#{player?.number || '--'}</span>
                <span className={styles.playerName}>
                  {player ? `${player.firstName} ${player.lastName}` : 'Sin asignar'}
                </span>
                <span className={styles.pos}>{entry.position}</span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className={styles.empty}>
          <p>Alineación pendiente</p>
          <p className={styles.emptySub}>Agregar jugadores próximamente</p>
        </div>
      )}

      <div className={styles.bench}>
        <span className={styles.benchTitle}>Banca disponible</span>
        <div className={styles.benchList}>
          {players
            .filter(p => !lineup.find(l => l.playerId === p.id))
            .slice(0, 4)
            .map(p => (
              <span key={p.id} className={styles.benchPlayer}>
                #{p.number} {p.lastName}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}
