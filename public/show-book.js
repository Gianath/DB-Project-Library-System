const availbooks = document.querySelector('.avail-book');
const loanbook = document.querySelector('.loan-book');
const bookRender = document.querySelector('.books-render');

availbooks.addEventListener('click', async (e) => {
  e.preventDefault();
  try {
    const {
      data: { result },
    } = await axios.get(`/api/books/${1}`);
    console.log(result);
    const headerhtml = [
      `  <tr>
      <th>BookTitle</th>
      <th>BookAuthor</th>
      <th>BookPublisher</th>
      <th>BookYear</th>
      <th>BookGenre</th>
      <th>BookAmount</th>
    </tr>`,
    ];
    console.log();
    books = result.map((book) => {
      const {
        BookTitle,
        BookAuthor,
        BookPublisher,
        BookYear,
        BookGenre,
        BookAmount,
      } = book;
      return `<tr>
        <th>${BookTitle}</th>
        <th>${BookAuthor}</th>
        <th>${BookPublisher}</th>
        <th>${BookYear}</th>
        <th>${BookGenre}</th>
        <th>${BookAmount}</th>
      </tr>`;
    });
    // console.log(books);
    books.unshift(headerhtml);

    console.log(books);
    bookRender.innerHTML = books;
  } catch (error) {
    console.log(error);
  }
});

loanbook.addEventListener('click', async (e) => {
  e.preventDefault();
  try {
    const result = await axios.get(`/api/books/${2}`);
    const headerhtml = [
      `  <tr>
    <th>BookTitle</th>
    <th>BookAuthor</th>
    <th>BookPublisher</th>
    <th>BookYear</th>
    <th>BookGenre</th>
    <th>BookAmount</th>
  </tr>`,
    ];
    books = result.map((book) => {
      return `<tr>
      <th>${book.BookTitle}</th>
      <th>${book.BookAuthor}</th>
      <th>${book.BookPublisher}</th>
      <th>${book.BookYear}</th>
      <th>${book.BookGenre}</th>
      <th>${book.BookAmount}</th>
    </tr>`;
    });
    books = [...headerhtml, bookRender];
    bookRender.innerHTML = books;
  } catch (error) {
    console.log(error);
  }
});
