import { useState } from "react"
import '/src/styles/_DisplayRandPoke.scss'
import MemoryBoard from "./MemoryBoard";

export default function DisplayRandPoke(pokeData){
    const [amountOfPoke,setAmountOfPoke] = useState(5);
    const [pokeNames,setPokeNames] = useState(null);

    function getRandomIntFromRange(min, max) {
        min = Math.ceil(min); 
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
  
    function getUniquePokeNames(amountOfPoke){
        const pokeDexLength = pokeData.props.results.length;   
        let pokeArray = [];
        
        const idNameSet = new Set();
        let duplicateCounter = 0;
        
        for (let i = 0; i < amountOfPoke; i++) {
            let randomId
            
            do {
                randomId = getRandomIntFromRange(0,pokeDexLength - 1)
                if (idNameSet.has(randomId)=== true) {
                    duplicateCounter++

                    if (duplicateCounter > 1000){
                        console.log('excessive duplicate Counter. exiting early')
                        break
                    }
                }
                
            } while (idNameSet.has(randomId));

            idNameSet.add(randomId)
            pokeArray.push(pokeData.props.results[randomId-1])   
        }
        
        let pokeIdAndName = Array.from(idNameSet).map((id, index)=> ({
            id: id,
            name: pokeArray[index].name
        }))
        
        setPokeNames(pokeIdAndName)       
    }

    function incrementAmountOfPoke() {
        setAmountOfPoke(prevAmount => prevAmount + 2);
    }

    return(
        <>
            {pokeNames ? (
                <pre>
                    <MemoryBoard 
                        pokemonsArray = {pokeNames}
                        setPokemonsArray = {setPokeNames}

                        incrementAmountOfPoke = {incrementAmountOfPoke}
                        getUniquePokeNames = {getUniquePokeNames}
                        amountOfPoke = {amountOfPoke}
                        setAmountOfPoke = {setAmountOfPoke}
                    />
                </pre>
                
                ) : (
                    
                <div>
                    <div>
                        <h1>Pokemon</h1>
                        <button onClick={() => getUniquePokeNames(amountOfPoke)}>Start Game!</button>
                    </div>

                </div>
            )}
        </>
    )
}