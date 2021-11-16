const bookRenderDOM = document.querySelector('.books-render');
const currUserDOM = document.querySelector('.curr-user');
const logoutDOM = document.querySelector('.hover-logout');
const searchFormDOM = document.querySelector('.search-form');
const searchBar = document.querySelector('#search');
const showbooksDOM = document.querySelector('#show-book');
const returnbooksDOM = document.querySelector('#return-book');

// pop-up overlay
const overlay = document.querySelector('.overlay');
// pop-up Add
const containerAdd = document.querySelector('.container-add');
const formAddDOM = document.querySelector('#add');
const exitbtnAdd = document.querySelector('.exit-btnAdd');
const titleFormAdd = document.querySelector('#titleA');
const authorFormAdd = document.querySelector('#authorA');
const publisherFormAdd = document.querySelector('#publisherA');
const yearFormAdd = document.querySelector('#yearA');
const genreFormAdd = document.querySelector('#genreA');
const amountFormAdd = document.querySelector('#amountA');
// pop-up Update
const containerUpdate = document.querySelector('.container-update');
const formUpdateDOM = document.querySelector('#update');
const exitbtnUpdate = document.querySelector('.exit-btnUpdate');
const titleFormUpdate = document.querySelector('#titleU');
const authorFormUpdate = document.querySelector('#authorU');
const publisherFormUpdate = document.querySelector('#publisherU');
const yearFormUpdate = document.querySelector('#yearU');
const genreFormUpdate = document.querySelector('#genreU');
const amountFormUpdate = document.querySelector('#amountU');

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

const showAllBooks = async () => {
  try {
    searchBar.placeholder = 'Enter Book Title';
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
    } = await axios.get(`/api/books?type=${1}&showAll=true`);

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
        <th class="btn"><button class="btn-edit" data-id="${BookID}"><img src="edit.png"></button></th>
        <th class="btn"><button class="btn-delete" data-id="${BookID}" data-name="${BookTitle}"><img src="bin.png" onmouseover="this.src='bin-red.png'" onmouseout="this.src='bin.png'"></button></th>
        <th class="btn"><button class="btn-borrow" data-id="${BookID}"><img src="borrowing.png"></button></th>
      </tr>`;
    });
    books.unshift(headerhtml);

    bookRenderDOM.innerHTML = books.join('');
  } catch (error) {
    console.log(error);
  }
};

showbooksDOM.addEventListener('change', async (e) => {
  e.preventDefault();
  showAllBooks();
});

const showReturnBook = async () => {
  try {
    searchBar.placeholder = 'Enter Student ID';
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
      <th class="btn"><button class="btn-return" data-id="${
        book.BorrowID
      }" data-bookID="${book.BookID}"><img src="return.png"></button></th>
    </tr>`;
    });
    books.unshift(headerhtml);
    bookRenderDOM.innerHTML = books.join('');
  } catch (error) {
    console.log(error);
  }
};

returnbooksDOM.addEventListener('change', async (e) => {
  e.preventDefault();
  showReturnBook();
});

searchFormDOM.addEventListener('submit', async (e) => {
  e.preventDefault();
  try {
    bookRenderDOM.innerHTML = 'Loading, Please wait...';
    const toSearch = searchBar.value;
    if (showbooksDOM.checked) {
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
      } = await axios.get(`/api/books?type=${1}&search=${toSearch}`);

      if (result.length <= 0) {
        bookRenderDOM.innerHTML = 'No Found.';
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
          <th class="btn"><button class="btn-edit" data-id="${BookID}"><img src="edit.png"></button></th>
          <th class="btn"><button class="btn-delete" data-id="${BookID}" data-name="${BookTitle}"><img src="bin.png" onmouseover="this.src='bin-red.png'" onmouseout="this.src='bin.png'"></button></th>
          <th class="btn"><button class="btn-borrow" data-id="${BookID}"><img src="borrowing.png"></button></th>
        </tr>`;
      });
      books.unshift(headerhtml);

      bookRenderDOM.innerHTML = books.join('');
    } else if (returnbooksDOM.checked) {
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
      } = await axios.get(`/api/books?type=${3}&search=${toSearch}`);
      if (result.length <= 0) {
        bookRenderDOM.innerHTML = 'Not Found.';
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
      <th class="btn"><button class="btn-return" data-id="${
        book.BorrowID
      }" data-bookID="${book.BookID}"><img src="return.png"></button></th>
    </tr>`;
      });
      books.unshift(headerhtml);
      bookRenderDOM.innerHTML = books.join('');
    }
  } catch (error) {
    console.log(error);
  }
});

async function validateStudent(id) {
  try {
    const {
      data: { result },
    } = await axios.get(`/api/login/member/${id}`);
    if (result.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
}

async function validateBook(id) {
  try {
    const {
      data: { result },
    } = await axios.get(`/api/books/${id}`);
    if (result[0].BookAmount > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
  return false;
}

bookRenderDOM.addEventListener('click', async (e) => {
  const el = e.target;
  if (el.parentElement.classList.contains('btn-delete')) {
    const id = el.parentElement.dataset.id;
    const name = el.parentElement.dataset.name;
    if (confirm(`Are you sure you want to delete ${name}`)) {
      try {
        const {
          data: { result },
        } = await axios.delete(`/api/books/${id}`);
        showAllBooks();
      } catch (error) {
        console.log(error);
      }
    }
  } else if (el.parentElement.classList.contains('btn-edit')) {
    const id = el.parentElement.dataset.id;
    overlay.dataset.id = id;
    try {
      const {
        data: { result },
      } = await axios.get(`/api/books/${id}`);
      titleFormUpdate.value = result[0].BookTitle;
      authorFormUpdate.value =
        result[0].BookAuthor != null ? result[0].BookAuthor : '';
      publisherFormUpdate.value =
        result[0].BookPublisher != null ? result[0].BookPublisher : '';
      yearFormUpdate.value =
        result[0].BookYear != null ? result[0].BookYear : '';
      genreFormUpdate.value =
        result[0].BookGenre != null ? result[0].BookGenre : '';
      amountFormUpdate.value = result[0].BookAmount;
      updateBook();
    } catch (error) {
      console.log(error);
    }
  } else if (el.parentElement.classList.contains('btn-return')) {
    const id = el.parentElement.dataset.id;
    const bookID = el.parentElement.dataset.bookid;
    try {
      const {
        data: { result },
      } = await axios.patch(`/api/books/return/${id}`, {
        bookID,
      });
      showReturnBook();
    } catch (error) {
      console.log(error);
    }
  } else if (el.parentElement.classList.contains('btn-borrow')) {
    const Bookid = el.parentElement.dataset.id;
    const StudentID = prompt('Please enter your StudentID');
    if (!StudentID) {
      return;
    }
    if (!(await validateStudent(StudentID))) {
      alert('Enter a valid StudentID!');
      return;
    }
    if (!(await validateBook(Bookid))) {
      alert('Book not enough!');
      return;
    }
    try {
      const {
        data: { result },
      } = await axios.post(`/api/books/borrow/`, {
        Bookid,
        StudentID,
        LibID: currUser.LibID,
      });
      showAllBooks();
      alert('Borrow Successfull');
    } catch (error) {
      console.log(error);
    }
  }
});

//overlay check if click outside box
overlay.addEventListener('click', (e) => {
  let el = e.target;
  if (el == overlay) {
    overlay.style.display = 'none';
    containerAdd.style.display = 'none';
  }
});

exitbtnAdd.addEventListener('click', (e) => {
  overlay.style.display = 'none';
  containerAdd.style.display = 'none';
});

exitbtnUpdate.addEventListener('click', (e) => {
  overlay.style.display = 'none';
  containerUpdate.style.display = 'none';
});

function addBook() {
  overlay.style.display = 'flex';
  containerAdd.style.display = 'block';
}

function updateBook() {
  overlay.style.display = 'flex';
  containerUpdate.style.display = 'block';
}

formAddDOM.addEventListener('submit', async (e) => {
  e.preventDefault();

  overlay.style.display = 'none';
  containerAdd.style.display = 'none';

  alert('Success! Book Added');
  let title = titleFormAdd.value;
  let author = authorFormAdd.value;
  let publisher = publisherFormAdd.value;
  let year = yearFormAdd.value;
  let genre = genreFormAdd.value;
  let amount = amountFormAdd.value;

  titleFormAdd.value = '';
  authorFormAdd.value = '';
  publisherFormAdd.value = '';
  yearFormAdd.value = '';
  genreFormAdd.value = '';
  amountFormAdd.value = '';

  try {
    const {
      data: { result },
    } = await axios.post(`/api/books/`, {
      title,
      author,
      publisher,
      year,
      genre,
      amount,
    });
  } catch (error) {
    console.log(error);
  }
  if (showbooksDOM.checked) {
    showAllBooks();
  }
});

formUpdateDOM.addEventListener('submit', async (e) => {
  e.preventDefault();

  overlay.style.display = 'none';
  containerUpdate.style.display = 'none';

  alert('Success! Book Updated');
  const id = overlay.dataset.id;
  let title = titleFormUpdate.value;
  let author = authorFormUpdate.value;
  let publisher = publisherFormUpdate.value;
  let year = yearFormUpdate.value;
  let genre = genreFormUpdate.value;
  let amount = amountFormUpdate.value;

  titleFormUpdate.value = '';
  authorFormUpdate.value = '';
  publisherFormUpdate.value = '';
  yearFormUpdate.value = '';
  genreFormUpdate.value = '';
  amountFormUpdate.value = '';

  try {
    const {
      data: { result },
    } = await axios.patch(`/api/books/${id}`, {
      title,
      author,
      publisher,
      year,
      genre,
      amount,
    });
  } catch (error) {
    console.log(error);
  }
  if (showbooksDOM.checked) {
    showAllBooks();
  }
});
