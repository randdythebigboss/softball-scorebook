# Dugout Scorebook

Mobile-first web app for keeping score at informal Dominican softball games. Built for the dugout, not the front office — fast, offline, no login required.

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

- **Live scoring** — tap play buttons (1B, 2B, HR, K, etc.) to record each at-bat
- **Base tracking** — visual diamond updates automatically after each play
- **Undo last play** — one tap to revert the most recent play (up to 10 levels)
- **Inning-by-inning line score** — real-time scoreboard header
- **Per-player game stats** — AB, H, 2B, 3B, HR, RBI, R, BB, K tracked per at-bat
- **Completed game history** — finished games are saved and drive the Stats page
- **Team & player stats** — aggregated from all completed games; demo data shown until a real game is finished
- **Mobile-first layout** — bottom nav on mobile, side nav on desktop

## localStorage Keys

| Key | Contents |
|-----|----------|
| `currentGame` | Active in-progress game object (null when no game is running) |
| `dugout_completed_games` | Array of finished game objects (status: "final") |

## Limitations & Assumptions

- **Lineups are fixed** — mock lineup data is used; lineup editing is not yet wired up to the game engine
- **Base advancement is simplified** — all runners advance the same number of bases as the batter
- **RBI approximation** — batter is credited with all runs that scored on their hit/HR/sacrifice fly
- **Run tracking per runner** — individual runner scoring is not tracked; only HR awards the batter a run in the stats
- **No pitcher stats** — pitching stats (IP, ER, SO) are out of scope for v1
- **No authentication** — all data is local to the device and browser

## Roadmap

- [ ] Editable lineups wired to NewGame flow
- [ ] Supabase backend for cross-device sync
- [ ] Pitcher stat tracking
- [ ] Game sharing via URL / QR code
- [ ] Print-friendly scoresheet export
