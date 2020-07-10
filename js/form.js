async function setLoginButton() {
  let loggedinId = JSON.parse(localStorage.getItem("userId"))
  if (loggedinId) {
      await DB.collection("users").doc(loggedinId).get().then(function(doc) {
          document.getElementById("loginBtn").innerHTML = "Sign out"     
      })
  } else {
      document.getElementById("loginBtn").innerHTML = "Sign in"
  }
}
setLoginButton()


document.getElementById("loginBtn").addEventListener("click", function (e) {
  e.preventDefault();
})

let navbarHeight = $('#navbar').height();
let logoFontSize = $("#logo").css('font-size');
logoFontSize = Number(logoFontSize.replace(/\D/g, ""));

window.addEventListener("scroll", function () {
  let navbar = this.document.getElementById('navbar');
  let navbarText = navbar.getElementsByTagName("a");
  if (this.window.pageYOffset > 0) {
      navbar.classList.add("bg-light")
      for (const text of navbarText) {
          text.classList.remove("text-light");
          text.classList.add("text-dark");
      }
      navbar.style.height = navbarHeight * 5 / 6 + "px";
  } else {
      navbar.classList.remove("bg-light")
      for (const text of navbarText) {
          text.classList.remove("text-dark");
          text.classList.add("text-light");
      }
      navbar.style.height = navbarHeight + "px";
  }
})



let navText = document.getElementsByClassName("nav-link")
for (const nav of navText) {
  nav.addEventListener("mouseover", function () {
      nav.className = "nav-link";
      nav.style.color = "crimson";
  })
  nav.addEventListener("mouseout", function () {
      nav.className = "nav-link";
      if (window.pageYOffset > 0) {
          nav.className = "nav-link text-dark";
      } else {
          nav.className = "nav-link text-light";
      }
  })
}






// Get the modal
var loginFormContainer = document.getElementById("loginFormContainer");
var loginForm = document.getElementById("loginForm");


let loginFormDisplay = window.getComputedStyle(document.querySelector('#loginFormContainer')).display


// Get the button that opens the modal
var btn = document.getElementById("loginBtn");


// When the user clicks on the button, open the modal
let loggedinId = JSON.parse(localStorage.getItem("userId"))
if (!loggedinId) {
  btn.onclick = function () {
      loginFormContainer.style.display = "block";
  }
} else {
  btn.onclick = function () {
      localStorage.removeItem("currentOrder");
      localStorage.removeItem("userId");
      window.location.href = "index.html"
  }
}


function closeLoginForm() {
  loginFormContainer.style.display = "none";
}



let mouse_is_inside = false;
$(document).ready(function () {
  $('.login-form').hover(function () {
      mouse_is_inside = true;
  }, function () {
      mouse_is_inside = false;
  });

  $("body").mouseup(function () {
      if (!mouse_is_inside) {
          $('.login-form-container').hide();
      }
  });
});







let x = document.getElementById("loginFormInput")
let y = document.getElementById("registerFormInput")
let z = document.getElementById("btn-group")
function toRegister() {
  x.style.left = "-450px"
  y.style.left = "45px"
  z.style.left = "125px"
  document.getElementById("login-Btn").className = "toggle-btn text-dark"
  document.getElementById("register-Btn").className = "toggle-btn text-light"
}
function toLogin() {
  x.style.left = "45px"
  y.style.left = "450px"
  z.style.left = "0"
  // document.getElementById("loginBtn").classList.remove("text-dard")
  document.getElementById("login-Btn").className = "toggle-btn text-light"
  document.getElementById("register-Btn").className = "toggle-btn text-dark"
}


function toCheckoutPage() {
  
  // let currentOrder = JSON.parse(localStorage.getItem("currentOrder"))
  // if(currentOrder) {
  //     window.location.href = "checkout.html"
  // }
  window.location.href = "checkout.html"
}

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validatePassword(password) {
  if (password.length < 6 || password.length > 20) {
      return false
  }
  return true
}

function validateDisplayName(displayName) {
  if (displayName.length < 3 || displayName.length > 20) {
      return false
  }
  return true
}

async function register() {
  let email = document.getElementById("registerForm-email").value
  let password = document.getElementById("registerForm-password").value
  let displayName = document.getElementById("registerForm-displayName").value

  let error = {}
  if (!validateEmail(email)) {
      error.email = "Email not available"
  }

  await DB.collection("users").where("email", "==", email)
      .get()
      .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
              error.email = "Email already exist"
          });
      })

  if (!validatePassword(password)) {
      error.password = "password phai tu 6-20 ky tu"
  }
  if (!validateDisplayName(displayName)) {
      error.displayName = "displayName phai tu 3-20 ky tu"
  }
  console.log(error)
  if (!jQuery.isEmptyObject(error)) {
      document.getElementById("registerErrorAlert").style.display = "block";
      for (let e in error) {
          document.getElementById("registerErrorAlert").innerHTML = error[e]
          break
      }
      console.log("not register")
  }
  if (jQuery.isEmptyObject(error)) {
      await DB.collection("users").add({
          email: email,
          password: password,
          displayName: displayName,
          isAdmin: false
      })
      document.getElementById("registerSuccessAlert").style.display = "block"
  }
}


async function login() {
  let email = document.getElementById("loginForm-email").value
  let password = document.getElementById("loginForm-password").value

  let error = {}

  if (!validateEmail(email)) {
      error.email = "Email not available"
  }

  if (!validatePassword(password)) {
      error.password = "password phai tu 6-20 ky tu"
  }
  console.log(error)
  if (!jQuery.isEmptyObject(error)) {
      document.getElementById("loginErrorAlert").style.display = "block";
      for (let e in error) {
          document.getElementById("loginErrorAlert").innerHTML = error[e]
          break
      }
      console.log("not login")
  }
  let isEmailExist
  if (jQuery.isEmptyObject(error)) {
      await DB.collection("users").get().then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
              if (doc.data().email === email) {
                  isEmailExist = true
                  if ( doc.data().password === password ) {
                      let id = doc.id
                      localStorage.setItem("userId",JSON.stringify(id))
                      console.log("logged in")
                      $('.login-form-container').hide();
                      setLoginButton()
                  } else {
                      document.getElementById("loginErrorAlert").style.display = "block";
                      document.getElementById("loginErrorAlert").innerHTML = "Wrong password"
                  }
                  
              }
          });
      });
      if ( !isEmailExist ) {
          document.getElementById("loginErrorAlert").style.display = "block";
          document.getElementById("loginErrorAlert").innerHTML = "Email not registed yet"
      }
  }
  location.reload();

}