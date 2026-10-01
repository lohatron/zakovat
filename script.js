// =====================================================
// НАСТРОЙКИ САЙТА
// =====================================================

const quizConfig = {
    siteName: "заковат",
    pageTitle: "заковат",

    colors: {
        primary: "#190eed",
        secondary: "#2563eb"
    },

    questions: [
        {
            question: "Кто такая Ванга?",
            answers: [
                "Болгарская провидица",
                "Известная певица",
                "Учёный-физик",
                "Королева Великобритании"
            ],
            correct: 0
        },

        {
            question: "Какая планета находится ближе всего к Солнцу?",
            answers: [
                "Венера",
                "Марс",
                "Меркурий",
                "Земля"
            ],
            correct: 2
        },

        {
            question: "Сколько континентов на Земле?",
            answers: [
                "5",
                "6",
                "7",
                "8"
            ],
            correct: 2
        },

        {
            question: "Столица Франции?",
            answers: [
                "Рим",
                "Париж",
                "Берлин",
                "Мадрид"
            ],
            correct: 1
        },

        {
            question: "Кто написал роман «Война и мир»?",
            answers: [
                "Фёдор Достоевский",
                "Александр Пушкин",
                "Лев Толстой",
                "Антон Чехов"
            ],
            correct: 2
        },

        {
            question: "Какой океан является самым большим?",
            answers: [
                "Атлантический",
                "Индийский",
                "Северный Ледовитый",
                "Тихий"
            ],
            correct: 3
        },

        {
            question: "Сколько дней в високосном году?",
            answers: [
                "364",
                "365",
                "366",
                "367"
            ],
            correct: 2
        },

        {
            question: "Какой газ преобладает в атмосфере Земли?",
            answers: [
                "Кислород",
                "Азот",
                "Углекислый газ",
                "Водород"
            ],
            correct: 1
        },

        {
            question: "Какая самая большая планета Солнечной системы?",
            answers: [
                "Земля",
                "Сатурн",
                "Юпитер",
                "Нептун"
            ],
            correct: 2
        },

        {
            question: "Сколько сторон у треугольника?",
            answers: [
                "2",
                "3",
                "4",
                "5"
            ],
            correct: 1
        },

        {
            question: "Какой язык является государственным в Бразилии?",
            answers: [
                "Испанский",
                "Английский",
                "Португальский",
                "Французский"
            ],
            correct: 2
        },

        {
            question: "Кто написал «Гамлета»?",
            answers: [
                "Уильям Шекспир",
                "Чарльз Диккенс",
                "Марк Твен",
                "Данте Алигьери"
            ],
            correct: 0
        },

        {
            question: "Какой металл обозначается символом Au?",
            answers: [
                "Серебро",
                "Медь",
                "Железо",
                "Золото"
            ],
            correct: 3
        },

        {
            question: "Сколько минут в одном часе?",
            answers: [
                "30",
                "45",
                "60",
                "90"
            ],
            correct: 2
        },

        {
            question: "Как называется спутник Земли?",
            answers: [
                "Луна",
                "Фобос",
                "Европа",
                "Титан"
            ],
            correct: 0
        },

        {
            question: "Какой город является столицей Японии?",
            answers: [
                "Осака",
                "Киото",
                "Токио",
                "Хиросима"
            ],
            correct: 2
        },

        {
            question: "Сколько цветов в радуге?",
            answers: [
                "5",
                "6",
                "7",
                "8"
            ],
            correct: 2
        },

        {
            question: "Какое животное считается самым быстрым на суше?",
            answers: [
                "Лев",
                "Гепард",
                "Лошадь",
                "Волк"
            ],
            correct: 1
        },

        {
            question: "Какой орган отвечает за перекачивание крови?",
            answers: [
                "Лёгкие",
                "Печень",
                "Сердце",
                "Почки"
            ],
            correct: 2
        },

        {
            question: "Сколько градусов составляет полный круг?",
            answers: [
                "90°",
                "180°",
                "270°",
                "360°"
            ],
            correct: 3
        }
    ]
};


// =====================================================
// СОСТОЯНИЕ КВИЗА
// =====================================================

let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;


// =====================================================
// HTML ЭЛЕМЕНТЫ
// =====================================================

const siteTitle = document.getElementById("site-title");
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");

const questionNumber = document.getElementById("question-number");
const scoreElement = document.getElementById("score");

const progress = document.getElementById("progress");

const nextButton = document.getElementById("next-btn");

const quizElement = document.getElementById("quiz");
const resultElement = document.getElementById("result");

const resultText = document.getElementById("result-text");
const restartButton = document.getElementById("restart-btn");


// =====================================================
// ПРОВЕРКА HTML ЭЛЕМЕНТОВ
// =====================================================

if (
    !siteTitle ||
    !questionElement ||
    !answersElement ||
    !questionNumber ||
    !scoreElement ||
    !progress ||
    !nextButton ||
    !quizElement ||
    !resultElement ||
    !resultText ||
    !restartButton
) {
    throw new Error(
        "Не найдены необходимые HTML-элементы. Проверь index.html."
    );
}


// =====================================================
// НАСТРОЙКА САЙТА
// =====================================================

document.title = quizConfig.pageTitle;

siteTitle.textContent = quizConfig.siteName;

document.documentElement.style.setProperty(
    "--primary-color",
    quizConfig.colors.primary
);

document.documentElement.style.setProperty(
    "--secondary-color",
    quizConfig.colors.secondary
);


// =====================================================
// ПОКАЗ ВОПРОСА
// =====================================================

function showQuestion() {

    const question = quizConfig.questions[currentQuestion];

    selectedAnswer = null;

    nextButton.disabled = true;

    questionElement.textContent = question.question;

    questionNumber.textContent =
        `Вопрос ${currentQuestion + 1} из ${quizConfig.questions.length}`;

    scoreElement.textContent =
        `Счёт: ${score}`;

    const progressPercent =
        ((currentQuestion + 1) / quizConfig.questions.length) * 100;

    progress.style.width = `${progressPercent}%`;

    answersElement.innerHTML = "";

    question.answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.className = "answer";

        button.type = "button";

        button.textContent = answer;

        button.addEventListener("click", () => {
            selectAnswer(button, index);
        });

        answersElement.appendChild(button);
    });

    const questionBox =
        document.querySelector(".question-box");

    if (questionBox) {

        questionBox.style.animation = "none";

        void questionBox.offsetWidth;

        questionBox.style.animation =
            "questionAppear 0.5s ease";
    }

    answersElement.style.animation = "none";

    void answersElement.offsetWidth;

    answersElement.style.animation =
        "answersAppear 0.6s ease";
}


// =====================================================
// ВЫБОР ОТВЕТА
// =====================================================

function selectAnswer(button, answerIndex) {

    if (selectedAnswer !== null) {
        return;
    }

    selectedAnswer = answerIndex;

    const question =
        quizConfig.questions[currentQuestion];

    const allButtons =
        document.querySelectorAll(".answer");

    allButtons.forEach(btn => {
        btn.style.pointerEvents = "none";
    });

    if (answerIndex === question.correct) {

        button.classList.add("correct");

        score++;

        scoreElement.textContent =
            `Счёт: ${score}`;

    } else {

        button.classList.add("wrong");

        if (allButtons[question.correct]) {
            allButtons[question.correct]
                .classList.add("correct");
        }
    }

    nextButton.disabled = false;
}


// =====================================================
// СЛЕДУЮЩИЙ ВОПРОС
// =====================================================

nextButton.addEventListener("click", () => {

    currentQuestion++;

    if (currentQuestion >= quizConfig.questions.length) {

        showResult();

        return;
    }

    showQuestion();
});


// =====================================================
// ПОКАЗ РЕЗУЛЬТАТА
// =====================================================

function showResult() {

    quizElement.classList.add("hidden");

    resultElement.classList.remove("hidden");

    const total =
        quizConfig.questions.length;

    const percentage =
        Math.round((score / total) * 100);

    resultText.innerHTML = `
        Вы ответили правильно на
        <strong>${score}</strong> из
        <strong>${total}</strong> вопросов.<br><br>

        Ваш результат:
        <strong>${percentage}%</strong>
    `;
}


// =====================================================
// НАЧАТЬ ЗАНОВО
// =====================================================

restartButton.addEventListener("click", () => {

    currentQuestion = 0;

    score = 0;

    selectedAnswer = null;

    quizElement.classList.remove("hidden");

    resultElement.classList.add("hidden");

    showQuestion();
});


// =====================================================
// ЗАПУСК
// =====================================================

showQuestion();
