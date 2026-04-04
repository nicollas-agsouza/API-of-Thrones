// 1. Registro do Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./PWA/serviceWorker.js") 
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

// Teste forçado de vibração
document.getElementById("btnPersonagem").addEventListener("click", () => {
    console.log("Tentando vibrar...");
    if ("vibrate" in navigator) {
        const deuCerto = navigator.vibrate(500);
        if (deuCerto) {
            console.log("O comando de vibração foi enviado com sucesso!");
        } else {
            console.log("O navegador recusou o comando de vibração.");
        }
    } else {
        alert("Seu navegador ou dispositivo NÃO suporta a API de vibração.");
    }
});

async function ativarSensores() {
    // Verifica se o navegador exige permissão (comum no iOS)
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
        try {
            const permissionState = await DeviceMotionEvent.requestPermission();
            if (permissionState === 'granted') {
                window.addEventListener('devicemotion', detectarSacudida);
                alert("Sensores de Westeros ativados!");
            }
        } catch (error) {
            console.error("Erro ao pedir permissão:", error);
        }
    } else {
        // Para Android e navegadores que não exigem o prompt de permissão
        window.addEventListener('devicemotion', detectarSacudida);
        console.log("Sensores ativados automaticamente.");
    }
}

// Criamos uma função separada para a lógica do movimento
function detectarSacudida(event) {
    let acceleration = event.accelerationIncludingGravity;
    if (!acceleration) return;

    let deltaX = Math.abs(lastX - acceleration.x);
    let deltaY = Math.abs(lastY - acceleration.y);
    let deltaZ = Math.abs(lastZ - acceleration.z);

    // Se o movimento total for maior que o limite
    if (deltaX + deltaY + deltaZ > threshold) {
        carregarPersonagemAleatorio();
    }

    lastX = acceleration.x;
    lastY = acceleration.y;
    lastZ = acceleration.z;
}

// Chame a função ativarSensores() dentro do evento de clique do seu botão principal
document.getElementById("btnPersonagem").addEventListener("click", () => {
    ativarSensores(); // Ativa os sensores no primeiro clique
    carregarPersonagemAleatorio();
});