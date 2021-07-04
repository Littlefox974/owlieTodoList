// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';
import firebaseConfig from '../../firebase.config';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export default db;
