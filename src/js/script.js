{
  'use strict';

  const faveBooks = [];

  function initActions(){
    const booksList = document.querySelector('.books-list');
    booksList.addEventListener('dblclick', function(event){
      if (event.target.classList.contains('book__image')){
        addtoFave(event.target);
      }
    });
  }
  function renderBooks(){
    const booksTemplate = Handlebars.compile(document.querySelector('#template-book').innerHTML);
    const booksList = document.querySelector('.books-list');

    for(let book of dataSource.books){
      const generatedHTML = booksTemplate(book);
      booksList.appendChild(utils.createDOMFromHTML(generatedHTML));
    }
  }
  function addtoFave(target){
    if(!faveBooks.includes(target.dataset.id)){
      faveBooks.push(target.dataset.id);
      target.classList.add('favorite');
    } else {
      faveBooks.splice(faveBooks.indexOf(target.dataset.id), 1);
      target.classList.remove('favorite');
    }
  }
  renderBooks();
  initActions();
}
