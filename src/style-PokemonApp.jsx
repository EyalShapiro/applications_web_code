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
export const data_style={
    color: "snow",
    border: "teal ridge 4.5px",
    borderRadius: "10px",
    marginRight:"30%",
    marginLeft: "30%",
  }
export const img_style = {
    display: "block",
    margin: "0 auto",
    width: "20%",
    border: "#E8D594 ridge 2.5px",
    backgroundColor: "#429AE2"
}

export function GetColorType(props) {
    const arr = props.type.split(',');
    if (arr.length === 1) {
        <p style={{ background: TypeColor(arr[0]) }}>arr[0]</p>
    } else {
        return <><p style={{ background: TypeColor(arr[0]) }}>arr[0]</p>
            <p style={{ background: TypeColor(arr[1]) }}>arr[1]</p>
        </>
    }

}

export function TypeColor(type) {
    switch (type.toString().toLowerCase()) {
        case 'normal':
            return 'DarkGray';
        case 'fire':
            return 'red';
        case 'water':
            return 'RoyalBlue';
        case 'grass':
            return 'green';
        case 'electric':
            return 'yellow';
        case 'ice':
            return 'cyan';
        case 'fighting':
            return 'orange';
        case 'poison':
            return 'purple';
        case 'ground':
            return 'Peru';
        case 'flying':
            return 'SkyBlue';
        case 'psychic':
            return 'magenta';
        case 'bug':
            return 'LimeGreen';
        case 'rock':
            return 'gray';
        case 'ghost':
            return 'black';
        case 'dragon':
            return 'darkred';
        case 'dark':
            return 'darkblue';
        case 'steel':
            return 'silver';
        case 'fairy':
            return 'pink';
        default:
            return 'black';
    }
}