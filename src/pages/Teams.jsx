import { PlusCircle } from 'lucide-react';
import TeamStatsCard from '../components/dashboards/TeamStatsCard';
import SectionHeader from '../components/ui/SectionHeader';
import { MOCK_TEAMS } from '../data/mockData';
import styles from './Teams.module.css';

export default function Teams({ onNavigate }) {
  return (
    <div className={styles.page}>
      <SectionHeader
        title="Equipos"
        action={
          <button className={styles.addBtn} disabled title="Próximamente">
            <PlusCircle size={16} /> Agregar
          </button>
        }
      />
      <div className={styles.grid}>
        {MOCK_TEAMS.map(team => (
          <TeamStatsCard
            key={team.id}
            team={team}
            onViewRoster={() => onNavigate('players')}
          />
        ))}
      </div>
    </div>
  );
}
