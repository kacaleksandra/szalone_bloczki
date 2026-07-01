https://github.com/kacaleksandra/szalone_bloczki/assets/49205215/ff016902-f1ad-4705-8fa7-51793eb56d7a

<h1 align="center">🧩 SzaloneBloczki - "Crazy Blocks"</h1>

<p align="center">
  <strong>A mobile playground for learning algorithms by building them, block by block.</strong><br>
  Snap flowchart blocks together, watch them run step-by-step, and export the result to a PDF or ready-to-run Python.
</p>

<p align="center">
  <img alt="React Native" src="https://img.shields.io/badge/React_Native-0.72-61DAFB?logo=react&logoColor=white">
  <img alt="Expo" src="https://img.shields.io/badge/Expo-49-000020?logo=expo&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white">
  <img alt="Zustand" src="https://img.shields.io/badge/State-Zustand-443E38">
  <img alt="Platform" src="https://img.shields.io/badge/Platform-iOS%20%7C%20Android-lightgrey">
</p>

> [!NOTE]
> **This is a university project.** 🎓 It was built by a team of four Computer Science students as a semester assignment - so treat it as a learning artifact, not a polished production app. The codebase is honestly nothing to frame on a wall, but the problem turned out to be genuinely tricky: nested blocks, recursive tree operations, step-by-step algorithm visualization and multi-target export all had to play nicely together. We're leaving it here, warts and all, because the _idea_ is fun and the journey was worth it.

---

## ✨ What it does

**SzaloneBloczki** is an educational mobile app that helps people _see_ how algorithms work. Instead of staring at code, you assemble a program out of visual blocks, hit play, and watch the logic unfold - variables changing, loops looping, conditions branching.

- 🧱 **Build your own flowcharts** by stacking and nesting blocks.
- ▶️ **Visualize algorithms** in **step-by-step** or **continuous** mode, with a live preview of your variables.
- 📄 **Export to PDF** - turn your flowchart into a shareable document.
- 🐍 **Export to Python** - generate runnable code straight from your blocks.
- 💾 **Save & load projects** - pick up where you left off.
- 🔐 **Accounts** - register and log in to keep your projects tied to you.

### 🎯 Who it's for

Students, learners, teachers, and anyone who wants to build intuition for programming, algorithmic thinking, and good old logical reasoning.

---

## 🧱 The blocks

The block "language" is small but expressive enough to write real algorithms (sorting, searching, and friends):

| Block                   | What it does                                                                |
| ----------------------- | --------------------------------------------------------------------------- |
| `wypisz tekst`          | Print a literal text value                                                  |
| `wypisz zmienną`        | Print the value of a variable                                               |
| `przypisz zmienną`      | Assign a value to a variable                                                |
| `jeżeli`                | Conditional (`==`, `!=`, `>`, `<`, `>=`, `<=`) - **can nest blocks inside** |
| `dopóki`                | While loop - **can nest blocks inside**                                     |
| `utwórz tablicę`        | Create an array                                                             |
| `utwórz losową tablicę` | Create a randomly-filled array of a given size                              |
| `przypisz do tablicy`   | Assign a value at an array index                                            |
| `wepchnij do tablicy`   | Push a value onto an array                                                  |
| `usuń z tablicy`        | Remove an element by index                                                  |

Conditionals and loops can contain other blocks, so the program is really a **tree** - moving a block left/right/up/down means walking and rewriting that tree recursively (see `src/screens/EditProject/blocksOperations.ts`, one of the gnarlier corners of the project).

---

## 🏗️ Architecture & tech stack

This repository is the **front-end** (the mobile app). The heavy lifting - turning blocks into Python, generating PDFs, running visualizations - is handled by a separate **back-end** API that the app talks to.

**Front-end (this repo)**

- [React Native](https://reactnative.dev/) + [Expo](https://expo.dev/) - the mobile app
- [TypeScript](https://www.typescriptlang.org/)
- [Zustand](https://github.com/pmndrs/zustand) - lightweight state management (auth token)
- [React Navigation](https://reactnavigation.org/) - screen navigation
- [UI Kitten](https://akveo.github.io/react-native-ui-kitten/) + Eva Design - UI components & icons
- [NativeWind](https://www.nativewind.dev/) (Tailwind for RN) - styling
- [React Hook Form](https://react-hook-form.com/) + [Yup](https://github.com/jquense/yup) - forms & validation
- `react-native-webview` + `react-native-view-shot` - rendering & capturing flowchart visualizations
- [ConvertAPI](https://www.convertapi.com/) - image/PDF conversion

**Back-end (separate service)**

- Java, running in Docker
- [Javalin](https://javalin.io/) web framework + [Ebean](https://ebean.io/) ORM

**Tooling used during development**

- GitHub for version control · Jira for task management · VS Code (front-end) · IntelliJ IDEA (back-end)

### 🗺️ Screen map

```
Home / Register      → authentication (JWT via the API)
MainMenu             → entry hub
MyProjects           → list of saved schematics
NewProject           → project metadata (name, description)
EditProject          → the block editor (add / nest / reorder / delete blocks)
ProjectOptions       → save (create/update), export actions
Blocks               → algorithm visualization + PDF export
ProjectCode          → generated Python code (copy to clipboard)
```

---

## 🚀 Getting started

Make sure you have [Yarn](https://yarnpkg.com/) and the [Expo CLI](https://docs.expo.dev/workflow/expo-cli/) installed.

**1. Install dependencies**

```bash
yarn install
```

**2. Create a `.env` file** in the project root and point it at the back-end API:

```env
BASE_URL=<link_to_api>
```

**3. Run the app**

```bash
yarn expo start
```

Then open it on your phone with [Expo Go](https://expo.dev/client), or run it in an emulator from the Expo dev tools.

---

## 👥 Team

Built by four Computer Science students:

- **Aleksandra Kacprzak**
- **Denis Poczęty**
- **Denis Śmietana**
- **Łukasz Pyszny**

---

<p align="center"><sub>Made as a student project. Educational purposes, curious minds welcome. 🧠</sub></p>
