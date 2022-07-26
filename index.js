let myLibrary = [];

//object constructor
function Books(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
}

Books.prototype.hasRead = false;
// myLibrary.push(new Books("The Hobbit", "J.R.R. Tolkien", 295, true));

//set the dom elements to new variables
const header = document.getElementsByClassName("header");
const librarySpace = document.querySelector(".content");
const addBtn = document.getElementById("add");
const newBookForm = document.getElementById("new--book");
const totalBooks = document.getElementById("total");
const amountRead = document.getElementById("amount--read");
const unreadAmount = document.getElementById("not--read");

//dom elements of the new book form
const newTitle = document.getElementById("title");
const newAuthor = document.getElementById("author");
const newPages = document.getElementById("pages");
const newRead = document.getElementById("read");
const submitBtn = document.getElementById("submit");
const cancelBtn = document.getElementById("cancel");

//event handlers
function displayForm(e) {
  newBookForm.style.display = "flex";
}

function newBook() {
  let title = newTitle.value;
  let author = newAuthor.value;
  let pages = newPages.value;
  let hasRead = newRead.checked;
  if (title !== "" && author !== "" && pages > 0) {
    addBookToLibrary(title, author, pages, hasRead);
    cancel();
  } else {
    alert("fields cant be empty");
  }
}
//clear the new book form
function cancel() {
  newTitle.value = "";
  newAuthor.value = "";
  newPages.value = "";
  newRead.checked = false;
  newBookForm.style.display = "none";
}

//adds book to library
function addBookToLibrary(title, author, pages, hasRead) {
  const book = new Books(title, author, pages);
  book.hasRead = hasRead;
  myLibrary.push(book);
  for (let i = 0; i < myLibrary.length; i++) {
    const element = myLibrary[i];
    updateLibrary(i, element);
  }
}

//update the library content
function updateLibrary(id, obj) {
  if (document.getElementById(`book${id}`) === null) {
    const libBook = document.createElement("div");
    libBook.setAttribute("id", `book${id}`);
    libBook.setAttribute("class", "book--card");
    const del = document.createElement("button");
    del.setAttribute("class", "del");
    del.textContent = "Delete";

    const title = document.createElement("p");
    title.textContent = `Title: ${obj.title}`;

    const author = document.createElement("p");
    author.textContent = `Author: ${obj.author}`;

    const pages = document.createElement("p");
    pages.textContent = `Pages: ${obj.pages}`;

    const hasRead = document.createElement("p");
    hasRead.style.display = "flex";
    hasRead.style.gap = "5px";
    hasRead.textContent = `Read: `;
    const readChild = document.createElement("input");
    readChild.setAttribute("type", "checkbox");
    readChild.setAttribute("class", "has--read");
    readChild.setAttribute("id", `has--read--${id}`);

    readChild.checked = obj.hasRead;
    hasRead.appendChild(readChild);
    libBook.appendChild(title);
    libBook.appendChild(author);
    libBook.appendChild(pages);
    libBook.appendChild(hasRead);
    libBook.appendChild(del);
    librarySpace.appendChild(libBook);
    //add event listeners to the elements to avoid doing it later
    readChild.addEventListener("change", changeHasRead);
    del.addEventListener("click", delBook);
  }
  amountOfBooks();
}
function amountOfBooks() {
  let booksRead = myLibrary.filter((book) => book.hasRead === true);
  totalBooks.textContent = myLibrary.length;

  amountRead.textContent = booksRead.length;
  unreadAmount.textContent = myLibrary.length - booksRead.length;
}

//remove a book from the library
function delBook(e) {
  const parent = e.target.parentElement;
  librarySpace.removeChild(parent);
  let parentId = parent.getAttribute("id");
  parentId = parseInt(parentId.replace("book", ""));
  myLibrary.splice(parentId, 1);
  amountOfBooks();
}

function changeHasRead(e) {
  let id = e.target.id;
  id = id.replace("has--read--", "");
  if (this.checked) {
    myLibrary[id].hasRead = true;
  } else {
    myLibrary[id].hasRead = false;
  }
  amountOfBooks();
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295);

//event listeners for the btn
addBtn.addEventListener("click", displayForm);
submitBtn.addEventListener("click", newBook);
cancelBtn.addEventListener("click", cancel);
