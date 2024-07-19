import { useEffect, useState } from "react";
import DisplayRandPoke from "./DisplayRandPoke";

export default function FetchPokemonList(){
    const [pokeData,setPokeData] = useState(null)
    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=386&offet=0')
        .then((res) => {
            return res.json();
        })

        .then((data) => {
            setPokeData(data)
        })
      }, []);

      return(
        <>
            {pokeData ? (
                    <pre>
                        <DisplayRandPoke 
                            props ={pokeData}
                        />
                    </pre>
                    
                    ) : (
                    <p>Getting Api...</p>
                )}
        </>
    )
}