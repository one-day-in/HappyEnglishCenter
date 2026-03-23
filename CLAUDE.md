# HappyEnglishCenter — Project Memory

## Проект
Веб-платформа для приватного центру вивчення англійської мови **HappyEnglishCenter** (В'єтнам, провінція Дак Лак).
Складається з публічного лендінгу та особистого кабінету (3 ролі: студент / вчитель / адмін).

- **GitHub:** `git@github.com:one-day-in/HappyEnglishCenter.git`
- **GitHub Pages:** `https://one-day-in.github.io/HappyEnglishCenter/`
- **Dev:** `npm run dev` → `http://localhost:3000`
- **Build:** `NEXT_PUBLIC_BASE_PATH=/HappyEnglishCenter npm run build`

---

## Мови проекту
Проект підтримує **лише дві мови** — більше додавати не потрібно:
- 🇻🇳 **VN** — в'єтнамська (мова за замовчуванням, завантажується першою)
- 🇬🇧 **EN** — англійська

Перемикач `VI | EN` знаходиться у navbar лендінгу. Вибір зберігається у `localStorage`.
Файли перекладів: `src/lib/i18n/translations.ts` (об'єкти `en` і `vi`).
Context: `src/lib/i18n/LanguageContext.tsx` — хук `useLanguage()` → `{ t, lang, setLang }`.
Всі компоненти лендінгу — `'use client'` і використовують `useLanguage()`.

---

## Технічний стек
- **Next.js 16** App Router + `output: 'export'` (повністю статичний сайт)
- **Tailwind CSS v4** + PostCSS
- **Shadcn/ui** компоненти (Button, Card, Badge, Dialog, Sheet, Input, Label, etc.)
- **Lucide React** іконки
- **TypeScript** — суворий режим
- **Inter** шрифт (підмножини `latin` + `vietnamese`)

---

## Бренд і дизайн
- **Primary** (бордо): `#6B3A3A` / `oklch(0.36 0.07 22)`
- **Accent** (червоний): `#E11D2E`
- **Фон** (warm off-white): `#FDFAF9` / `oklch(0.987 0.006 22)`
- **Радіус:** `0.75rem` (12px) за замовчуванням
- **Letterспейсинг заголовків:** `-0.02em`

### Правила стилів
- Картки: `rounded-2xl border border-border/60 shadow-sm bg-white`
- Активна навігація: `bg-primary/10 text-primary font-semibold`
- Hover кнопки: `hover:-translate-y-0.5 hover:shadow-md transition-all duration-200`
- Accent bar на картках: `w-1 flex-shrink-0` кольорова смужка зліва
- Секції лендінгу: напівпрозорий фон `rgba(253,250,249,0.72)` (для parallax bleed-through)
- Badge стиль: `bg-primary/10 text-primary border-primary/20`

---

## Деплой (GitHub Actions)
Файл: `.github/workflows/deploy.yml`
- Builds з `NEXT_PUBLIC_BASE_PATH=/HappyEnglishCenter`
- Деплоїть папку `./out` (НЕ `./out/HappyEnglishCenter`)
- **Важливо:** Next.js вставляє basePath у URL-посилання (`/HappyEnglishCenter/_next/...`), але самі файли лежать в `out/_next/...` без prefixу в назві папки. GitHub Pages сервує `out/` як корінь `/HappyEnglishCenter/`.

---

## Зображення
Всі картинки оптимізовані у **WebP** і лежать у `public/images/`:

| Файл               | Де використовується              |
|--------------------|----------------------------------|
| `background.webp`  | Parallax фон лендінгу            |
| `rating.webp`      | Hero секція (фото учня)          |
| `book-trial.webp`  | CTA секція                       |
| `pre-k.webp`       | Картка курсу Pre-K               |
| `teens.webp`       | Картка курсу Teens               |
| `adults.webp`      | Картка курсу Adults              |
| `everything.webp`  | Фон секції Features              |
| `faq.webp`         | Декоративний елемент FAQ         |
| `getintouch.webp`  | Фон секції Contact               |
| `logo.svg`         | Логотип (header + footer)        |

Оригінали зберігаються у `public/source/`.
Шлях у коді: `${BP}/images/назва.webp` де `BP = process.env.NEXT_PUBLIC_BASE_PATH ?? ''` (з `src/lib/asset.ts`).
Завжди використовувати `<img>` тег, НЕ Next.js `<Image>` (static export не підтримує оптимізацію).

---

## Аутентифікація (mock)
Реальної БД немає — все на mock даних. Сесія у `sessionStorage` (ключ `hec_session`).

| Логін     | Пароль | Роль      |
|-----------|--------|-----------|
| `student` | `1234` | `student` |
| `teacher` | `1234` | `teacher` |
| `admin`   | `1234` | `admin`   |

Файл: `src/lib/auth.ts` — функції `login()`, `logout()`, `getSession()`.
При logout → редирект на головну (`/`).

---

## Кабінет — структура по ролях

### 🎓 Student
- `/dashboard` — головна: статистика (групи, домашні, уроків цього тижня)
- `/schedule` — **тільки уроки своєї групи** на поточному тижні (не весь розклад) + вкладка **Homework**
  - Вкладка Homework: список завдань з бейджами Done / Overdue / Pending
  - Перегляд лише (без редагування)

### 👩‍🏫 Teacher
- `/schedule` — повний розклад усіх груп з редагуванням (додати / змінити / видалити урок)
- `/materials` — матеріали для уроків

### 🔑 Admin
- `/admin` — огляд: глобальна статистика по всіх гілках + 4 картки гілок
- `/admin/branches/[slug]` — workspace гілки з sidebar навігацією:
  - **Розклад** — тижнева сітка + day sheet з CRUD уроків
  - **Домашні** — список завдань з CRUD
  - **Персонал** — список вчителів гілки

---

## 4 Гілки центру (Branches)

| Slug              | Назва          | Адреса                           | Колір     |
|-------------------|----------------|----------------------------------|-----------|
| `buon-ho`         | Buôn Hồ        | 390 Hùng Vương, P. Buôn Hồ      | `#6B3A3A` |
| `ea-leo`          | Ea Leo         | 787 Giải Phóng, Xã Ea Đrăng     | `#1D6FA4` |
| `krong-nang`      | Krông Năng     | 190 Hùng Vương, Xã Krông Năng   | `#059669` |
| `buon-ma-thuot`   | Buôn Ma Thuột  | Ecocity, P. Tân An               | `#7C3AED` |

Дані гілок: `src/lib/mock-data.ts` → `BRANCHES` array + `branchMockData` record.
Кожна гілка має: `teachers[]`, `students[]`, `groups[]`, `schedule[]`, `homework[]`.

### Назви класів (людські)
- Мовою В'єтнаму: Thiếu nhi (діти), Thiếu niên (підлітки), Mầm non (малюки), Người lớn (дорослі)
- Приклади: "Thiếu nhi A1", "Mầm non Nhóm 1", "KET Thiếu nhi", "PET Thiếu niên", "Người lớn A2"
- НЕ використовувати машинні коди типу "G1BK1K11", "F1A2K10K11"

---

## Контакти центру
- **Email:** `happyenglishcenter82@gmail.com`
- **CN1:** 787 Giải Phóng, Xã Ea Đrăng (= Ea Leo)
- **CN2:** 390 Hùng Vương, P. Buôn Hồ (= Buôn Hồ)
- **CN3:** 190 Hùng Vương, Xã Krông Năng (= Krông Năng)
- **CN4:** Căn ML8-ML9 Ecocity, P. Tân An (= Buôn Ma Thuột)

---

## Лендінг — секції
1. **NavBar** — sticky, logo, nav links, VI/EN switcher, Log In + Book Free Trial
2. **HeroSection** — двоколонний layout, hero фото, floating badges, stats strip
3. **StatsSection** — 4 метрики (3000+ студентів, 10+ років, 60+ вчителів, 4 гілки)
4. **FeaturesSection** — 6 карток платформи, фон `everything.webp`
5. **ProcessSection** — 3 кроки "як почати"
6. **CoursesSection** — 3 курси (Pre-K/Kids, Teens, Adults) з фото
7. **TestimonialsSection** — 3 відгуки в'єтнамських батьків
8. **FaqSection** — 5 питань, `<details>/<summary>`, декоративне фото справа
9. **CtaSection** — фон `book-trial.webp`, dark overlay, CTA кнопки
10. **ContactSection** — форма + 4 адреси гілок, фон `getintouch.webp`
11. **Footer** — dark `#120A0A`, 4 колонки

### Parallax фон
- Файл: `src/components/landing/ParallaxBackground.tsx`
- `position: fixed`, `background.webp`, opacity 0.55 → 0 за перші 700px скролу
- Використовує `visualViewport` для iOS Safari сумісності (toolbar show/hide)
- Лікує overscroll: `overscroll-behavior: none` в `globals.css`

---

## Ключові файли
```
src/
  app/
    page.tsx                          # Лендінг
    layout.tsx                        # Root layout (LanguageProvider, PageLoader, SmoothScrollPatch)
    globals.css                       # CSS змінні, animations, scroll-behavior
    (auth)/login/page.tsx             # Сторінка логіну
    (dashboard)/
      layout.tsx                      # Dashboard layout (Sidebar + TopBar)
      dashboard/page.tsx              # Дашборд студента
      schedule/page.tsx               # Розклад (role-aware: student / teacher view)
      homework/page.tsx               # Список домашніх (teacher)
      homework/[id]/page.tsx          # Деталь домашнього (server wrapper)
      homework/[id]/HomeworkDetailClient.tsx  # Client компонент деталі
      homework/create/page.tsx        # Створення домашнього
      materials/page.tsx              # Матеріали (teacher)
      admin/
        page.tsx                      # Огляд адміна + 4 гілки
        branches/[slug]/
          page.tsx                    # Server wrapper (generateStaticParams)
          BranchClient.tsx            # Client workspace гілки (Schedule/Homework/Staff tabs)
  components/
    landing/
      NavBar.tsx                      # Sticky nav з VI/EN switcher
      HeroSection.tsx
      StatsSection.tsx
      FeaturesSection.tsx             # Фон everything.webp
      ProcessSection.tsx
      CoursesSection.tsx
      TestimonialsSection.tsx         # В'єтнамські відгуки
      FaqSection.tsx
      CtaSection.tsx                  # Фон book-trial.webp
      ContactSection.tsx              # Фон getintouch.webp
      Footer.tsx                      # Dark footer
      ParallaxBackground.tsx          # Fixed parallax + scroll fade
    layout/
      Sidebar.tsx                     # Branch-aware sidebar для admin
      TopBar.tsx                      # Верхня панель кабінету
    PageLoader.tsx                    # Анімований лоадер (логотип + spinner)
    SmoothScrollPatch.tsx             # Патч: anchor посилання завжди скролять
  lib/
    mock-data.ts                      # Усі mock дані: branches, schedule, homework, students, teachers
    auth.ts                           # login() / logout() / getSession()
    asset.ts                          # export const BP = basePath prefix
    i18n/
      translations.ts                 # export const en = {...}, export const vi = {...}
      LanguageContext.tsx             # LanguageProvider + useLanguage() hook
  types/
    index.ts                          # TypeScript типи: Profile, Group, ScheduleSlot, Homework, etc.
```

---

## Важливо для розробки

### Static Export обмеження
- `generateStaticParams` **не може** бути у `'use client'` компоненті → завжди server wrapper + client child
- `useSearchParams` потребує `<Suspense>` → використовувати `window.location.search` напряму
- `next/image` не оптимізує при static export → завжди `<img>` тег
- Middleware не підтримується при static export (ігнорується в dev)

### URL та шляхи
- `basePath` = `/HappyEnglishCenter` в production, `''` в dev
- Завжди використовувати `${BP}/images/...` для зображень
- Внутрішні посилання через Next.js `<Link href="/path">` (без BP — Next.js додає сам)

### Компоненти
- Якщо компонент використовує хуки (useState, useEffect, useLanguage) → обов'язково `'use client'`
- Лендінг компоненти — всі client (через i18n хук)
- Кабінет — більшість client (через інтерактивність)
