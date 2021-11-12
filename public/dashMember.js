const availbooks = document.querySelector('.avail-book');
const loanbook = document.querySelector('.loan-book');
const bookRenderDOM = document.querySelector('.books-render');
const currUserDOM = document.querySelector('.curr-user');
var currUser = null;
window.onload = async () => {
  try {
    bookRenderDOM.innerHTML = 'Please Choose An Option To Display Books';
    const { data: user } = await axios.get('/api/login');
    if (!user.current) {
      alert('Please Login First');
      window.location.href = 'http://localhost:3000/';
      return;
    }
    currUser = user.current[0];
    currUserDOM.innerHTML = `Login as ${currUser.StudentName.substring(0, 11)}`;
  } catch (error) {
    console.log(error);
  }
};

availbooks.addEventListener('click', async (e) => {
  e.preventDefault();
  try {
    bookRenderDOM.innerHTML = 'Loading, Please wait...';
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
    const {
      data: { result },
    } = await axios.get(`/api/books?type=${1}`);

    if (result.length <= 0) {
      bookRenderDOM.innerHTML = 'No Available book.';
      return;
    }
    let books = result.map((book) => {
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

    // console.log(books);
    bookRenderDOM.innerHTML = books.join('');
  } catch (error) {
    console.log(error);
  }
});

loanbook.addEventListener('click', async (e) => {
  e.preventDefault();
  try {
    bookRenderDOM.innerHTML = 'Loading, Please wait...';
    const headerhtml = [
      `  <tr>
    <th>BookTitle</th>
    <th>BookAuthor</th>
    <th>BookPublisher</th>
    <th>BookYear</th>
    <th>BookGenre</th>
    <th>BookAmount</th>
    <th>BorrowDate</th>
  </tr>`,
    ];
    const {
      data: { result },
    } = await axios.get(`/api/books?nim=${currUser.StudentID}&type=${2}`);
    if (result.length <= 0) {
      bookRenderDOM.innerHTML = 'No Book On Loan.';
      return;
    }
    let books = result.map((book) => {
      return `<tr>
      <th>${book.BookTitle}</th>
      <th>${book.BookAuthor}</th>
      <th>${book.BookPublisher}</th>
      <th>${book.BookYear}</th>
      <th>${book.BookGenre}</th>
      <th>${book.BookAmount}</th>
      <th>${book.BorrowDate}</th>
    </tr>`;
    });
    books.unshift(headerhtml);
    bookRenderDOM.innerHTML = books.join('');
  } catch (error) {
    console.log(error);
  }
});
