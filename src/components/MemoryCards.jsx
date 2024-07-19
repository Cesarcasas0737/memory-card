export default function MemoryCards({
    pokemonsArray,

    uniqueId,setUniqueId,

    pokeClickedCount,
    setPokeClickedCount,

    score,
    setScore,

    }) {        
        function incrementCounter(){
            setPokeClickedCount(pokeClickedCount + 1)
        }

        function incrementScore(){
            setScore(score + 1)
        }

        function addId(pokemonId){           
           setUniqueId(prev => new Set([...prev, pokemonId]))
        }

        function clickCard(pokemonId){
            incrementCounter()
            addId(pokemonId)
            incrementScore()
        }

    return(
        <>   
        {pokemonsArray.map(pokemon => (
            <button 
                key={pokemon.id}
                onClick={() => clickCard(pokemon.id)}
            >
                <img src= 
                    {`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                    alt={`${pokemon.name}`}
                />
                {pokemon.name}
            </button>
        ))
        }
        </>
    )
}