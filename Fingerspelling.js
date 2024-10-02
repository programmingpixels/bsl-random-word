import { fingerspellingWordlist } from "./fingerspelling/wordlist.js";


//https://stackoverflow.com/questions/49338193/how-to-use-code-from-script-with-type-module
window.main = function main() {
    // hide all the letters
    document.getElementById('warmup').style.display = 'none';

    // show game controls
    const gameControlsEle = document.getElementById('gameControls');
    gameControlsEle.style.display = '';


    setNewWord()
    fingerspellWord()
}

var randomWord = ""

function setNewWord() {
    favouriteLettersEle.value = favouriteLettersEle.value.toLowerCase().replace(/\s/g, "")

    const favouriteLetters = favouriteLettersEle.value
    var topCandidate = fingerspellingWordlist[Math.floor(Math.random() * fingerspellingWordlist.length)]
    var topScore = scoreWord(favouriteLetters, topCandidate)

    if (favouriteLetters.length > 0) {
        for (let index = 0; index < 20; index++) {
            // score candidate words, and replace if new word is better
            var newCandidate = fingerspellingWordlist[Math.floor(Math.random() * fingerspellingWordlist.length)]
            var newCandidateScore = scoreWord(favouriteLetters, newCandidate)
            if (newCandidateScore > topScore) {
                topCandidate = newCandidate
                topScore = newCandidateScore
            }
        }
    }

    randomWord = topCandidate
}

function scoreWord(favouriteLetters, newCandidate) {
    var score = 0
    if (favouriteLetters.length == 0) {
        return score
    }
    Array.from(favouriteLetters).forEach(favouriteLetter => {
        Array.from(newCandidate).forEach(candidateLetter => {
            if (candidateLetter == favouriteLetter) {
                score++
            }
        })
    })
    return score
}

// get a few elements we need to use
const answerboxEle = document.getElementById('answerbox')
const favouriteLettersEle = document.getElementById('favouriteLetters')
const imgEle = document.getElementById('imageLetter')

window.fingerspellWord = async function fingerspellWord() {
    const timeBetweenSigns = document.getElementById('timeBetweenSigns').value;

    // disable answer box
    answerboxEle.disabled = true
    await sleep(50);

    for (const letter of randomWord) {
        imgEle.src = "fingerspelling/" + letter + ".webp"
        await sleep(timeBetweenSigns * 1000);

        // blank out the image so that double letters are more obvious
        imgEle.src = ""
        await sleep(50);
    }

    // reenable text box
    imgEle.src = "fingerspelling/finishflag.webp"
    answerboxEle.disabled = false

    await sleep(50)  // make sure dom is settled before trying to focus element

    answerboxEle.focus()
}

window.answerboxUpdated = function answerboxUpdated() {
    // when the correct answer is input, generate a new word and show it
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
