# 🐺 API of Thrones - O Reino em suas mãos

Um projeto desenvolvido para explorar o consumo de APIs REST, transformando dados brutos em uma experiência visual imersiva e responsiva inspirada no universo de **Game of Thrones**.

🔗 **Acesse o Reino aqui:** [https://nicollas-agsouza.github.io/API-of-Thrones/](https://nicollas-agsouza.github.io/API-of-Thrones/)

---

## 📖 Sobre o Projeto

Este projeto nasceu de uma **atividade acadêmica** com o objetivo de dominar a manipulação de dados externos e a criação de interfaces modernas. 

A escolha do tema foi pessoal: como comecei a assistir à série recentemente e fiquei fascinado pela lore e ambientação de Westeros, decidi unir o aprendizado técnico a algo que realmente me motiva. O resultado é um site que utiliza uma estética medieval, paleta de cores característica (Preto, Cinza e Dourado) e tipografia clássica.

## 🚀 Tecnologias e Conceitos Utilizados

* **HTML5 & CSS3:** Estrutura e estilização avançada com foco em ambientação medieval.
* **JavaScript (ES6+):** Consumo de API assíncrona utilizando `fetch` e `async/await`.
* **PWA (Progressive Web App):** Implementação de `manifest.json` e `Service Workers` para permitir a instalação do site como um aplicativo e funcionamento offline.
* **Mobile-First:** Design totalmente responsivo, priorizando a experiência em dispositivos móveis e tablets.
* **Google Fonts:** Uso das fontes *Cinzel*, *MedievalSharp* e *Lora* para reforçar a identidade visual.

## 🛠️ Estrutura do Site

O site foi desenhado para ser simples e direto, focando na performance e na facilidade de uso:

1.  **Header:** Contém a identidade visual com o ícone de lobo (Casa Stark).
2.  **Display de Personagem:** Uma área central que renderiza um card dinâmico com a foto, nome, título e família do personagem sorteado.
3.  **Botão de Ação:** Um gatilho estilizado que realiza uma nova chamada à API e atualiza o DOM sem recarregar a página.

## 🛠️ Recursos de Hardware Implementados

Para tornar a experiência mais "viva" e interativa, o projeto utiliza sensores nativos do aparelho:

* **Haptic Feedback (Vibração):** Ao invocar um novo personagem, o dispositivo emite um padrão de vibração simulando o impacto de uma espada, dando um retorno tátil à ação.
* **Acelerômetro (Sacudir para Invocar):** Implementação da `Device Motion API`. O usuário pode simplesmente sacudir o celular para sortear um novo personagem, eliminando a necessidade de cliques e tornando a interação mais orgânica.

## 📡 API Utilizada

O projeto consome dados da **ThronesAPI**, uma API pública que fornece informações detalhadas sobre os personagens da saga.

* **Endpoint:** `https://thronesapi.com/api/v2/Characters`

## 📱 Como Instalar (PWA)

Como este é um **Progressive Web App**, você pode instalá-lo no seu dispositivo:

* **No Android/Chrome:** Clique nos três pontos no canto superior e selecione "Instalar aplicativo".
* **No iOS/Safari:** Clique no botão de compartilhar e selecione "Adicionar à Tela de Início".
* **No Desktop:** Clique no ícone de "+" na barra de endereços do navegador.

---

Desenvolvido com ⚔️ e 🩸 por [Nicollas Aguiar](https://github.com/nicollas-agsouza).
