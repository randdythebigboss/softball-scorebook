# MVP Scope

## What Is Included in Version 1 (Prototype)

### Teams
- View list of registered teams
- Team card with name, record, runs, run differential
- Placeholder "Add Team" button (disabled)

### Players
- View all players across teams
- Filter by team and search by name/number
- Player card with stats and active/inactive badge

### Games
- Create new game with date, location, teams, type, innings
- Game settings: free substitutions, track positions, quick scoring
- Game stored in localStorage

### Lineups
- View lineup panels for home and away
- Batting order, player number, name, position
- Bench players listed

### Live Scoring
- Full scoreboard with line score by inning
- Outs indicator, bases diamond
- Current batter and next batter display
- Play result buttons grouped by category (Hits, On Base, Outs, Errors, Special)
- Simple base advancement logic
- Controls: Add Run, Add Out, Clear Bases, End Half, Finish Game
- Recent plays list

### Game Summary
- Winner banner
- Line score by inning
- Team totals (R, H, E)
- Top performers
- Play-by-play list
- Notes textarea

### Stats
- Team standings table
- Player batting stats table (sortable)
- Game results table

### Settings
- App branding placeholders
- Main team settings
- Scoring preferences
- localStorage reset button

### Documentation
- Product vision, MVP scope, data model, play codes, notes

---

## What Is NOT Included in Version 1

- Real database (all data is mock + localStorage)
- User authentication or accounts
- Real-time multi-device sync
- Pitcher tracking (ERA, IP, K, BB)
- Fielding statistics (putouts, assists)
- Advanced substitution tracking
- Undo/redo of plays
- Drag-and-drop lineup editing
- Real logo upload
- Export to PDF/Excel
- Push notifications
- Offline PWA mode

---

## Future Phases

### Phase 2 — Real Persistence
- Connect to Supabase or Firebase
- User accounts per team
- Cloud sync

### Phase 3 — Advanced Scoring
- Full pitching stats
- Fielding positions per play
- Full substitution tracking
- Undo last play

### Phase 4 — League Mode
- Multiple leagues
- Standings by division
- Schedule management
- Playoff bracket

### Phase 5 — Social & Sharing
- Share game summaries via link
- Public team pages
- Season highlights
