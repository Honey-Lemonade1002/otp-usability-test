const otpCode = "123456";

function showOTP(mode) {
  let displayCode = "";

  if (mode === "A") {
    displayCode = "A" + otpCode;
  } else if (mode === "B") {
    displayCode = "B" + otpCode.slice(0, 3) + " " + otpCode.slice(3, 6);
  } else if (mode === "C") {
    displayCode = "C" + otpCode.slice(0, 2) + " " + otpCode.slice(2, 4) + " " + otpCode.slice(4, 6);
  } else if (mode === "random") {
    const modes = ["A", "B", "C"];
    const randomMode = modes[Math.floor(Math.random() * modes.length)];
    showOTP(randomMode);
    return;
  }

  document.getElementById("otp-display").textContent = displayCode;
}
