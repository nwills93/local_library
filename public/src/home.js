function getTotalBooksCount(books) { //returning the length of the books array is indicative of how many book entries are in the array.
  return books.length
}

function getTotalAccountsCount(accounts) { //returning the length of the authors array is indicative of how many author entries are in the array.
  return accounts.length
}

function getBooksBorrowedCount(books) {
  const reducer = (previousValue, currentBook) => { //using a helper function called reducer to increment a counter for every book that is being borrowed.
    const {borrows} = currentBook //destructuring the borrows key from the book object for cleaner and clearer code.
    if (borrows[0].returned === false) previousValue++ //if the returned key in the first index of borrows is set to -false-, then increment the previous value by 1.
    return previousValue //for each book, returns 1 if the book has been borrowed or 0 if it has not.
  }
  const borrowedBooks = books.reduce(reducer, 0) //adds up all books that are being borrowed, as indicated by having a value of 1 gathered from the reducer function.
  return borrowedBooks
}

// let borrowedBooks = books.filter(book => book.borrows[0].returned === false)
  // return borrowedBooks.length

function getMostCommonGenres(books) {
  //returns an array of the 5 most common genres, sorted from most occured to least
  //check to see if genre has already been counted
    //if genre HAS been counted, increment count by 1
    //if not, initialize count to 1
  const genres = books.map(book => book.genre) //creating a new array of all the genre types for every book.
  let topFiveGenres = [] //creating an empty array.
  genres.forEach(genre => { //iterating through every genre in the array.
    let created = topFiveGenres.findIndex(genreOBJ => genreOBJ.name === genre) //setting a variable to check if the genre object already exists in our topFiveGenresArray
    if (created > 0) { //if created exists, increment the count for that object by 1.
      topFiveGenres[created].count++
    }
    else {
      topFiveGenres.push({name: genre, count: 1}) //otherwise push a new object into the array.
    }
  })
  return topFiveGenres.sort((highCount, lowCount) => highCount.count > lowCount.count?-1:1).slice(0, 5)
  //sorting the topFiveGenres array from highest count to lowest count and returning the first five indeces from the array.
}

function sorted(object) { //helper function sorts count from highest to lowest.
  object.sort((highCount, lowCount) => lowCount.count - highCount.count)
}


function getMostPopularBooks(books) {
  //It returns an array containing five objects or fewer that represents the most popular books in the library. 
  //Popularity is represented by the number of times a book has been borrowed.
  //const titles = books.map(book => book.title)
  topFiveBooks = books.map(book => ({
    name: book.title,
    count: book.borrows.length
  }))
  sorted(topFiveBooks)
  
  return topFiveBooks.slice(0,5)
}


function getMostPopularAuthors(books, authors) {
  //It returns an array containing five objects or fewer that represents the most popular authors whose books have been checked out the most. 
  //Popularity is represented by finding all of the books written by the author and then adding up the number of times those books have been borrowed.
 let authorCounts = {}
 let authorList =[]
  for (let author of authors) {
   for (let book of books) {
     if (author.id === book.authorId) {
       let current = authorCounts[`${author.name.first} ${author.name.last}`]
       if(current) {
        authorCounts[`${author.name.first} ${author.name.last}`] = current + book.borrows.length
       }
       else {
        authorCounts[`${author.name.first} ${author.name.last}`] = book.borrows.length
       } 
     }
   }
 }
for (let item in authorCounts) {
  authorList.push({name: item, count: authorCounts[item]})
}
 return authorList.sort((highCount, lowCount) => lowCount.count - highCount.count).slice(0, 5)
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
