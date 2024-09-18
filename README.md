# <p align="center">hedhog</p>

<p align="center">
  <img src="https://avatars.githubusercontent.com/u/177489127?s=200&v=4" alt="Hedhog Avatar" />
</p>

**HedHog** is a framework designed to simplify the development of administrative interfaces by providing a robust backend and a customizable frontend for building headless APIs. The framework facilitates the creation of full-featured admin panels with Role-Based Access Control (RBAC), customizable modules, and seamless integrations, making it an ideal tool for developers who need both backend and admin solutions in one package.

## Purpose

The **HedHog Framework** helps developers quickly set up a structured and maintainable system for managing administrative interfaces and APIs. It is ideal for projects that require a headless CMS, a backend API, and an admin interface, all in one environment. With HedHog, you can:

- Build scalable and modular backend APIs using [**NestJS**](https://nestjs.com/).
- Create custom administrative panels using a React-based frontend.
- Manage and configure API modules with ease.
- Implement RBAC permissions to control access.

## Folder Structure

The HedHog project is organized into several folders to facilitate easy development and maintenance. Below is the detailed structure:

```plaintext
hedhog/
├── backend/              # Where the backend application resides
│   ├── src/              # Backend source code
│   ├── lib/              # Shared libraries for backend services
│   ├── .eslintrc.js      # ESLint configuration for backend code
│   ├── .prettierrc       # Prettier configuration for backend code
│   ├── nest-cli.json     # NestJS CLI configuration for the backend
│   ├── package.json      # Dependencies and scripts for the backend
│   ├── tsconfig.build.json # TypeScript build configuration for backend
│   └── tsconfig.json     # TypeScript configuration for the backend
├── admin/                # Where the user's administration interface resides
│   ├── .storybook/       # Storybook configuration for stories
│   ├── node_modules/     # Discardable folder with all admin dependencies
│   ├── public/           # Public assets and static files
│   ├── src/              # Source code for the admin interface
│   │   ├── components/  # Reusable React components
│   │   ├── enums/       # Enumeration types
│   │   ├── features/    # Feature-specific logic and components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── lib/         # Utility functions and libraries
│   │   ├── pages/       # Page components
│   │   ├── stories/     # Storybook stories
│   │   └── types/       # TypeScript type definitions
│   ├── index.css         # Global CSS styles
│   ├── main.tsx          # Main entry point for the React application
│   ├── router.tsx        # Application routing configuration
│   ├── .eslintrc.cjs     # ESLint configuration for admin code
│   ├── .gitignore        # File specifying which files Git should ignore
│   ├── .prettierignore   # Files and directories ignored by Prettier
│   ├── .prettierrc       # Prettier configuration for admin code
│   ├── docker-compose.yml # Docker compose file for managing containers
│   ├── Dockerfile        # Dockerfile for building the admin application image
│   ├── index.html        # Main HTML file for the admin application
│   ├── nginx.conf        # Nginx configuration for serving the admin app
│   ├── package-lock.json # Lock file for npm dependencies
│   ├── package.json      # Manages the dependencies and scripts for the admin application
│   ├── postcss.config.js # PostCSS configuration
│   ├── README.md         # Documentation for the admin application
│   ├── tailwind.config.js # Tailwind CSS configuration
│   ├── tsconfig.json     # TypeScript configuration for the admin application
│   ├── tsconfig.node.json # TypeScript configuration for Node.js
│   └── vite.config.ts    # Vite configuration for the admin application
├── lib/                  # Shared code library used by both backend and admin
│   ├── .vscode/          # Editor-specific configurations (VSCode)
│   ├── dist/             # Compiled output of the library
│   ├── node_modules/     # Dependencies for the library
│   ├── src/              # Source code for the shared library
│   ├── libs/             # Additional utility libraries shared across the project
│   ├── .eslintrc.js      # ESLint configuration for the library
│   ├── .gitignore        # Specifies files to ignore for the library
│   ├── .prettierrc       # Prettier configuration for the library
│   ├── nest-cli.json     # NestJS CLI configuration for the library
│   ├── package.json      # Manages the dependencies and scripts for the library
│   ├── package-lock.json # Automatically generated dependency lock file for the library
│   ├── README.md         # Documentation for the shared library
│   ├── tsconfig.build.json # TypeScript build configuration for the library
│   └── tsconfig.json     # TypeScript configuration for the library
├── .gitignore            # Specifies which files Git should ignore
├── package.json          # Manages the dependencies and scripts for the entire project
├── node_modules/         # Discardable folder with all project dependencies
└── README.md             # Documentation for the entire project
├── docker-compose.yml    # Docker compose file for managing containers
```

Here's the updated README with a usage example section included:

markdown
Copiar código

# HedHog Framework

**HedHog** is a framework designed to simplify the development of administrative interfaces by providing a robust backend and a customizable frontend for building headless APIs. The framework facilitates the creation of full-featured admin panels with Role-Based Access Control (RBAC), customizable modules, and seamless integrations, making it an ideal tool for developers who need both backend and admin solutions in one package.

## Purpose

The **HedHog Framework** helps developers quickly set up a structured and maintainable system for managing administrative interfaces and APIs. It is ideal for projects that require a headless CMS, a backend API, and an admin interface, all in one environment. With HedHog, you can:

- Build scalable and modular backend APIs using **NestJS**.
- Create custom administrative panels using a React-based frontend.
- Manage and configure API modules with ease.
- Implement RBAC permissions to control access.

## Folder Structure

The HedHog project is organized into several folders to facilitate easy development and maintenance. Below is the detailed structure:

```plaintext
hedhog/
├── backend/              # Where the backend application resides
│   ├── src/              # Backend source code
│   ├── lib/              # Shared libraries for backend services
│   ├── .eslintrc.js      # ESLint configuration for backend code
│   ├── .prettierrc       # Prettier configuration for backend code
│   ├── nest-cli.json     # NestJS CLI configuration for the backend
│   ├── package.json      # Dependencies and scripts for the backend
│   ├── tsconfig.build.json # TypeScript build configuration for backend
│   └── tsconfig.json     # TypeScript configuration for the backend
├── admin/                # Where the admin interface application resides
├── lib/                  # Shared code library used by both backend and admin
│   ├── .vscode/          # Editor-specific configurations (VSCode)
│   ├── dist/             # Compiled output of the library
│   ├── libs/             # Additional utility libraries shared across the project
│   ├── node_modules/     # Dependencies for the library
│   ├── src/              # Source code for the shared library
│   ├── test/             # Tests for the shared library
│   ├── .eslintrc.js      # ESLint configuration for the library
│   ├── .gitignore        # Specifies files to ignore for the library
│   ├── .prettierrc       # Prettier configuration for the library
│   ├── nest-cli.json     # NestJS CLI configuration for the library
│   ├── package.json      # Manages the dependencies and scripts for the library
│   ├── package-lock.json # Automatically generated dependency lock file for the library
│   ├── README.md         # Documentation for the shared library
│   ├── tsconfig.build.json # TypeScript build configuration for the library
│   └── tsconfig.json     # TypeScript configuration for the library
├── .gitignore            # Specifies which files Git should ignore
├── package.json          # Manages the dependencies and scripts for the entire project
├── node_modules/         # Discardable folder with all project dependencies
└── README.md             # Documentation for the entire project
```

## Key Features

- **Backend**: Powered by [**NestJS**](https://nestjs.com/), providing a scalable and modular API system.
- **Admin Interface**: A modern [**React**](https://react.dev/)-based admin panel that can be customized according to project needs.
- **Shared Library**: The lib/ folder contains shared code, configurations, and utilities used by both the backend and admin interfaces.
- **RBAC**: Role-Based Access Control for defining permissions and controlling access to different parts of the admin panel.
- **Modular Architecture**: Easily add and remove modules as needed to extend functionality.

## Installation & Usage

To start using HedHog in your project, follow these steps:

**Step 1: Pre-installation**
Before running the project, execute the pre-installation step:

```bash
npm run preinstall
```

**Step 2: Install Dependencies**
Next, install the necessary dependencies for both the backend and admin:

```bash
npm install
```

**Step 3: Run the Development Servers**
Start the development servers for both the backend and admin:

```bash
npm run dev
```

**Result**
Once the above commands are executed, both the backend and the admin interface will be up and running:

Backend API: Available at http://localhost:3000
Admin Panel: Available at http://localhost:3100

For more detailed instructions on how to set up and use the HedHog Framework, refer to the documentation in the [**docs/**](https://github.com/hed-hog/docs) directory or consult the HedHog CLI's commands to generate new modules and configure your project.
