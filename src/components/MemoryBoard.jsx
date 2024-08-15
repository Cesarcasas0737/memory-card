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

    function playSound(soundName){
        const audio = new Audio(`/sounds/${soundName}.mp3`);
        audio.play();
    }

    useEffect(() =>{

        //clicked duplicate
        if (uniqueId.size != pokeClickedCount) {  
            //console.log('you clicked a duplicate')
            playSound('errorClick')
            setScore(score -1)
            if (score === highScore) {
                setHighScore(highScore -1)
            }
            launchGameOver()
        }else{
        //clicked non-duplicate
            if(score >=1){
                playSound('rewardSound')
            }
            if(score > highScore){
                setHighScore(score)
            }
            scramblePokeArrayOrder()
        }

        // x/x clicked therefore next lv
        if((pokemonsArray.length === uniqueId.size)){
            playSound('nextlv')
            pokeListNextLv()
        }
    }, [uniqueId])

    return(
        <>
            {isNotGameOver ? (
                <pre className="memoryboard">
                    <div className="gameUi">
                        <button onClick={pokeListNextLv}>Next level</button>
                        <h1>{pokeClickedCount}/{pokemonsArray.length}</h1>
                        <h2>Score: {score}</h2>
                        <h2>High Score: {highScore}</h2>  
                    </div>
                     

                    <div className="playboard">
                       <MemoryCards
                        pokemonsArray = {pokemonsArray}

                        uniqueId = {uniqueId}
                        setUniqueId = {setUniqueId}

                        pokeClickedCount = {pokeClickedCount}
                        setPokeClickedCount = {setPokeClickedCount}
                        
                        score={score}
                        setScore={setScore}
                        /> 
                    </div>
                    
                </pre>
                
                ) : (
                    
                <div className="gameOverScreen">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/94.png" alt="" />
                    <h2>Game Over</h2>
                    <p>Score: {score}</p>
                    <p>High Score: {highScore}</p>
                    <button onClick={launchGameAgain}>Play Again?</button>
                </div>
            )}
        </>
    )
}