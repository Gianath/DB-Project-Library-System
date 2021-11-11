const getForm = document.querySelector('.login-form');
const emailForm = document.querySelector('#email');
const passForm = document.querySelector('#password');
const warn = document.querySelector('.login-validate');

getForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = emailForm.value;
  const pass = passForm.value;
  try {
    const result = await axios.post('/api/login', {
      email,
      pass,
    });
    if (result.hasOwnProperty('result')) {
    } else {
      warn.innerHTML = 'Wrong Email or Password';
      warn.style.color = 'Red';
    }
  } catch (error) {
    console.log(error);
  }
});
