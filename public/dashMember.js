const availbooks = document.querySelector('#avail-book');
const loanbook = document.querySelector('#loan-book');
const bookRenderDOM = document.querySelector('.books-render');
const currUserDOM = document.querySelector('.curr-user');
const logoutDOM = document.querySelector('.hover-logout');
const searchFormDOM = document.querySelector('.search-form');
const searchBar = document.querySelector('#search');
var currUser = null;
window.onload = async () => {
  try {
    bookRenderDOM.innerHTML = 'Please Choose An Option To Display Books';
    const { data: user } = await axios.get('/api/login/member');
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

logoutDOM.addEventListener('click', async (e) => {
  e.preventDefault();
  try {
    const { data: user } = await axios.delete('/api/login/member');
    alert('You have logged out!');
    window.location.href = 'http://localhost:3000/';
  } catch (error) {
    console.log(error);
  }
});

availbooks.addEventListener('change', async (e) => {
  e.preventDefault();
  try {
    bookRenderDOM.innerHTML = 'Loading, Please wait...';
    const headerhtml = [
      `  <tr>
      <th>Book Title</th>
      <th>Book Author</th>
      <th>Book Publisher</th>
      <th>Book Year</th>
      <th>Book Genre</th>
      <th>Book Amount</th>
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
    books.unshift(headerhtml);

    bookRenderDOM.innerHTML = books.join('');
  } catch (error) {
    console.log(error);
  }
});

loanbook.addEventListener('change', async (e) => {
  e.preventDefault();
  try {
    bookRenderDOM.innerHTML = 'Loading, Please wait...';
    const headerhtml = [
      `  <tr>
    <th>Book Title</th>
    <th>Book Author</th>
    <th>Book Publisher</th>
    <th>Book Year</th>
    <th>Book Genre</th>
    <th>Borrow Date</th>
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
      <th>${book.BorrowDate.substring(0, 10)}</th>
    </tr>`;
    });
    books.unshift(headerhtml);
    bookRenderDOM.innerHTML = books.join('');
  } catch (error) {
    console.log(error);
  }
});

searchFormDOM.addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    const toSearch = searchBar.value;
    if (availbooks.checked) {
      const headerhtml = [
        `  <tr>
        <th>Book Title</th>
        <th>Book Author</th>
        <th>Book Publisher</th>
        <th>Book Year</th>
        <th>Book Genre</th>
        <th>Book Amount</th>
      </tr>`,
      ];
      const {
        data: { result },
      } = await axios.get(`/api/books?type=${1}&search=${toSearch}`);

      if (result.length <= 0) {
        bookRenderDOM.innerHTML = 'No Found.';
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
      books.unshift(headerhtml);

      bookRenderDOM.innerHTML = books.join('');
    } else if (loanbook.checked) {
      const headerhtml = [
        `  <tr>
      <th>Book Title</th>
      <th>Book Author</th>
      <th>Book Publisher</th>
      <th>Book Year</th>
      <th>Book Genre</th>
      <th>Borrow Date</th>
    </tr>`,
      ];
      const {
        data: { result },
      } = await axios.get(
        `/api/books?nim=${currUser.StudentID}&type=${2}&search=${toSearch}`
      );
      if (result.length <= 0) {
        bookRenderDOM.innerHTML = 'Not Found.';
        return;
      }
      let books = result.map((book) => {
        return `<tr>
        <th>${book.BookTitle}</th>
        <th>${book.BookAuthor}</th>
        <th>${book.BookPublisher}</th>
        <th>${book.BookYear}</th>
        <th>${book.BookGenre}</th>
        <th>${book.BorrowDate.substring(0, 10)}</th>
      </tr>`;
      });
      books.unshift(headerhtml);
      bookRenderDOM.innerHTML = books.join('');
    }
  } catch (error) {
    console.log(error);
  }
});
