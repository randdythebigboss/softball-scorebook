# Centro Verón Scorebook — Product Vision

## Purpose

Centro Verón Scorebook is a mobile-first web application for tracking informal Dominican softball games. Globally branded for Centro Verón, it supports scorekeeping for multiple teams. It replaces paper scorebooks with a fast, visual, and reliable digital tool designed for real use on the field — during a live game, with a phone in hand.

## Target User

- Coaches and team managers of informal softball leagues in the Dominican Republic
- Scorekeepers or statistical hobbyists who want to track their team's performance
- Players who want to review game results and personal stats
- League organizers who want basic standings and results

## App Concept

The app acts as a digital dugout logbook. It allows users to:
1. Register teams and player rosters
2. Set up a game (teams, location, type, innings)
3. Configure lineups for both teams
4. Score the game live, play by play
5. Review final scores, line scores, and play-by-play
6. View cumulative statistics per player and team

## Mobile-First Approach

The primary use case is a smartphone being held in one hand while watching the game. This means:
- Large tap targets (minimum 44px)
- Minimal typing — all play inputs are buttons, not text fields
- Quick, single-tap actions for common plays
- Scoreboard always visible at the top of the scoring screen
- Fast feedback (immediate visual updates)

## Dominican Softball Context

Informal Dominican softball follows loosely structured rules. Key characteristics:
- Games of 5–9 innings (7 is most common)
- Teams range from 9 to 12 players with extra hitters (EH)
- Free substitutions in most informal leagues
- No formal umpire tracking needed
- No pitch count required for this version
- Scorer often doubles as coach or assistant

## Future Database Integration

The current version uses localStorage for all persistence. All data access points are clearly marked with `// TODO: Replace with real API/database calls` comments in the codebase.

Future integration path:
1. Replace mock data files with API service layer
2. Replace `useLocalStorage` calls with `useQuery` / React Query calls
3. Add user authentication (team-level or personal)
4. Implement backend with PostgreSQL or Firebase
5. Enable multi-device sync
