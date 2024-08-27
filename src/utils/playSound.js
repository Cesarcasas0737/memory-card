export function playSound(soundName){
    const audio = new Audio(`/sounds/${soundName}.mp3`);
    audio.play();
}