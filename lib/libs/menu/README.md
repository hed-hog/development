# <p align="center">hedhog/menu</p>

<p align="center">
  <img src="https://avatars.githubusercontent.com/u/177489127?s=200&v=4" alt="Hedhog Avatar" />
</p>

**HedHog Menu** is a library for managing menus within the HedHog framework. It provides a set of RESTful endpoints for CRUD operations on menu items, as well as functionalities to handle pagination and ordering of menus.

## Features

- **CRUD Operations**: Create, Read, Update, and Delete menu items.
- **Pagination**: Paginate menu items for efficient data retrieval.
- **Ordering**: Update the order of menu items.

## Installation

This library is an integral part of the HedHog framework and should be installed as a dependency in your HedHog project. Ensure that the necessary dependencies are configured in your HedHog project.

```bash
npm i @hedhog/menu
```

## MenuController

The `MenuController` exposes the following endpoints:

- **GET /menus**: Retrieve a list of menus with pagination.
- **GET /menus/:menuId**: Retrieve a specific menu by ID.
- **POST /menus**: Create a new menu item.
- **PATCH /menus/:menuId**: Update an existing menu item by ID.
- **DELETE /menus**: Delete menu items based on provided IDs.
- **PATCH /menus/order**: Update the order of menu items.

## MenuService

The `MenuService` class contains the business logic for handling menu operations, including querying the database and processing data.

- **getMenu(paginationParams: PaginationDTO)**: Retrieves a paginated list of menu items.
- **get(menuId: number)**: Retrieves a menu item by ID.
- **create(data: CreateDTO)**: Creates a new menu item.
- **update({ id, data }: { id: number; data: UpdateDTO })**: Updates an existing menu item by ID.
- **delete(data: DeleteDTO)**: Deletes menu items based on provided IDs.
- **updateOrder(data: OrderDTO)**: Updates the order of menu items.

## Folder Structure

```plaintext
menu/
├── dist/                        # Compiled JavaScript files from build
├── node_modules/                # Discardable folder with all module dependencies
├── src/
│   ├── menu.controller.ts       # Handles HTTP requests related to menus
│   ├── menu.service.ts          # Contains business logic for menu operations
│   ├── menu.module.ts           # Module definition for menu functionalities
│   ├── index.ts                 # Entry point for menu files
│   ├── dto/
│   │   ├── create.dto.ts          # Data Transfer Object for creating a menu
│   │   ├── delete.dto.ts          # Data Transfer Object for deleting menus
│   │   ├── update.dto.ts          # Data Transfer Object for updating a menu
│   │   └── order.dto.ts           # Data Transfer Object for updating menu order
│   ├── migrations/
│       └── index.ts               # Migration scripts
├── .gitignore                     # Specifies which files Git should ignore
├── package.json                   # Manages dependencies and scripts for the library
├── package-lock.json              # Lock file for dependencies
├── README.md                      # Documentation for the library
└── tsconfig.lib.json              # TypeScript configuration for the library
└── tsconfig.production.json       # TypeScript configuration for production builds
```
