# <p align="center">hedhog/admin</p>

<p align="center">
  <img src="https://avatars.githubusercontent.com/u/177489127?s=200&v=4" alt="Hedhog Avatar" />
</p>

# Overview

The **Hedhog Admin** module is a collection of core modules essential for managing and administering applications within the HedHog framework. It brings together various modules that provide key functionalities such as authentication, menu configuration, permissions, screen management and user management.

Whether you need to secure access to resources, manage user roles, or handle file uploads, the `@hedhog/admin` module provides everything required to manage a modern web application’s backend with minimal setup.

### Included Modules<

- **@hedhog/auth**: Provides authentication and authorization mechanisms, ensuring secure access to application resources.
- **@hedhog/menu**: Allows for the creation and management of dynamic menus within the application interface.
- **@hedhog/permission**: Facilitates the management of permissions and roles, controlling access to specific features or areas.
- **@hedhog/screen**: Provides a structure for managing different screens and UI components.
- **@hedhog/user**: Manages user accounts, including creation, updates, and deletion, along with password encryption and secure access.

### Installation

To install the `@hedhog/admin` module, use npm:

```bash
npm install @hedhog/admin
```

### Usage

The `@hedhog/admin` module acts as a base for administrative tasks in HedHog applications. Once installed, you can integrate the included modules into your project to quickly set up and manage essential features for your admin interface.

```typescript
import { AdminModule } from '@hedhog/admin';

@Module({
  imports: [AdminModule],
})
export class AppModule {}
```

By importing the AdminModule, you gain access to all the functionality provided by the individual modules, making it easier to manage authentication, permissions, users, and more.

---

# @hedhog/auth

**HedHog Auth** is a library designed to handle authentication tasks within the HedHog framework. It provides functionalities for user login, token management, multi-factor authentication (MFA), and password reset, ensuring secure and reliable user authentication processes.

### Features

- **Token Verification**: Verify authentication tokens for users.
- **Login**: Authenticate users with email and password, and handle multi-factor authentication if required.
- **OTP Management**: Manage one-time passwords (OTP) for multi-factor authentication.
- **Password Reset**: Facilitate password reset requests through email.

### Installation

This library is a part of the HedHog framework and is typically included as a dependency in your HedHog projects. Ensure you have the necessary dependencies and setup by following the installation guide in the HedHog framework documentation.

```bash
npm i @hedhog/auth
```

#### Controller

The `AuthController` defines the following endpoints:

- `GET /auth/verify`: Verify the authentication status of the user.
- `POST /auth/login`: Authenticate a user using email and password.
- `POST /auth/otp`: Verify an OTP code for multi-factor authentication.
- `POST /auth/forget`: Request a password reset link via email.

#### AuthService

The `AuthService` provides methods for:

- `verifyToken(token: string)`: Verify the provided JWT token.
- `generateRandomString(length: number)`: Generate a random string of specified length.
- `generateRandomNumber()`: Generate a random 6-digit number.
- `loginWithEmailAndPassword(email: string, password: string)`: Authenticate users with email and password and handle multi-factor authentication if required.
- `getToken(user)`: Generate a JWT token for the authenticated user.
- `forget({ email }: ForgetDTO)`: Initiate a password reset process for the specified email.
- `otp({ token, code }: OtpDTO)`: Verify the OTP code provided by the user.

### Folder Structure

```plaintext
auth/
├── dist/                        # Compiled JavaScript files from build
├── node_modules/                # Discardable folder with all module dependencies
├── src/
│   ├── auth.controller.ts         # Defines routes for authentication
│   ├── auth.service.ts            # Contains authentication logic
│   ├── auth.module.ts             # Authentication module
│   ├── index.ts                   # Entry point for auth files
│   ├── dto/
│   │   ├── forget.dto.ts          # Data Transfer Object for password reset
│   │   ├── login.dto.ts           # Data Transfer Object for login
│   │   └── otp.dto.ts             # Data Transfer Object for OTP verification
│   ├── decorators/
│   │   ├── public.decorator.ts    # Custom decorator to mark public routes
│   │   └── user.decorator.ts      # Custom decorator to get user from request
│   ├── types/
│   │   └── user.type.ts           # Type definitions for user-related data
│   ├── enums/
│   │   └── multifactor-type.enum.ts # Enumeration for multi-factor authentication types
│   ├── guards/
│   │   └── auth.guard.ts          # Guard for protecting routes
│   ├── migrations/
│   │   └── index.ts               # Migration scripts
├── .gitignore                     # Specifies which files Git should ignore
├── package.json                   # Manages dependencies and scripts for the library
├── package-lock.json              # Lock file for package dependencies
├── README.md                      # Documentation for the library
├── tsconfig.lib.json              # TypeScript configuration for the library
└── tsconfig.production.json       # TypeScript configuration for production builds
```

---

# @hedhog/menu

**HedHog Menu** is a library for managing menus within the HedHog framework. It provides a set of RESTful endpoints for CRUD operations on menu items, as well as functionalities to handle pagination and ordering of menus.

### Features

- **CRUD Operations**: Create, Read, Update, and Delete menu items.
- **Pagination**: Paginate menu items for efficient data retrieval.
- **Ordering**: Update the order of menu items.

### Installation

This library is an integral part of the HedHog framework and should be installed as a dependency in your HedHog project. Ensure that the necessary dependencies are configured in your HedHog project.

```bash
npm i @hedhog/menu
```

### MenuController

The `MenuController` exposes the following endpoints:

- **GET /menus**: Retrieve a list of menus with pagination.
- **GET /menus/:menuId**: Retrieve a specific menu by ID.
- **POST /menus**: Create a new menu item.
- **PATCH /menus/:menuId**: Update an existing menu item by ID.
- **DELETE /menus**: Delete menu items based on provided IDs.
- **PATCH /menus/order**: Update the order of menu items.

### MenuService

The `MenuService` class contains the business logic for handling menu operations, including querying the database and processing data.

- **getMenu(paginationParams: PaginationDTO)**: Retrieves a paginated list of menu items.
- **get(menuId: number)**: Retrieves a menu item by ID.
- **create(data: CreateDTO)**: Creates a new menu item.
- **update({ id, data }: { id: number; data: UpdateDTO })**: Updates an existing menu item by ID.
- **delete(data: DeleteDTO)**: Deletes menu items based on provided IDs.
- **updateOrder(data: OrderDTO)**: Updates the order of menu items.

### Folder Structure

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

---

# @hedhog/screen

**Hedhog Screen** module is part of the HedHog framework and provides functionalities for managing screens in your application. It offers a set of RESTful API endpoints and service methods to handle CRUD operations and pagination for screens.

### Features

- Create, Read, Update, and Delete (**CRUD**) operations for screens.
- **Pagination** for listing screens.
- **Search** functionality to filter screens based on various attributes.

### Installation

This library is an integral part of the HedHog framework and should be installed as a dependency in your HedHog project. Ensure that the necessary dependencies are configured in your HedHog project.

```bash
npm i @hedhog/screen
```

### Controller Endpoints

#### `GET /screens`

- **Description**: Retrieve a paginated list of screens.
- **Authentication**: Required (uses `AuthGuard`).
- **Pagination**: Supports pagination through query parameters.

#### `GET /screens/:screenId`

- **Description**: Retrieve a specific screen by its ID.
- **Authentication**: Required (uses `AuthGuard`).
- **Parameters**:
  - `screenId` (number): The ID of the screen to retrieve.

#### `POST /screens`

- **Description**: Create a new screen.
- **Authentication**: Required (uses `AuthGuard`).
- **Body**:
  - `name` (string): Name of the screen.
  - `slug` (string): Unique identifier for the screen.
  - `description` (string): Description of the screen.
  - `icon` (string): Icon associated with the screen.

#### `PATCH /screens/:screenId`

- **Description**: Update an existing screen.
- **Authentication**: Required (uses `AuthGuard`).
- **Parameters**:
  - `screenId` (number): The ID of the screen to update.
- **Body**:
  - `name` (string, optional): Updated name of the screen.
  - `slug` (string, optional): Updated slug of the screen.
  - `description` (string, optional): Updated description of the screen.
  - `icon` (string, optional): Updated icon of the screen.

#### `DELETE /screens`

- **Description**: Delete one or more screens.
- **Authentication**: Required (uses `AuthGuard`).
- **Body**:
  - `ids` (number[]): Array of screen IDs to delete.

### Service Methods

#### `getScreens(paginationParams: PaginationDTO)`

- **Description**: Retrieves a paginated list of screens with optional search functionality.
- **Parameters**:
  - `paginationParams`: Includes pagination and search criteria.

#### `get(screenId: number)`

- **Description**: Retrieves a specific screen by its ID.
- **Parameters**:
  - `screenId`: ID of the screen to retrieve.

#### `create(data: CreateDTO)`

- **Description**: Creates a new screen.
- **Parameters**:
  - `data`: Includes `name`, `slug`, `description`, and `icon`.

#### `update(id: number, data: UpdateDTO)`

- **Description**: Updates an existing screen.
- **Parameters**:
  - `id`: ID of the screen to update.
  - `data`: Includes updated `name`, `slug`, `description`, and `icon`.

#### `delete(data: DeleteDTO)`

- **Description**: Deletes one or more screens.
- **Parameters**:
  - `data`: Includes array of `ids` to delete.

### Folder Structure

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

---

# @hedhog/user

The **Hedhog User** module in HedHog provides functionality to manage user data within an application. This module leverages the HedHog framework components, including pagination and [**Prisma**](https://www.prisma.io/) integration, to offer a robust user management system.

### Installation

This library is an integral part of the HedHog framework and should be installed as a dependency in your HedHog project. Ensure that the necessary dependencies are configured in your HedHog project.

```bash
npm i @hedhog/user
```

### Integrations

- **Pagination**: Utilizes `@hedhog/pagination` for managing paginated results of user queries.
- **Database Interaction**: Uses `@hedhog/prisma` to interface with the database for user data management.
- **Authentication**: Secured with `@hedhog/auth` to ensure that only authorized users can access or modify user data.

### Controller Endpoints

#### `GET /users`

- **Description**: Retrieve a paginated list of users.
- **Authentication**: Required (uses `AuthGuard`).
- **Pagination**: Supports pagination through query parameters.

#### `GET /users/:userId`

- **Description**: Retrieve a specific user by its ID.
- **Authentication**: Required (uses `AuthGuard`).
- **Parameters**:
  - **userId** (number): The ID of the user to retrieve.

#### `POST /users`

- **Description**: Create a new user.
- **Authentication**: Required (uses `AuthGuard`).
- **Body**:
  - **email** (string): Email address of the user.
  - **name** (string): Name of the user.
  - **password** (string): Password of the user.

#### `PATCH /users/:userId`

- **Description**: Update an existing user.
- **Authentication**: Required (uses AuthGuard).
- **Parameters**:
  - **userId** (number): The ID of the user to update.
- **Body**:
  - **email** (string, optional): Updated email address of the user.
  - **name** (string, optional): Updated name of the user.
  - **password** (string, optional): Updated password of the user.

#### `DELETE /users`

- **Description**: Delete one or more users.
- **Authentication**: Required (uses AuthGuard).
- **Body**:
  - **ids** (number[]): Array of user IDs to delete.

### Service Methods

**getUsers(paginationParams: PaginationDTO)**

- **Description**: Retrieves a paginated list of users with optional search functionality.
- **Parameters**:
  - **paginationParams**: Includes pagination and search criteria.

**get(userId: number)**

- **Description**: Retrieves a specific user by its ID.
- **Parameters**:
  - **userId**: ID of the user to retrieve.

**hashPassword(password: string): Promise<string>**

- **Description**: Hashes a password using bcrypt.
- **Parameters**:
  - **password**: The password to be hashed.

**create(data: CreateDTO)**

- **Description**: Creates a new user.
- **Parameters**:
  - **data**: Includes email, name, and password.

**update(id: number, data: UpdateDTO)**

- **Description**: Updates an existing user.
- **Parameters**:
  - **id**: ID of the user to update.
  - **data**: Includes updated email, name, and password.

**delete(data: DeleteDTO)**

- **Description**: Deletes one or more users.
- **Parameters**:
  - **data**: Includes array of user IDs to delete.

### Folder Structure

```plaintext
user/
├── dist/                        # Compiled JavaScript files from build
├── node_modules/                # Discardable folder with all module dependencies
├── src/
│   ├── constants/
│   │   └── user.constants.ts    # Constants related to user module
│   ├── dto/
│   │   ├── create.dto.ts        # Data Transfer Object for creating a user
│   │   ├── delete.dto.ts        # Data Transfer Object for deleting a user
│   │   └── update.dto.ts        # Data Transfer Object for updating a user
│   ├── migrations/              # Migration files for database schema changes
|   ├── user.module.ts           # Module for UserService
│   ├── user.service.spec.ts     # Unit tests for UserService
│   ├── user.controller.ts       # Controller for user-related endpoints
│   └── user.service.ts          # Service handling business logic for users
├── .gitignore                   # Specifies which files Git should ignore
├── package.json                 # Manages dependencies and scripts for the module
├── package-lock.json            # Lock file for dependencies
├── README.md                    # Documentation for the library
├── tsconfig.lib.json            # TypeScript configuration for library builds
├── tsconfig.production.json     # TypeScript configuration for production builds
```
