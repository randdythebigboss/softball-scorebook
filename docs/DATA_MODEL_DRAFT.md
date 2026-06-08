# Data Model Draft

This document describes the intended data model for future database integration.
Current implementation uses mock data and localStorage.

---

## Team

```
Team {
  id:           string (UUID)
  name:         string
  shortName:    string (3 chars)
  city:         string
  color:        string (hex)
  accentColor:  string (hex)
  logoUrl:      string | null
  isMainTeam:   boolean
  createdAt:    datetime
}
```

---

## Player

```
Player {
  id:           string (UUID)
  teamId:       string (FK → Team)
  number:       number
  firstName:    string
  lastName:     string
  nickname:     string | null
  position:     string (P, C, 1B, 2B, 3B, SS, LF, CF, RF, DH, EH)
  bats:         'L' | 'R' | 'S'
  throws:       'L' | 'R'
  active:       boolean
  createdAt:    datetime
}
```

---

## Game

```
Game {
  id:             string (UUID)
  date:           date
  location:       string
  homeTeamId:     string (FK → Team)
  awayTeamId:     string (FK → Team)
  type:           'Amistoso' | 'Liga' | 'Torneo' | 'Práctica'
  totalInnings:   number
  status:         'pending' | 'in_progress' | 'final'
  homeScore:      number
  awayScore:      number
  currentInning:  number
  isTopInning:    boolean
  outs:           number
  bases:          boolean[3]   // [1B, 2B, 3B]
  notes:          string | null
  createdAt:      datetime
  finishedAt:     datetime | null
}
```

---

## LineupEntry

```
LineupEntry {
  id:          string
  gameId:      string (FK → Game)
  teamId:      string (FK → Team)
  playerId:    string (FK → Player)
  order:       number (1–12)
  position:    string
  isBench:     boolean
  isEH:        boolean
}
```

---

## PlayEvent

```
PlayEvent {
  id:          string
  gameId:      string (FK → Game)
  inning:      number
  isTop:       boolean
  playerId:    string (FK → Player)
  pitcherId:   string | null (FK → Player)
  code:        string (play code, e.g. 'H1', 'K', 'GO43')
  description: string
  outsAfter:   number
  runsScored:  number
  basesAfter:  boolean[3]
  timestamp:   datetime
}
```

---

## PlayerGameStats

```
PlayerGameStats {
  id:          string
  gameId:      string (FK → Game)
  playerId:    string (FK → Player)
  teamId:      string (FK → Team)
  ab:          number
  hits:        number
  doubles:     number
  triples:     number
  hr:          number
  rbi:         number
  runs:        number
  bb:          number
  k:           number
  sb:          number
  errors:      number
}
```

---

## TeamGameStats

```
TeamGameStats {
  id:          string
  gameId:      string (FK → Game)
  teamId:      string (FK → Team)
  side:        'home' | 'away'
  runs:        number
  hits:        number
  errors:      number
  lineScore:   number[]
}
```

---

## Cumulative PlayerStats (computed or cached)

```
PlayerSeasonStats {
  playerId:     string
  season:       number
  gamesPlayed:  number
  ab:           number
  hits:         number
  doubles:      number
  triples:      number
  hr:           number
  rbi:          number
  runs:         number
  bb:           number
  k:            number
  avg:          float
  obp:          float
  slg:          float
  ops:          float
}
```
