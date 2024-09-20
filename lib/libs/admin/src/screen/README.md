# <p align="center">hedhog/screen</p>

<p align="center">
  <img src="https://avatars.githubusercontent.com/u/177489127?s=200&v=4" alt="Hedhog Avatar" />
</p>

**Hedhog Screen** module is part of the HedHog framework and provides functionalities for managing screens in your application. It offers a set of RESTful API endpoints and service methods to handle CRUD operations and pagination for screens.

## Features

- Create, Read, Update, and Delete (**CRUD**) operations for screens.
- **Pagination** for listing screens.
- **Search** functionality to filter screens based on various attributes.

## Installation

This library is an integral part of the HedHog framework and should be installed as a dependency in your HedHog project. Ensure that the necessary dependencies are configured in your HedHog project.

```bash
npm i @hedhog/screen
```

## Controller Endpoints

### `GET /screens`

- **Description**: Retrieve a paginated list of screens.
- **Authentication**: Required (uses `AuthGuard`).
- **Pagination**: Supports pagination through query parameters.

### `GET /screens/:screenId`

- **Description**: Retrieve a specific screen by its ID.
- **Authentication**: Required (uses `AuthGuard`).
- **Parameters**:
  - `screenId` (number): The ID of the screen to retrieve.

### `POST /screens`

- **Description**: Create a new screen.
- **Authentication**: Required (uses `AuthGuard`).
- **Body**:
  - `name` (string): Name of the screen.
  - `slug` (string): Unique identifier for the screen.
  - `description` (string): Description of the screen.
  - `icon` (string): Icon associated with the screen.

### `PATCH /screens/:screenId`

- **Description**: Update an existing screen.
- **Authentication**: Required (uses `AuthGuard`).
- **Parameters**:
  - `screenId` (number): The ID of the screen to update.
- **Body**:
  - `name` (string, optional): Updated name of the screen.
  - `slug` (string, optional): Updated slug of the screen.
  - `description` (string, optional): Updated description of the screen.
  - `icon` (string, optional): Updated icon of the screen.

### `DELETE /screens`

- **Description**: Delete one or more screens.
- **Authentication**: Required (uses `AuthGuard`).
- **Body**:
  - `ids` (number[]): Array of screen IDs to delete.

## Service Methods

### `getScreens(paginationParams: PaginationDTO)`

- **Description**: Retrieves a paginated list of screens with optional search functionality.
- **Parameters**:
  - `paginationParams`: Includes pagination and search criteria.

### `get(screenId: number)`

- **Description**: Retrieves a specific screen by its ID.
- **Parameters**:
  - `screenId`: ID of the screen to retrieve.

### `create(data: CreateDTO)`

- **Description**: Creates a new screen.
- **Parameters**:
  - `data`: Includes `name`, `slug`, `description`, and `icon`.

### `update(id: number, data: UpdateDTO)`

- **Description**: Updates an existing screen.
- **Parameters**:
  - `id`: ID of the screen to update.
  - `data`: Includes updated `name`, `slug`, `description`, and `icon`.

### `delete(data: DeleteDTO)`

- **Description**: Deletes one or more screens.
- **Parameters**:
  - `data`: Includes array of `ids` to delete.

## Folder Structure

```plaintext
screen/
├── dist/                           # Compiled JavaScript files from build
├── node_modules/                   # Discardable folder with all module dependencies
├── src/
│   ├── dto/                        # Data Transfer Objects
│   │   ├── create.dto.ts           # DTO for creating a screen
│   │   ├── update.dto.ts           # DTO for updating a screen
│   │   └── delete.dto.ts           # DTO for deleting a screen
│   ├── migrations/                 # Database migration files
│   │   └── <migration-files>       # Migration scripts
│   ├── index.ts                    # Entry point for the screen module
│   ├── screen.controller.ts        # Handles HTTP requests related to screens
│   ├── screen.module.ts            # Module definition for the screen
│   └── screen.service.ts           # Service class for screen-related logic
├── .gitignore                      # Specifies which files Git should ignore
├── package.json                    # Manages dependencies and scripts for the module
├── package-lock.json               # Lock file for dependencies
├── README.md                       # Documentation for the library
├── tsconfig.lib.json               # TypeScript configuration for library builds
├── tsconfig.production.json        # TypeScript configuration for production builds
```
