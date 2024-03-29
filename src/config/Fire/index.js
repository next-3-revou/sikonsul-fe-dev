import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAol0GTrj0Euvaabb208jc3yUUxnCa4U9A",
  authDomain: "sikonsul.firebaseapp.com",
  databaseURL: "https://sikonsul-default-rtdb.firebaseio.com",
  projectId: "sikonsul",
  storageBucket: "sikonsul.appspot.com",
  messagingSenderId: "704741183063",
  appId: "1:704741183063:web:af1b46c443658cbca69d12",
}

const Fire = initializeApp(firebaseConfig);
const DB = getDatabase(Fire);

export default DB;