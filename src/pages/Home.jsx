import { PlusCircle, Play, Trophy, TrendingUp, Users, Activity } from 'lucide-react';
import KpiCard from '../components/ui/KpiCard';
import SectionHeader from '../components/ui/SectionHeader';
import GameSummaryCard from '../components/dashboards/GameSummaryCard';
import PlayerStatsCard from '../components/dashboards/PlayerStatsCard';
import Button from '../components/ui/Button';
import { MOCK_TEAMS, MOCK_GAMES, MOCK_PLAYERS } from '../data/mockData';
import { getTopPlayers } from '../utils/stats';
import styles from './Home.module.css';

const mainTeam = MOCK_TEAMS.find(t => t.isMainTeam);
const recentGames = MOCK_GAMES.slice(0, 3);
const topPlayers = getTopPlayers(MOCK_PLAYERS.filter(p => p.teamId === mainTeam?.id), 'avg', 3);

export default function Home({ onNavigate, currentGame }) {
  const hasCurrentGame = currentGame && currentGame.status === 'in_progress';

  return (
    <div className={styles.page}>
      {/* Hero card */}
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroLogo}>CV</div>
          <div>
            <h1 className={styles.heroTeam}>{mainTeam?.name}</h1>
            <p className={styles.heroSub}>Temporada 2026 · Softball Informal</p>
          </div>
        </div>
        <div className={styles.heroActions}>
          <Button size="lg" onClick={() => onNavigate('new-game')}>
            <PlusCircle size={18} /> Nuevo Juego
          </Button>
          {hasCurrentGame && (
            <Button size="lg" variant="outline" onClick={() => onNavigate('score-game')}>
              <Play size={18} /> Continuar Juego
            </Button>
          )}
        </div>
        <div className={styles.heroRecord}>
          <span>{mainTeam?.stats.wins}V</span>
          <span className={styles.heroDash}>-</span>
          <span>{mainTeam?.stats.losses}D</span>
        </div>
      </div>

      {/* KPIs */}
      <div className={styles.kpiGrid}>
        <KpiCard label="Jugados"  value={mainTeam?.stats.gamesPlayed} icon={Activity} />
        <KpiCard label="Victorias" value={mainTeam?.stats.wins}  icon={Trophy} accent />
        <KpiCard label="Derrotas" value={mainTeam?.stats.losses} icon={TrendingUp} />
        <KpiCard label="Carreras" value={mainTeam?.stats.runsScored} icon={Users} />
      </div>

      {/* Recent games */}
      <section>
        <SectionHeader
          title="Juegos Recientes"
          action={<span onClick={() => onNavigate('stats')}>Ver todos</span>}
        />
        <div className={styles.gamesList}>
          {recentGames.map(game => {
            const home = MOCK_TEAMS.find(t => t.id === game.homeTeamId);
            const away = MOCK_TEAMS.find(t => t.id === game.awayTeamId);
            return (
              <GameSummaryCard
                key={game.id}
                game={game}
                homeTeam={home}
                awayTeam={away}
                onClick={() => onNavigate('game-summary')}
              />
            );
          })}
        </div>
      </section>

      {/* Top players */}
      <section>
        <SectionHeader
          title="Top Bateadores"
          action={<span onClick={() => onNavigate('stats')}>Ver stats</span>}
        />
        <div className={styles.playersList}>
          {topPlayers.map((player, i) => {
            const team = MOCK_TEAMS.find(t => t.id === player.teamId);
            return <PlayerStatsCard key={player.id} player={player} team={team} rank={i + 1} />;
          })}
        </div>
      </section>

      {/* Quick actions */}
      <section>
        <SectionHeader title="Acciones Rápidas" />
        <div className={styles.quickActions}>
          <button className={styles.qa} onClick={() => onNavigate('teams')}>
            <Users size={24} />
            <span>Equipos</span>
          </button>
          <button className={styles.qa} onClick={() => onNavigate('players')}>
            <Activity size={24} />
            <span>Jugadores</span>
          </button>
          <button className={styles.qa} onClick={() => onNavigate('lineup')}>
            <Trophy size={24} />
            <span>Alineación</span>
          </button>
          <button className={styles.qa} onClick={() => onNavigate('stats')}>
            <TrendingUp size={24} />
            <span>Estadísticas</span>
          </button>
        </div>
      </section>
    </div>
  );
}
