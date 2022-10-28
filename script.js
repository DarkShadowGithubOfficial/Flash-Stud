!function mainFlashcardFunc() {
  let totalCards = [];
  function init() {
    if (typeof JSON.parse(localStorage.cards) == typeof [0, 1]) {
      let cards = JSON.parse(localStorage.cards);
      cards.forEach(card => {
        let btn = document.createElement('div');
        btn.classList.add('card');
        btn.classList.add('button');
        btn.innerHTML = card.name;
        btn.inView = false;
        btn.cardTitle = card.name;
        btn.definition = card.def;
        document.body.appendChild(btn);
        totalCards.push(card);
      })
    }
  }
  function onSubmit() {
    let formObj = {
      name: document.querySelector('#card-name').value,
      def: document.querySelector('#card-def').value
    }
    totalCards.push(formObj);
    localStorage.cards = JSON.stringify(totalCards);
  }
  function onClick(e) {
      if (e.target.inView) {
        ifInView(e.target);
      } else {
        ifOutView(e.target);
      }
  }
  function onHover(e) {
    if (e.target.inView) {
      e.target.classList.remove('name');
      e.target.classList.add('def');
      e.target.innerHTML = e.target.definition;
    }
  }
  function offHover(e) {
    if (e.target.inView) {
      e.target.classList.add('name');
      e.target.classList.remove('def');
      e.target.innerHTML = e.target.cardTitle;
    }
  }
  function ifInView(target) {
    target.classList.remove('def');
    target.classList.remove('name');
    target.classList.add('button');
    target.inView = false;
    target.innerHTML = target.cardTitle;
  }
  function ifOutView(target) {
    target.classList.add('name');
    target.classList.remove('button');
    target.inView = true;
  }
  function deleteCard(e) {
    let cardToDel = {
      name: e.target.cardTitle,
      def: e.target.definition
    }
    totalCards.forEach(card => {
      if (card.name == cardToDel.name && card.def == cardToDel.def) {
        totalCards.splice(totalCards.indexOf(card), 1);
      }
    })
    localStorage.cards = JSON.stringify(totalCards);
    e.preventDefault();
    location.reload();
  }
  function main() {
    let btns = document.querySelectorAll('.button');
    btns.forEach(btn => {
      btn.onclick = onClick;
      btn.onmouseover = onHover;
      btn.onmouseleave = offHover;
      btn.oncontextmenu = deleteCard;
    })
    document.querySelector('#new-card').onsubmit = onSubmit;
  }
  init();
  main();
}()
