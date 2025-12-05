const Library = [];

function Book(name, author, pages, status) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the Object Constructor bud. ")
    }

    this.id = crypto.randomUUID();
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.info = function () {
        console.log("The book " + this.name + ", by the authour " + this.author + " has " + this.status + "has ID: " + this.id)
    }
}

Book.prototype.updateStatus = function(newStatus) {
    this.status = newStatus;
};

function addBookToLibrary(name, author, pages, status) {
    const newBook = new Book(name, author, pages, status);
    newBook.info();
    Library.push(newBook);
    displayBooks(Library);
}

function printBooks(Library) {
    for (const book of Library) {
        book.info();
    }
}


function removeBookFromLibrary(bookId) {
    const index = Library.findIndex((book) => book.id === bookId);
    if (index !== -1) {
        Library.splice(index,1);
        displayBooks(Library);
    }
}

function updatedBookStatus(bookId, newStatus) {
    const book = Library.find((book) => book.id === bookId);
    if (book) {
        book.updateStatus(newStatus);
        displayBooks(Library);
    }
}


function displayBooks(Library) {
    const container = document.querySelector(".books-container");
    container.innerHTML = "";
    Library.forEach((Book) => {
        const card = document.createElement("div");
        card.className = "book-card";
        card.setAttribute("data-id", Book.id)
        card.innerHTML = `
        <button class="delete-icon" data-id="${Book.id}">✕</button>
        <h2> ${Book.name} </h2>
        <p> Author: ${Book.author} </p>
        <p> Pages: ${Book.pages} </p>
        <p> Status: ${Book.status} </p>
        <div class="book-actions">
        ${Book.status === "Not Read" ? `<button class="mark-read" data-id="${Book.id}">Mark Read</button>` : `<button class="mark-unread" data-id="${Book.id}">Mark Unread</button> </div>`}
        `;
        container.appendChild(card)
    });

    document.querySelectorAll(".delete-icon").forEach((button) => {
        button.addEventListener("click", (event) => {
            const bookId = event.target.getAttribute("data-id");
            removeBookFromLibrary(bookId);
        });
    });

    document.querySelectorAll(".mark-read").forEach((button) => {
        button.addEventListener("click", (event) => {
            const bookId = event.target.getAttribute("data-id");
            updatedBookStatus(bookId, "Read");
        });
    });

    document.querySelectorAll(".mark-unread").forEach((button) => {
        button.addEventListener("click", (event) => {
            const bookId = event.target.getAttribute("data-id");
            updatedBookStatus(bookId, "Not Read");
        });
    });


}


Library.push(new Book("The Hobbit", "J.R.R. Tolkien", 310, "Read"));
Library.push(new Book("1984", "George Orwell", 328, "Not Read"));
Library.push(new Book("1984", "George Orwell", 328, "Not Read"));
printBooks(Library);


// Dialog

const dialog = document.querySelector("dialog");
const showButton = document.querySelector("dialog + button");
const closeButton = document.querySelector("dialog button");
const form = document.querySelector("dialog form");

// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
    dialog.showModal();
});

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
    dialog.close();
});


// Close dialog when clicking outside of it
dialog.addEventListener("click", (event) => {
  const dialogDimensions = dialog.getBoundingClientRect();
  if (
    event.clientX < dialogDimensions.left ||
    event.clientX > dialogDimensions.right ||
    event.clientY < dialogDimensions.top ||
    event.clientY > dialogDimensions.bottom
  ) {
    dialog.close();
  }
});


// Handle form Submission 
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form)
    const name = formData.get("bname");
    const author = formData.get("aname");
    const pages = formData.get("pages");
    const status = formData.get("status");
    addBookToLibrary(name,author,pages,status);
    form.reset();
    dialog.close();
})

// At the end of your main.js
document.addEventListener("DOMContentLoaded", () => {
    displayBooks(Library);
});


