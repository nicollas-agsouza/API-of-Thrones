// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", () => {
//     navigator.serviceWorker
//       .register("/sw.js")
//       .then((reg) => console.log("Service Worker registered.", reg))
//       .catch((err) => console.error("Service Worker failed:", err));
//   });
// }

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./PWA/serviceWorker.js") // Use o nome EXATO do seu arquivo
      .then((reg) => console.log("Service Worker registrado!", reg))
      .catch((err) => console.error("Falha no Service Worker:", err));
  });
}

async function carregarPersonagemAleatorio() {
  const container = document.getElementById("personagens");
  container.innerHTML = "Carregando...";

  try {
    const response = await fetch("https://thronesapi.com/api/v2/Characters");
    const personagens = await response.json();

    // Escolhe um índice aleatório
    const indiceAleatorio = Math.floor(Math.random() * personagens.length);
    const personagem = personagens[indiceAleatorio];

    // Dentro do try, após definir 'personagem':
    container.innerHTML = `
    <div class="card" style="animation: fadeIn 0.8s ease-in-out;">
        <img src="${personagem.imageUrl}" alt="${personagem.fullName}">
        <h2 style="font-family: 'Cinzel', serif;">${personagem.fullName}</h2>
        <p style="margin-top: 10px; font-style: italic; color: #ccc;">
            <strong>Casa:</strong> ${personagem.family || "Desconhecida"}
        </p>
        <p style="font-size: 0.9rem; margin-top: 5px; color: var(--gold-lannister);">
            ${personagem.title}
        </p>
    </div>
`;
  } catch (erro) {
    console.error(erro);
    container.innerHTML = "Erro ao carregar personagem.";
  }

  // Evento de clique no botão
document
  .getElementById("btnPersonagem")
  .addEventListener("click", carregarPersonagemAleatorio);

  let threshold = 15; // Sensibilidade do balanço
let lastX, lastY, lastZ;

window.addEventListener('devicemotion', (event) => {
    let acceleration = event.accelerationIncludingGravity;
    let deltaX = Math.abs(lastX - acceleration.x);
    let deltaY = Math.abs(lastY - acceleration.y);
    let deltaZ = Math.abs(lastZ - acceleration.z);

    if (deltaX + deltaY + deltaZ > threshold) {
        // O usuário sacudiu o aparelho!
        carregarPersonagemAleatorio();
    }

    lastX = acceleration.x;
    lastY = acceleration.y;
    lastZ = acceleration.z;
});

}

// Padrão de vibração: Batida forte, pausa, batida curta (Simulando um golpe)
if ("vibrate" in navigator) {
    navigator.vibrate([200, 100, 50]); 
}


