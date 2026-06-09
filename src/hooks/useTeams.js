import { MOCK_TEAMS } from '../data/mockData';
import { useLocalStorage } from './useLocalStorage';

export const TEAMS_KEY = 'cv_scorebook_teams';

export function useTeams() {
  const [teams, setTeams] = useLocalStorage(TEAMS_KEY, MOCK_TEAMS);

  const addTeam = (data) => {
    const newTeam = {
      stats: { gamesPlayed: 0, wins: 0, losses: 0, runsScored: 0, runsAllowed: 0 },
      ...data,
      id: `team-${Date.now()}`,
    };
    setTeams(prev => {
      const base = data.isMainTeam
        ? prev.map(t => ({ ...t, isMainTeam: false }))
        : prev;
      return [...base, newTeam];
    });
  };

  const updateTeam = (id, changes) => {
    setTeams(prev =>
      changes.isMainTeam
        ? prev.map(t => t.id === id ? { ...t, ...changes } : { ...t, isMainTeam: false })
        : prev.map(t => t.id === id ? { ...t, ...changes } : t)
    );
  };

  const resetTeams = () => setTeams(MOCK_TEAMS);

  const getTeamById = (id) => (teams || []).find(t => t.id === id);

  return { teams: teams || [], addTeam, updateTeam, resetTeams, getTeamById };
}
