import React from 'react';
import './Card.scss';


const Card = props => {
    return (
        <div className="card" onClick={props.clicked}>
            <div className="imgContainer" style={{background: `url(${props.flag})`}}>
            </div>
            <div className="card-body">
                <h4 className="card-title">{props.name}</h4>
                <div>Population: <span>{props.population}</span></div>
                <div>Region: <span>{props.region}</span></div>
                <div>Capital: <span>{props.capital}</span></div>
            </div>
        </div>
    );
    
}

export default Card;