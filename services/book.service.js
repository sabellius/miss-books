import { utilService } from './util.service.js';
import { storageService } from './async-storage.service.js';

const BOOK_KEY = 'booksDB';
_createBooks();

export function query(filterBy = getDefaultFilter()) {
  return storageService.query(BOOK_KEY).then(books => {
    const filteredBooks = books.filter(book => {
      const matchesTitle = filterBy.title
        ? book.title.toLowerCase().includes(filterBy.title.toLowerCase())
        : true;
      const matchesSubtitle = filterBy.subtitle
        ? book.subtitle.toLowerCase().includes(filterBy.subtitle.toLowerCase())
        : true;
      const matchesAuthor = filterBy.author
        ? book.authors.some(author =>
            author.toLowerCase().includes(filterBy.author.toLowerCase())
          )
        : true;
      const matchesCategory = filterBy.category
        ? book.categories.some(category =>
            category.toLowerCase().includes(filterBy.category.toLowerCase())
          )
        : true;
      const matchesPublishedYear =
        filterBy.publishedYear !== ''
          ? String(book.publishedDate).includes(String(filterBy.publishedYear))
          : true;
      const matchesMinPageCount =
        filterBy.minPageCount !== ''
          ? book.pageCount >= filterBy.minPageCount
          : true;
      const matchesMaxPageCount =
        filterBy.maxPageCount !== ''
          ? book.pageCount <= filterBy.maxPageCount
          : true;
      const matchesMinPrice =
        filterBy.minPrice !== ''
          ? book.listPrice.amount >= filterBy.minPrice
          : true;
      const matchesMaxPrice =
        filterBy.maxPrice !== ''
          ? book.listPrice.amount <= filterBy.maxPrice
          : true;
      const matchesCurrency = filterBy.currency
        ? book.listPrice.currencyCode
            .toLowerCase()
            .includes(filterBy.currency.toLowerCase())
        : true;
      const matchesOnSale = filterBy.isOnSale
        ? !!book.listPrice.isOnSale
        : true;

      return (
        matchesTitle &&
        matchesSubtitle &&
        matchesAuthor &&
        matchesCategory &&
        matchesPublishedYear &&
        matchesMinPageCount &&
        matchesMaxPageCount &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesCurrency &&
        matchesOnSale
      );
    });

    return filteredBooks;
  });
}

export function get(bookId) {
  return storageService.get(BOOK_KEY, bookId).then(_setNextPrevBookId);
}

export function remove(bookId) {
  return storageService.remove(BOOK_KEY, bookId);
}

function save(book) {
  if (book.id) {
    return storageService.put(BOOK_KEY, book);
  } else {
    return storageService.post(BOOK_KEY, book);
  }
}

export function getDefaultFilter(
  filterBy = {
    title: '',
    subtitle: '',
    author: '',
    category: '',
    publishedYear: '',
    minPageCount: '',
    maxPageCount: '',
    minPrice: '',
    maxPrice: '',
    currency: '',
    isOnSale: false,
  }
) {
  return {
    title: filterBy.title,
    subtitle: filterBy.subtitle,
    author: filterBy.author,
    category: filterBy.category,
    publishedYear: filterBy.publishedYear,
    minPageCount: filterBy.minPageCount,
    maxPageCount: filterBy.maxPageCount,
    minPrice: filterBy.minPrice,
    maxPrice: filterBy.maxPrice,
    currency: filterBy.currency,
    isOnSale: filterBy.isOnSale,
  };
}

async function _setNextPrevBookId(book) {
  const books = await query();
  const bookIdx = books.findIndex(currBook => currBook.id === book.id);
  book.nextBookId = books[bookIdx + 1] ? books[bookIdx + 1].id : books[0].id;
  book.prevBookId = books[bookIdx - 1]
    ? books[bookIdx - 1].id
    : books[books.length - 1].id;
  return book;
}

async function _createBooks() {
  const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion'];
  let books = await storageService.query(BOOK_KEY);
  if (books.length) return;
  console.log('Creating books...');
  books = [];
  for (let i = 0; i < 20; i++) {
    const book = {
      // id: utilService.makeId(),
      title: faker.book.title(),
      subtitle: faker.lorem.sentence(),
      authors: Array.from(
        { length: utilService.getRandomIntInclusive(1, 3) },
        () => faker.book.author()
      ),
      publishedDate: utilService.getRandomIntInclusive(1950, 2024),
      description: faker.lorem.paragraphs(3),
      pageCount: utilService.getRandomIntInclusive(20, 600),
      categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
      thumbnail: `http://www.coding-academy.org/books-photos/${i + 1}.jpg`,
      language: 'en',
      listPrice: {
        amount: faker.commerce.price({ min: 80, max: 500, dec: 0 }),
        currencyCode: 'EUR',
        isOnSale: Math.random() > 0.7,
      },
    };
    books.push(book);
    await save(book);
  }
  console.log('books', books);
}
