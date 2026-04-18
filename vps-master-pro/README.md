# VPS Master Pro 🚀

Dashboard monitoring VPS modern dengan tampilan gelap, real-time metrics, SSH terminal simulator, dan sistem notifikasi.

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Jalankan development server
npm run dev

# 3. Buka http://localhost:3000
```

## 📦 Deploy ke Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Atau connect repo GitHub ke [vercel.com](https://vercel.com) dan deploy otomatis.

## 📦 Deploy ke Netlify

```bash
# Build dulu
npm run build

# Drag-drop folder `dist/` ke netlify.com/drop
```

## 🗂 Struktur Project

```
vps-master-pro/
├── src/
│   ├── App.jsx                    # Root component
│   ├── main.jsx                   # Entry point
│   ├── index.css                  # Global styles & animations
│   ├── components/
│   │   ├── ui.jsx                 # Shared UI primitives
│   │   ├── Sidebar.jsx            # Navigation sidebar
│   │   ├── ServerCard.jsx         # VPS list item
│   │   ├── DetailPanel.jsx        # Server detail panel
│   │   ├── AddModal.jsx           # Add server modal
│   │   ├── Terminal.jsx           # SSH terminal simulator
│   │   ├── NotifPanel.jsx         # Notifications slide panel
│   │   ├── Toast.jsx              # Toast notifications
│   │   └── views/
│   │       ├── Dashboard.jsx      # Dashboard page
│   │       ├── Infrastructure.jsx # Infrastructure grid
│   │       └── SecuritySettings.jsx # Security & Settings
│   ├── store/
│   │   └── useStore.js            # State management + localStorage
│   └── utils/
│       └── helpers.js             # Helpers, constants, IP checker
├── index.html
├── vite.config.js
└── package.json
```

## ✨ Fitur

| Fitur | Status |
|-------|--------|
| Dashboard real-time | ✅ |
| Multi-server management | ✅ |
| Status check (Online/Offline) | ✅ |
| Geo-location via ip-api.com | ✅ |
| CPU / RAM / Disk monitoring | ✅ |
| Sparkline history chart | ✅ |
| SSH Terminal Simulator | ✅ |
| Notifikasi live alerts | ✅ |
| Infrastructure grid view | ✅ |
| Security audit view | ✅ |
| Settings & Export JSON | ✅ |
| Data persisten (localStorage) | ✅ |
| Auto-refresh setiap 6 detik | ✅ |

## 🔌 Status Check Nyata

Untuk public IP, aplikasi menggunakan **ip-api.com** untuk memvalidasi IP dan mendapatkan info geo-location.

Untuk **private IP** (10.x, 192.168.x, 172.16-31.x), server dianggap online karena tidak bisa dicek dari browser (keterbatasan CORS).

### Upgrade ke real ping (butuh backend):

Untuk ping sungguhan, tambahkan Vercel serverless function:

```js
// api/ping.js
export default async function handler(req, res) {
  const { ip } = req.query
  // Gunakan `ping` npm package di Node.js
  const result = await ping.promise.probe(ip)
  res.json({ alive: result.alive, time: result.time })
}
```

## 📱 Responsive

Dioptimalkan untuk desktop. Mobile support partial.

## 🛠 Tech Stack

- **React 18** + Vite
- **lucide-react** icons  
- **recharts** (tersedia untuk grafik lanjutan)
- **ip-api.com** untuk geo-check IP publik
- **localStorage** untuk persistensi data
