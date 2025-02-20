//animação botao
const texts = ["Fale Conosco", "Inicie seu Projeto", "Saiba Mais", "Entre em Contato", "Peça um Orçamento"];
const typingElement = document.getElementById("typing");
let textIndex = 0;

function typeText(text, callback) {
  let charIndex = 0;
  const interval = setInterval(() => {
    typingElement.textContent = text.slice(0, charIndex++);
    if (charIndex > text.length) {
      clearInterval(interval);
      setTimeout(callback, 5000); // Espera 5 segundos antes do próximo
    }
  }, 100);
}

function startTyping() {
  if (textIndex < texts.length) {
    typeText(texts[textIndex], () => {
      textIndex++;
      startTyping();
    });
  } else {
    typingElement.style.borderRight = "none"; // Remove o cursor após finalizar
  }
}

startTyping();