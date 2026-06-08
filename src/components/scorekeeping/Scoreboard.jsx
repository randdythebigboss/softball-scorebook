import styles from './Scoreboard.module.css';

export default function Scoreboard({ game, homeTeam, awayTeam }) {
  const { lineScore, currentInning, isTopInning, outs, homeScore, awayScore, totalInnings } = game;
  const innings = Array.from({ length: totalInnings }, (_, i) => i);

  return (
    <div className={styles.board}>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.teamCol}>Equipo</th>
              {innings.map(i => (
                <th key={i} className={`${styles.inningCol} ${i + 1 === currentInning ? styles.current : ''}`}>
                  {i + 1}
                </th>
              ))}
              <th className={styles.totalCol}>R</th>
              <th className={styles.totalCol}>H</th>
              <th className={styles.totalCol}>E</th>
            </tr>
          </thead>
          <tbody>
            <tr className={isTopInning ? styles.batting : ''}>
              <td className={styles.teamName}>
                <span className={styles.dot} style={{ background: awayTeam?.color }} />
                {awayTeam?.shortName || 'VIS'}
              </td>
              {innings.map(i => (
                <td key={i} className={`${styles.score} ${i + 1 === currentInning && isTopInning ? styles.current : ''}`}>
                  {lineScore.away[i] !== null && lineScore.away[i] !== undefined ? lineScore.away[i] : '-'}
                </td>
              ))}
              <td className={styles.total}>{awayScore}</td>
              <td className={styles.total}>{game.totals?.away?.hits ?? '-'}</td>
              <td className={styles.total}>{game.totals?.away?.errors ?? '-'}</td>
            </tr>
            <tr className={!isTopInning ? styles.batting : ''}>
              <td className={styles.teamName}>
                <span className={styles.dot} style={{ background: homeTeam?.color }} />
                {homeTeam?.shortName || 'LOC'}
              </td>
              {innings.map(i => (
                <td key={i} className={`${styles.score} ${i + 1 === currentInning && !isTopInning ? styles.current : ''}`}>
                  {lineScore.home[i] !== null && lineScore.home[i] !== undefined ? lineScore.home[i] : '-'}
                </td>
              ))}
              <td className={styles.total}>{homeScore}</td>
              <td className={styles.total}>{game.totals?.home?.hits ?? '-'}</td>
              <td className={styles.total}>{game.totals?.home?.errors ?? '-'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className={styles.meta}>
        <div className={styles.metaInning}>
          <span className={styles.halfArrow}>{isTopInning ? '▲' : '▼'}</span>
          <span className={styles.inningNum}>{currentInning}</span>
          <span className={styles.metaLabel}>/ {totalInnings}</span>
        </div>
        <div className={styles.metaBatting}>
          <span className={styles.metaLabel}>Al bate</span>
          <span className={styles.battingTeam}>
            {isTopInning ? (awayTeam?.shortName || 'VIS') : (homeTeam?.shortName || 'LOC')}
          </span>
        </div>
        <div className={styles.metaOuts}>
          <span className={styles.metaLabel}>Outs</span>
          <div className={styles.outs}>
            {[0, 1, 2].map(i => (
              <div key={i} className={`${styles.out} ${i < outs ? styles.outFilled : ''}`} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
