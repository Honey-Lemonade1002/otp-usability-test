const otpCode = "123456";

let currentMode = "";
let startTime = null;
let errorCount = 0;

function showOTP(mode) {
  let displayCode = "";

  if (mode === "random") {
    const modes = ["A", "B", "C"];
    mode = modes[Math.floor(Math.random() * modes.length)];
  }

  currentMode = mode;
  startTime = new Date();
  errorCount = 0;

  if (mode === "A") {
    displayCode = otpCode;
  } else if (mode === "B") {
    displayCode = otpCode.slice(0, 3) + " " + otpCode.slice(3, 6);
  } else if (mode === "C") {
    displayCode =
      otpCode.slice(0, 2) + " " +
      otpCode.slice(2, 4) + " " +
      otpCode.slice(4, 6);
  }

  document.getElementById("otp-display").textContent = displayCode;
  document.getElementById("user-input").value = "";
  document.getElementById("result-message").textContent = "";
}

function checkAnswer() {
  const userInput = document.getElementById("user-input").value.trim();
  const resultMessage = document.getElementById("result-message");

  if (currentMode === "") {
    resultMessage.textContent = "請先選擇一種模式。";
    resultMessage.style.color = "red";
    return;
  }

  if (userInput === otpCode) {
    const endTime = new Date();
    const timeUsed = ((endTime - startTime) / 1000).toFixed(2);

    resultMessage.textContent =
      "正確！模式：" + currentMode +
      "，花費時間：" + timeUsed +
      " 秒，錯誤次數：" + errorCount;
    resultMessage.style.color = "green";
  } else {
    errorCount++;
    resultMessage.textContent =
      "錯誤，請再試一次。目前錯誤次數：" + errorCount;
    resultMessage.style.color = "red";
  }
}
