import {
  initializeApp
} from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  onSnapshot,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCsStTPq4gQT-PjBuUa-ZvPSDNhsZ4mJdQ",
  authDomain: "daxoppgave-81945.firebaseapp.com",
  projectId: "daxoppgave-81945",
  storageBucket: "daxoppgave-81945.appspot.com",
  messagingSenderId: "274494922224",
  appId: "1:274494922224:web:60100e27b79637eb121135",
};

// init firebase
initializeApp(firebaseConfig);

// init services
const db = getFirestore();

// collection ref
const colRef = collection(db, "Users");
//const colRefCo = collection(db, "counter");



//number tingz
const countDB = collection(db, "counter");
const countID = 'hpOcfqlgQ2jR0YUK68UH';
const countDocRef = doc(db, 'counter', countID);
const counter = document.getElementById('counter');

onSnapshot (countDB, snapshot => {
  let counters = [];
  snapshot.docs.forEach(doc => {
    counters.push({...doc.data(), id: doc.id})
  })
  counter.innerText = counters[0].value;
})

const plussMinus = document.querySelector('.pluss-minus');
plussMinus.addEventListener('click', e => {

  const emitter = e.target.textContent;

  switch(emitter){
      case '+':
          updateDoc(countDocRef, {value: parseInt(counter.innerText) + 1})
          break;
      case '-':
        if (counter.innerText > 0) {
          updateDoc(countDocRef, {value: parseInt(counter.innerText) - 1})
        } 
          break;
      default:
          break;
  }
  
})


//logout
const logout = document.getElementById('logout')
logout.addEventListener('click', e => {
  location.reload();
})


// adding users
const addUserForm = document.querySelector(".add");
addUserForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addDoc(colRef, {
    username: addUserForm.username.value,
    password: addUserForm.password.value,
  }).then(() => {
    addUserForm.reset();
  });
});

// logging in
const formWrapper = document.querySelector('.form-wrapper')
const page2 = document.querySelector('.page2')
const SignInForm = document.querySelector(".login");
SignInForm.addEventListener("submit", (e) => {
  e.preventDefault();

  getDocs(colRef).then((snapshot) => {
    let users = []
    snapshot.docs.forEach((doc) => {
      users.push({
        ...doc.data(),
        id: doc.id
      })
    })
    
    users.forEach((item) => {
      if (item.username == SignInForm.username.value && item.password === SignInForm.password.value) {
        formWrapper.classList.add('d-none');
        page2.classList.remove('d-none')

        const username = document.getElementById('username');
        username.innerText = SignInForm.username.value;
      }
    })
  })
});