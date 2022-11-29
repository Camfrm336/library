let myLibrary = [];

function Book(Title, Author, Pages, Read) {
  this.Title = Title;
  this.Author = Author;
  this.Pages = Pages;
  this.Read = Read;
}

function addBookToLibrary(Title, Author, Pages, Read) {
  let book = new Book(Title, Author, Pages, Read);
  myLibrary.push(book);
  displayBooks();
}

function displayBooks() {
  const books = document.querySelector(".books");

  const removeDivs = document.querySelectorAll(".card");
  for (let i = 0; i < removeDivs.length; i++) {
    removeDivs[i].remove();
  }

  let index = 0;
  myLibrary.forEach((myLibrarys) => {
    const card = document.createElement("div");
    card.classList.add("card");
    books.appendChild(card);

    const removeBookButton = document.createElement("button");
    removeBookButton.classList.add("remove-book-button");
    removeBookButton.textContent = "x";
    buttonDiv = document.createElement("div");
    buttonDiv.classList.add("button-container");
    buttonDiv.appendChild(removeBookButton);

    removeBookButton.dataset.linkedArray = index;

    card.appendChild(buttonDiv);

    removeBookButton.addEventListener("click", removeBook);

    function removeBook() {
      let retrieveBookToRemove = removeBookButton.dataset.linkedArray;
      myLibrary.splice(parseInt(retrieveBookToRemove), 1);
      card.remove();
      displayBooks();
    }

    const readStatusButton = document.createElement("button");
    readStatusButton.classList.add("read-status-button");
    readStatusButton.textContent = "Toggle";

    readStatusButton.dataset.linkedArray = index;
    buttonDiv.appendChild(readStatusButton);
    card.appendChild(buttonDiv);

    readStatusButton.addEventListener("click", toggleReadStatus);

    function toggleReadStatus() {
      let retrieveBookToToggle = readStatusButton.dataset.linkedArray;
      Book.prototype = Object.create(Book.prototype);
      const toggleBook = new Book();

      if (myLibrary[parseInt(retrieveBookToToggle)].Read == "Yes") {
        toggleBook.Read = "No";
        myLibrary[parseInt(retrieveBookToToggle)].Read = toggleBook.Read;
      } else if (myLibrary[parseInt(retrieveBookToToggle)].Read == "No") {
        toggleBook.Read = "Yes";
        myLibrary[parseInt(retrieveBookToToggle)].Read = toggleBook.Read;
      }
      displayBooks();
    }

    for (let key in myLibrarys) {
      console.log(`${key}: ${myLibrarys[key]}`);
      const para = document.createElement("p");
      para.textContent = `${key}: ${myLibrarys[key]}`;
      card.appendChild(para);
    }

    index++;
  });
}

const addBookButton = document.querySelector(".add-book-button");
addBookButton.addEventListener("click", displayForm);

function displayForm() {
  document.getElementById("add-book-form").style.display = "block";
}

const submitButton = document.querySelector(".submit-button");
submitButton.addEventListener("click", intakeFormData);

function intakeFormData() {
  let Title = document.getElementById("Title").value;
  let Author = document.getElementById("Author").value;
  let Pages = document.getElementById("Pages").value;
  let Read = document.getElementById("Read").value;

  if (Title == "" || Author == "" || Pages == "" || Read == "") {
    return;
  }

  addBookToLibrary(Title, Author, Pages, Read);
  document.getElementById("add-book-form").style.display = "none";
  document.getElementById("add-book").reset();
}

const clearButton = document.querySelector(".reset-button");
clearButton.addEventListener("click", clearForm);

function clearForm() {
  document.getElementById("add-book").reset();
}
