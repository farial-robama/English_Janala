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


const removeActive = () => {
  const lessonButtons = document.querySelectorAll(".lesson-btn");
  //   console.log(lessonButtons);
  lessonButtons.forEach((btn) => btn.classList.remove("active"));
};

const loadLevelWord = (id) => {
  manageSpinner(true);

  const url = `https://openapi.programming-hero.com/api/level/${id}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive(); // remove all active class
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      clickBtn.classList.add("active"); // add active class
      displayLevelWord(data.data);
    });
};


const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

  if (words.length == 0) {
    wordContainer.innerHTML = `
    <div
        class="text-center  col-span-full rounded-xl py-10 space-y-6 font-bangla"
      >
        <img class="mx-auto" src="./assets/alert-error.png"/>
        <p class="text-xl font-medium text-gray-400">
          এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
        </p>
        <h2 class="font-bold text-4xl">নেক্সট Lesson এ যান</h2>
      </div>
    
    `;
    manageSpinner(false);
    return;
  }

  words.forEach((word) => {
    const card = document.createElement("div");
    card.innerHTML = `
     <div
        class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4"
      >
        <h2 class="font-bold text-2xl">${
          word.word ? word.word : "শব্দ পাওয়া যায়নি"
        }</h2>
        <p class="font-semibold">Meaning /Pronounciation</p>
        <div class="text-2xl font-medium font-bangla">"${
          word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"
        } / ${
      word.pronunciation ? word.pronunciation : "Pronounciation পাওয়া  যায়নি"
    }"</div> 
        <div class="flex justify-between items-center">
          <button onclick="loadWordDetail(${
            word.id
          })" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
            <i class="fa-solid fa-circle-info"></i>
          </button>
          <button onclick="pronounceWord('${
            word.word
          }')" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
      </div>
    `;
    wordContainer.append(card);
  });
  manageSpinner(false);
};




