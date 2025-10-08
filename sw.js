// Código gerado em: 2025-10-08 09:46

const CACHE_NAME = 'guia-ilhabela-cache-v5'; // Versão incrementada para forçar a atualização
const urlsToCache = [
    './index.html',
    './style.css',
    './app.js',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css',
    'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap'
];

// Instala o Service Worker e armazena os assets no cache
self.addEventListener('install', event => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache aberto');
                return cache.addAll(urlsToCache);
            })
    );
});

// Intercepta as requisições e serve os assets do cache quando offline
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Retorna do cache ou faz a requisição à rede se não encontrar
                return response || fetch(event.request);
            })
    );
});

// Limpa caches antigos quando um novo Service Worker é ativado
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});