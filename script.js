// 1. Registro do Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./serviceWorker.js") 
      .then((reg) => console.log("Service Worker registrado!", reg))
      .catch((err) => console.error("Falha no Service Worker:", err));
  });
}

// 2. Função Principal
async function carregarPersonagemAleatorio() {
  const container = document.getElementById("personagens");
  container.innerHTML = "Carregando...";

  try {
    const response = await fetch("https://thronesapi.com/api/v2/Characters");
    const personagens = await response.json();

    const indiceAleatorio = Math.floor(Math.random() * personagens.length);
    const personagem = personagens[indiceAleatorio];

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
    </div>`;

    // RECURSO DE HARDWARE: VIBRAÇÃO (Só funciona após interação do usuário)
    if ("vibrate" in navigator) {
      navigator.vibrate([200, 100, 50]); 
    }

  } catch (erro) {
    console.error(erro);
    container.innerHTML = "Erro ao carregar personagem.";
  }
}

// 3. Evento de clique (Fora da função)
document.getElementById("btnPersonagem").addEventListener("click", carregarPersonagemAleatorio);

// 4. RECURSO DE HARDWARE: SACUDIR (Acelerômetro)
let threshold = 15; 
let lastX, lastY, lastZ;

window.addEventListener('devicemotion', (event) => {
    let acceleration = event.accelerationIncludingGravity;
    if (!acceleration) return; // Segurança para navegadores que não suportam

    let deltaX = Math.abs(lastX - acceleration.x);
    let deltaY = Math.abs(lastY - acceleration.y);
    let deltaZ = Math.abs(lastZ - acceleration.z);

    if (deltaX + deltaY + deltaZ > threshold) {
        carregarPersonagemAleatorio();
    }

    lastX = acceleration.x;
    lastY = acceleration.y;
    lastZ = acceleration.z;
});