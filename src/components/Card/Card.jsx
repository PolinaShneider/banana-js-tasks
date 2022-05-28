import React from "react";
import "./styles.css";
import clsx from "clsx";

export const Card = (props) => {
    const {title, description, score, isCurrent, id, markCompleted} = props;
    const className = clsx("card", {
        current: isCurrent
    });

    return <div className={className}>
        <span className="number">#{id}</span>
        <h1>{title}</h1>
        <p dangerouslySetInnerHTML={{__html: description}}/>
        <footer className="card-footer">
            <span>Баллы: {score}</span>
            <button onClick={() => markCompleted(id)} className="card-button">Сделано!</button>
        </footer>
    </div>
};
