const manageSpinner = (status) => {
  if (status == true) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("word-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};


const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res)=> res.json())
    .then((json) => {
            console.log(json.data);
            displayLesson(json.data);       
        })

};
const loadLevelWord = (id) => {
  manageSpinner(true);
  fetch(`https://openapi.programming-hero.com/api/level/${id}`)
    .then((res) => res.json())
    .then((data) => displayLevelWord(data.data));
};


const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `
      <h2>${word.word}</h2>
      <p>${word.meaning} / ${word.pronunciation}</p>
      <button onclick="loadWordDetail(${word.id})">Details</button>
      <button onclick="pronounceWord('${word.word}')">🔊</button>
    `;
    wordContainer.append(card);
  });
  manageSpinner(false);
};




const displayLesson = (lessons) => {
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";
    for (const lesson of lessons) {
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
        <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})"  class="btn btn-outline btn-primary lesson-btn">
        <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
        </button>
        `;
        levelContainer.append(btnDiv)
    }
}
loadLessons()