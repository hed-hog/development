# <p align="center">hedhog/person</p>

<p align="center">
  <img src="https://avatars.githubusercontent.com/u/177489127?s=200&v=4" alt="Hedhog Avatar" />
</p>

**Hedhog Person** is a comprehensive module for managing person-related data, supporting physical, legal, and international entities. It handles associated documents, contacts, addresses, and custom attributes, designed to integrate seamlessly into Hedhog-based projects, providing a CRUD (Create, Read, Update, Delete) foundation for managing persons.

## Features

- **Multiple Person Types**: Supports different person types such as physical, legal, and international entities.
- **Document Management**: Handles multiple document types (e.g., CPF, CNPJ, passport) for each person.
- **Contact Information**: Stores and manages contact details, including phone numbers and email addresses.
- **Address Handling**: Tracks multiple address types (e.g., residential, commercial) for each person.
- **Custom Attributes**: Allows the addition of custom attributes to extend the person entity.

## Installation

This library is an integral part of the Hedhog framework and should be installed as a dependency in your Hedhog project.

```bash
npm i @hedhog/person
```

## Folder Structure

```plaintext
person/
├── dist/                        # Compiled JavaScript files from build
├── node_modules/                # Discardable folder with all module dependencies
├── src/
│   ├── index.ts                  # Entry point for person files
│   ├── person.module.ts          # Module definition for person functionalities
│   └── person.service.ts         # Service class for person logic
├── .gitignore                    # Specifies which files Git should ignore
├── package.json                  # Manages dependencies and scripts for the library
├── package-lock.json             # Lock file for dependencies
├── README.md                     # Documentation for the library
├── tsconfig.lib.json             # TypeScript configuration for library builds
├── tsconfig.production.json      # TypeScript configuration for production builds
```
