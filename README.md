# Portfolio Teater Kertas

Portfolio interaktif: tirai teater terbuka, tangan kayu marionette 3D, dan empat label bulat yang tergantung pada benang ke empat jalur karier (Business Analyst, Quality Assurance, Software Engineer, Data Science / ML Engineer). Seluruh teks ada di dalam bubble berujung bulat, dan halamannya beranimasi saat di-scroll.

**Teknologi:** React 19, Vite, TypeScript, SVG + CSS, GSAP (+ ScrollTrigger), React Router, **three.js** (tangan kayu 3D), `simple-icons` (logo tech stack).

---

## 1. Cara menjalankan

Prasyarat: **Node.js 20.19+ atau 22+** dan npm. Tidak perlu venv (itu untuk Python); dependensi otomatis terpasang di folder `node_modules/` proyek.

```bash
npm install          # sekali saja
npm run dev          # http://localhost:5173
npm run lint
npm run build        # type-check + build produksi ke dist/
npm run preview      # http://localhost:4173
```

Perubahan di `src/data/` langsung terlihat di `npm run dev`. Intro tirai hanya diputar sekali per sesi browser; lihat lagi lewat tombol **Replay intro** di footer atau jendela privat.

---

## 2. Penjelasan fitur

### Intro panggung (halaman Home)
- Tirai tertutup + bubble undangan ("An introduction to my work", tombol **Open my portfolio**, tombol **Skip intro**).
- Urutan buka (~1,8 detik, satu timeline GSAP): tirai menggulung ke sisi, pemandangan kertas berlapis muncul, tangan diturunkan dari balik valance, empat benang tergambar dari cincin di pangkal jari, lalu tiap label muncul di ujung benangnya.
- **Tangan marionette 3D:** model `rigged_wooden_puppet_hand.glb` dirender dengan three.js, menghadap ke bawah dengan empat jari menggantung (seperti foto referensi). Benang **melingkar di pangkal setiap jari** (cincin 3D sungguhan yang ikut menekuk bersama jarinya), lalu jatuh ke label. Jari bergerak naik-turun (ruas jari ditekuk lewat rig tulangnya), dan **label serta benangnya ikut bergerak mengikuti ujung jari yang sebenarnya**. Saat label di-hover atau difokus, jarinya terangkat, label naik, dan benang mengencang. Tangan juga sedikit menoleh mengikuti mouse.
- Label mengikuti gerak ujung jari yang sebenarnya, sementara benang tetap melingkar di pangkal jari.
- **Fallback:** jika WebGL tidak tersedia atau model gagal dimuat, otomatis tampil tangan kertas SVG dengan perilaku yang sama.
- Animasi pembukaan menunggu model selesai dimuat (maksimal 6 detik) agar tirai tidak terbuka ke panggung kosong.
- Klik label: animasi singkat lalu pindah ke halaman role. Ctrl/Cmd+klik membuka tab baru.
- Panah bouncing **"View all my work"** di bawah panggung menggulung ke bagian Work.
- Kapsul nama di kiri atas panggung. Parallax tipis mengikuti mouse. Animasi berhenti saat panggung di luar layar.
- Tidak diputar ulang saat berpindah halaman (`sessionStorage`).

### Home
1. **Bubble perkenalan** + tautan cepat ke empat role.
2. **Work:** untuk tiap role ada pil nama role, lalu baris **horizontal** kartu proyek berilustrasi (gaya kartu referensi: panel pastel, nomor, judul, ringkasan). Bisa di-drag, di-scroll, atau pakai tombol panah bulat.
3. **Background:** timeline **zig-zag di tengah**. Garis tengah terisi saat di-scroll, kartu bergantian kiri-kanan, tiap kartu punya ilustrasi dan tombol panah **More details** ke halaman terkait.
4. **Contact:** bubble gelap berisi pil tautan.

### Halaman role (`/role/...`)
- Hero: judul, ringkasan, chip fokus, ilustrasi, tombol **View CV** (buka di tab baru) + tombol bulat **Download**. Dipilih "view dulu, download kedua" karena HR umumnya melihat pratinjau PDF lebih dulu.
- Panah **More details** (bouncing) menggulung ke detail.
- **Tech stack** sebagai logo gambar (ikon brand dari `simple-icons`, dengan animasi pop saat muncul dan goyang saat hover).
- **Portfolio:** kartu proyek horizontal.
- **Khusus QA:** kartu **QA portfolio** dengan tombol View dan Download.
- Tautan ke tiga role lain.

### Studi kasus (`/projects/<id>`)
10 bagian (overview sampai tautan), masing-masing dalam bubble: teks, daftar, diagram proses, tabel, grafik hasil, arsitektur berlapis. Bagian kosong tampil sebagai kotak "coming soon". Langkah yang direncanakan (mis. OCR) digambar putus-putus agar tidak terbaca sebagai fitur jadi.

### Gerak dan aksesibilitas
- Reveal saat scroll, hover kartu terangkat, ilustrasi bergerak halus, transisi halaman.
- `prefers-reduced-motion`: adegan langsung terbuka, tanpa animasi ayun, parallax, atau reveal.
- Semantik HTML, tautan "Skip to content", fokus terlihat, label tidak bisa difokus sebelum tirai terbuka, menu mobile dengan `aria-expanded`.
- Layout mobile (≤ 700px): tangan turun dari atas, label zig-zag vertikal, tanpa scroll horizontal.

---

## 3. Yang perlu Anda isi / ubah, dan di file mana

### A. Wajib diisi sebelum dipublikasikan

| Yang diisi | File | Cara |
| --- | --- | --- |
| **CV (PDF)** | `src/data/profile.ts` → `documents.cv.url` | Taruh file di `public/cv.pdf`, isi `url: '/cv.pdf'`. Selama kosong, tombol tampil "CV coming soon" dan tombol header menjadi "Contact" |
| **QA portfolio (PDF)** | `src/data/profile.ts` → `documents.qaPortfolio.url` | Taruh di `public/qa-portfolio.pdf`, isi `url: '/qa-portfolio.pdf'` |
| **LinkedIn, Email** | `src/data/profile.ts` → `links` | `https://www.linkedin.com/in/...` dan `mailto:alamat@email.com` |
| **Judul tab & deskripsi SEO** | `index.html` | `<title>` dan `<meta name="description">` |
| **Link repo / laporan / demo** | `src/data/projects.ts` → `links` tiap proyek | URL kosong tampil "soon". Pastikan repo publik dan boleh dibagikan |
| **Verifikasi angka Dice/IoU** | `src/data/blocks.ts` → `mscMetrics` | Cocokkan dengan laporan TA final |

### B. Konten

| Yang diubah | File |
| --- | --- |
| Nama, headline, perkenalan | `src/data/profile.ts` (`name`, `headline`, `intro`) |
| **Background zig-zag:** judul, tempat, periode, deskripsi, ilustrasi (`art`), tujuan tombol panah (`to`) | `src/data/profile.ts` → `background` |
| **Teks label di panggung** (judul, 1 baris, teks hover), warna, headline/intro role, chip fokus | `src/data/roles.ts` |
| **Tech stack per role** | `src/data/roles.ts` → `stack` (daftar id). Logo baru: tambahkan di `src/components/TechIcon.tsx` (impor ikon dari `simple-icons`, daftarkan id-nya) |
| Proyek: judul, ringkasan, status, konteks, periode, tag, ilustrasi (`art`), 10 bagian studi kasus, link | `src/data/projects.ts` |
| Diagram, tabel, metrik yang dipakai ulang | `src/data/blocks.ts` |
| Proyek mana yang jadi unggulan tiap role | `src/data/roles.ts` → `featuredProjectIds` |

Proyek yang masih **draft** (isi lalu ubah `contentStatus` ke `'verified'` dan `status` yang sesuai): `seismic-monitoring-requirements`, `software-testing-team-project`, `api-testing-system-validation`, `bmkg-rest-api`, `credit-risk-prediction`. Untuk `payment-reconciliation-*` dan `msc-segmentation`, lengkapi placeholder (spesifikasi, screenshot, tabel ablation, ukuran dataset, link).

**Menambah proyek:** tambah objek di array `projects` (`projects.ts`, pilih salah satu `art`), lalu masukkan `id`-nya ke `featuredProjectIds` role terkait. Halamannya otomatis ada di `/projects/<id>`.

**Gambar sungguhan:** ilustrasi kartu adalah SVG buatan di `src/components/ProjectArt.tsx` (satu `case` per `art`). Belum ada tipe blok gambar untuk screenshot; saat ini screenshot/dokumen berupa placeholder "coming soon". Untuk menampilkan gambar asli, tambahkan tipe blok `image` di `types.ts` dan `BlockView.tsx`, simpan gambar di `public/`.

### C. Tampilan dan gerak

| Yang diubah | File |
| --- | --- |
| Warna, font, radius sudut, warna tombol (`--sun`), warna navbar (`--nav`) | `src/styles/tokens.css` |
| Bubble, pil, tombol, navbar, footer | `src/styles/base.css` |
| Kartu proyek, zig-zag, hero role, tech stack, blok bukti | `src/styles/pages.css` |
| Posisi label (`--x`, `--y`, kemiringan `--rest`), ukuran dan posisi tangan, tirai, kapsul nama, layout mobile | `src/styles/stage.css` |
| **Model tangan 3D** (ganti file ini untuk tangan lain) | `public/models/puppet-hand.glb` |
| Sudut kamera, ukuran/posisi tangan di kanvas, seberapa jauh jari menekuk (`SEGMENT_GAIN`), ukuran dan posisi cincin benang di pangkal jari (`LOOP_RADIUS`, `LOOP_ALONG`), warna benang (`THREAD_COLOR`), pencahayaan | `src/components/PuppetHand3D.tsx` |
| Ukuran dan posisi tangan di panggung (`.hand-anchor`) | `src/styles/stage.css` |
| Tangan kertas cadangan (dipakai tanpa WebGL) | `src/components/illustrations/PaperHand.tsx` |
| Pemandangan (matahari, awan, bukit, pohon) | `src/components/illustrations/Scenery.tsx` |
| Ilustrasi kartu dan animasinya | `src/components/ProjectArt.tsx` + keyframe `a-*` di `pages.css` |
| Durasi animasi buka, amplitudo ayun jari, kekuatan parallax | `src/components/PortfolioIntro.tsx` |
| Animasi reveal saat scroll | `src/hooks/useScrollReveal.ts` (atribut `data-reveal` dan `data-delay` di JSX) |
| Intro diputar di setiap kunjungan | `src/hooks/useIntroSeen.ts` |

Jika jumlah label diubah dari empat, sesuaikan jumlah jari di `PaperHand.tsx`, posisi `nth-child` di `stage.css`, dan `TIP_RANK_*` di `PortfolioIntro.tsx`.

---

## 4. Struktur folder

```
src/
  components/
    PortfolioIntro.tsx   panggung, timeline GSAP, gerak marionette
    PuppetHand3D, handController (API tangan 3D / SVG)
    CareerTag, ThreadString, threadMath, CurtainStage
    ProjectCard, ProjectArt, HScroller, BackgroundTimeline
    TechIcon, DocActions, ContactLinks, ScrollCue
    SiteNavigation, Footer, StatusBadge, ScrollManager
    illustrations/       PaperHand, Scenery, PaperDefs
    blocks/BlockView     penampil blok konten
  pages/                 HomePage, RolePage, ProjectPage, NotFound
  data/                  profile, roles, projects, blocks, types
  hooks/                 useMediaQuery, useIntroSeen, useScrollReveal
  styles/                tokens, base, stage, pages
public/                  favicon.svg, models/puppet-hand.glb (taruh cv.pdf dan qa-portfolio.pdf di sini)
```

---

## 5. Model 3D tangan

- File: `public/models/puppet-hand.glb` (±0,7 MB). Dimuat lazy hanya di halaman Home, jadi halaman lain tidak ikut memuat three.js.
- Model asli (6,35 MB, tekstur 4096px) sudah dikecilkan: tekstur diturunkan ke 1024px dan dikonversi ke WebP. Untuk mengulang atau memakai model lain:
  ```bash
  npx gltf-transform resize in.glb tmp.glb --width 1024 --height 1024
  npx gltf-transform webp tmp.glb public/models/puppet-hand.glb --quality 85
  ```
- Model pengganti harus punya tulang bernama `Index1_*`, `Index2_*`, `Index3_*` (dan `Middle`, `Ring`, `Pinky`), atau sesuaikan pencarian tulang di `PuppetHand3D.tsx`.
- Kualitas render turun otomatis jika frame rate rendah (perangkat lemah tanpa GPU).
- **Lisensi:** pastikan lisensi model dari Sketchfab ("Rigged wooden puppet hand") mengizinkan pemakaian ini, dan cantumkan kredit pembuatnya jika lisensinya mewajibkan.

---

## 6. Deploy

`npm run build` menghasilkan `dist/`. Karena memakai `BrowserRouter`, hosting harus mengarahkan semua path ke `index.html`:
- **Netlify:** `public/_redirects` berisi `/* /index.html 200`
- **Vercel:** `vercel.json` dengan rewrite `/(.*)` → `/index.html`
- **GitHub Pages / sub-path:** atur `base` di `vite.config.ts`; pertimbangkan `HashRouter` di `src/main.tsx`.

## 7. Pemecahan masalah

- **Tirai tidak muncul lagi:** klik "Replay intro" di footer atau pakai jendela privat.
- **Tidak ada animasi:** cek pengaturan "Reduce motion" di sistem Anda; mode itu sengaja statis.
- **Tombol CV menampilkan "coming soon":** isi `documents.cv.url` di `profile.ts`.
- **Tangan 3D lama muncul / terlihat kasar:** terjadi di perangkat tanpa akselerasi GPU; resolusi turun otomatis. Di perangkat biasa model dimuat dalam hitungan detik.
- **Tampil tangan kertas, bukan kayu:** WebGL dinonaktifkan di browser, atau file `puppet-hand.glb` tidak ditemukan.
- **`npm install` gagal:** periksa `node -v`.

---

## 8. Files to add

| File | Where | Shown as |
| --- | --- | --- |
| CV (PDF) | `public/cv.pdf` | Download CV and Preview in every role header, View CV in the navbar |
| QA portfolio (PDF) | `public/qa-portfolio.pdf` | Next to the CV buttons in the Quality Assurance header |
| Thesis paper (PDF) | `public/docs/msc-thesis.pdf`, then add a link in `src/data/projects.ts` (`msc-segmentation`) | Button in the project header |

Project links and downloads sit in each project header: edit the `links` array of the project in `src/data/projects.ts`. A link with `download: true` downloads a file from `public/`; other links open in a new tab. Links with an empty `url` are not shown.
