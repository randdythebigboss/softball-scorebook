# Play Codes Reference

This document describes all play result codes used in Dugout Scorebook.

## Important Design Note

> **Do NOT use free-text input for play codes in the UI.**
> 
> Codes like `4-3` or `6-3` look like date ranges or arithmetic to spreadsheets and some input fields. Always use dedicated buttons or dropdowns in the scoring interface.

---

## Hits

| Code | Label | Description            |
|------|-------|------------------------|
| H1   | 1B    | Single                 |
| H2   | 2B    | Double                 |
| H3   | 3B    | Triple                 |
| HR   | HR    | Home Run               |

---

## Walks & Special Reaches

| Code | Label | Description            |
|------|-------|------------------------|
| BB   | BB    | Base on Balls          |
| IBB  | IBB   | Intentional Walk       |
| HP   | HBP   | Hit by Pitch           |
| FC   | FC    | Fielder's Choice       |

---

## Outs – Strikeouts

| Code | Label | Description            |
|------|-------|------------------------|
| K    | K     | Strikeout (swinging)   |
| KL   | K L   | Strikeout Looking      |

---

## Outs – Fly Outs (by position number)

| Code | Label | Description            |
|------|-------|------------------------|
| F7   | F7    | Fly Out to Left Field  |
| F8   | F8    | Fly Out to Center      |
| F9   | F9    | Fly Out to Right Field |
| F3   | F3    | Fly Out to First Base  |

---

## Outs – Ground Outs (throw sequence)

| Code  | Label | Description            |
|-------|-------|------------------------|
| GO13  | 1-3   | Pitcher to First       |
| GO43  | 4-3   | Second to First        |
| GO53  | 5-3   | Third to First         |
| GO63  | 6-3   | Shortstop to First     |
| GO64  | 6-4   | Shortstop to Second    |
| GO46  | 4-6   | Second to Shortstop    |

---

## Double Plays & Triple Plays

| Code | Label | Description            |
|------|-------|------------------------|
| DP   | DP    | Double Play            |
| TP   | TP    | Triple Play            |

---

## Errors (by fielding position)

| Code | Label | Position               |
|------|-------|------------------------|
| E1   | E1    | Pitcher                |
| E2   | E2    | Catcher                |
| E3   | E3    | First Base             |
| E4   | E4    | Second Base            |
| E5   | E5    | Third Base             |
| E6   | E6    | Shortstop              |
| E7   | E7    | Left Field             |
| E8   | E8    | Center Field           |
| E9   | E9    | Right Field            |

---

## Sacrifices

| Code | Label | Description            |
|------|-------|------------------------|
| SF   | SF    | Sacrifice Fly          |
| SAC  | SAC   | Sacrifice Bunt         |

---

## Fielding Position Numbers

| Number | Position       |
|--------|----------------|
| 1      | Pitcher        |
| 2      | Catcher        |
| 3      | First Base     |
| 4      | Second Base    |
| 5      | Third Base     |
| 6      | Shortstop      |
| 7      | Left Field     |
| 8      | Center Field   |
| 9      | Right Field    |
