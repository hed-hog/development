# <p align="center">hedhog/setting</p>

<p align="center">
  <img src="https://avatars.githubusercontent.com/u/177489127?s=200&v=4" alt="Hedhog Avatar" />
</p>

**Hedhog Setting** module provides a comprehensive solution for managing application settings. It includes functionalities to create, read, update, and delete settings, along with support for pagination and search capabilities. This module integrates with the HedHog ecosystem, utilizing @hedhog/auth for authentication, @hedhog/pagination for managing paginated results, and @hedhog/prisma for database interactions.

## Installation

This library is an integral part of the HedHog framework and should be installed as a dependency in your HedHog project. Ensure that the necessary dependencies are configured in your HedHog project.

```bash
npm i @hedhog/setting
```

## Controller Endpoints

### `GET /settings`

- **Description**: Retrieve a paginated list of settings.
- **Authentication**: Required (uses `AuthGuard`).
- **Pagination**: Supports pagination through query parameters.

### `GET /settings/:settingId`

- **Description**: Retrieve a specific setting by its ID.
- **Authentication**: Required (uses AuthGuard).
- **Parameters**:
  - **settingId** (number): The ID of the setting to retrieve.

### `POST /settings`

- **Description**: Create a new setting.
- **Authentication**: Required (uses AuthGuard).
- **Body**:
  - **name** (string): Name of the setting.

### `PATCH /settings/:settingId`

- **Description**: Update an existing setting.
- **Authentication**: Required (uses AuthGuard).
- **Parameters**:
  - **settingId** (number): The ID of the setting to update.
- **Body**:
  - **name** (string, optional): Updated name of the setting.

### `DELETE /settings`

- **Description**: Delete one or more settings.
- **Authentication**: Required (uses AuthGuard).
- **Body**:
  - **ids** (number[]): Array of setting IDs to delete.

## Service Methods

- **getSettings(paginationParams: PaginationDTO)**

  - **Description**: Retrieves a paginated list of settings with optional search functionality.
  - **Parameters**:
    - **paginationParams**: Includes pagination and search criteria.

- **get(settingId: number)**

  - **Description**: Retrieves a specific setting by its ID.
  - **Parameters**:
    - **settingId**: ID of the setting to retrieve.

- **create(data: CreateDTO)**

  - **Description**: Creates a new setting.
  - **Parameters**:
    - **data**: Includes name of the setting.

- **update(id: number, data: UpdateDTO)**

  - **Description**: Updates an existing setting.
  - **Parameters**:
    - **id**: ID of the setting to update.
    - **data**: Includes updated name of the setting.

- **delete(data: DeleteDTO)**
  - **Description**: Deletes one or more settings.
  - **Parameters**:
    - **data**: Includes array of ids to delete.

## Folder Structure

```plaintext
setting/
├── dist/                        # Compiled JavaScript files from build
├── node_modules/                # Discardable folder with all module dependencies
├── src/
│   ├── dto/                     # Data Transfer Objects
│   │   ├── create.dto.ts        # DTO for creating settings
│   │   ├── delete.dto.ts        # DTO for deleting settings
│   │   ├── update.dto.ts        # DTO for updating settings
│   ├── migrations/              # Database migrations
│   ├── setting.controller.ts    # Controller for settings
│   ├── setting.module.ts        # Module definition for settings
│   ├── setting.service.ts       # Service class for settings logic
├── .gitignore                    # Specifies which files Git should ignore
├── package.json                  # Manages dependencies and scripts for the module
├── package-lock.json             # Lock file for dependencies
├── README.md                     # Documentation for the library
├── tsconfig.lib.json             # TypeScript configuration for library builds
├── tsconfig.production.json      # TypeScript configuration for production builds
```
