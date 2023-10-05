import { fingerspellingWordlist } from "./fingerspelling/wordlist.js";


//https://stackoverflow.com/questions/49338193/how-to-use-code-from-script-with-type-module
window.main = function main() {
    // hide all the letters
    ['warmup'].forEach(id => {
        document.getElementById(id).style.display = 'none';
    });

    // show game controls
    const gameControlsEle = document.getElementById('gameControls');
    gameControlsEle.style.display = '';


    setNewWord()
    fingerspellWord()
}

var randomWord = ""

function setNewWord() {
    randomWord = fingerspellingWordlist[Math.floor(Math.random() * fingerspellingWordlist.length)];
}

// get a few elements we need to use
const answerboxEle = document.getElementById('answerbox')
const imgEle = document.getElementById('imageLetter')

window.fingerspellWord = async function fingerspellWord() {
    const timeBetweenSigns = document.getElementById('timeBetweenSigns').value;

    // disable answer box
    answerboxEle.disabled = true

    for (const letter of randomWord) {
        // blank out the image so that double letters are more obvious
        imgEle.src = ""
        await sleep(75);

        document.getElementById('imageLetter').src = "fingerspelling/" + letter + ".webp"
        await sleep(timeBetweenSigns * 1000);
    }

    // reenable text box
    answerboxEle.disabled = false
    answerboxEle.focus()
}

window.answerboxUpdated = function answerboxUpdated() {
    // when the correct answer is input, generate a new word and show it
    console.log(answerboxEle.value)
    if (answerboxEle.value.toLowerCase() === randomWord) {
        answerboxEle.value = "";
        setNewWord()
        fingerspellWord()
    }
}

function sleep(ms) {
    // zzzzzzzzzzzzzzz
    return new Promise(resolve => setTimeout(resolve, ms));
}
