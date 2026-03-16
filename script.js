 async function carregarPersonagemAleatorio() {
            const container = document.getElementById('personagens');
            container.innerHTML = 'Carregando...';

            try {
                const response = await fetch("https://thronesapi.com/api/v2/Characters");
                const personagens = await response.json();

                // Escolhe um índice aleatório
                const indiceAleatorio = Math.floor(Math.random() * personagens.length);
                const personagem = personagens[indiceAleatorio];

                // Monta o card
                container.innerHTML = `
                    <div class="card">
                        <img src="${personagem.imageUrl}" alt="${personagem.fullName}">
                        <h2>${personagem.fullName}</h2>
                        <p><strong>Título:</strong> ${personagem.title || "Desconhecido"}</p>
                        <p><strong>Família:</strong> ${personagem.family || "Desconhecida"}</p>
                    </div>
                `;
            } catch (erro) {
                console.error(erro);
                container.innerHTML = "Erro ao carregar personagem.";
            }
        }

        // Evento de clique no botão
        document.getElementById('btnPersonagem').addEventListener('click', carregarPersonagemAleatorio);
