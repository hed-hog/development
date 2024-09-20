# <p align="center">hedhog/permission</p>

<p align="center">
  <img src="https://avatars.githubusercontent.com/u/177489127?s=200&v=4" alt="Hedhog Avatar" />
</p>

**Hedhog Permission** provides essential functionality for managing permissions within HedHog-based projects. It supports CRUD operations for permissions, including the ability to read, create, update, and delete permissions.

## Features

- **CRUD Operations**: Easily create, read, update, and delete permissions.
- **Pagination**: Efficiently paginate through permissions data with flexible options.
- **Search**: Perform search operations on permissions based on name and description.

## Installation

This library is an integral part of the HedHog framework and should be installed as a dependency in your HedHog project. Ensure that the necessary dependencies are configured in your HedHog project.

```bash
npm i @hedhog/permission
```

## Endpoints

The PermissionController exposes the following API endpoints:

- **GET /permissions**: Retrieves a list of permissions. Supports pagination and search.
- **GET /permissions/:permissionId**: Retrieves a single permission by its ID.
- **POST /permissions**: Creates a new permission. Expects data in the request body.
- **PATCH /permissions/:permissionId**: Updates an existing permission by its ID. Expects update data in the request body.
- **DELETE /permissions**: Deletes one or more permissions. Expects an array of permission IDs in the request body.

## Methods

The PermissionService provides the following methods:

- **getPermissions(paginationParams: PaginationDTO)**: Fetches a list of permissions based on provided pagination parameters and search criteria.
- **get(permissionId: number)**: Retrieves a specific permission by its ID.
- **create(data: CreateDTO)**: Creates a new permission with the given data.
- **update(id: number, data: UpdateDTO)**: Updates an existing permission with the specified ID and new data.
- **delete(data: DeleteDTO)**: Deletes permissions based on provided IDs.

## Folder Structure

```plaintext
permission/
├── dist/                         # Compiled JavaScript files
├── node_modules/                 # Node.js modules
├── src/
│ ├── dto/                        # Data Transfer Objects (DTOs) for permissions
│ │ ├── create.dto.ts             # DTO for creating permissions
│ │ ├── delete.dto.ts             # DTO for deleting permissions
│ │ ├── update.dto.ts             # DTO for updating permissions
│ ├── migrations/                 # Database migration files
│ ├── types/                      # Type definitions related to permissions
│ │ └── permission.types.ts       # Type definitions for permissions
│ ├── permission.controller.ts    # Controller class for handling permission-related HTTP requests
│ ├── permission.module.ts        # Module definition for permissions
│ ├── permission.service.spec.ts  # Unit tests for PermissionService
│ ├── permission.service.ts       # Service class for permission-related business logic
│ └── index.ts                    # Entry point for permission files
├── .gitignore                    # Specifies which files Git should ignore
├── package.json                  # Manages dependencies and scripts for the library
├── package-lock.json             # Lock file for dependencies
├── tsconfig.lib.json             # TypeScript configuration for library builds
├── tsconfig.production.json      # TypeScript configuration for production builds
```
