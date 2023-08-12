//------------------------------------Typing Animation------------------------------------//
const textElement = document.querySelector(".typing-animation");
const textToType = textElement.innerText;
textElement.innerText = "";

let charIndex = 0;

function type() {
  if (charIndex < textToType.length) {
    textElement.textContent += textToType[charIndex];
    charIndex++;
    setTimeout(type, 120);
  }
}

type();

//------------------------------------Sticky Navbar------------------------------------//

window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".portfolio-navbar");
  if (window.scrollY > 0) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
});

//------------------------------------Skills------------------------------------//

let tabLinks = document.querySelectorAll(".tab-links");
let tabContents = document.querySelectorAll(".tab-contents");

for (let i = 1; i < tabContents.length; i++) {
  tabContents[i].style.display = "none";
}

function openTabs(tabname) {
  for (let i = 0; i < tabLinks.length; i++) {
    tabLinks[i].classList.remove("active-link");
    tabLinks[i].style.color = "";
  }
  for (let i = 0; i < tabContents.length; i++) {
    tabContents[i].style.display = "none";
  }

  let clickedTab = document.querySelector(`[onclick="openTabs('${tabname}')"]`);
  clickedTab.classList.add("active-link");
  clickedTab.style.color = "#ff004f";

  document.getElementById(tabname).style.display = "block";

  if (tabname === "skills") {
    document.querySelector("[onclick=\"openTabs('experience')\"]").style.color =
      "";
    document.querySelector("[onclick=\"openTabs('education')\"]").style.color =
      "";
  }
}

//-----------------------Show Greeting Message based on Time-----------------------//
function startTime() {
  const today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById("txt").innerHTML = h + ":" + m + ":" + s + " " + ampm;
  setTimeout(startTime, 1000);
}

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function updateGreeting() {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();
  const greetingContainer = document.querySelector(".portfolio-home-right");

  if (currentHour >= 5 && currentHour < 12) {
    greetingContainer.innerHTML = `<i class="fa-solid fa-sun" style="color: #fdb813;"></i>Good Morning`;
  } else if (currentHour >= 12 && currentHour < 18) {
    greetingContainer.innerHTML = `<img src="Images/noon-icon.ico" alt="noon-icon">
    </i>Good Afternoon`;
  } else {
    greetingContainer.innerHTML = `<i class="fa-solid fa-moon" style="color: #f6f1d5;"></i>Good Evening`;
  }
}

updateGreeting();
startTime();
setInterval(updateGreeting, 60000);
setInterval(startTime, 1000);

//----------------------------------------Loader----------------------------------------//

window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");
  setTimeout(() => {
    loader.style.display = "none";
  }, 800);
});

//-----------------------------Recive Contact Form Data in Google Sheets-----------------------------//
const scriptURL =
  "https://script.google.com/macros/s/AKfycbwr-n0n4sKx2z0gFLrlFXJTi17M_TRyrGyPFQSijtAE_201TLKf9NxFmWlKGmBigQKD_Q/exec";
let form = document.forms["submit-to-google-sheet"];

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      showAlert("Success!", "Your response has been submitted successfully.");
      submitForm();
    })
    .catch((error) => {
      showAlert(
        "Error!",
        "There was an error submitting the form. Please try again later."
      );
    });
});

function submitForm() {
  let form = document.getElementById("submit-form");

  if (form.checkValidity()) {
    form.reset();
    showAlert(
      "Success!",
      "Your response has been saved. I'll connect with you shortly."
    );
  } else {
    showAlert("Validation Error", "Please fill in all required fields.");
  }
}

function showAlert(title, message) {
  Swal.fire({
    title: title,
    text: message,
    confirmButtonColor: "#ff004f",
    confirmButtonText: "OK",
  });
}

//------------------------------Scroll To Top and Down------------------------------//
const scrollButton = document.querySelector(".scroll-to-top");

function toggleScrollButton() {
  if (window.scrollY > window.innerHeight / 2) {
    scrollButton.style.display = "block";
  } else {
    scrollButton.style.display = "none";
  }
}

toggleScrollButton();
window.addEventListener("scroll", toggleScrollButton);

//-----------------Responsive Navbar-----------------//
let sideMenuBar = document.querySelector("#sidemenu");

function openMenu() {
  sideMenuBar.style.right = "0";
  document.body.classList.add("sidebar-open");
}

function closeMenu() {
  sideMenuBar.style.right = "-200px";
  document.body.classList.remove("sidebar-open");
}

function closeSidebar() {
  closeMenu();
}

//-----------If Route Path does not match redirect home page-----------//
var currentPath = window.location.pathname;
var validRoutes = ["/", "/#home", "/#about", "/#services", "/#contact"];
if (!validRoutes.includes(currentPath)) {
  var homeUrl = "/";
  window.location.href = homeUrl;
  history.pushState(null, null, homeUrl);
}
