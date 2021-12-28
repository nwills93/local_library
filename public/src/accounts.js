function findAccountById(accounts, id) {
  //It returns the account object that has the matching ID.
  const result = accounts.find(account => account.id === id)
  return result
}

function sortAccountsByLastName(accounts) {
  //It returns a sorted array of the provided account objects. The objects are sorted alphabetically by last name.
  const alphabetized = accounts.sort((lastNameA, lastNameB) => lastNameA.name.last.toLowerCase() < lastNameB.name.last.toLowerCase()?-1:1)
  return alphabetized
}

function getTotalNumberOfBorrows(account, books) {
  //It returns a _number_ that represents the number of times the account's ID appears in any book's `borrows` array.
  const {id} = account
  const reducer = (previousValue, currentBook) => {
    const {borrows} = currentBook
    borrows.map(element => {
      if (element.id === id) previousValue++
    })
    return previousValue
  }
  const totalBorrows = books.reduce(reducer, 0)
  return totalBorrows
}

function getBooksPossessedByAccount(account, books, authors) {
  //It returns an array of book objects, including author information, that represents all books
  //currently checked out_ by the given account. _Look carefully at the object below,_ as it's not just the book object; the author object is nested inside of it.
  
  const booksFiltered = books.filter(book => account.id === book.borrows[0].id)
  booksFiltered.forEach(book => book.author = authors.find(author => author.id === book.authorId))
  //forEach will execute a provided function for each element in an array.
  //for each book in the filtered books list, we are adding a new key called author that is set to the value of the entire author object, but only if the author id matches the book id
  return booksFiltered
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
