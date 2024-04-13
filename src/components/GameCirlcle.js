import React from "react";
import "./Game.css";

const GameCirlcle = ({ id, children, className, oncCircleClicked }) => {
  return (
    <div
      className={`gameCircle ${className} `}
      onClick={(ev) => oncCircleClicked(id)}
    >
      {children}
    </div>
  );
};

export default GameCirlcle;
