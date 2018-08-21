# Conway's game of life

[Wikipedia on Conway's game of life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)

## Background

Conway's game of life is not a game in the usual sense of the word. The only
"player" is the computer. The game takes place on a two-dimensional grid of squares,
each of which is one of two colors. One of these colors is designated as "alive",
and the others are called "dead" squares. A simple set of rules governs the state
of the board; whether a square is alive or dead in the next round depends on the
number of its neighbors that are alive. Unusual and interesting patterns form,
some lasting briefly, others a long time, and others persist seemingly without end.

## Functionality

This version will begin as a simple implementation of the grid game, with a random
set of squares set to alive at the beginning. A "toroidal" grid will be implemented
at first -- that is, squares at one edge will have those on the opposite edge
counted as neighbors for the purposes of the game, and formations that move will
cross the edge and creep back onto the grid at the other end of the grid.

The page will also contain a short explanation of the game's rules.

## Wireframe

![Wireframe](conway.xml)

This will be a single-screen app, and the focus will be on the grid, which will
be in the center of the page. A short explanation of the game and its rules will
be positioned to the left of the page, and a start/reset button will be on the
right, along with any other user controls.

## Technology

This project will be implemented in Javascript, HTML and CSS. The logic of the
game will be contained in a single script.

## Timeline

**Day 1:** Write proposal, develop project based on feedback.

**Days 2-3:** Write basic implementation of game and basic design of page.

**Day 4:** Improve styling of page, and add features or changes to rules if time
permits.

## Projected features

The possible directions for development are many; the user could be given
options for the number of initial squares to be set to living, or for the size
of the grid. Some of the more frequently-occurring "shapes" could be placed on the
board to begin with. The rules could be altered slightly to demonstrate how such
small changes can have large effects.
