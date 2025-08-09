const word_container = document.querySelector(".word-container");
const hint_area = document.querySelector(".hint");
const wrong_guesses_span = document.getElementById("wrong-guesses");
const incorrect_letters_span = document.getElementById("incorrect-letters");
const reset_btn = document.querySelector(".reset-btn");

let selectedWord, correctLetters, wrongGuessesCount;
const maxWrongGuesses = 10;

// دالة لجلب سؤال عشوائي من واجهة برمجة التطبيقات
async function fetchNewQuestion() {
  // يمكنك تعديل هذا الرابط لتغيير الفئة أو الصعوبة
  const apiUrl =
    "https://opentdb.com/api.php?amount=1&type=multiple&encode=base64";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.response_code === 0 && data.results.length > 0) {
      const questionData = data.results[0];

      // يتم فك تشفير البيانات لأنها تأتي بصيغة Base64
      const word = atob(questionData.correct_answer).toLowerCase();
      const hint = atob(questionData.question);

      // يمكنك استخدام فئة السؤال كتلميح إضافي
      const category = atob(questionData.category);

      setupGame(word, hint, category);
    } else {
      console.error("Failed to fetch new question from API.");
      alert("حدث خطأ في جلب الأسئلة. سيتم إعادة تشغيل اللعبة.");
      setupGameLocally();
    }
  } catch (error) {
    console.error("API fetch error:", error);
    alert(
      "حدث خطأ في الاتصال بالإنترنت. سيتم إعادة تشغيل اللعبة بأسئلة محلية."
    );
    setupGameLocally();
  }
}

// دالة لتهيئة اللعبة بكلمة وتلميح محددين
function setupGame(word, hint, category) {
  selectedWord = word;
  hint_area.textContent = `${category}: ${hint}`;

  correctLetters = [];
  wrongGuessesCount = 0;
  wrong_guesses_span.textContent = maxWrongGuesses;
  incorrect_letters_span.textContent = "";

  word_container.innerHTML = selectedWord
    .split("")
    .map((letter) => {
      if (letter === " " || letter.match(/[0-9]/)) {
        // دعم المسافات والأرقام
        return `<span class="space">${letter === " " ? "" : letter}</span>`;
      }
      return `<span>_</span>`;
    })
    .join("");
}

// دالة احتياطية في حال فشل API
const gameData = [
  { word: "javascript", hint: "لغة برمجة الويب" },
  { word: "python", hint: "لغة برمجة" },
  { word: "computer", hint: "جهاز إلكتروني" },
];
function setupGameLocally() {
  const random_number = Math.floor(Math.random() * gameData.length);
  const selectedItem = gameData[random_number];
  setupGame(selectedItem.word, selectedItem.hint, "أسئلة محلية");
}

function handleGuess(letter) {
  if (
    correctLetters.includes(letter) ||
    incorrect_letters_span.textContent.includes(letter.toUpperCase())
  ) {
    return;
  }

  if (selectedWord.includes(letter)) {
    let allCorrect = true;
    selectedWord.split("").forEach((wordLetter, index) => {
      if (wordLetter === letter) {
        word_container.children[index].textContent = letter;
        correctLetters.push(letter);
      }
    });

    const currentDisplay = word_container.textContent.replace(/ /g, "");
    if (
      currentDisplay.toLowerCase() ===
      selectedWord.replace(/ /g, "").toLowerCase()
    ) {
      setTimeout(() => {
        alert("🎉 تهانينا! لقد فزت.");
        fetchNewQuestion(); // جلب سؤال جديد عند الفوز
      }, 500);
    }
  } else {
    wrongGuessesCount++;
    wrong_guesses_span.textContent = maxWrongGuesses - wrongGuessesCount;
    incorrect_letters_span.textContent += letter.toUpperCase() + " ";

    if (wrongGuessesCount >= maxWrongGuesses) {
      setTimeout(() => {
        alert(`❌ لقد خسرت! الكلمة كانت: ${selectedWord.toUpperCase()}`);
        fetchNewQuestion(); // جلب سؤال جديد عند الخسارة
      }, 500);
    }
  }
}

// البدء في اللعبة عند تحميل الصفحة
fetchNewQuestion();

document.addEventListener("keydown", (e) => {
  const letter = e.key.toLowerCase();
  if (letter.match(/^[a-z]$/)) {
    handleGuess(letter);
  }
});

reset_btn.addEventListener("click", fetchNewQuestion);
