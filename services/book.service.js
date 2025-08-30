import { utilService } from './util.service.js';
import { storageService } from './async-storage.service.js';

const BOOK_KEY = 'booksDB';
_createBooks();

export function query(filterBy = {}) {
  return storageService.query(BOOK_KEY).then(books => {
    const filteredBooks = books.filter(book => {
      const matchesTitle = filterBy.title
        ? book.title.toLowerCase().includes(filterBy.title.toLowerCase())
        : true;
      const matchesMinPrice =
        filterBy.minPrice !== ''
          ? book.listPrice.amount >= filterBy.minPrice
          : true;
      const matchesMaxPrice =
        filterBy.maxPrice !== ''
          ? book.listPrice.amount <= filterBy.maxPrice
          : true;
      return matchesTitle && matchesMinPrice && matchesMaxPrice;
    });

    return filteredBooks;
  });
}

export function get(bookId) {
  return storageService.get(BOOK_KEY, bookId);
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

// function getEmptybook(vendor = '', maxSpeed = '') {
//   return { vendor, maxSpeed };
// }

export function getDefaultFilter(
  filterBy = { title: '', minPrice: '', maxPrice: '' }
) {
  return {
    title: filterBy.title,
    minPrice: filterBy.minPrice,
    maxPrice: filterBy.maxPrice,
  };
}

export async function _createBooks() {
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
