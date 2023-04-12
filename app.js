const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');

let cardsData = [];

let question = '';
let answer = '';
let counter = 1;

if (localStorage.getItem('cardsData') === null) {
  cardsData = [];
} else {
  cardsData = JSON.parse(localStorage.getItem('cardsData'));
}

showBtn.addEventListener('click', () => {
  addContainer.classList.add('show');
  questionEl.addEventListener('input', () => {
    question = questionEl.value;
  });
  answerEl.addEventListener('input', () => {
    answer = answerEl.value;
  });
});

addCardBtn.addEventListener('click', () => {
  if (question.trim() && answer.trim()) {
    addContainer.classList.remove('show');
    cardsData.push({ question: question, answer: answer });
    localStorage.setItem('cardsData', JSON.stringify(cardsData));
    createCard(question, answer);
    questionEl.value = '';
    answerEl.value = '';
    question = '';
    answer = '';
  }
});

function createCard(question, answer) {
  const card = document.createElement('div');

  card.classList.add('card');
  card.innerHTML = `
    <div class="inner-card">
      <div class="inner-card-front">
        <p>${question}</p>
      </div>
      <div class="inner-card-back">
        <p>${answer}</p>
      </div>
    </div>
    `;
  cardsContainer.append(card);
  if (cardsContainer.children.length === 1) {
    cardsContainer.children[0].classList.add('active');
  }
  textNum();
}

// shows the  both sides on card

cardsContainer.addEventListener('click', (e) => {
  const activeCard = e.target.parentElement.parentElement;
  if (e.target.parentElement.parentElement.classList[1] === 'active') {
    activeCard.classList.toggle('show-answer');
  }
});

// shows the add input areas

hideBtn.addEventListener('click', () => {
  addContainer.classList.remove('show');
});

// moving between cards
function pagination() {
  nextBtn.addEventListener('click', () => {
    const card = document.querySelector('.active');
    if (!card) {
      return;
    }
    if (!card.nextElementSibling) {
      return;
    } else {
      card.className = 'card left';
      card.nextElementSibling.classList.add('active');
      const index = [...cardsContainer.children].indexOf(card);
      textNum(++counter);
    }
  });

  prevBtn.addEventListener('click', () => {
    const card = document.querySelector('.active');
    if (!card) {
      return;
    }
    if (!card.previousElementSibling) {
      return;
    } else {
      card.className = 'card';
      card.previousElementSibling.className = 'card active';
      const index = [...cardsContainer.children].indexOf(card);
      textNum(--counter);
    }
  });
}

pagination();

function createCardLS() {
  cardsData.forEach((data) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
    <div class="inner-card">
    <div class="inner-card-front">
    <p>${data.question}</p>
    </div>
    <div class="inner-card-back">
    <p>${data.answer}</p>
    </div>
    </div>
    `;
    cardsContainer.append(card);
    cardsContainer.children[0].classList.add('active');
  });
  if (!cardsData.length < 1) {
    textNum();
  }
}

function textNum(cardIndex = 1) {
  currentEl.innerText = `${cardIndex} / ${cardsContainer.children.length}`;
}

function clear() {
  cardsContainer.innerHTML = '';
  cardsData = [];
  localStorage.removeItem('cardsData');
  currentEl.innerText = '';
  counter = 1;
}

clearBtn.addEventListener('click', clear);

document.addEventListener('DOMContentLoaded', createCardLS);
