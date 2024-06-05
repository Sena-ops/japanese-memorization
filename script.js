document.addEventListener('DOMContentLoaded', () => {
    const homeLink = document.getElementById('home-link');
    const practiceLink = document.getElementById('practice-link');
    const homeLinkMenu = document.getElementById('home-link-menu');
    const practiceLinkMenu = document.getElementById('practice-link-menu');
    const navbarToggle = document.getElementById('navbar-toggle');
    const navbarMenu = document.getElementById('navbar-menu');
    const homeContent = document.getElementById('home');
    const practiceContent = document.getElementById('practice');
    const characterGrid = document.getElementById('character-grid');
    const practiceCard = document.getElementById('practice-card');
    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    const feedback = document.getElementById('feedback');
    const scoreDisplay = document.getElementById('score');
    const answerInput = document.getElementById('answer-input');
    const characterTypeSelect = document.getElementById('character-type-select');
  
    let characters = [];
    let currentCharacterIndex = 0;
    let score = 0;
    let characterType = 'hiragana';
  
    characterTypeSelect.addEventListener('change', (e) => {
      characterType = e.target.value;
      loadCharacters(characterType);
    });
  
    [homeLink, homeLinkMenu].forEach(link => link.addEventListener('click', (e) => {
      e.preventDefault();
      showHome();
    }));
  
    [practiceLink, practiceLinkMenu].forEach(link => link.addEventListener('click', (e) => {
      e.preventDefault();
      showPractice();
    }));
  
    navbarToggle.addEventListener('click', () => {
      navbarMenu.classList.toggle('active');
    });
  
    nextBtn.addEventListener('click', () => {
      currentCharacterIndex = (currentCharacterIndex + 1) % characters.length;
      displayPracticeCharacter();
      feedback.textContent = '';
      answerInput.value = '';
    });
  
    submitBtn.addEventListener('click', () => {
      const userAnswer = answerInput.value.trim().toLowerCase();
      const correctAnswer = characters[currentCharacterIndex].meaning.toLowerCase();
  
      if (userAnswer === correctAnswer) {
        updateScore(10);
        feedback.textContent = 'Correct!';
        feedback.style.color = 'green';
        displayFullCharacterInfo();
      } else {
        updateScore(-5);
        feedback.textContent = 'Incorrect. Try again.';
        feedback.style.color = 'red';
      }
    });
  
    function showHome() {
      homeContent.classList.add('active');
      practiceContent.classList.remove('active');
      navbarMenu.classList.remove('active');
    }
  
    function showPractice() {
      homeContent.classList.remove('active');
      practiceContent.classList.add('active');
      displayPracticeCharacter();
      navbarMenu.classList.remove('active');
    }
  
    function loadCharacters(type) {
      fetch(`data/${type}.json`)
        .then(response => response.json())
        .then(data => {
          characters = data;
          displayCharacters();
        });
    }
  
    function displayCharacters() {
      characterGrid.innerHTML = '';
      characters.forEach(char => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `<h2>${char.character}</h2><p>${char.pronunciation}</p><p>${char.meaning}</p>`;
        characterGrid.appendChild(card);
      });
    }
  
    function displayPracticeCharacter() {
      const char = characters[currentCharacterIndex];
      practiceCard.innerHTML = `<h2>${char.character}</h2>`;
      practiceCard.classList.remove('flip');
      void practiceCard.offsetWidth; // Trigger reflow to restart animation
      practiceCard.classList.add('flip');
    }
  
    function displayFullCharacterInfo() {
      const char = characters[currentCharacterIndex];
      practiceCard.innerHTML = `<h2>${char.character}</h2><p>${char.pronunciation}</p><p>${char.meaning}</p>`;
    }
  
    function updateScore(points) {
      score += points;
      scoreDisplay.textContent = `Score: ${score}`;
    }
  
    // Initialize with Hiragana
    loadCharacters('hiragana');
    showHome();
  });
  