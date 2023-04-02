import { animals } from "./wordlists/animals.js";

//https://stackoverflow.com/questions/49338193/how-to-use-code-from-script-with-type-module
window.setRandomWord = function setRandomWord() {
    var randomWord = animals[Math.floor(Math.random() * animals.length)];

    setWordText(randomWord);
    setVideo(randomWord);
    setLinkUrl(randomWord);
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
        // no secondary word so hide it all
        secondaryVideoEle.className = "is-hidden";
        secondaryWordEle.textContent = "";
    }

}

function setLinkUrl(word) {
    const linkEle = document.getElementById("link");
    linkEle.href = `https://www.signbsl.com/sign/${word}`
}