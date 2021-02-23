import React from "react";

export default function Player(props) {
  const onClickIncrement = () => {
    // call the callback prop passed down from the scoreboard
    props.incrementScore(props.id);
  };

  return (
    <div>
      <p>
        {props.name} (Score: {props.score})
        <button onClick={onClickIncrement}>increment</button>
      </p>
    </div>
  );
}
