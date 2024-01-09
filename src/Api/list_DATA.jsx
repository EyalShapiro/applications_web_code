
export const fetchPokemonList = async (num, page) => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${num * 5}&offset=${(page - 1) * num * 5}`
    );
    const data = await response.json();
    const pokemonList = data.results;
    const detailsPromises = pokemonList.map(async (pokemon) => {
      const detailsResponse = await fetch(pokemon.url);
      const detailsData = await detailsResponse.json();
      return {
        id: detailsData.id,
        name: detailsData.name,
        image: detailsData.sprites.front_default,
      };
    });

    const pokemonDetails = await Promise.all(detailsPromises);
    return pokemonDetails;
  } catch (error) {
    console.error("Error fetching Pokemon data:", error);
    return [];
  }
};
