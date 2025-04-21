
 
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
  import { getAuth,
     createUserWithEmailAndPassword,
     signInWithEmailAndPassword,
     onAuthStateChanged,
     signOut } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
  const firebaseConfig = {
    apiKey: "AIzaSyBeuSWSebR248N6KXyXDU0UTsKSJcj5lL8",
    authDomain: "foodpanda-84a21.firebaseapp.com",
    projectId: "foodpanda-84a21",
    storageBucket: "foodpanda-84a21.firebasestorage.app",
    messagingSenderId: "715287100673",
    appId: "1:715287100673:web:7537bd541cfbaa19bfaf00",
    measurementId: "G-LNKPPWVGM9"
  };


  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  
//    onAuthStateChanged(auth, (user) => {
//   if (user) {
   
//     const uid = user.uid;
//     console.log("User Is Signed In With UID:", uid);
//     // if u have to stop refreshing itself automatically use this it will tell u in which page your in and will not let user shift the page
//     console.log(location.pathname)
//     // ye khud se condition lagainge
//     if (
//       (location.pathname === "/index.html" || location.pathname === "/login.html") &&
//       location.pathname !== "/signup.html"
//     ) {
//       // setTimeout(() => {
//         location.href = "/admin.html";
//       // }, 2000);
//     }

//   } else {
//     console.log("Not Login")
//   }
// });
onAuthStateChanged(auth, (user) => {
  const currentPath = location.pathname;
  console.log("Auth state changed on:", currentPath);
 

  if (user) {
    // Only redirect if user is on login or index page
    const publicPages = ["/", "/index.html", "/login.html"];
    const shouldRedirect = publicPages.includes(currentPath);

    if (shouldRedirect) {
      console.log("Redirecting to admin...");
      setTimeout(() => {
        location.href = "/admin.html";
      }, 2000);
    } else {
      console.log("User logged in, but staying on", currentPath);
    }

  } else {
    console.log("User is not logged in");
  }
});


  function handleSignup(){
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {

    const user = userCredential.user;
    Swal.fire({
        title: "Sign up Sucessfully",
        text: `${user.email}`,
        icon: "success"
      });

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid Credentials",
        
      });
 
  });
  

  }

  window.handleSignup = handleSignup


  function handleLogin(){
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const auth = getAuth();
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    Swal.fire({
        title: "Sign up Sucessfully",
        text: `${user.email}`,
        icon: "success"
      });
 
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid Credentials",
        
      });
  });
  }

  window.handleLogin = handleLogin


  function logoutUser() {
    signOut(auth)
      .then(() => {
        Swal.fire({
          title: "Signed Out!",
          text: "You have been logged out.",
          icon: "success",
          confirmButtonText: "OK"
        }).then(() => {
          window.location.href = "login.html"; // Redirect after alert is dismissed
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Could not sign out."
        });
        console.error("Sign out error:", error);
      });
  }
  
  // Make the function globally available if needed
  window.logoutUser = logoutUser;

  
  
 
