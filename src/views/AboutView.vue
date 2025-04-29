<script setup lang="ts"></script>

<template>
  <div class="w-full max-w-[1080px] py-6 text-muted-color">
    <h1 className="text-3xl font-bold mb-4 text-color-secondary">About This Project</h1>
    <p className="text-lg mb-6">
      ImaGen is an AI-powered image generator that allows users to create stunning visuals by simply
      typing a prompt. Powered by the DALL·E model. It uses a modern tech stack for fast performance
      and scalability.
    </p>
    <h2 className="text-2xl font-semibold mb-4 text-color-secondary">Tech Stack</h2>

    <h3 className="text-xl font-semibold my-4 text-color-secondary">Frontend (Vue.js)</h3>
    <p>&#8226; Vue Typescript v3 UI Framework</p>
    <p>&#8226; Tailwind CSS</p>
    <p>&#8226; PrimeVue - UI Component Library</p>
    <p>&#8226; Zod - Schema Validation Library</p>
    <p>&#8226; Vite Configurations</p>

    <h3 className="text-xl font-semibold my-4 text-color-secondary">Backend (.NET)</h3>
    <p>&#8226; .NET 9.0 - ASP.NET Core</p>
    <p>
      &#8226; Entity Framework - following code-first development and create migration files to
      update database
    </p>
    <p>&#8226; Restful APIs</p>
    <p>&#8226; API Integration - OpenAI & AWS</p>
    <p>&#8226; Docker - Containerisation</p>
    <p>&#8226; PostgreSQL Database</p>

    <h3 className="text-xl font-semibold my-4 text-color-secondary">API Integration</h3>
    <p>
      &#8226; OpenAI API - creating images using <code>DALL·E·2</code> or
      <code>DALL·E·3</code> model
    </p>
    <p>&#8226; Auth0 Authentication</p>
    <p>&#8226; AWS - S3 bucket for storing and fetching images</p>

    <h3 className="text-xl font-semibold my-4 text-color-secondary">CI/CD</h3>
    <p>&#8226; Github Actions - pre-deployment workflows</p>

    <h3 className="text-xl font-semibold my-4 text-color-secondary">Github</h3>
    <p>
      &#8226; Frontend:
      <a href="https://github.com/davidng1299/imagen-fe" target="_blank"
        >https://github.com/davidng1299/imagen-fe</a
      >
    </p>
    <p>
      &#8226; Backend:
      <a href="https://github.com/davidng1299/ImaGen-BE" target="_blank"
        >https://github.com/davidng1299/ImaGen-BE</a
      >
    </p>

    <h3 className="text-lg font-semibold my-4 text-color-secondary">
      Developed and designed by David Nguyen.
    </h3>
  </div>
</template>
<style scoped></style>
