import React, { useState } from "react";
import Player from "../Player/Player";
import "./Scoreboard.scss";

function compare_score(player_a, player_b) {
  return player_b.score - player_a.score;
}

export default function Scoreboard() {
  const [players, set_players] = useState([
    { id: 1, name: "Violeta", score: 11 },
    { id: 2, name: "Eszter", score: 14 },
    { id: 3, name: "Jeroen v2", score: 4 },
    { id: 4, name: "Lisa", score: 42 },
  ]);

  const [sort_by, set_sort_by] = useState("score");

  function compare_name(player_a, player_b) {
    return player_a.name.localeCompare(player_b.name);
  }

  const players_sorted =
    // first "copy" the array
    sort_by === "score"
      ? [...players].sort(compare_score)
      : [...players].sort(compare_name);

  const change_sorting = (event) => {
    console.log("new sort order:", event.target.value);
    set_sort_by(event.target.value);
  };

  const incrementScore = (id) => {
    const new_players_array = players.map((player) => {
      // decide whether this player's score needs to be incremented
      if (player.id === id) {
        // and if so, create a new player object,
        return {
          // but first copying over the player object's data
          ...player,
          // and then overriding the score property to be incremented
          score: player.score + 1,
        };
      } else {
        // else, just keep them
        return player;
      }
    });
    set_players(new_players_array);
  };

  const reset_score = () => {
    const reset_scores = players.map((player) => {
      return {
        ...player,
        score: 0,
      };
    });
    set_players(reset_scores);
  };

  const randomize_score = () => {
    const randomized_scores = players.map((player) => {
      return {
        ...player,
        score: Math.floor(Math.random() * 101),
      };
    });
    set_players(randomized_scores);
  };
  return (
    <div className="Scoreboard">
      <p>
        Sort order:{" "}
        <select onChange={change_sorting} value={sort_by}>
          <option value="score">Sort by score</option>
          <option value="name">Sort by name</option>
        </select>
      </p>
      <h3>Player's scores:</h3>
      <button onClick={reset_score}>Reset Score</button>
      <button onClick={randomize_score}>Randomize Score</button>
      {players_sorted.map((player) => (
        <Player
          key={player.id}
          name={player.name}
          score={player.score}
          id={player.id}
          incrementScore={incrementScore}
        />
      ))}
      <p>[TODO: add player form]</p>
    </div>
  );
}
