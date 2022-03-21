import { useState, useEffect } from "react"

function InfiniteScroll() {
  let offset = 0;
  const [pokemons, setPokemons] = useState([])

  const fetchPokemons = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=5&offset=${offset}`)
      .then(response => response.json())
      .then(data => {
        const pokemonList = [];
        data.results.forEach((item) => pokemonList.push(item.name));
        setPokemons(prevPokemon => [...prevPokemon, ...pokemonList]);
      })
    offset += 5
  }

  const handleScroll = (e) => {
    let scrollTop = e.target.documentElement.scrollTop;
    let windowHeight = window.innerHeight;
    let scrollHeight = e.target.documentElement.scrollHeight;
    if (windowHeight + scrollTop + 1 >= scrollHeight) {
      fetchPokemons();
    }
  }

  useEffect(() => {
    fetchPokemons();
    window.addEventListener("scroll", handleScroll);
  }, [])

  return (
    <div className="wrapper">
      {pokemons.length > 0 && pokemons.map((item, index) => {
        return <div className="poke-item" key={index}>{item}</div>
      })}
    </div>
  )
}

export default InfiniteScroll