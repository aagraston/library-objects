//constructor for book objects

const booksContainer = document.querySelector('.books-container');

const createButton = document.querySelector('#create-book');

const bookFormContainer = document.querySelector('.new-book-form-container');
const bookForm = document.querySelector('#book-form');

const errorDiv = document.querySelector('.error-message-div');

createButton.addEventListener('click', makeNewBook);
bookForm.elements["bsubmit"].addEventListener('click', parseFormData);

let myLibrary = [];

//array that houses books

function makeNewBook() {
  bookFormContainer.classList.toggle('show-form');
  bookForm.elements["btitle"].focus();
}

class Book {
  constructor(title, author, description, read) {
    this.title = title;
    this.author = author;
    this.description = description;
    this.read = read;
  }
}

Book.prototype.toggleRead = function() {
  console.log(this.read);
  if (this.read === "false") {
    this.read = "true";
  }
  else {
    this.read = "false";
  }
}

function initToggleRead() {
  console.log(this);
let bookToToggle = myLibrary[parseInt(this.getAttribute("data-index"))];
console.log(bookToToggle);
bookToToggle.toggleRead(); 
updateBooks();
}

function deleteBook() {
  myLibrary.splice([parseInt(this.getAttribute("data-index"))], 1);
  updateBooks();
}

function parseFormData(e) {

  e.preventDefault();

  let bookIsRead = "false";
  if (bookForm.elements["bread"].checked) {
    bookIsRead = "true";
  }
  if (runValidationCheck()) {
    let bookToAdd = new Book(
      bookForm.elements["btitle"].value,
      bookForm.elements["bauthor"].value,
      bookForm.elements["bdescription"].value,
      bookIsRead);

      addBookToLibrary(bookToAdd);

    bookForm.reset();
    bookFormContainer.classList.toggle('show-form')
  }

  
}

function runValidationCheck() {
  let retBool = false;
  let errorMsg = "";

  if (bookForm.validity.valueMissing) {

  }
}

function addBookToLibrary(bookToAdd) {
  myLibrary.push(bookToAdd);

  updateBooks();
}

function updateBooks() {
  booksContainer.innerHTML = '';

  myLibrary.forEach((element, index) => {

    let bookContainer = document.createElement('div');
    bookContainer.classList.add('book');

    let bookTitle = document.createElement('p');
    bookTitle.innerText = "Title: " + element.title

    let bookAuthor = document.createElement('p');
    bookAuthor.innerText = "Author: " + element.author;

    let bookDescription = document.createElement('p');
    bookDescription.innerText = "Description: " + element.description;

    let bookIsRead = document.createElement('p');
    bookIsRead.innerText = "Have read: " + element.read;

    let readToggle = document.createElement('button');
    readToggle.innerText = "Read Toggle";
    readToggle.setAttribute("data-index", index.toString());

    readToggle.addEventListener('click', initToggleRead);


    let delBook = document.createElement('button');
    delBook.innerText = "Delete Book";
    delBook.setAttribute("data-index", index.toString());

    delBook.addEventListener('click', deleteBook);


    bookContainer.appendChild(bookTitle);
    bookContainer.appendChild(bookAuthor);
    bookContainer.appendChild(bookDescription);
    bookContainer.appendChild(bookIsRead);
    bookContainer.appendChild(readToggle);
    bookContainer.appendChild(delBook);
    booksContainer.appendChild(bookContainer);

  })
}
