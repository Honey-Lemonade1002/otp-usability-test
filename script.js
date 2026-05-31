let currentOTP = "";
let currentMode = "";
let currentQuestion = 0;
const totalQuestions = 10;

let startTime = null;
let totalTime = 0;
let errorCount = 0;
let testCount = 0;

function generateOTP() {
  let otp = "";

  for (let i = 0; i < 6; i++) {
    otp += Math.floor(Math.random() * 10);
  }

  return otp;
}

function formatOTP(otp, mode) {
  if (mode === "A") {
    return otp;
  }

  if (mode === "B") {
    return otp.slice(0, 3) + " " + otp.slice(3, 6);
  }

  if (mode === "C") {
    return otp.slice(0, 2) + " " + otp.slice(2, 4) + " " + otp.slice(4, 6);
  }

  return otp;
}

function showOTP(mode) {
  if (mode === "random") {
    const modes = ["A", "B", "C"];
    mode = modes[Math.floor(Math.random() * modes.length)];
  }

  currentMode = mode;
  currentQuestion = 1;
  totalTime = 0;
  errorCount = 0;

  startNewQuestion();
}

function startNewQuestion() {
  currentOTP = generateOTP();
  startTime = performance.now();

  document.getElementById("otp-display").textContent = formatOTP(currentOTP, currentMode);
  document.getElementById("user-input").value = "";

  document.getElementById("result-message").textContent =
    "第 " + currentQuestion + " / " + totalQuestions + " 題，請輸入驗證碼。";

  document.getElementById("result-message").style.color = "#333";

  document.getElementById("user-input").focus();
}

function checkAnswer() {
  const userInput = document.getElementById("user-input").value.trim();
  const resultMessage = document.getElementById("result-message");

  if (currentMode === "") {
    resultMessage.textContent = "請先選擇一種模式。";
    resultMessage.style.color = "red";
    return;
  }

  if (userInput === currentOTP) {
    const endTime = performance.now();
    const timeUsed = (endTime - startTime) / 1000;

    totalTime += timeUsed;

    if (currentQuestion < totalQuestions) {
      currentQuestion++;
      startNewQuestion();
    } else {
      showFinalResult();
    }
  } else {
    errorCount++;

    resultMessage.textContent =
      "錯誤，請再試一次。目前錯誤次數：" + errorCount;

    resultMessage.style.color = "red";
  }
}

function showFinalResult() {
  const averageTime = (totalTime / totalQuestions).toFixed(2);

  document.getElementById("otp-display").textContent = "測試完成";
  document.getElementById("user-input").value = "";

  document.getElementById("result-message").innerHTML =
    "模式 " + currentMode + " 測試完成！<br>" +
    "總題數：" + totalQuestions + " 題<br>" +
    "平均完成時間：" + averageTime + " 秒<br>" +
    "總錯誤次數：" + errorCount + " 次";

  document.getElementById("result-message").style.color = "green";

  addHistoryRow(currentMode, averageTime, errorCount);

  currentMode = "";
}

function addHistoryRow(mode, averageTime, errors) {
  testCount++;

  const emptyRow = document.getElementById("empty-row");

  if (emptyRow) {
    emptyRow.remove();
  }

  const historyBody = document.getElementById("history-body");
  const newRow = document.createElement("tr");

  newRow.innerHTML =
    "<td>" + testCount + "</td>" +
    "<td>模式 " + mode + "</td>" +
    "<td>" + averageTime + " 秒</td>" +
    "<td>" + errors + " 次</td>";

  historyBody.appendChild(newRow);
}

document.getElementById("user-input").addEventListener("input", function () {
  this.value = this.value.replace(/\D/g, "");
});

document.getElementById("user-input").addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    checkAnswer();
  }
});
