const { URL } = require('url');
const https = require('https');
const fs = require('fs');

//glob
let json_file = `${__dirname}\\Pokemon_List.json`;
const apiUrl = new URL('https://pokeapi.co/api/v2/pokemon/');
const numberOfPokemon = 2000; // או כמה שתרצה
const batchSize = 5; // מספר הפוקימונים בכל בקשה
function Main() {
    SavePokemonInApi();

}
Main()

async function SavePokemonInApi() {
    const arr_req = Math.ceil(numberOfPokemon / batchSize);
    const list_pokemon = [];

    for (let i = 1; i <= arr_req; i++) {
        const get_data = new URL(apiUrl);
        get_data.searchParams.set('offset', (i - 1) * batchSize);
        get_data.searchParams.set('limit', batchSize);
        const batchData = await FetchData(get_data);
        list_pokemon.push(...batchData);
    }
    SaveData(list_pokemon);
}

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
            // console.error(e);
            reject(e);
        });

        req.end();
    });
}

function SaveData(data) {
    fs.appendFileSync(json_file, data.map(item => JSON.stringify(item, null, 2)).join('\n') + '\n');
    console.warn(`Data saved to ${json_file}`);
}
