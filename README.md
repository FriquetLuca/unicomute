# Unicomute

![Build Status](https://github.com/FriquetLuca/unicomute/actions/workflows/build.yml/badge.svg)
![Deploy Status](https://github.com/FriquetLuca/unicomute/actions/workflows/deploy.yml/badge.svg)

**Unicomute** is a high-performance, browser-native data transformation tool designed for developers, security researchers, and systems architects. It bridges the gap between human-readable text and the raw binary structures that power the web.

## 🚀 Live Demo

Check out the live site here: [https://FriquetLuca.github.io/unicomute/](https://FriquetLuca.github.io/unicomute/)

## ✨ Features

- **Multi-Directional Encoding:** Seamlessly convert between over 12 formats including UTF-8, UTF-16, Base64, Hex, Binary, and more.
- **Smart Sanitization:** Paste raw C-arrays, memory dumps, or underscored binary literals (`0b1010_1010`) directly into the source. Unicomute auto-cleans your input.
- **JWT Inspector:** Instantly decode and prettify JSON Web Token payloads.
- **Web-Ready Logic:** Built-in support for URL Percent-encoding, HTML Entities, and SEO-friendly Slugs.
- **Zero-Dependency Engine:** Uses native browser APIs (`TextEncoder`, `atob`, `JSON.parse`) for maximum speed and security.
- **Bilingual Interface:** Full support for English and French.

## 🛠 Supported Formats

| Category      | Formats                                                               |
| :------------ | :-------------------------------------------------------------------- |
| **Text**      | UTF-8, UTF-16 (Wide), String Literals, Escape Sequences, Slug         |
| **Web / API** | Base64, Base64URL (JWT Safe), URL Encoded, HTML Entities, JWT Payload |
| **Low Level** | Hex (`0xHH`), Binary (`0b_`), Decimal (Integer Array)                 |

## 🚀 Getting Started

1. **Select Source:** Choose the format of your input data.
2. **Paste Data:** Paste your code snippet, token, or text. Our **Smart Sanitizer** handles prefixes like `0x`, `\x`, or `0b` automatically.
3. **Select Target:** Choose your desired output format.
4. **Copy:** Use the integrated copy button to grab your transformed data.

## 💻 Tech Stack

- **Framework:** React + TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Hooks (`useMemo`, `useState`)
- **Encoding Engine:** Native Web APIs (no external bloat)

## 🌍 Localization

Unicomute supports **English** and **Français**. The language choice is reflected in the UI labels, format groupings, and error messaging.

---

_Built for developers who care about the bytes._
