# 🎷 Bebop Network

**Bebop Network** é uma rede social completa para músicos — conectando artistas, facilitando shows, batalhas musicais, lives e um marketplace para instrumentos, vinis e partituras.

---

## ✨ Funcionalidades

- **Feed Musical** — Posts, curtidas, comentários, compartilhamentos com suporte a conteúdo monetizado
- **Perfis de Músicos** — Foto, bio, instrumentos, ranking, nível, repertório
- **Músicos** — Busca e filtros por instrumento, gênero e localização
- **Shows & Eventos (Gigs)** — Criação de shows, ranking de casas de show, mapa de eventos
- **Marketplace** — Equipamentos, vinis e partituras à venda
- **Batalhas Musicais** — Desafios de interpretação com votação da comunidade
- **Lives** — Agendamento e transmissões ao vivo
- **Destaques** — Músico da Semana, Músico do Mês, Banda do Mês
- **Autenticação** — Login, registro e sessão persistida

---

## 🚀 Como Rodar

```bash
npm install
npm run dev
```

Acesse **http://localhost:5173**

> Contas de demonstração: `carlos_jazz` / `ana_blues` (senha: `123456`)

---

## 📁 Estrutura de Pastas

```
src/
├── App.jsx                 # Componente raiz
├── router.jsx              # Configuração de rotas (lazy loading)
├── main.jsx                # Entry point
├── styles/
│   └── global.css          # Estilos globais + variáveis CSS
├── context/
│   ├── AuthContext.jsx     # Autenticação
│   └── AppContext.jsx      # Tema e notificações
├── hooks/
│   ├── useAuth.js
│   ├── useFeed.js
│   └── useLocalStorage.js
├── services/
│   └── localStorage/       # CRUD completo por entidade
│       ├── users.js
│       ├── posts.js
│       ├── gigs.js
│       ├── marketplace.js
│       ├── battles.js
│       ├── lives.js
│       └── index.js        # seedAll()
├── utils/
│   ├── formatters.js       # formatDate, formatNumber, formatPrice, etc.
│   └── validators.js
├── components/common/
│   ├── Button/
│   ├── Card/
│   ├── Modal/
│   ├── Input/
│   ├── Avatar/
│   ├── Badge/
│   ├── Navbar/
│   ├── Sidebar/
│   ├── PostCard/
│   ├── MusicianCard/
│   ├── GigCard/
│   └── ProductCard/
└── pages/
    ├── Home/
    ├── Profile/
    ├── Musicians/
    ├── Gigs/
    ├── Marketplace/
    ├── Battle/
    ├── Live/
    ├── Settings/
    ├── Login/
    └── Register/
```

---

## 🛠️ Tecnologias

| Tecnologia | Versão | Uso |
|---|---|---|
| React | 18.2 | UI |
| Vite | 5.1 | Build & Dev Server |
| React Router DOM | 6.22 | Roteamento SPA |
| LocalStorage | — | Banco de dados temporário |
| CSS Modules / Inline Styles | — | Estilização |

---

## 📊 Modelos de Dados

### Usuário
```js
{ id, username, name, email, bio, instruments[], profilePicture, coverPicture, ranking, level, followers, following, songs[], location, genre[], createdAt }
```

### Post
```js
{ id, userId, content, mediaUrl, mediaType, likes, shares, comments[], monetized, tags[], createdAt }
```

### Show (Gig)
```js
{ id, title, venueId, venueName, date, time, musicians[], genre[], description, price, createdBy, createdAt }
```

### Item de Marketplace
```js
{ id, type, title, description, price, condition, imageUrl, seller, sellerId, location, createdAt }
```

### Batalha
```js
{ id, challengerId, challengerName, challengerSong, challengedId, challengedName, challengedSong, votesChallenger, votesChallenged, status, createdAt, endsAt }
```

### Live
```js
{ id, title, hostId, hostName, description, scheduledFor, isLive, viewers, genre[], createdAt }
```

---

## 🗺️ Roadmap

- [ ] Upload de áudio/vídeo nativo
- [ ] Sistema de mensagens diretas
- [ ] Integração com streaming (Spotify, SoundCloud)
- [ ] Mapa interativo de shows (Leaflet/Google Maps)
- [ ] Notificações em tempo real (WebSockets)
- [ ] Backend real (Node.js + PostgreSQL)
- [ ] Monetização via Pix / Stripe
- [ ] App mobile (React Native)
Rede social para músicos - Conectando talentos, gigs e oportunidades
