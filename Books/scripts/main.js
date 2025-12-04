function Book(name, author, pages, status) {
    if(!new.target) {
        throw Error("You must use the 'new' operator to call the Object Constructor bud. ")
    }
    
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.status = status;

    this.info = function() {
        console.log("The book " + this.name + ", by the authour " + this.author + " has " + this.status )
    }

}