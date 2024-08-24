# Supertris

## Game Structure

The game is played on a large 3x3 grid, called the **board**, where each cell of the board is itself a 3x3 grid, called a **dial**.

- **Board**: The outer 3x3 grid
- **Dial**: A single cell of the board, representing a 3x3 grid

## Objective of the Game

The goal is to achieve a three-in-a-row on the board. To do this, you need to win the individual dials.

- **Winning a Dial**: Achieve three-in-a-row within a 3x3 grid (dial).
- **Winning the Board**: Obtain three-in-a-row on the board by using the won dials.

## How to Play

The game is turn-based between two players, **X** and **O**.

1. **Starting the Game**
  - Player **X** begins by choosing any cell of the board to place their mark.

2. **Subsequent Turns**
  - After Player **X** makes their move, Player **O** must play in the board cell that corresponds to the dial cell chosen by **X**.
  - Within that dial cell, Player **O** can place their mark in any available cell of the dial.

3. **Rules for Already-Won Dials**
  - If a dial has already been won by a player, the next player can choose any available cell on the board, without following the dial correspondence rule.

## Example of Gameplay

1. **Turn 1**: Player **X** chooses cell (0,0) of the board and plays in cell (1,0) of the dial.

2. **Turn 2**: Player **O** must now play in cell (1,0) of the board. They play in cell (2,0) of the dial.

3. **Turn 3**: Player **X** plays in cell (2,0) of the board.

4. [...]

5. **Turn 8**: Player **O** must play in cell (2,0) of the board and chooses cell (2,0) of the dial, winning that dial.

6. **Turn 9**: Player **X** must now play in cell (2,0) of the board. 
Since this dial has already been won by **O**, **X** can play in any available cell on the board.

## Additional Notes

- **Turn-Based**: Players alternate turns.
- **Marks**: Players use X and O for their moves.
- **Strategy**: Carefully plan your moves as you need to consider both the board and the dials simultaneously.

Have fun and good luck!
