export const pokemon = () => (
  <>
    {/* Document Title */}
    <title>Pokemon API</title>
    <div className="container">
      {/* Heading for the Page */}
      <h1 style={{ textAlign: "center" }}>
        App Displaying Pokemon using API using HTML,CSS,JS and to search Pokemon{" "}
      </h1>
      {/*Search box to find the Pokemon*/}
      <div className="box" style={{ textAlign: "center" }}>
        <input
          id="searchbar"
          className="poke-search"
          onkeyup="search_pokemon()"
          type="text"
          name="search"
          placeholder="Search Pokemon.."
          style={{ width: "62%", position: "relative", marginRight: "10%" }}
        />
      </div>
      {/*Displaying Pokemon Card's*/}
      <ul id="poke" style={{ display: "flex", flexWrap: "wrap" }} />
    </div>
    {/*  function to search pokemon (by Pokemon Type and Pokemon Name)*/}
  </>
)

