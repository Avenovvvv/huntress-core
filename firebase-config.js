import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {

  apiKey: "AIzaSyCZTz2K9TV7p1G2CHonsf9khw_cghJtJxo",

  authDomain: "huntress-core.firebaseapp.com",

  projectId: "huntress-core",

  storageBucket: "huntress-core.firebasestorage.app",

  messagingSenderId: "136366574004",

  appId: "1:136366574004:web:37d9f25270987288190ae1"

};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
