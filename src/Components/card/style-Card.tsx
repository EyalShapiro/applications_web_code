import React from 'react';
export const err_style = {
    display: "block",
    textAlign: "center",
    color: "orangered",
    margin: "2%",
    fontFamily: "Bangers",
    fontSize: "130%",
    padding: "10px"
}
export const name_style = {
    color: `#FFCB05`,
    textShadow: `2px 2px 0 #4074b5, 2px -2px 0 #4074b5, -2px 2px 0 #4074b5, -2px -2px 0 #4074b5, 2px 0px 0 #4074b5, 0px 2px 0 #4074b5, -2px 0px 0 #4074b5, 0px -2px 0 #4074b5`,
    fontFamily: "'Pokemon Solid', sans-serif",
    fontSize: " 160%",
}
export const data_style = {
    color: "snow",
    border: "teal ridge 4.5px",
    borderRadius: "10px",
    textAlign: 'center',
    wordWrap: "break-word",
    padding: '1%'
}
interface GetColorTypeProps {
    arr: string[];
  }
export default function GetColorType(arr):  GetColorTypeProps {
    const type_style = {
        borderRadius: '1rem', padding: '5px'
        , outline: 'auto',
        margin: '2px',
        justifySelf: "center"
        , boxSizing: `border-box`, with: '40%'
    };
    return arr.length <= 1 ? (<>
        <ol style={{ ...type_style, background: TypeColor(arr[0]), }}>{arr[0]}</ol>
    </> ): (<>
        <ol style={{ ...type_style, background: TypeColor(arr[0]), }}>{arr[0]}</ol>
        <ol style={{ ...type_style, background: TypeColor(arr[1]), }}>{arr[1]}</ol>
    </>);
}
export function TypeColor(type) {
    switch (type) {
        case 'NORMAL':
            return 'darkgray';
        case 'FIRE':
            return 'red';
        case 'WATER':
            return '#4DABF7';
        case 'GRASS':
            return 'green';
        case 'ELECTRIC':
            return 'yellow';
        case 'ICE':
            return 'cyan';
        case 'FIGHTING':
            return 'orange';
        case 'POISON':
            return '#C865E0';
        case 'GROUND':
            return 'peru';
        case 'FLYING':
            return 'skyblue';
        case 'PSYCHIC':
            return '#D26088';
        case 'BUG':
            return 'limegreen';
        case 'ROCK':
            return 'gray';
        case 'GHOST':
            return '#6D4B75';
        case 'DRAGON':
            return 'teal';
        case 'DARK':
            return 'darkblue';
        case 'STEEL':
            return 'silver';
        case 'FAIRY':
            return 'pink';
        default:
            return 'black';
    }

    
}