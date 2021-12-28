function findAuthorById(authors, id) { //returns the author object that has the matching id.
  return authors.find(author => author.id === id)
}
function findBookById(books, id) {
  //It returns the book object that has the matching ID.
  return books.find(book => book.id === id)
}

function partitionBooksByBorrowedStatus(books) {
  //It returns an array with two arrays inside of it. All of the inputted books are present in either the first or second array.
  //first array contains all books that are currently checked out.
  //the second array contains all books that have been returned.
  const checkedOutBooks = books.filter(book => book.borrows[0].returned === false)
  const returnedBooks = books.filter(book => book.borrows[0].returned === true)
  const bookStatus = [checkedOutBooks, returnedBooks]
  return bookStatus
}

function getBorrowersForBook(book, accounts) { //gets at most 10 borrowers of a given book.
let borrowers =[]
book.borrows.map(item => { //looping through the borrows array of a given book.
  let account = accounts.find(element => element.id === item.id) //finds the account object whose id exists in a given book's borrowed list.
  account.returned = item.returned //adding a new key/value pair to the account object called -returned- that is set to the value of true or false *meaning the book has been returned or not*
  borrowers.push(account) //adding that account object into the borrowers array.
})
return borrowers.slice(0, 10)
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
