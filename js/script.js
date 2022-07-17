const gameLogicModule = ( () => {
  const LOCAL_STORAGE_KEY = 'numOfRound';
  const moves = document.querySelectorAll('main button');
  const playAgn = document.querySelector('.modal__container button');
  const roundReport = document.querySelectorAll('.round__report p');
  const menuBtn = document.querySelector('[data-setting]');
  const settingBtn = document.querySelector('[data-setting-btn]');
  const rulesBtn =   document.querySelector('[data-rules]');

  menuBtn.addEventListener('click', ()=>{
    if(document.querySelector('.rules__page') || document.querySelector('.settings__page')){
      return
    }
    if(menuBtn.classList.contains('show')){
      menuBtn.classList.remove('show');
      document.querySelector('.options__menu').classList.remove('show')
    } else {
      menuBtn.classList.add('show');
      document.querySelector('.options__menu').classList.add('show')
    }
})
  let numOfRounds = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || 5;
  let gameOn = true; 
  playAgn.addEventListener('click', ()=>{
    document.querySelector('.modal__container.show').classList.remove('show');
    document.querySelector('.computer__score').textContent = '0';
    document.querySelector('.player__score').textContent = '0';
    roundReport[0].textContent = 'welcome back!';
    roundReport[1].textContent = `Beat the computer to a ${getNumRound()} round game`;
    setGameOn(true);
    
  })

  const scores = { player: 0, computer: 0}
  const playRound = function(index){
    const playerMove = (index) => {
      return moves[index]
    }
    // update DOM with user selection

    const moves = ['rock', 'paper', 'scissors'];
    const random = max => {
      const maxVal = max || 0
      return Math.floor((Math.random() * maxVal))
    };
    const computerMove = () => {
      return moves[random(moves.length)]
    };
    const computer = computerMove()
    const player = playerMove(index)
      // update DOM with computer selection

    const getWinner = (playerSelection, computerSelection) => {
      const comScore = document.querySelector('.computer__score');
      const playScore =document.querySelector('.player__score');

      function updateScore(playerScore, computerScore){
        comScore.textContent = `${computerScore}`;
        playScore.textContent = `${playerScore}`
      }
      if((playerSelection === 'rock' && computerSelection === 'scissors') || (playerSelection === 'scissors' && computerSelection === 'paper') || (playerSelection === 'paper' && computerSelection === 'rock')) {
        ++scores.player 
        updateScore(scores.player, scores.computer)
        return [`you won`,`${playerSelection} beats ${computerSelection}`]
      }else if((computerSelection === 'rock' && playerSelection === 'scissors') || (computerSelection === 'scissors' && playerSelection === 'paper') || (computerSelection === 'paper' && playerSelection === 'rock')){
        ++scores.computer
        updateScore(scores.player, scores.computer)
        return [`you lost`,`${computerSelection} beats ${playerSelection}`]
      } else {
        return [`It's a tie`,`${computerSelection} ties with ${playerSelection}`]
      }
    }
    const winner = (player1, player2) =>{
      return getWinner(player1, player2)
    }
  return  winner(player, computer) 
  };

  const checkWinner = ( val ) => {
    const modal =  document.querySelector('.modal__container')
    if( scores.player === val){
      scores.player = 0;
      scores.computer = 0;
      setGameOn(false);
      modal.classList.add('show')
      return 'You win the match!'
    } else if ( scores.computer === val) {
      scores.player = 0;
      scores.computer = 0;
      setGameOn(false) 
      modal.classList.add('show')
      return 'Computer wins the match'
    } else { return }
  }
  const playGame = (value, numOfROund = 5) => {
  
    const gameReport = document.querySelector('.game__report')
    const report = playRound(value)
    roundReport[0].textContent = report[0];
    roundReport[1].textContent = report[1];
    const winner = checkWinner(numOfROund);
    gameReport.textContent = winner;
  }

  const getGameOn = () => {
    return gameOn
  }
  const setGameOn = (value) =>{
    gameOn = value
  }
  const getNumRound = () =>{
    return numOfRounds
  }
  const setNumRound = num => {
    numOfRounds = num;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(numOfRounds))
  }
  roundReport[1].textContent = `Beat the computer to ${getNumRound()} rounds`;

  moves.forEach(
    btn => {
      btn.addEventListener('click', () => {
        if( getGameOn() ) {
          const value = parseInt(btn.dataset.move)
          playGame(value, getNumRound())
        } else return
      })
    }
  )

  function createRulesElem() {
    function createElement(element, ...attr){
      const elem = document.createElement(element);
      if(attr.length < 0) {
        return elem
      }
      for(let i=0; i< attr.length; i++){
        elem.setAttribute(Object.keys(attr[i]), Object.values(attr[i]))
      }
      return elem;
    }
   
    const createList=()=>{
      const list = createElement('ul');
      const listItem1 = createElement('li');
      listItem1.textContent = 'rock beats(crushes) scissors';
      const listItem2 = createElement('li');
      listItem2.textContent = 'scissors beats(cuts) paper';
      const listItem3 = createElement('li');
      listItem3.textContent = 'paper beats(floats) rock';
      list.appendChild(listItem1);
      list.appendChild(listItem2);
      list.appendChild(listItem3);
      return list;
    }
    const wrapper = createElement('div', {'class': 'wrapper'});
    const rulesPage = createElement('div', {'class': 'rules__page'});
    
    const para1 = createElement('p');
    para1.textContent = 'you have to beat the computer to the specified number of rounds, to wim the game. The default is 5 rounds';
    const para2 = createElement('p');
    para2.innerHTML = 'your current selection is <span>5</span> rounds per game';
    const para3 = createElement('p');
    para3.textContent = 'the computer uses a random guessing algorithm to make selection.';
    const para4 = createElement('p');
    para4.textContent = 'the rules to winning a round is as follows: ';
    const para5 = createElement('p');
    para5.innerHTML = 'you can specify the number of rounds per game. visit Settings to customize.';
    
    const closeBtnCont = createElement('div', {'class': 'close__btn'});
    const closeBtn = createElement('button');
    closeBtn.addEventListener('click', ()=>{
      document.querySelector('main').style.display = 'block';
      const rulespage = document.querySelector('.rules__page');
      document.body.removeChild(rulespage)
    })
    closeBtn.textContent = 'Close';
    closeBtnCont.appendChild(closeBtn);
  
    wrapper.appendChild(para1);
    wrapper.appendChild(para2);
    wrapper.appendChild(para3);
    wrapper.appendChild(para4);
    wrapper.appendChild(createList());
    wrapper.appendChild(para5);
    wrapper.appendChild(closeBtnCont)
  
    rulesPage.appendChild(wrapper);
  
    const currentRounds = para2.querySelector('span');
    currentRounds.textContent = `${getNumRound()}`;
  
    return rulesPage
  }

  function createSettingsPage() {
    function createElement(element, ...attr){
      const elem = document.createElement(element);
      if(attr.length < 0) {
        return elem
      }
      for(let i=0; i< attr.length; i++){
        elem.setAttribute(Object.keys(attr[i]), Object.values(attr[i]))
      }
      return elem;
    }
    const wrapper = createElement('div', {'class': 'wrapper'});
    const settingsPage = createElement('div', {'class': 'settings__page'});
    const form = createElement('form');
    const ul = createElement('ul');
    const li = createElement('li');
    const inputGroup =createElement('div', {'class' : 'input__group'});
    const label = createElement('label', {'for': 'numOfRounds'});
    label.textContent = 'number winning of rounds';
    const input = createElement('input', {'type': 'number'}, {'min': '3'}, {'max': '100'}, {'step': '1'}, {'id': 'numOfRounds'}, {'value': `${getNumRound()}`})
    
  inputGroup.appendChild(label);
  inputGroup.appendChild(input);
  li.appendChild(inputGroup);
  ul.appendChild(li);
  form.appendChild(ul);
  
  const button = createElement('button', {'type': 'submit'})
  button.addEventListener('click', (e)=>{
    e.preventDefault();
    document.querySelector('main').style.display = 'block';
    const settingspage = document.querySelector('.settings__page');
    document.body.removeChild(settingspage);
    handleInput(e);
  });

  function handleInput(evt){
    evt.preventDefault();
    const inputVal = parseFloat(form.querySelector('input').value) || 5;
    setNumRound(inputVal);
    roundReport[1].textContent = `Beat the computer to ${getNumRound()} rounds`;
  }

  button.textContent = 'Close';
  form.appendChild(button);
  wrapper.appendChild(form);
  settingsPage.appendChild(wrapper)
  
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    handleInput(e);
  })
    return settingsPage
  }

  rulesBtn.addEventListener('click', ()=>{
  document.querySelector('main').style.display = 'none';
  document.querySelector('.options__menu').classList.remove('show');
  menuBtn.classList.remove('show');
  const footer = document.querySelector('footer');
  const rulePage = createRulesElem();
  document.body.insertBefore( rulePage , footer)
})

settingBtn.addEventListener('click', ()=>{
  document.querySelector('main').style.display = 'none';
  document.querySelector('.options__menu').classList.remove('show');
  menuBtn.classList.remove('show');
  const footer = document.querySelector('footer');
  const settingPage = createSettingsPage();
  document.body.insertBefore( settingPage , footer)
})
  return { setNumRound }
}
)();