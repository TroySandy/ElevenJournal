//  user sign up
function userSignUp() {
  // console.log(`userSignUp function called`);
  let userEmail = document.getElementById("emailSignup").value;
  let userPass = document.getElementById("pwdSignup").value;

  let newUserData = {
    user: {
      email: userEmail,
      password: userPass,
    },
  };
  // console.log(
  `newUserData --> ${newUserData.user.email} ${newUserData.user.password}`;

  fetch(`http://localhost:3005/user/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUserData),
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      let token = data.seesionToken;
      localStorage.setItem("sessionToken", token);
      tokenChecker();
    })
    .catch((err) => {
      // console.log(err);
    });
}

// user login
function userLogin() {
  // console.log(`userLogin function called`);
  let userEmail = document.getElementById("emailLogin").value;
  let userPass = document.getElementById("pwdLogin").value;
  // console.log(userEmail, userPass);

  let userData = {
    user: {
      email: userEmail,
      password: userPass,
    },
  };
  // console.log(`userData --> ${userData.user.email} ${userData.user.password}`);

  fetch(`http://localhost:3005/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let token = data.sessionToken;
      localStorage.setItem("sessionToken", token);
      tokenChecker();
    })
    .catch((err) => {
      // console.log(err);
    });
}

// user logout
function userLogout() {
  // console.log(`userLogout function called`);
  localStorage.setItem("sessionToken", undefined);
  console.log(`sessionToken --> ${localStorage.sessionToken}`);
  tokenChecker();
}

// token checker function
function tokenChecker() {
  console.log(`tokenChecker function called`);
  let display = document.getElementById("journals");
  let header = document.createElement("h5");
  let accessToken = localStorage.getItem("sessionToken");
  let alertText = "Log in or sign up to get started!";
  console.log(accessToken);
  for (let i = 0; i < display.childNodes.length; i++) {

    display.removeChild(display.firstChild);
  }

  if (accessToken === "undefined") {

    display.appendChild(header);
    header.textContent = alertText;
    header.setAttribute("id", "defaultLogin");
  } else {
    
    null;
  }
}
tokenChecker();
