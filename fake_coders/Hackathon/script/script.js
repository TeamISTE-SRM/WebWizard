function scrollAppear() {
	var introText = document.querySelector(".side-text");
	var sideImage = document.querySelector(".sideImage");
	var introPosition = introText.getBoundingClientRect().top;
	var imagePosition = sideImage.getBoundingClientRect().top;

	var screenPosition = window.innerHeight / 1.2;

	if (introPosition < screenPosition) {
		introText.classList.add("side-text-appear");
	}
	if (imagePosition < screenPosition) {
		sideImage.classList.add("sideImage-appear");
	}
}

window.addEventListener("scroll", scrollAppear);

var x = document.getElementById("login");
var y = document.getElementById("register");
var z = document.getElementById("btn");
var a = document.getElementById("log");
var b = document.getElementById("reg");
var w = document.getElementById("other");

function register() {
	x.style.left = "-400px";
	y.style.left = "50px";
	z.style.left = "110px";
	w.style.visibility = "hidden";
	b.style.color = "#fff";
	a.style.color = "#000";
}

function login() {
	x.style.left = "50px";
	y.style.left = "450px";
	z.style.left = "0px";
	w.style.visibility = "visible";
	a.style.color = "#fff";
	b.style.color = "#000";
}

function goFurther() {
	if (document.getElementById("chkAgree").checked == true) {
		document.getElementById("btnSubmit").style =
			"background: linear-gradient(to right, #FA4B37, #DF2771);";
	} else {
		document.getElementById("btnSubmit").style = "background: lightgray;";
	}
}

function google() {
	window.location.assign(
		"https://accounts.google.com/signin/v2/identifier?service=accountsettings&continue=https%3A%2F%2Fmyaccount.google.com%2F%3Futm_source%3Dsign_in_no_continue&csig=AF-SEnbZHbi77CbAiuHE%3A1585466693&flowName=GlifWebSignIn&flowEntry=AddSession",
		"_blank"
	);
}

function loginP() {
	var name = document.getElementById("email").value;
	var password = document.getElementById("password").value;

	fetch("http://localhost:4000/login", {
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		method: "POST",
		body: JSON.stringify({ email: name, password: password }),
	})
		.then((res) => {
			if(res.ok){
        console.log(res.json())
        window.location = 'index.html'
      }else{
        alert("Wrong Credentials Try Again")
      }			
		})
		.catch((error) => {
			console.error("Error:", error);
		});
}

function signupP() {
	var name = document.getElementById("usernameSignup").value;
	var pass1 = document.getElementById("pass1Signup").value;
  var pass2 = document.getElementById("pass2Signup").value;
  var email = document.getElementById("emailSignup").value;

  if(pass1 !== pass2){
    alert("Password Mismatch")
    return 
  }

	fetch("http://localhost:4000/signup", {
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		method: "POST",
		body: JSON.stringify({ username:name, email: email, password: pass1 }),
	})
		.then((res) => {
			if(res.ok){
        console.log(res.json())
        window.location = 'index.html'
      }else{
        alert("Email already in use Try Again")
      }			
		})
		.catch((error) => {
			console.error("Error:", error);
		});
}
