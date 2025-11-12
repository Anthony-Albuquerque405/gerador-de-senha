let history = [];

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
