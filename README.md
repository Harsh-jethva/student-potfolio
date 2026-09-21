# Student Portfolio & Task Management Application

A full-stack portfolio and task management web application built with **React 19**, **Vite 8**, **Node.js**, **Express**, and **MongoDB**, featuring JWT Authentication, RESTful APIs, and **Practical 8 Performance Optimization & Lazy Loading**.

---

## 🚀 Practical 8: Performance Optimization & Lazy Loading

### 1. Code Splitting & Dynamic Imports
The application implements route-based code splitting using `React.lazy()` and dynamic `import()` to break down a monolithic JavaScript bundle into modular, on-demand chunks.
* **Core Bundle**: Contains framework runtime and initial Home view.
* **Lazy Routes**:
  * `/projects` — `Projects.jsx` (loaded on demand)
  * `/contact` — `Contact.jsx` (loaded on demand)
  * `/tasks` — `Tasks.jsx` (protected, loaded on demand)
  * `/login` & `/register` — Auth modules (loaded on demand)
* **Heavy Component Splitting**: `chart.js` (~204 kB) in `TaskAnalyticsChart.jsx` is only fetched when the user clicks **"📊 View Task Analytics"**.

### 2. Meaningful Fallback & Delayed Fallback UI
* Wrapped `<Routes>` in `<Suspense fallback={<DelayedFallback delay={300} />} />`.
* Prevents brief UI flickering on fast network connections using a **300ms threshold timer**.
* Displays an accessible, animated loading spinner when network latency exceeds 300ms.

### 3. Profiling & Unnecessary Re-render Elimination
* Utilized the React Profiler to detect unnecessary re-renders in presentational components.
* Wrapped `<Footer />` in `React.memo` to skip re-renders when parent states (`darkMode`, `user`) change.

---

## 📊 Before vs. After Performance Comparison

| Metric / Asset | Before Optimization (Single Bundle) | After Optimization (Code Splitting) | Impact / Savings |
| :--- | :--- | :--- | :--- |
| **Main Core JS** | `index.js` (247.80 kB) | `index.js` (240.76 kB) | **-7.04 kB** core reduction |
| **Projects Route** | Bundled in main | `Projects.js` (1.87 kB) | Loaded only on `/projects` |
| **Contact Route** | Bundled in main | `Contact.js` (2.28 kB) | Loaded only on `/contact` |
| **Tasks Route** | Bundled in main | `Tasks.js` (4.68 kB) | Loaded only on `/tasks` |
| **Login Route** | Bundled in main | `Login.js` (1.30 kB) | Loaded only on `/login` |
| **Register Route** | Bundled in main | `Register.js` (1.51 kB) | Loaded only on `/register` |
| **Chart.js Dependency** | Bundled upfront | `TaskAnalyticsChart.js` (203.79 kB) | **203.79 kB saved upfront** |
| **Total Chunks** | 1 monolithic JS bundle | 7 separate JS chunks | Modular distribution |

---

## 📸 Screenshots & Evidence

Screenshots are available in `docs/screenshots/`:
* `baseline_home.png` — Baseline single bundle state.
* `optimized_home.png` — Optimized homepage with core bundle only.
* `lazy_loaded_projects.png` — `/projects` route with dynamic `Projects.js` chunk.
* `lazy_loaded_contact.png` — `/contact` route with dynamic `Contact.js` chunk.
* `lazy_loaded_chart.png` — Interactive `TaskAnalyticsChart` with dynamic `chart.js` chunk.

---

## 🛠️ Setup & Running

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run in Development Mode**:
   ```bash
   npm run dev
   ```

3. **Build Optimized Production Bundle**:
   ```bash
   npm run build
   ```

4. **Preview Production Build**:
   ```bash
   npm run preview
   ```

---

## 👨‍💻 Student Information
* **Name**: Harsh Jethva
* **Course**: B.Tech Information Technology (Sem 5)
* **Subject**: Advanced Web Development Frameworks (ITUE301)
* **Institution**: Charotar University of Science and Technology (CHARUSAT)
