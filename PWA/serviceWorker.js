const CACHE_NAME = "got-api-v1";
// Lista de arquivos que devem ser salvos para funcionar offline
const ASSETS = [
  "../", // Volta para a raiz
  "../index.html",
  "../style.css",
  "../script.js",
  "./manifest.json", // Está na mesma pasta
  "./icons/wolf_192x192.png" // Pasta minúscula
];

// Instalação: Salva os arquivos no cache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Caching assets...");
      return cache.addAll(ASSETS);
    })
  );
});

// Ativação: Limpa caches antigos se você atualizar o site
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// Estratégia de Busca: Tenta o cache primeiro, se não tiver, vai na rede
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});