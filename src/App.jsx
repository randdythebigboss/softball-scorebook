import { useState } from 'react';
import AppShell from './components/layout/AppShell';
import Home from './pages/Home';
import Teams from './pages/Teams';
import Players from './pages/Players';
import NewGame from './pages/NewGame';
import Lineup from './pages/Lineup';
import ScoreGame from './pages/ScoreGame';
import GameSummary from './pages/GameSummary';
import Stats from './pages/Stats';
import Settings from './pages/Settings';
import { useLocalStorage } from './hooks/useLocalStorage';

const PAGE_TITLES = {
  home:          'Inicio',
  teams:         'Equipos',
  players:       'Jugadores',
  'new-game':    'Nuevo Juego',
  lineup:        'Alineación',
  'score-game':  'Puntuar',
  'game-summary':'Resumen',
  stats:         'Estadísticas',
  settings:      'Configuración',
};

export default function App() {
  const [page, setPage] = useState('home');
  const [currentGame] = useLocalStorage('currentGame', null);

  const renderPage = () => {
    const props = { onNavigate: setPage, currentGame };
    switch (page) {
      case 'home':         return <Home {...props} />;
      case 'teams':        return <Teams {...props} />;
      case 'players':      return <Players {...props} />;
      case 'new-game':     return <NewGame {...props} />;
      case 'lineup':       return <Lineup {...props} />;
      case 'score-game':   return <ScoreGame {...props} />;
      case 'game-summary': return <GameSummary {...props} />;
      case 'stats':        return <Stats {...props} />;
      case 'settings':     return <Settings {...props} />;
      default:             return <Home {...props} />;
    }
  };

  return (
    <AppShell
      currentPage={page}
      onNavigate={setPage}
      pageTitle={PAGE_TITLES[page] || ''}
    >
      {renderPage()}
    </AppShell>
  );
}
