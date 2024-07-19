import { useEffect, useState } from "react"
import MemoryCards from "./MemoryCards"

export default function MemoryBoard({
    pokemonsArray,
    setPokemonsArray,
    
    incrementAmountOfPoke,
    getUniquePokeNames,
    amountOfPoke,
    setAmountOfPoke,

 }) {

    const [score,setScore] = useState(0)
    const [highScore,setHighScore] = useState(0)

    const [uniqueId,setUniqueId] = useState(new Set())
    const [pokeClickedCount,setPokeClickedCount] = useState(0)
    const [isNotGameOver,setIsNotGameOver] = useState(true)

    function scramblePokeArrayOrder() {
        const scrambledArray = [...pokemonsArray];
    
        for (let i = scrambledArray.length - 1; i > 0; i--) {
            
            const j = Math.floor(Math.random() * (i + 1));
    
            [scrambledArray[i], scrambledArray[j]] = [scrambledArray[j], scrambledArray[i]];
        }
    
        console.log(scrambledArray);
        setPokemonsArray(scrambledArray); 
    } 

    function resetAmountOfPoke(){
        getUniquePokeNames(5)
        setAmountOfPoke(5)
    }

    function negateGameOverStatus(){
        setIsNotGameOver(!isNotGameOver)
    }

    function clearUniqueSet(){
        uniqueId.clear()
        setUniqueId(new Set(uniqueId));
    }

    function resetCounter(){
        setPokeClickedCount(0)
    }

    function resetScore(){
        setScore(0)
    }

    function pokeListNextLv() {
        incrementAmountOfPoke()
        getUniquePokeNames(amountOfPoke + 2)
        clearUniqueSet()
        resetCounter()
    }

    function launchGameOver(){
        resetAmountOfPoke()
        
        clearUniqueSet()
        resetCounter()
        negateGameOverStatus()
    }

    function launchGameAgain(){
        resetScore()
        negateGameOverStatus()
    }


    useEffect(() =>{
        console.log('uniqueId size'+uniqueId.size);
        console.log('pokeClickedCount'+pokeClickedCount);
        if (uniqueId.size != pokeClickedCount) {  
            console.log('you clicked a duplicate Detected')
            
            setScore(score -1)
            if (score === highScore) {
                setHighScore(highScore -1)
            }

            launchGameOver()
        }else{
            if(score > highScore){
                setHighScore(score)
            }
            scramblePokeArrayOrder()
        }

        if((pokemonsArray.length === uniqueId.size)){
            pokeListNextLv()
        }
    }, [uniqueId])

    return(
        <>

            {isNotGameOver ? (
                <pre>
                    <h1>{pokeClickedCount}/{pokemonsArray.length}</h1>
                    <h2>Score {score}</h2>
                    <h2>High Score {highScore}</h2>  
                    <MemoryCards
                        pokemonsArray = {pokemonsArray}

                        uniqueId = {uniqueId}
                        setUniqueId = {setUniqueId}

                        pokeClickedCount = {pokeClickedCount}
                        setPokeClickedCount = {setPokeClickedCount}
                        
                        score={score}
                        setScore={setScore}
                    />
                </pre>
                
                ) : (
                    
                <div>
                   <h2>Game Over</h2>
                   <p>Score:{score}</p>
                   <p>HighScore:{highScore}</p>
                   <button onClick={launchGameAgain}>Play Again!</button>
                </div>
            )}
        </>
    )
}