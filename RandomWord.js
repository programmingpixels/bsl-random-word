import { animals } from "./wordlists/animals.js";
import { basics } from "./wordlists/basics.js";
import { basics2 } from "./wordlists/basics2.js";
import { cakes } from "./wordlists/cakes.js"
import { christmas } from "./wordlists/christmas.js"
import { clothing } from "./wordlists/clothing.js"
import { colours } from "./wordlists/colours.js";
import { community } from "./wordlists/community.js";
import { days } from "./wordlists/days.js";
import { drinks } from "./wordlists/drinks.js";
import { emotions } from "./wordlists/emotions.js";
import { extras } from "./wordlists/extras.js";
import { family } from "./wordlists/family.js";
import { food } from "./wordlists/food.js";
import { fruit } from "./wordlists/fruit.js";
import { hobbies } from "./wordlists/hobbies.js";
import { home } from "./wordlists/home.js";
import { illness } from "./wordlists/illness.js";
import { months } from "./wordlists/months.js";
import { numbers } from "./wordlists/numbers.js";
import { places } from "./wordlists/places.js";
import { timeClock } from "./wordlists/time clock.js";
import { timeScales } from "./wordlists/time scales.js";
import { transport } from "./wordlists/transport.js";
import { vegetables } from "./wordlists/vegetables.js";
import { weather } from "./wordlists/weather.js";

const masterList = [
    ...animals,
    ...basics,
    ...basics2,
    ...cakes,
    ...christmas,
    ...clothing,
    ...colours,
    ...community,
    ...days,
    ...drinks,
    ...emotions,
    ...extras,
    ...family,
    ...food,
    ...fruit,
    ...hobbies,
    ...home,
    ...illness,
    ...months,
    ...numbers,
    ...places,
    ...timeClock,
    ...timeScales,
    ...transport,
    ...vegetables,
    ...weather,
]

//https://stackoverflow.com/questions/49338193/how-to-use-code-from-script-with-type-module
window.setRandomWord = function setRandomWord() {
    var randomWord = masterList[Math.floor(Math.random() * masterList.length)];

    setWordCount(masterList.length);

    setWordText(randomWord);
    setVideo(randomWord);
    setLinkUrl(randomWord);
    //setFingerSpell(randomWord);
}


function setWordText(word) {
    // displays the random word
    const wordEle = document.getElementById("word");
    wordEle.textContent = word;
}

function setVideo(word) {
    // sets the video link based on the word
    const lowerCaseWord = word.toLowerCase()

    const primaryLink = `https://media.signbsl.com/videos/bsl/signstation/${lowerCaseWord}.mp4`;

    const primaryVideoEle = document.getElementById("primary_video");
    primaryVideoEle.src = primaryLink;
    primaryVideoEle.className = "";

    // if the word ends with s, it may be plural, so we try another video link with the final s stripped
    const secondaryVideoEle = document.getElementById("secondary_video");
    const secondaryWordEle = document.getElementById("secondary_word");

    if (lowerCaseWord.endsWith('s')) {
        // secondary word, prepare 2nd video element
        const secondaryWord = lowerCaseWord.slice(0, -1);
        const primaryLink = `https://media.signbsl.com/videos/bsl/signstation/${secondaryWord}.mp4`;

        secondaryVideoEle.src = primaryLink;
        secondaryVideoEle.className = "";

        // display secondary word
        secondaryWordEle.textContent = secondaryWord;

    } else {
        // TODO: try adding an S to make it plural?
        secondaryVideoEle.className = "is-hidden";
        secondaryWordEle.textContent = "";
    }

}

function setLinkUrl(word) {
    const linkEle = document.getElementById("link");
    linkEle.href = `https://www.signbsl.com/sign/${word}`
}

function setWordCount(count) {
    // displays the random word
    const countEle = document.getElementById("count");
    countEle.textContent = count;
}