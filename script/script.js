let history = [];

function evaluateStrength(password) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const bar = document.getElementById("strengthBar");
  switch (score) {
    case 0:
    case 1:
      bar.style.background = "red";
      break;
    case 2:
    case 3:
      bar.style.background = "orange";
      break;
    case 4:
      bar.style.background = "yellow";
      break;
    case 5:
      bar.style.background = "green";
      break;
  }
}

function generatePassword() {
  const length = document.getElementById("length").value;
  const useUpper = document.getElementById("uppercase").checked;
  const useLower = document.getElementById("lowercase").checked;
  const useNumbers = document.getElementById("numbers").checked;
  const useSymbols = document.getElementById("symbols").checked;

  let chars = "";
  if (useUpper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (useLower) chars += "abcdefghijklmnopqrstuvwxyz";
  if (useNumbers) chars += "0123456789";
  if (useSymbols) chars += "!@#$%^&*()_+";

  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  document.getElementById("password").value = password;
  evaluateStrength(password);

  // Atualiza histórico
  history.unshift(password);
  if (history.length > 5) history.pop();
  updateHistory();
} // Gera a senha e exibe no campo de texto

function updateHistory() {
  const list = document.getElementById("historyList");
  list.innerHTML = "";
  history.forEach((pwd, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${pwd}</span>
      <button onclick="copyFromHistory(${index})"><i class="fas fa-copy"></i></button>
    `;
    list.appendChild(li);
  });
}

function copyFromHistory(index) {
  navigator.clipboard.writeText(history[index]);
}

function copyPassword() {
  const passwordField = document.getElementById("password");
  passwordField.select();
  document.execCommand("copy");
}

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  const isDark = document.body.classList.contains("dark-mode");
  themeToggle.innerHTML = isDark
    ? '<i class="fas fa-sun"></i> Tema Claro'
    : '<i class="fas fa-moon"></i> Tema Escuro';
});
