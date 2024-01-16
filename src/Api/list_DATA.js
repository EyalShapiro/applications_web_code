export const fetchPokemonList = async (limit, page, start) => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${(page - 1) * limit}`
    );
    const data = await response.json();
    const pokemonList = data.results;

    const detailsPromises = pokemonList.map(async (pokemon, index) => {
      const detailsResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${start + index}`);
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
