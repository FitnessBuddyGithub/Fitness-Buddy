import firebase from 'firebase';
class FirebaseSvc {
  constructor() {
    if (!firebase.apps.length) { //avoid re-initializing
      firebase.initializeApp({
        apiKey: "AIzaSyAor4JPitQgMqNW0ys87T-vOv6lYNUNkNg",
        authDomain: "fitness-buddy-57f3f.firebaseapp.com",
        databaseURL: "https://fitness-buddy-57f3f.firebaseio.com",
        projectId: "fitness-buddy-57f3f",
        storageBucket: "fitness-buddy-57f3f.appspot.com",
        messagingSenderId: "225211913391",
      });
     }
  }
  // login = async (user, success_callback, failed_callback) => {
  //   await firebase
  //     .auth()
  //     .signInWithEmailAndPassword(user.email, user.password)
  //     .then(success_callback, failed_callback);
  // };
  auth = () => firebase.auth();
  signInWithEmailAndPassword =(email, password)=> firebase.signInWithEmailAndPassword(email, password)
}
const firebaseSvc = new FirebaseSvc();
export default firebaseSvc;
