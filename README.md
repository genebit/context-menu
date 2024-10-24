### Setup

---

Install dependencies:

```bash
npm install
```

### Development

---

Run the development server:

```bash
npm start
```

This will:

-   Watch for Tailwind CSS changes in `src/style.css`
-   Watch and bundle JavaScript from `src/script.js`
-   Start a live server with hot reload
-   Open your browser at `http://localhost:8080`

### Project Structure

---

```bash
├── src/
│   ├── style.css
│   └── script.js
├── dist/
│   ├── script.js
│   ├── script.min.js
│   ├── style.css
│   └── style.min.css
├── index.html
├── tailwind.config.js
└── package.json
```

### Modifying Styles

---

-   Tailwind classes use the `tw-` prefix
-   Add/modify Tailwind configurations in `tailwind.config.js`
-   Custom styles should be added to `src/style.css`

### Building for Production

---

Build the minified production assets:

```bash
npm run build
```

This creates:

-   `dist/script.min.js` (minified JavaScript bundle)
-   `dist/style.min.css` (minified CSS)

### Available Scripts

---

-   `npm start` - Start development server with hot reload
-   `npm run dev` - Run live server only
-   `npm run watch` - Watch for CSS changes
-   `npm run watch:js` - Watch for JavaScript changes
-   `npm run build` - Build production assets
-   `npm run build:js` - Build JavaScript only
-   `npm run build:css` - Build CSS only
-   `npm run build:min` - Minify CSS
