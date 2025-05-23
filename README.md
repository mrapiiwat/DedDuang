# 🔮 DedDuang

**DedDuang** – แอปดูดวงแห่งยุค ที่ไม่ใช่แค่การทำนาย แต่เป็นเพื่อนคู่ใจสายมู ช่วยเสริมดวงและความมั่นใจ ให้คุณพร้อมทุกการตัดสินใจ

---

## 📌 Project Overview

DedDuang คือแพลตฟอร์มดูดวงแนวใหม่ ประกอบด้วย:

- 🧠 ระบบ AI สำหรับทำนายและให้คำแนะนำ (เชื่อมต่อ OpenAI)
- 🔮 ดูดวงแบบไพ่ยิปซี ดวงวันเกิด ปีนักษัตร ฮวงจุ้ย ฯลฯ
- 📱 แอปมือถือ React Native (Expo)
- 🖥️ ระบบแอดมิน (Admin Dashboard) สำหรับจัดการข่าว บทความ และเนื้อหา
- 🌐 REST API ด้วย Node.js + Express
- 🛢️ PostgreSQL สำหรับจัดเก็บข้อมูล

---

## 🧩 โฟลเดอร์หลักในโปรเจกต์

```
dedduang/
├── admin/           # ระบบแอดมิน (Vite + React + TypeScript + Tailwind)
├── backend/         # API Server (Node.js + Express + Prisma + Docker)
├── frontend/        # แอปมือถือ (React Native + Expo)
└── docker-compose.yml
```

---

## 🛠️ Tech Stack

### 🔹 Frontend (Mobile)

- React Native with Expo
- TypeScript
- Tailwind CSS via NativeWind
- Zustand (state management)
- React Navigation

### 🔹 Backend

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- Docker (docker-compose)

### 🔹 Admin Panel

- Vite + React
- TypeScript
- Tailwind CSS
- Zustand

---

## ⚙️ การติดตั้งและใช้งาน

### 🔧 Prerequisites

- Node.js (v18+)
- npm หรือ yarn
- Expo CLI (`npm install -g expo-cli`)
- Docker และ docker-compose

### 🔁 วิธีรันโปรเจกต์

1. Clone โปรเจกต์:

```bash
git clone https://github.com/mrapiiwat/dedduang.git
cd dedduang
```

2. สร้าง Database และ Prisma:

```bash
docker-compose up -d

cd backend
npx prisma migrate dev
```

3. ติดตั้ง Dependency:

```bash
# Backend
cd backend
npm install

# Admin
cd admin
npm install

# Frontend
cd frontend
npm install
```

4. รันแต่ละส่วน:

```bash
# Backend
cd backend
npm run dev

# Admin (localhost:5173)
cd admin
npm run dev

# Mobile App (เปิดบน Expo Go)
cd frontend
npm start
```

---

## 📁 โครงสร้างสำคัญของแต่ละส่วน

### ✅ `frontend/`

```
app/              # โฟลเดอร์หลักตาม Expo Router
├── (screen)/     # หน้าแอป เช่น Home, Result, Profile
├── (tabs)/       # Bottom Tabs Navigation
├── components/       # UI Component เช่น FortuneCard, TarotItem
assets/           # รูปภาพและเสียง
store/            # Zustand Store
utils/            # ฟังก์ชันช่วยเหลือ
```

### ✅ `admin/src/`

```
api/              # ฟังก์ชันเรียก API
assets/           # รูปภาพ โลโก้
components/       # UI Component
pages/            # หน้า Admin เช่น NewsPage, CategoryPage
routes/           # Routing (React Router v6)
store/            # Zustand Store
utils/            # ฟังก์ชันทั่วไป
```

---

## ✨ ฟีเจอร์หลัก

- ไพ่ยิปซีแบบสุ่ม + คำทำนายเฉพาะตัว
- ปีนักษัตร/ปีชง พร้อมเปอร์เซ็นต์ความเคราะห์ร้าย
- ระบบแอดมินจัดการข่าวและบทความ
- ระบบแชทกับ AI หมอดู
- ใช้งานง่าย รองรับมือถือทุกขนาด

---

## 📦 Common Commands

```bash
# Prisma
npx prisma studio         # เปิด UI database
npx prisma migrate dev    # สร้าง/อัปเดต schema

# Frontend
npx expo start            # เปิดแอป Expo

# Admin
npm run dev               # เปิดแอดมินบน localhost:5173
```

---

## 👤 ทีมพัฒนา

- **mrapiiwat**

  - Email: [mrapiiwat@gmail.com](mailto:mrapiiwat@gmail.com)
  - GitHub: [@mrapiiwat](https://github.com/mrapiiwat)

- **Bhumipax**
  - Email: [Pockky15827@gmail.com](mailto:Pockky15827@gmail.com)
  - GitHub: [@Bhumipax](https://github.com/Bhumipax)

---

> Made with 💫 โดยทีม DedDuang เพื่อสายมูทุกคน
