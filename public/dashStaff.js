const bookRenderDOM = document.querySelector('.books-render');
const currUserDOM = document.querySelector('.curr-user');
const logoutDOM = document.querySelector('.hover-logout');
const searchFormDOM = document.querySelector('.search-form');
const searchBar = document.querySelector('#search');
const showbooksDOM = document.querySelector('#show-book');
const returnbooksDOM = document.querySelector('#return-book');

var currUser = null;

window.onload = async () => {
  try {
    bookRenderDOM.innerHTML = 'Please Choose An Option To Display Books';
    const { data: user } = await axios.get('/api/login/staff');
    if (!user.current) {
      alert('Please Login First');
      window.location.href = 'http://localhost:3000/';
      return;
    }
    currUser = user.current[0];
    currUserDOM.innerHTML = `Login as ${currUser.LibName.substring(0, 11)}`;
  } catch (error) {
    console.log(error);
  }
};

logoutDOM.addEventListener('click', async (e) => {
  e.preventDefault();
  try {
    const { data: user } = await axios.delete('/api/login/staff');
    alert('You have logged out!');
    window.location.href = 'http://localhost:3000/';
  } catch (error) {
    console.log(error);
  }
});

showbooksDOM.addEventListener('change', async (e) => {
  e.preventDefault();
  try {
    bookRenderDOM.innerHTML = 'Loading, Please wait...';
    const headerhtml = [
      `<tr>
      <th>Book Title</th>
      <th>Book Author</th>
      <th>Book Publisher</th>
      <th>Book Year</th>
      <th>Book Genre</th>
      <th>Book Amount</th>
      <th>Edit</th>
      <th>Delete</th>
      <th>Borrow</th>
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
        BookID,
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
        <th class="btn"><button class="logo" data-id="${BookID}"><img src="edit.png"></button></th>
        <th class="btn"><button class="logo" data-id="${BookID}"><img src="bin.png"></button></th>
        <th class="btn"><button class="logo" data-id="${BookID}"><img src="borrowing.png"></button></th>
      </tr>`;
    });
    books.unshift(headerhtml);

    bookRenderDOM.innerHTML = books.join('');
  } catch (error) {
    console.log(error);
  }
});

returnbooksDOM.addEventListener('change', async (e) => {
  e.preventDefault();
  try {
    bookRenderDOM.innerHTML = 'Loading, Please wait...';
    const headerhtml = [
      `<tr>
    <th>Student ID</th>
    <th>Book Title</th>
    <th>Book Author</th>
    <th>Book Publisher</th>
    <th>Book Year</th>
    <th>Book Genre</th>
    <th>Borrow Date</th>
    <th>Return</th>
  </tr>`,
    ];
    const {
      data: { result },
    } = await axios.get(`/api/books?type=${3}`);
    if (result.length <= 0) {
      bookRenderDOM.innerHTML = 'No Book On Loan.';
      return;
    }
    let books = result.map((book) => {
      return `<tr>
      <th>${book.StudentID}</th>
      <th>${book.BookTitle}</th>
      <th>${book.BookAuthor}</th>
      <th>${book.BookPublisher}</th>
      <th>${book.BookYear}</th>
      <th>${book.BookGenre}</th>
      <th>${book.BorrowDate.substring(0, 10)}</th>
      <th class="btn"><button class="logo" data-id="${
        book.BorrowID
      }"><img src="return.png" /></button></th>
    </tr>`;
    });
    books.unshift(headerhtml);
    bookRenderDOM.innerHTML = books.join('');
  } catch (error) {
    console.log(error);
  }
});
