window.onload = () => {

  document.querySelector("#search").addEventListener('keyup',function (event) {
    if (event.keyCode === 13) {
      document.querySelector("#submit").click();
    }
  });
  document.getElementById("submit").addEventListener("click", function () {
    grabPoke();
  });
};
async function grabPoke() {
  const query = document.querySelector("#search").value;

  fetch(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        alert("Please make sure the Pokémon name or ID is typed correctly.");
      }
    })
    .then((out) => {
      console.log(out);

      let number = out.id;
      let name = out.species.name.toUpperCase();
      let pic = out.sprites.front_default;
      let type = out.types
        .map((type) => type.type.name)
        .join(", ")
        .toUpperCase();
      let abilities = out.abilities
        .map((ability) => ability.ability.name)
        .join(", ")
        .toUpperCase();

      //Displays reverse statistic names all at once, but can't figure out how to display values with them...
      // let test = out.stats.map((stats) => stats.stat.name).reverse().join(': '
      //                                                                   + '<br>').toUpperCase();

      let hp = out.stats[5].base_stat;
      let attack = out.stats[4].base_stat;
      let defense = out.stats[3].base_stat;
      let speed = out.stats[0].base_stat;
      Hidden_Div()
      document.getElementById("number").innerHTML = "# " + number;
      document.getElementById("poke_pic").src = pic;
      document.getElementById("name").innerHTML = name;
      document.getElementById("type").innerHTML = "TYPE: " + type;
      document.getElementById("abilities").innerHTML =
        "ABILITIES: " + abilities;

      document.getElementById("hp").innerHTML = "BASE HEALTH(hp): " + hp;
      document.getElementById("attack").innerHTML = "ATTACK: " + attack;
      document.getElementById("defense").innerHTML = "DEFENSE: " + defense;
      document.getElementById("speed").innerHTML = "SPEED: " + speed;
    });
}
function Hidden_Div() {
  const div_find = document.querySelector("#Find-Poke");
  const is_hidden = div_find.style.visibility === 'hidden' || div_find.style.visibility == 'hidden'
  if (is_hidden) {
    div_find.style.visibility = 'visible';

  } else {
    div_find.style.visibility = 'hidden';
  }
  return is_hidden
}