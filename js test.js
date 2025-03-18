// Хайд и показывать шапку
let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
  if (currentScroll > lastScrollTop) {
    header.style.top = '-80px';  // Скролл вниз — скрывается
  } else {
    header.style.top = '0';      // Скролл вверх — показывается
  }
  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// навчик открывается закрывается
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  nav.classList.toggle('active');
});
//Настройка вопросов квиза
let userEmail = "";

function validateInput(name, email) {
  const namePattern = /^[А-Яа-яЁё]+$/; // Проверка на русские буквы
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Проверка email

  if (!namePattern.test(name)) {
    alert("Введите корректное имя (только русские буквы).");
    return false;
  }
  if (!emailPattern.test(email)) {
    alert("Введите корректный email.");
    return false;
  }
  return true;
}

function startQuiz() {
  const name = document.getElementById("user-name").value.trim();
  userEmail = document.getElementById("user-email").value.trim();

  if (!validateInput(name, userEmail)) {
    return;
  }
  
  document.getElementById("user-info").style.display = "none";
  document.getElementById("question-container").style.display = "block";
  document.getElementById("next-btn").style.display = "block";
  loadQuestion();
}

const questions = [
  { question: "Как часто ваш ребёнок избегает зрительного контакта?", options: [
      { text: "Очень часто", score: 4 },
      { text: "Иногда", score: 3 },
      { text: "Редко", score: 2 },
      { text: "Почти никогда", score: 1 }
  ]},
  { question: "Проявляет ли ваш ребёнок необычные интересы (например, повторяющиеся движения или привязанность к определённым предметам)?", options: [
      { text: "Очень выражено", score: 4 },
      { text: "Иногда", score: 3 },
      { text: "Редко", score: 2 },
      { text: "Совсем нет", score: 1 }
  ]},
  { question: "Насколько сложно вашему ребёнку взаимодействовать со сверстниками?", options: [
      { text: "Очень сложно", score: 4 },
      { text: "Есть затруднения", score: 3 },
      { text: "Редко испытывает сложности", score: 2 },
      { text: "Легко общается", score: 1 }
  ]},
  { question: "Как часто ваш ребёнок повторяет одни и те же слова или фразы без явного смысла?", options: [
      { text: "Очень часто", score: 4 },
      { text: "Иногда", score: 3 },
      { text: "Редко", score: 2 },
      { text: "Почти никогда", score: 1 }
  ]},
  { question: "Проявляет ли ваш ребёнок чрезмерную чувствительность к звукам, запахам или прикосновениям?", options: [
      { text: "Да, очень чувствителен", score: 4 },
      { text: "Иногда замечаю", score: 3 },
      { text: "Редко", score: 2 },
      { text: "Нет, не проявляет", score: 1 }
  ]}
];

let currentQuestionIndex = 0;
let totalScore = 0;

function loadQuestion() {
  const container = document.getElementById("question-container");
  container.innerHTML = "";
  const q = questions[currentQuestionIndex];
  container.innerHTML = `<h3>${q.question}</h3>` +
    q.options.map((option, i) => `
      <label class='quiz-option'>
        <input type='radio' name='answer' value='${option.score}'> ${option.text}
      </label>
    `).join('');
}

function nextQuestion() {
  const selected = document.querySelector("input[name='answer']:checked");
  if (!selected) return;
  totalScore += parseInt(selected.value);
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  let resultText = "";
  if (totalScore >= 17) resultText = "Высока вероятность, что ваш ребёнок с аутизмом.";
  else if (totalScore >= 13) resultText = "Ваш ребёнок может быть склонен иметь аутизм.";
  else if (totalScore >= 9) resultText = "Ваш ребёнок слабо склонен иметь аутизм.";
  else resultText = "Ваш ребёнок скорее всего не имеет аутизм.";

  document.getElementById("quiz-container").innerHTML = `
    <h2 class='quiz-result-title'>Результаты</h2>
    <p class='quiz-result-text'>${resultText}</p>
    <p class='quiz-result-email'>Расшифровка теста отправлена на почту: <strong>${userEmail}</strong></p>
  `;
}