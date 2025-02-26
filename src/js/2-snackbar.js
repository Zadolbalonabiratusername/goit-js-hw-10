import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
//import successIcon from "../img/icon-success.svg";
//import errorIcon from "../img/icon-error.svg";

const refs ={
  form: document.querySelector('.form'),
  delayInput: document.querySelector('[name="delay"]'),
}

function showMessage(status, delay) {
  //const importedUrl = status ? successIcon : errorIcon;
  const backgroundColor = status ? '#0DA12D' : '#EF4040'; 
  const message = status
    ? `✅ Fulfilled promise in ${delay}ms`
    : `❌ Rejected promise in ${delay}ms`;
  iziToast.show({
    position: 'topRight',
    message,
    messageSize: '16px',
    messageLineHeight: '24px',
    messageColor: 'white',
    //iconUrl: importedUrl,
    backgroundColor,
  });
}


function gneratePromise(e) {
  e.preventDefault();
  const delay = refs.delayInput.value;
  const statusRadio = document.querySelector('[name="state"]:checked');

  const gneratedPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (statusRadio.value === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  gneratedPromise
    .then(delay => showMessage(true, delay))
    .catch(delay => showMessage(false, delay));

  refs.form.reset();
}


refs.form.addEventListener('submit', gneratePromise);
