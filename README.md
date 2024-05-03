# Code Playground

This is a web application that provides a versatile environment for writing, editing, and executing code snippets. It offers multiple resizable windows, including a code editor, a terminal emulator, and a preview window for rendering Markdown content.

## Features

- **Code Editor**: Utilizes Monaco Editor for writing and editing code. Supports multiple files, syntax highlighting, and Markdown syntax.
- **Terminal Emulator**: Provides a terminal-like interface powered by Xterm.js, allowing users to execute commands and interact with a simulated terminal environment.
- **Resizable Windows**: All windows within the application are resizable, providing flexibility in layout and user customization.
- **Markdown Preview**: Renders Markdown content in real-time using the react-markdown library, allowing users to preview formatted text and Markdown syntax.
- **File Management**: Allows users to create, edit, and save multiple files, with support for persisting files across sessions using Google Cloud Storage.
- **Execution Environment**: Connects to a Next.js server deployed on Google Cloud Platform to execute code snippets and commands, enabling users to run their code in a simulated environment.

## Technologies Used

- **Frontend**:

  - React.js: A JavaScript library for building user interfaces.
  - Next.js: A React framework for server-side rendering and API routes.
  - TypeScript: A statically typed superset of JavaScript.
  - Monaco Editor: A versatile code editor component.
  - Xterm.js: A terminal emulator for the web.
  - React Markdown: A Markdown renderer for React.
  - Re-resizable: A resizable component for React.

- **Backend**:
  - Next.js: A React framework for server-side rendering and API routes.
  - Google Cloud Platform (GCP): Utilized for storing and reading files using Google Cloud Storage.

## Getting Started

First, clone the repository:

```bash
git clone <repository-url>

Navigate to the project directory:

cd code-playground


Install dependencies:
npm install


Run the development server:
npm run dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
```
