"use strict";

const getQ = document.getElementById("getQ");
const questionsTable = document.getElementById("questionsTable")
// @ts-ignore
const questionsBody = questionsTable.children[1];

function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

let currentQuestions;

async function getQuestions(nbr = 10) {
  return fetch("https://opentdb.com/api.php?amount=" + nbr);
}

function displayQuestions() {
  // @ts-ignore
  questionsBody.innerHTML = "";
  currentQuestions.results.forEach(q => {
    const row = document.createElement("tr");
    row.className = "row";

    const difficulty = document.createElement(`td`)
    difficulty.innerHTML = q.difficulty;
    difficulty.className = "cell"
    row.appendChild(difficulty)

    const category = document.createElement(`td`)
    category.innerHTML = q.category;
    category.className = "cell"
    row.appendChild(category)

    const question = document.createElement(`td`)
    question.innerHTML = q.question;
    question.className = "cell"
    row.appendChild(question)

    const responces = document.createElement("p");
    responces.innerHTML = `${shuffle([q.correct_answer, ...q.incorrect_answers]).join("<br>")}`
    responces.className = "cell"
    row.appendChild(responces);

    const goodAnswser = document.createElement("p");
    goodAnswser.innerHTML = `${q.correct_answer}`;
    goodAnswser.className = "cell goodAnwser";
    row.appendChild(goodAnswser)

    // const correct_answer = document.createElement(`td`)
    // correct_answer.innerHTML = q.correct_answer;
    // row.appendChild(correct_answer)

    // const incorrect_answer = document.createElement(`td`)
    // incorrect_answer.innerHTML = q.incorrect_answers;
    // row.appendChild(incorrect_answer)

    questionsBody.appendChild(row);
  });
}

getQ?.addEventListener("click", async () => {
  try {
    console.log(document.getElementById("nbrQuestion")?.getAttribute("value"));
    // @ts-ignore
    currentQuestions = await (await (getQuestions(document.getElementById("nbrQuestion")?.value))).json();
    displayQuestions();
  } catch (e) {
    let n = document.createElement("p")
    n.innerHTML = e;
    document.body.appendChild(n)
    console.error(e);
  }

});