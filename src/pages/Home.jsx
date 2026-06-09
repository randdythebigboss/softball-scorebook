import { PlusCircle, Play, Trophy, TrendingUp, Users, Activity } from 'lucide-react';
import KpiCard from '../components/ui/KpiCard';
import SectionHeader from '../components/ui/SectionHeader';
import GameSummaryCard from '../components/dashboards/GameSummaryCard';
import PlayerStatsCard from '../components/dashboards/PlayerStatsCard';
import Button from '../components/ui/Button';
import { MOCK_GAMES, MOCK_PLAYERS } from '../data/mockData';
import { useTeams } from '../hooks/useTeams';
import { getTopPlayers } from '../utils/stats';
import styles from './Home.module.css';

const recentGames = MOCK_GAMES.slice(0, 3);

export default function Home({ onNavigate, currentGame }) {
  const { teams } = useTeams();
  const mainTeam = teams.find(t => t.isMainTeam);
  const topPlayers = getTopPlayers(MOCK_PLAYERS.filter(p => p.teamId === mainTeam?.id), 'avg', 3);
  const hasCurrentGame = currentGame && currentGame.status === 'in_progress';

  return (
    <div className={styles.page}>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <div className={styles.hero}>
        <div className={styles.heroTop}>
          <div className={styles.heroIdentity}>
            <div className={styles.heroLogo}>CV</div>
            <div className={styles.heroText}>
              <h1 className={styles.heroTeam}>{mainTeam?.name}</h1>
              <p className={styles.heroSub}>Temporada 2026 · Softball Informal</p>
            </div>
          </div>
          <div className={styles.heroRecord}>
            <div className={styles.heroStat}>
              <span className={styles.heroStatVal}>{mainTeam?.stats.wins}</span>
              <span className={styles.heroStatLbl}>V</span>
            </div>
            <span className={styles.heroDash}>·</span>
            <div className={styles.heroStat}>
              <span className={styles.heroStatValMuted}>{mainTeam?.stats.losses}</span>
              <span className={styles.heroStatLbl}>D</span>
            </div>
          </div>
        </div>

        <div className={styles.heroActions}>
          <Button size="lg" onClick={() => onNavigate('new-game')}>
            <PlusCircle size={18} /> Nuevo Juego
          </Button>
          {hasCurrentGame && (
            <Button
              size="lg"
              variant="outline"
              onClick={() => onNavigate('score-game')}
              className={styles.heroOutlineBtn}
            >
              <Play size={18} /> Continuar Juego
            </Button>
          )}
        </div>
      </div>

      {/* ── Desktop 2-column layout ─────────────────────────────────────── */}
      <div className={styles.desktopGrid}>

        {/* Left / Main column */}
        <div className={styles.mainCol}>
          <section>
            <SectionHeader
              title="Juegos Recientes"
              action={<span onClick={() => onNavigate('stats')}>Ver todos</span>}
            />
            <div className={styles.gamesList}>
              {recentGames.map(game => {
                const home = teams.find(t => t.id === game.homeTeamId);
                const away = teams.find(t => t.id === game.awayTeamId);
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

          <section>
            <SectionHeader title="Acciones Rápidas" />
            <div className={styles.quickActions}>
              <button className={styles.qa} onClick={() => onNavigate('teams')}>
                <Users size={22} />
                <span>Equipos</span>
              </button>
              <button className={styles.qa} onClick={() => onNavigate('players')}>
                <Activity size={22} />
                <span>Jugadores</span>
              </button>
              <button className={styles.qa} onClick={() => onNavigate('lineup')}>
                <Trophy size={22} />
                <span>Alineación</span>
              </button>
              <button className={styles.qa} onClick={() => onNavigate('stats')}>
                <TrendingUp size={22} />
                <span>Estadísticas</span>
              </button>
            </div>
          </section>
        </div>

        {/* Right / Side column */}
        <div className={styles.sideCol}>
          <div className={styles.kpiGrid}>
            <KpiCard label="Jugados"   value={mainTeam?.stats.gamesPlayed} icon={Activity} />
            <KpiCard label="Victorias" value={mainTeam?.stats.wins}         icon={Trophy} accent />
            <KpiCard label="Derrotas"  value={mainTeam?.stats.losses}       icon={TrendingUp} />
            <KpiCard label="Carreras"  value={mainTeam?.stats.runsScored}   icon={Users} />
          </div>

          <section>
            <SectionHeader
              title="Top Bateadores"
              action={<span onClick={() => onNavigate('stats')}>Ver stats</span>}
            />
            <div className={styles.playersList}>
              {topPlayers.map((player, i) => {
                const team = teams.find(t => t.id === player.teamId);
                return <PlayerStatsCard key={player.id} player={player} team={team} rank={i + 1} />;
              })}
            </div>
          </section>
        </div>

      </div>
    </div>
  );
}
