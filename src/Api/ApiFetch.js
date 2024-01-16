export default async function ApiFetch(input) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input.toLowerCase()}`);
  if (!response.ok) {
    throw new Error("Please make sure the Pokémon name or ID is typed correctly.");
  }
  const data = await response.json();
  return data;
}

