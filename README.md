# ImaGen Frontend Server

ImaGen allows you to create AI-generated images using text prompts, leveraging OpenAI Dall-E model. The frontend is built with Vue 3.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Getting Started

### Installation

Clone the project

```bash
git clone https://github.com/davidng1299/imagen-fe.git
cd imagen-fe
```

Install packages

```bash
pnpm install
```

### Compile and Hot-Reload for Development

```bash
pnpm run dev
```

### Type-Check, Compile and Minify for Production

```bash
pnpm run build
```

## Configuration

This project uses .env file to load environment variables. You will need to set up your own Auth0 API and store the API keys in a .env file.

## Contact

If you have any question or would like to contribute to this project, please feel free to contact me at davidng2312@gmail.com.
