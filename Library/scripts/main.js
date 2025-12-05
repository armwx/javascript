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

function addBookToLibrary() {

    let userBook = prompt("Please enter book name:");
    let userAuthor = prompt("Please enter author's name:");
    let userPages = parseInt(prompt("Please enter number of pages:"));
    let userStatus = prompt("Have you read the book? (Read, Not Read) :");

    userInput = new Book(userBook, userAuthor, userPages, userStatus);

    userInput.info();

    Library.push(userInput);
}

// addBookToLibrary();

function printBooks(Library) {
    for (const book of Library) {
        console.log(book.info());
    }
}


Library.push(new Book("The Hobbit", "J.R.R. Tolkien", 310, "Read "));
Library.push(new Book("1984", "George Orwell", 328, "Not Read "));
printBooks(Library);