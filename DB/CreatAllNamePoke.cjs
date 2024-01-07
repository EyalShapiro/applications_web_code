const { URL } = require('url');
const https = require('https');
const ApiUrl = new URL('https://pokeapi.co/api/v2/pokemon/');
const numberOfPokemon = 10;
const batchSize = 5;
const PokemonList=[]

function Main() {
    SavePokemonNames();
}

Main();

async function FetchData(url) {
    return new Promise((resolve, reject) => {
        const req = https.request(url, (res) => {
            console.log('statusCode:', res.statusCode);
            console.log('headers:', res.headers);
            let rawData = '';
            res.on('data', (d) => {
                rawData += d;
                process.stdout.write(d);
            });
            res.on('end', () => {
                const pokemonList = JSON.parse(rawData).results;
                resolve(pokemonList);
            });
        });
        req.on('error', (e) => {
            reject(e);
        });
        req.end();
    });
}
export default async function GetPokemonNames() {
    const arr_req = Math.ceil(numberOfPokemon / batchSize);
    const pokemonNames = [];

    for (let i = 1; i <= arr_req; i++) {
        const get_data = new URL(ApiUrl);
        get_data.searchParams.set('offset', (i - 1) * batchSize);
        get_data.searchParams.set('limit', batchSize);
        const batchData = await FetchData(get_data);
        const names = batchData.map(pokemon => pokemon.name);
        pokemonNames.push(...names);
    }
    PokemonList.push(...pokemonNames);
    return PokemonList
}

