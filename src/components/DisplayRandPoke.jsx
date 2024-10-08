import { useState } from "react"
import '/src/styles/_DisplayRandPoke.scss'
import MemoryBoard from "./MemoryBoard";
import { playSound } from "../utils/playSound";
import { getRandomIntFromRange } from "../utils/getRandomIntFromRange";

export default function DisplayRandPoke(pokeData){
    const [amountOfPoke,setAmountOfPoke] = useState(5);
    const [pokeNames,setPokeNames] = useState(null);
  
    function getUniquePokeNames(amountOfPoke){
        const pokeDexLength = pokeData.props.results.length;   
        let pokeArray = [];
        
        const idNameSet = new Set();
        let duplicateCounter = 0;
        
        for (let i = 0; i < amountOfPoke; i++) {
            let randomId
            
            do {
                randomId = getRandomIntFromRange(1,pokeDexLength - 1)
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

    function beginGame(){
        playSound('rewardSound')
        getUniquePokeNames(amountOfPoke) 
    }
    return(
        <>
            {pokeNames ? (
                <pre className="boardContainer">
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
                     
                <div className="title">
                    <h1>Pokemon</h1>
                    <h2>Memory Card</h2>
                    <h3>Version</h3>
                    <button onClick={() => beginGame()}>Start Game!</button>
                    <a className="github" href="https://github.com/Cesarcasas0737/memory-card">
                        <img src="src/assets/github.svg" alt="" />
                    </a>
                </div>
            
                
            )}
        </>
    )
}