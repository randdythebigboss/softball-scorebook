# Claude Implementation Notes

## Current Architecture

- **Router**: State-based routing in `App.jsx` using a `page` state string. No React Router installed to keep things simple. Easy to migrate later.
- **State Management**: Local `useState` per page + `useLocalStorage` for game persistence. No Redux or Zustand.
- **Styling**: CSS Modules throughout. `theme.css` defines all CSS variables. `global.css` imports theme and resets.
- **Icons**: lucide-react only.
- **Data**: All mock data in `src/data/mockData.js`. Statistics are pre-computed on the mock objects.

---

## Key Assumptions

1. **Lineup size is flexible** — currently capped at 9–12 per team. Dominican informal softball often uses EH (extra hitter) for up to 11 batters.
2. **Base advancement is simplified** — the current `applyPlayToGameState` in `gameHelpers.js` uses a simplified model where all runners advance the same number of bases as the hit. Real baseball logic (force outs, fielder's choice, etc.) is not implemented yet.
3. **Auto-end inning at 3 outs** — the scoring screen auto-advances to the next half-inning when outs reach 3. This can be overridden with the manual "End Half" button.
4. **Statistics are mock** — player career stats are hardcoded in `mockData.js`. Only the current-game events are tracked live.
5. **No pitching stats** — pitcher tracking is out of scope for v1. The scoring screen has a "current pitcher placeholder" visually but no logic.

---

## Recommended Next Steps (in priority order)

1. **Fix lineup editing** — Add ability to drag/drop or re-order batting lineup before game
2. **Real play tracking per game** — Connect `PlayEvent` records to update `PlayerGameStats` in real time
3. **Persistent game history** — Move completed games to a `games[]` array in localStorage
4. **Undo last play** — Add a play event stack to support undo
5. **Substitution UI** — Allow swapping players mid-game
6. **Pitcher tracking** — Add pitcher name and basic stats (IP, K, BB, ER)
7. **Export to clipboard or image** — Let user share the line score as text or screenshot
8. **Backend integration** — Replace `useLocalStorage` with API calls. All `// TODO` markers in the data layer are the integration points.

---

## Warnings

- **Do not add complex baseball scoring rules yet** — the current simplified logic is intentional. Getting the UI and flow right first is the priority.
- **Avoid adding a real backend without auth** — if persistence is needed now, use a service like Supabase with row-level security from the start.
- **The mock data is seeded on every cold load** — `mockData.js` does not read from localStorage. Only `currentGame` is persisted. Completed game history is not yet persisted.
- **SideNav is always rendered on desktop** — it is positioned fixed at left:0 on screens ≥768px. If adding more pages, check for vertical overflow in the nav.

---

## File Layout Quick Reference

```
src/
  data/           Mock data + play codes dictionary
  hooks/          useLocalStorage
  utils/          stats.js (calculations), gameHelpers.js (game logic)
  components/
    layout/       AppShell, Header, BottomNav, SideNav
    ui/           Button, Card, KpiCard, StatBadge, SectionHeader, EmptyState
    scorekeeping/ Scoreboard, BasesDiamond, PlayResultButton, CurrentBatterCard, InningTracker, LineupCard
    dashboards/   PlayerStatsCard, TeamStatsCard, GameSummaryCard
  pages/          One file per screen
  styles/         theme.css (CSS variables), global.css (reset + global)
  App.jsx         State-based router
  main.jsx        Entry point
```
