{
  'use strict';

  class BooksList {
    constructor(){
      this.faveBooks = [];
      this.filters = [];
      this.initData();
      this.getElements();
      this.renderBooks();
      this.initActions();
    }
    initData(){
      this.data = dataSource.books;
    }
    getElements(){
      this.filterInputs = document.querySelector('.filters form');
      this.booksList = document.querySelector('.books-list');
    }
    initActions(){
      this.booksList.addEventListener('dblclick', (event) => {
        if (event.target.classList.contains('book__image')){
          this.addtoFave(event.target);
        }
      });

      this.filterInputs.addEventListener('click', (event) =>{
        if (event.target.tagName === 'INPUT' && event.target.name === 'filter' && event.target.type === 'checkbox'){
          this.addtoFiltered(event.target);
          this.filterBooks();
        }
      });
    }
    renderBooks(){
      const bookTemplate = Handlebars.compile(document.querySelector('#template-book').innerHTML);

      for(let book of dataSource.books){
        const generatedHTML = bookTemplate(this.createScoreStyle(book));
        const generatedDOM = utils.createDOMFromHTML(generatedHTML);
        this.booksList.appendChild(generatedDOM);
      }
    }
    addtoFave(target){
      if(!this.faveBooks.includes(target.dataset.id)){
        this.faveBooks.push(target.dataset.id);
        target.classList.add('favorite');
      } else {
        this.faveBooks.splice(this.faveBooks.indexOf(target.dataset.id), 1);
        target.classList.remove('favorite');
      }
    }
    addtoFiltered(target){
      if(target.checked){
        this.filters.push(target.value);
      } else {
        this.filters.splice(this.filters.indexOf(target.value), 1);
      }
    }
    filterBooks(){
      for (let book of dataSource.books){
        const chosenBook = document.querySelector('.book__image[data-id = "'+ book.id + '"]');

        for (let detail in book.details){
          if (this.filters.includes(detail) && book.details[detail]){
            chosenBook.classList.add('hidden');
            break;
          } else {
            chosenBook.classList.remove('hidden');
          }
        }
      }
    }
    createScoreStyle(book){
      if(book.rating < 6){
        book.scoreBgc = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      } else if(book.rating > 6 && book.rating <= 8){
        book.scoreBgc = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      } else if(book.rating > 8 && book.rating <= 9){
        book.scoreBgc = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else {
        book.scoreBgc = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
      book.scoreWidth = book.rating*10 + '%';

      return book;
    }
  }
  const app = new BooksList();
}
