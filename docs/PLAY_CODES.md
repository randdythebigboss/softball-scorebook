# Play Codes Reference

This document describes all play result codes used in Centro Verón Scorebook.
Codes are aligned with the Excel scorebook "Hoja Apunte Centro Veron VS Seibo.xlsx".

## Critical Design Rule — No Free-Text Input

> **NEVER enter play codes as free text in any UI field.**
>
> Codes like `4-3`, `6-3`, or `1-3` look like date ranges or arithmetic to
> spreadsheets. Excel silently converts them to serial numbers:
>
> | Typed | Excel reads |
> |-------|-------------|
> | 4-3   | 46118       |
> | 6-3   | 46082       |
> | 1-3   | 46086       |
> | 6-5   | 46113       |
>
> **This app avoids the problem entirely by using buttons and dropdowns.**
> The internal code string (`GO43`, `GO63`, etc.) never appears in a text input.

---

## Hits

| Code | Label | Description                     |
|------|-------|---------------------------------|
| H1   | 1B    | Sencillo (Single)               |
| H2   | 2B    | Doble (Double)                  |
| H3   | 3B    | Triple                          |
| HR   | HR    | Jonrón (Home Run)               |
| H4   | H4    | Jonrón — alias Excel (= HR)     |

> `H4` is an alias for `HR` used in some Dominican scorebooks. Both behave identically in the scoring engine.

---

## Walks & Special Reaches

| Code | Label | Description                      |
|------|-------|----------------------------------|
| BB   | BB    | Base por Bolas (Walk)            |
| IBB  | IBB   | Base Intencional (Intentional BB)|
| HP   | HBP   | Golpeado por Lanzamiento (HBP)   |
| FC   | FC    | Jugada de Selección (Fielder's Choice) |

> `HP` is stored internally as `HP` but displays as `HBP` to match Excel notation.

---

## Outs – Strikeouts

| Code | Label | Description             |
|------|-------|-------------------------|
| K    | K     | Ponche (swinging)       |
| KL   | K L   | Ponche llamado (looking)|

---

## Outs – Fly Outs (by fielding position)

| Code | Label | Position         |
|------|-------|------------------|
| F1   | F1    | Pitcher          |
| F2   | F2    | Cátcher          |
| F3   | F3    | Primera Base     |
| F4   | F4    | Segunda Base     |
| F5   | F5    | Tercera Base     |
| F6   | F6    | Torpedero (SS)   |
| F7   | F7    | Jardín Izquierdo |
| F8   | F8    | Jardín Central   |
| F9   | F9    | Jardín Derecho   |

---

## Outs – Ground Outs (throw sequence)

Internal code prefix `GO` prevents Excel date-conversion issues.

| Code  | Label | Description               |
|-------|-------|---------------------------|
| GO13  | 1-3   | Pitcher a Primera         |
| GO14  | 1-4   | Pitcher a Segunda         |
| GO16  | 1-6   | Pitcher a SS              |
| GO23  | 2-3   | Cátcher a Primera         |
| GO3U  | 3U    | Primera sin asistencia    |
| GO31  | 3-1   | Primera a Pitcher         |
| GO34  | 3-4   | Primera a Segunda         |
| GO41  | 4-1   | Segunda a Pitcher         |
| GO43  | 4-3   | Segunda a Primera ★       |
| GO46  | 4-6   | Segunda a SS              |
| GO52  | 5-2   | Tercera a Cátcher         |
| GO53  | 5-3   | Tercera a Primera ★       |
| GO54  | 5-4   | Tercera a Segunda         |
| GO63  | 6-3   | SS a Primera ★            |
| GO64  | 6-4   | SS a Segunda              |
| GO65  | 6-5   | SS a Tercera              |

★ = most common in Dominican informal softball (prioritized in quick buttons).

---

## Double Plays & Triple Plays

| Code | Label | Description |
|------|-------|-------------|
| DP   | DP    | Doble Play  |
| TP   | TP    | Triple Play |

---

## Generic Out

| Code | Label | Description                           |
|------|-------|---------------------------------------|
| O    | O     | Out genérico — used in Excel "O" notation |

---

## Errors (by fielding position)

| Code | Label | Position        |
|------|-------|-----------------|
| E1   | E1    | Pitcher         |
| E2   | E2    | Cátcher         |
| E3   | E3    | Primera Base    |
| E4   | E4    | Segunda Base    |
| E5   | E5    | Tercera Base    |
| E6   | E6    | Torpedero (SS)  |
| E7   | E7    | Jardín Izquierdo|
| E8   | E8    | Jardín Central  |
| E9   | E9    | Jardín Derecho  |

---

## Sacrifices

| Code | Label | Description              |
|------|-------|--------------------------|
| SF   | SF    | Fly de Sacrificio        |
| SAC  | SAC   | Toque de Sacrificio      |

---

## Other

| Code  | Label | Description                |
|-------|-------|----------------------------|
| OTHER | Otro  | Jugada especial (manual)   |

---

## Fielding Position Numbers

| # | Position           |
|---|--------------------|
| 1 | Pitcher            |
| 2 | Cátcher            |
| 3 | Primera Base       |
| 4 | Segunda Base       |
| 5 | Tercera Base       |
| 6 | Torpedero (SS)     |
| 7 | Jardín Izquierdo   |
| 8 | Jardín Central     |
| 9 | Jardín Derecho     |
