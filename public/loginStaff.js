const getForm = document.querySelector('.login-form');
const usernameForm = document.querySelector('#username');
const passForm = document.querySelector('#password');
const warn = document.querySelector('.login-validate');

getForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = usernameForm.value;
  const pass = passForm.value;
  try {
    const { data: result } = await axios.post('/api/login/staff', {
      username,
      pass,
    });
    if (result.hasOwnProperty('result')) {
      window.location.href = 'http://localhost:3000/dashboardStaff.html';
    } else {
      warn.innerHTML = 'Wrong Username or Password';
      warn.style.color = 'Red';
    }
  } catch (error) {
    console.log(error);
  }
});
