# Centro Verón Scorebook

Mobile-first web app for keeping score at informal Dominican softball games. Globally branded for Centro Verón, while supporting scorekeeping for multiple teams. Built for the dugout, not the front office — fast, offline, no login required.

## Tech Stack

- **React 19** + **Vite** — component-based UI with fast dev server
- **CSS Modules** — scoped styles, zero runtime CSS-in-JS overhead
- **localStorage** — all data lives in the browser; no backend, no account
- **lucide-react** — icon library

## Getting Started

```bash
npm install
npm run dev       # starts on http://localhost:5173
npm run build     # production bundle (output: dist/)
npm run preview   # preview production build locally
```

## Features

- **Live scoring console** — unified current-situation card (batter + bases diamond); quick-play row (1B, 2B, HR, BB, K, 4-3, F8, Error) as primary input; categorized tabs below; desktop two-column layout
- **Editable lineups** — configure batting order and positions for both teams before scoring; Auto Fill from roster available
- **Base tracking** — visual diamond updates automatically after each play
- **Undo last play** — one tap to revert the most recent play (up to 10 levels)
- **Inning-by-inning line score** — real-time scoreboard header
- **Per-player game stats** — AB, H, 2B, 3B, HR, RBI, R, BB, K tracked per at-bat
- **Completed game history** — finished games are saved and drive the Stats page
- **Team & player stats** — aggregated from all completed games; demo data shown until a real game is finished
- **Mobile-first layout** — bottom nav on mobile, side nav on desktop
- **Scorebook notes (local)** — tap quick chips or free-type notes while scoring; each note records the inning and half-inning. Notes are stored in `currentGame.scorebookNotes` (localStorage only, no backend). They appear on the Game Summary page after the game is finished.

## localStorage Keys

| Key | Contents |
|-----|----------|
| `currentGame` | Active in-progress game object, including `scorebookNotes[]` (null when no game is running) |
| `dugout_completed_games` | Array of finished game objects (status: "final"), each may include saved notes |

## Limitations & Assumptions

- **Lineups are editable** — stored locally in `currentGame` via the Lineup Editor page
- **Base advancement is simplified** — all runners advance the same number of bases as the batter
- **RBI approximation** — batter is credited with all runs that scored on their hit/HR/sacrifice fly
- **Run tracking per runner** — individual runner scoring is not tracked; only HR awards the batter a run in the stats
- **No pitcher stats** — pitching stats (IP, ER, SO) are out of scope for v1
- **No authentication** — all data is local to the device and browser
- **Mock rosters** — all mock teams now include 12 active players, enough to test a full game flow with any team combination

## Roadmap

- [x] Editable lineups wired to NewGame flow
- [x] GitHub Pages auto-deploy via Actions (`.github/workflows/deploy.yml`)
- [ ] Supabase backend for cross-device sync
- [ ] Pitcher stat tracking
- [ ] Game sharing via URL / QR code
- [ ] Print-friendly scoresheet export
