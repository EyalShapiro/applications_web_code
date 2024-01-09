export const err_style: object = {
    display: "block",
    textAlign: "center",
    color: "orangered",
    margin: "2%",
    fontFamily: "Bangers",
    fontSize: "130%",
    padding: "10px"
}
export const name_style:object = {
    color: `#FFCB05`,
    textShadow: `2px 2px 0 #4074b5, 2px -2px 0 #4074b5, -2px 2px 0 #4074b5, -2px -2px 0 #4074b5, 2px 0px 0 #4074b5, 0px 2px 0 #4074b5, -2px 0px 0 #4074b5, 0px -2px 0 #4074b5`,
    fontFamily: "'Pokemon Solid', sans-serif",
    fontSize: " 160%",
}
export const data_style:object = {
    color: "snow",
    border: "teal ridge 4.5px",
    borderRadius: "10px",
    textAlign: 'center',
    wordWrap: "break-word",
    padding: '5px'
}

export default function GetColorType(arr: Array<string>|string|any): JSX.Element {
    const type_style = {
        borderRadius: '1rem', padding: '1px'
        , outline: 'auto',
        justifySelf: "center", margin: "4px"
        , color: "snow", border: 'ridge 8px',
    };

    return (<>
        <ol style={{ ...type_style, background: TypeColor(arr[0]), borderColor: TypeColor(arr[0]) }}>{arr[0]}</ol>
        {(arr.length > 1) ?
        (        <ol style={{ ...type_style, background: TypeColor(arr[1]), borderColor: TypeColor(arr[1]) }}>{arr[1]}</ol>
        ) : (<></>)
    }
    </>);
}
/**
 * Returns the color associated with a given Pokémon type.
 * @param {string} type - The Pokémon type.
 * @return {string} The color associated with the Pokémon type.
 */

export function TypeColor(type: string): string {
    switch (type) {
        case 'NORMAL':
            return '#a9a9a98e';
        case 'FIRE':
            return '#ff00006c';
        case 'WATER':
            return '#4dabf77b';
        case 'GRASS':
            return '#0bd40b8b';
        case 'ELECTRIC':
            return '#b5a220';
        case 'ICE':
            return '#00ffff70';
        case 'FIGHTING':
            return '#f39c12';
        case 'POISON':
            return '#C865E0';
        case 'GROUND':
            return '#cd863f9c';
        case 'FLYING':
            return '#87cfeb76';
        case 'PSYCHIC':
            return '#D26088';
        case 'BUG':
            return '#32cd3292';
        case 'ROCK':
            return '#808080b5';
        case 'GHOST':
            return '#6D4B75';
        case 'DRAGON':
            return '#00808075';
        case 'DARK':
            return '#0000006e';
        case 'STEEL':
            return '#c0c0c0a2';
        case 'FAIRY':
            return '#ffc0cb';
        default:
            return 'transparent';
    }


}