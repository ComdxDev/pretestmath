let countdown = 3; // Set countdown time 
const countdownElement = document.getElementById('countdown');

// Countdown 
const timer = setInterval(() => {
  countdown--;
  // countdownElement.textContent = countdown;
  

  if (countdown <= 0) {
    clearInterval(timer);
    window.location.href = "home.html"; // Replace with your target URL
  }
}, 1000);  /*1000 เท่ากับ1วินาที*/
