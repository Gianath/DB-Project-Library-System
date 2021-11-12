const getForm = document.querySelector('.login-form');
const emailForm = document.querySelector('#email');
const passForm = document.querySelector('#password');
const warn = document.querySelector('.login-validate');

getForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = emailForm.value;
  const pass = passForm.value;
  try {
    const { data: result } = await axios.post('/api/login/member', {
      email,
      pass,
    });
    if (result.hasOwnProperty('result')) {
      window.location.href = 'http://localhost:3000/dashboardMember.html';
    } else {
      warn.innerHTML = 'Wrong Email or Password';
      warn.style.color = 'Red';
    }
  } catch (error) {
    console.log(error);
  }
});
