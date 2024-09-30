# <p align="center">hedhog/admin</p>

<p align="center">
  <img src="https://avatars.githubusercontent.com/u/177489127?s=200&v=4" alt="Hedhog Avatar" />
</p>

## Table of Contents

- [Overview](#overview)
- [Hedhog Auth](#hedhog-auth)
- [Hedhog Menu](#hedhog-menu)
- [Hedhog Permission](#hedhog-permission)
- [Hedhog Screen](#hedhog-screen)
- [Hedhog User](#hedhog-user)

# Overview

The **Hedhog Admin** module is a collection of core modules essential for managing and administering applications within the HedHog framework. It brings together various modules that provide key functionalities such as authentication, menu configuration, permissions, screen management and user management.

Whether you need to secure access to resources, manage user roles, or handle file uploads, the `@hedhog/admin` module provides everything required to manage a modern web application’s backend with minimal setup.

### Included Modules<

- **@hedhog/auth**: Provides authentication and authorization mechanisms, ensuring secure access to application resources.
- **@hedhog/menu**: Allows for the creation and management of dynamic menus within the application interface.
- **@hedhog/role**: Facilitates the management of roles, controlling access to specific features or areas.
- **@hedhog/route**: Provides a comprehensive system for managing routes within your application.
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

# Hedhog Auth

**HedHog Auth** is a library designed to handle authentication tasks within the HedHog framework. It provides functionalities for user login, token management, multi-factor authentication (MFA), and password reset, ensuring secure and reliable user authentication processes.

### Features

- **Token Verification**: Verify authentication tokens for users.
- **Login**: Authenticate users with email and password, and handle multi-factor authentication if required.
- **OTP Management**: Manage one-time passwords (OTP) for multi-factor authentication.
- **Password Reset**: Facilitate password reset requests through email.

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
├── auth.controller.ts         # Defines routes for authentication
├── auth.service.ts            # Contains authentication logic
├── auth.module.ts             # Authentication module
├── dto/
│   ├── forget.dto.ts          # Data Transfer Object for password reset
│   ├── login.dto.ts           # Data Transfer Object for login
│   └── otp.dto.ts             # Data Transfer Object for OTP verification
├── decorators/
│   ├── public.decorator.ts    # Custom decorator to mark public routes
│   └── user.decorator.ts      # Custom decorator to get user from request
├── types/
│   └── user.type.ts           # Type definitions for user-related data
├── enums/
│   └── multifactor-type.enum.ts # Enumeration for multi-factor authentication types
├── guards/
│   └── auth.guard.ts          # Guard for protecting routes
```

---

# Hedhog Menu

**HedHog Menu** is a library for managing menus within the HedHog framework. It provides a set of RESTful endpoints for CRUD operations on menu items, as well as functionalities to handle pagination and ordering of menus.

### Features

- **CRUD Operations**: Create, Read, Update, and Delete menu items.
- **Pagination**: Paginate menu items for efficient data retrieval.
- **Ordering**: Update the order of menu items.

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
├── menu.controller.ts       # Handles HTTP requests related to menus
├── menu.service.ts          # Contains business logic for menu operations
├── menu.module.ts           # Module definition for menu functionalities
├── dto/
│   ├── create.dto.ts          # Data Transfer Object for creating a menu
│   ├── update.dto.ts          # Data Transfer Object for updating a menu
└── order.dto.ts           # Data Transfer Object for updating menu order
```

---

# Hedhog Role

**HedHog Role** module is designed to handle role management within the HedHog framework. It allows for creating, updating, and deleting roles and managing their relationships with users, menus, routes, and screens.

### Features

- **Role Management**: Create, update, and delete roles.
- **User Associations**: Assign and manage users associated with roles.
- **Menu, Route, and Screen Associations**: Manage the association between roles and menus, routes, or screens.
- **Pagination**: Handle paginated responses for all resources.

### Controller Endpoints

#### `GET /roles`

- **Description**: Retrieve a paginated list of all roles.
- **Authentication**: Required (uses `AuthGuard`).
- **Parameters**:
  - `paginationParams` (optional): Standard pagination parameters.

#### `GET /roles/:roleId`

- **Description**: Retrieve details of a specific role.
- **Authentication**: Required (uses `AuthGuard`).
- **Parameters**:
  - `roleId (number)`: The ID of the role to retrieve.

#### `POST /roles`

- **Description**: Create a new role.
- **Authentication**: Required (uses `AuthGuard`).
- **Parameters**:
  - `data` (CreateDTO): The data for the new role (name, description, etc).

#### `PATCH /roles/:roleId`

- **Description**: Update an existing role.
- **Authentication**: Required (uses `AuthGuard`).
- **Parameters**:
  - `roleId (number)`: The ID of the role to update.
  - `data` (UpdateDTO): The data to update for the role.

#### `DELETE /roles`

- **Description**: Delete one or more roles.
- **Authentication**: Required (uses `AuthGuard`).
- **Parameters**:
  - `data` (DeleteDTO): List of role IDs to delete.

#### `GET /roles/:roleId/users`

- **Description**: Get a list of users associated with a specific role.
- **Authentication**: Required (uses `AuthGuard`).
- **Parameters**:
  - `roleId (number)`: The ID of the role to retrieve users for.
  - `paginationParams` (optional): Standard pagination parameters.

#### `GET /roles/:roleId/menus`

- **Description**: Get a list of menus associated with a specific role.
- **Authentication**: Required (uses `AuthGuard`).
- **Parameters**:
  - `roleId (number)`: The ID of the role to retrieve menus for.
  - `paginationParams` (optional): Standard pagination parameters.

#### `GET /roles/:roleId/routes`

- **Description**: Get a list of routes associated with a specific role.
- **Authentication**: Required (uses `AuthGuard`).
- **Parameters**:
  - `roleId (number)`: The ID of the role to retrieve routes for.
  - `paginationParams` (optional): Standard pagination parameters.

#### `GET /roles/:roleId/screens`

- **Description**: Get a list of screens associated with a specific role.
- **Authentication**: Required (uses `AuthGuard`).
- **Parameters**:
  - `roleId (number)`: The ID of the role to retrieve screens for.
  - `paginationParams` (optional): Standard pagination parameters.

#### `PATCH /roles/:roleId/users`

- **Description**: Update the users associated with a specific role.
- **Authentication**: Required (uses `AuthGuard`).
- **Parameters**:
  - `roleId (number)`: The ID of the role. -`data` (UpdateIdsDTO): List of user IDs to associate with the role.

#### `PATCH /roles/:roleId/menus`

- **Description**: Update the menus associated with a specific role.
- **Authentication**: Required (uses `AuthGuard`).
- **Parameters**:
  - `roleId (number)`: The ID of the role.
  - `data` (UpdateIdsDTO): List of menu IDs to associate with the role.

#### `PATCH /roles/:roleId/routes`

- **Description**: Update the routes associated with a specific role.
- **Authentication**: Required (uses `AuthGuard`).
- **Parameters**:
  - `roleId (number)`: The ID of the role.
  - `data` (UpdateIdsDTO): List of route IDs to associate with the role.

#### `PATCH /roles/:roleId/screens`

- **Description**: Update the screens associated with a specific role.
- **Authentication**: Required (uses `AuthGuard`).
- **Parameters**:
  - `roleId (number)`: The ID of the role.
  - `data` (UpdateIdsDTO): List of screen IDs to associate with the role.

### Service Methods

#### `updateUsers(roleId: number, { ids }: UpdateIdsDTO)`

- **Description**: Updates the users associated with a specific role by deleting existing associations and creating new ones.
- **Parameters**:
  - `roleId (number)`: The ID of the role to update.
  - `data`: An object containing an array of user IDs to associate with the role.

#### `updateScreens(roleId: number, data: UpdateIdsDTO)`

- **Description**: Updates the screens associated with a specific role by deleting existing associations and creating new ones.
- **Parameters**:
  - `roleId (number)`: The ID of the role to update.
  - `data`: An object containing an array of screen IDs to associate with the role.

#### `updateRoutes(roleId: number, data: UpdateIdsDTO)`

- **Description**: Updates the routes associated with a specific role by deleting existing associations and creating new ones.
- **Parameters**:
  - `roleId (number)`: The ID of the role to update.
  - `data`: An object containing an array of route IDs to associate with the role.

#### `updateMenus(roleId: number, data: UpdateIdsDTO)`

- **Description**: Updates the menus associated with a specific role by deleting existing associations and creating new ones.
- **Parameters**:
  - `roleId (number)`: The ID of the role to update.
  - `data`: An object containing an array of menu IDs to associate with the role.

#### `listUsers(roleId: number, paginationParams: PaginationDTO)`

- **Description**: Retrieves a paginated list of users associated with a specific role.
- **Parameters**:
  - `roleId (number)`: The ID of the role to retrieve associated users.
  - `paginationParams`: Includes pagination criteria.

#### `listMenus(roleId: number, paginationParams: PaginationDTO)`

- **Description**: Retrieves a paginated list of menus associated with a specific role.
- **Parameters**:
  - `roleId (number)`: The ID of the role to retrieve associated menus.
  - `paginationParams`: Includes pagination criteria.

#### `listRoutes(roleId: number, paginationParams: PaginationDTO)`

- **Description**: Retrieves a paginated list of routes associated with a specific role.
- **Parameters**:
  - `roleId (number)`: The ID of the role to retrieve associated routes.
  - `paginationParams`: Includes pagination criteria.

#### `listScreens(roleId: number, paginationParams: PaginationDTO)`

- **Description**: Retrieves a paginated list of screens associated with a specific role.
- **Parameters**:
  - `roleId (number)`: The ID of the role to retrieve associated screens.
  - `paginationParams`: Includes pagination criteria.

#### `getRoles(paginationParams: PaginationDTO)`

- **Description**: Retrieves a paginated list of all roles, with optional search functionality based on name and description.
- **Parameters**:
  - `paginationParams`: Includes pagination and search criteria.

#### `get(roleId: number)`

- **Description**: Retrieves a specific role by its ID.
- **Parameters**:
  - `roleId (number)`: The ID of the role to retrieve.

#### `create(data: CreateDTO)`

- **Description**: Creates a new role with the specified name and description.
- **Parameters**:
  - `data`: An object containing the following properties:
  - `name (string)`: The name of the new role.
  - `description (string)`: A description of the new role.

#### `update({ id, data }: { id: number; data: UpdateDTO })`

- **Description**: Updates an existing role identified by its ID.
- **Parameters**:
  - `id (number)`: The ID of the role to update.
  - `data`: An object containing the updated information for the role, defined in UpdateDTO.

#### `delete({ ids }: DeleteDTO)`

- **Description**: Deletes one or more roles identified by their IDs.
- **Parameters**:
  - `ids (array of number)`: An array containing the IDs of the roles to delete.

### Folder Structure

```plaintext
├── decorators/
│   ├── role.decorator.ts    # Custom decorator for roles
├── dto/                        # Data Transfer Objects
│   ├── create.dto.ts           # DTO for creating a role
│   ├── update.dto.ts           # DTO for updating a role
├── guards/
│   └── role.guard.ts         # Guard for roles
├── role.controller.ts        # Handles HTTP requests related to roles
├── role.module.ts            # Module definition for the role
└── role.service.ts           # Service class for role-related logic
```

---

# Hedhog Route

**Hedhog Route** module provides a comprehensive system for managing routes within your application. It allows administrators to define, modify, and control access to different routes within the application. The module also integrates with other Hedhog modules to ensure that permissions and roles are respected when accessing routes.

### Features

- **CRUD Operations**: Create, Read, Update, and Delete routes.
- **Route Management**: Manage application routes, including their accessibility and assignment to user roles.
- **Permissions Integration**: Integrates with Hedhog Permission to control access to specific routes based on user roles.

### Controller Endpoints

#### `GET /routes`

- **Description**: Retrieves a paginated list of all routes.
- **Authentication**: Required (uses `AuthGuard`).
- **Parameters**:
  - `paginationParams`: Includes pagination criteria.

#### `GET /routes/:routeId`

- **Description**: Retrieves a specific route by its ID.
- **Authentication**: Required (uses `AuthGuard`).
- **Parameters**:
  - `routeId (number)`: The ID of the route to retrieve.

#### `POST /routes`

- **Description**: Creates a new route with the specified URL and method.
- **Authentication**: Required (uses `AuthGuard`).
- **Parameters**:
  - `data`: An object containing the url and method for the new route.

#### `PATCH /routes/:routeId`

- **Description**: Updates an existing route identified by its ID.
- **Authentication**: Required (uses `AuthGuard`).
- **Parameters**:
  - `routeId (number)`: The ID of the route to update.
  - `data`: An object containing the updated information for the route.

#### `DELETE /routes`

- **Description**: Deletes one or more routes.
- **Authentication**: Required (uses `AuthGuard`).
- **Parameters**:
  - `data`: An object containing an array of route IDs to delete.

#### `GET /routes/:routeId/roles`

- **Description**: Retrieves a paginated list of roles associated with a specific route.
- **Authentication**: Required (uses `AuthGuard`).
- **Parameters**:
  - `routeId (number)`: The ID of the route to retrieve associated roles.
  - `paginationParams`: Includes pagination criteria.

#### `PATCH /routes/:routeId/roles`

- **Description**: Updates the roles associated with a specific route.
- **Authentication**: Required (uses `AuthGuard`).
- **Parameters**:
  - `routeId (number)`: The ID of the route.
  - `data`: An object containing an array of role IDs to associate with the route.

#### `GET /routes/:routeId/screens`

- **Description**: Retrieves a paginated list of screens associated with a specific route.
- **Authentication**: Required (uses `AuthGuard`).
- **Parameters**:
  - `routeId (number)`: The ID of the route to retrieve associated screens.
  - `paginationParams`: Includes pagination criteria.

#### `PATCH /routes/:routeId/screens`

- **Description:** Updates the screens associated with a specific route.
- **Authentication**: Required (uses AuthGuard).
- **Parameters**:
  - `routeId (number)`: The ID of the route.
  - `data`: An object containing an array of screen IDs to associate with the route.

### Service Methods

#### `getRoutes(paginationParams: PaginationDTO)`

- **Description**: Retrieves a paginated list of routes with optional search functionality based on URL and method.
- **Parameters**:
  - `paginationParams`: Includes pagination and search criteria.

#### `getRouteById(routeId: number)`

- **Description**: Retrieves a specific route by its ID.
- **Parameters**:
  - `routeId`: The ID of the route to retrieve.

#### `create(data: CreateDTO)`

- **Description**: Creates a new route with the specified URL and method.
- **Parameters**:
  - `data`: An object containing the URL and method for the new route.

#### `update({ id, data }: { id: number; data: UpdateDTO })`

- **Description**: Updates an existing route identified by its ID.
- **Parameters**:
  - `id`: The ID of the route to update.
  - `data`: An object containing the updated information for the route.

#### `delete({ ids }: DeleteDTO)`

- **Description**: Deletes one or more routes identified by their IDs.
- **Parameters**:
- `ids`: An object containing an array of route IDs to delete.

#### `listRoles(routeId: number, paginationParams: PaginationDTO)`

- **Description**: Retrieves a paginated list of roles associated with a specific route.
- **Parameters**:
  - `routeId`: The ID of the route to retrieve associated roles.
  - `paginationParams`: Includes pagination parameters.

#### `updateRoles(routeId: number, data: UpdateIdsDTO)`

- **Description**: Updates the roles associated with a specific route.
- **Parameters**:
  - `routeId`: The ID of the route.
  - `data`: An object containing an array of role IDs to associate with the route.

#### `listScreens(routeId: number, paginationParams: PaginationDTO)`

- **Description**: Retrieves a paginated list of screens associated with a specific route.
- **Parameters**:
  - `routeId`: The ID of the route to retrieve associated screens.
  - `paginationParams`: Includes pagination parameters.

#### `updateScreens(routeId: number, data: UpdateIdsDTO)`

- **Description**: Updates the screens associated with a specific route.
- **Parameters**:
  - `routeId`: The ID of the route.
  - `data`: An object containing an array of screen IDs to associate with the route.

### Folder Structure

```plaintext
├── dto/                        # Data Transfer Objects
│   ├── create.dto.ts           # DTO for creating a route
│   ├── update.dto.ts           # DTO for updating a route
├── guards/
│   └── route.guard.ts         # Guard for routes
├── route.controller.ts        # Handles HTTP requests related to routes
├── route.module.ts            # Module definition for the route
└── route.service.ts           # Service class for route-related logic
```

---

# Hedhog Screen

**Hedhog Screen** module is part of the HedHog framework and provides functionalities for managing screens in your application. It offers a set of RESTful API endpoints and service methods to handle CRUD operations and pagination for screens.

### Features

- Create, Read, Update, and Delete (**CRUD**) operations for screens.
- **Pagination** for listing screens.
- **Search** functionality to filter screens based on various attributes.

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
├── dto/                        # Data Transfer Objects
│   ├── create.dto.ts           # DTO for creating a screen
│   ├── update.dto.ts           # DTO for updating a screen
├── screen.controller.ts        # Handles HTTP requests related to screens
├── screen.module.ts            # Module definition for the screen
└── screen.service.ts           # Service class for screen-related logic
```

---

# Hedhog User

The **Hedhog User** module in HedHog provides functionality to manage user data within an application. This module leverages the HedHog framework components, including pagination and [**Prisma**](https://www.prisma.io/) integration, to offer a robust user management system.

### Integrations

- **Pagination**: Utilizes `@hedhog/pagination` for managing paginated results of user queries.
- **Database Interaction**: Uses `@hedhog/prisma` to interface with the database for user data management.
- **Authentication**: Secured with Auth Module from `@hedhog/admin` to ensure that only authorized users can access or modify user data.

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
- **Authentication**: Required (uses `AuthGuard`).
- **Parameters**:
  - **userId** (number): The ID of the user to update.
- **Body**:
  - **email** (string, optional): Updated email address of the user.
  - **name** (string, optional): Updated name of the user.
  - **password** (string, optional): Updated password of the user.

#### `DELETE /users`

- **Description**: Delete one or more users.
- **Authentication**: Required (uses `AuthGuard`).
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
├── constants/
│   └── user.constants.ts    # Constants related to user module
├── dto/
│   ├── create.dto.ts        # Data Transfer Object for creating a user
│   └── update.dto.ts        # Data Transfer Object for updating a user
├── user.module.ts           # Module for UserService
├── user.controller.ts       # Controller for user-related endpoints
└── user.service.ts          # Service handling business logic for users
```
