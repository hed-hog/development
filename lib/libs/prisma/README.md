# <p align="center">hedhog/prisman</p>

<p align="center">
  <img src="https://avatars.githubusercontent.com/u/177489127?s=200&v=4" alt="Hedhog Avatar" />
</p>

**Hedhog Prisma** is a HedHog module that extends [**Prisma**](https://prisma.io/) Client to integrate seamlessly with HedHog projects. It provides an enhanced PrismaClient with additional methods for identifying the database provider and checking the type of database in use.

## Purpose

The Hedhog Prisma module is designed to simplify interactions with Prisma by adding convenience methods and ensuring proper database connection management within HedHog projects. It enhances the Prisma Client with functionality specific to HedHog’s requirements, including database provider detection and connection handling.

## Features

- **Database Connection Management**: Automatically connects to the database when the module is initialized.
- **Provider Detection**: Provides methods to detect the type of database provider being used (e.g., [**PostgreSQL**](https://www.postgresql.org/) or [**MySQL**](https://www.mysql.com/)).

## Installation

This library is an integral part of the HedHog framework and should be installed as a dependency in your HedHog project. Ensure that the necessary dependencies are configured in your HedHog project.

```bash
npm i @hedhog/prisma
```

## Methods

**onModuleInit()**: Automatically connects to the database when the module initializes.
**getProvider()**: Returns the active database provider (e.g., 'postgresql', 'mysql').
**isPostgres()**: Returns true if the active database provider is PostgreSQL.
**isMysql()**: Returns true if the active database provider is MySQL.

## Folder Structure

```plaintext
prisma/
├── dist/                        # Compiled JavaScript files from build
├── node_modules/                # Discardable folder with all module dependencies
├── src/
│   ├── index.ts                  # Entry point for PrismaService
│   ├── prisma.module.ts          # Module definition (if needed)
│   └── prisma.service.ts         # Service class extending PrismaClient
│   ├── prisma.service.spec.ts    # Unit tests for PrismaService
├── .gitignore                    # Specifies which files Git should ignore
├── package.json                  # Manages dependencies and scripts for the library
├── package-lock.json             # Lock file for dependencies
├── README.md                     # Documentation for the library
├── tsconfig.lib.json             # TypeScript configuration for library builds
├── tsconfig.production.json      # TypeScript configuration for production builds
```
