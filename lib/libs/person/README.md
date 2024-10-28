# <p align="center">hedhog/person</p>

<p align="center">
  <img src="https://avatars.githubusercontent.com/u/177489127?s=200&v=4" alt="Hedhog Avatar" />
</p>

## Table of Contents

- [Overview](#overview)
- [Address](#address)
- [Address Type](#address-type)
- [Contact](#contact)
- [Contact Type](#contact-type)
- [Country](#country)
- [Custom](#custom)
- [Custom Type](#custom-type)
- [Document](#document)
- [Document Type](#document-type)
- [Person](#person)
- [Person Type](#person-type)

# Overview

**Hedhog Person** is a comprehensive module for managing person-related data, supporting physical, legal, and international entities. It handles associated documents, contacts, addresses, and custom attributes, designed to integrate seamlessly into Hedhog-based projects, providing a CRUD (Create, Read, Update, Delete) foundation for managing persons.

### Features

- **Multiple Person Types**: Supports different person types such as physical, legal, and international entities.
- **Document Management**: Handles multiple document types (e.g., CPF, CNPJ, passport) for each person.
- **Contact Information**: Stores and manages contact details, including phone numbers and email addresses.
- **Address Handling**: Tracks multiple address types (e.g., residential, commercial) for each person.
- **Custom Attributes**: Allows the addition of custom attributes to extend the person entity.

### Installation

This library is an integral part of the Hedhog framework and should be installed as a dependency in your Hedhog project.

```bash
npm i @hedhog/person
```

### Included Modules:

- **address**: Manages the address information for individuals, including storage, updates, and deletions of address records.
- **address-type**: Provides a system for defining types of addresses (e.g., residential, business) to categorize and manage addresses.
- **contact**: Handles contact details for individuals, such as phone numbers and email addresses, including creation, updates, and deletion.
- **contact-type**: Manages various types of contact information (e.g., phone, email) to facilitate organized contact data management.
- **country**: Manages country-related information, supporting internationalization and locale-specific features across the application.
- **custom**: Provides a flexible system for managing additional customizable fields for individuals beyond default attributes.
- **custom-type**: Allows the definition of custom field types to extend person records with specialized data points.
- **document**: Manages documents related to individuals, such as IDs and licenses, supporting secure storage and retrieval.
- **document-type**: Facilitates the categorization of document types (e.g., passport, driver’s license) for organized document management.
- **person**: Manages individual and organizational profiles, including creation, updates, and deletion, along with support for linking associated addresses, contacts, documents, and custom attributes.
- **person-type**: Provides a system for defining and managing types of persons (e.g., individual, company) to support diverse person profiles within the application.

---

# Address

The **Address** module provides comprehensive tools to manage addresses associated with individual or organizational profiles. This module allows for CRUD operations on addresses, supporting various address types and filtering capabilities.

### Controller Endpoints

#### `POST /persons/:personId/address`

- **Description**: Creates a new address for a person.
- **Parameters**:
  - `personId (URL param)`: The ID of the person associated with the address.
- **Body**:
  - `CreatePersonAddressDTO`: Data required to create the address, including fields like country_id, type_id, street, city, postal_code, and more.

#### `GET /persons/:personId/address`

- **Description**: Retrieves addresses for a specific person, optionally filtered by typeId or addressId.
- **Parameters**:
  - `personId (URL param)`: The ID of the person.
  - `typeId (query param, optional)`: Filters results by a specific address type.
  - `addressId (query param, optional)`: Retrieves a specific address by ID.

#### `PATCH /persons/:personId/address/:addressId`

- **Description**: Updates an existing address.
- **Parameters**:
  - `personId (URL param)`: The ID of the person.
  - `addressId (URL param)`: The ID of the address to update.
- **Body**:
  - `UpdatePersonAddressDTO (body)`: Data for updating the address fields.

#### `DELETE /persons/:personId/address/:addressId`

- **Description**: Deletes an address.
- **Body**:
  - `personId (URL param)`: The ID of the person.
  - `addressId (URL param)`: The ID of the address to delete.

### Service Methods

#### `create(personId: number, data: CreatePersonAddressDTO)`

- **Description**: Creates a new address entry in the database linked to a specific personId.
- **Parameters**:
  - `personId`: The ID of the associated person.
  - `data`: Address data, including details like country_id, type_id, street, and more.

#### `getAddress(personId: number)`

- **Description**: Retrieves paginated address data associated with a specific person.
- **Parameters**:
  - `personId`: The ID of the associated person.

#### `getAddressByTypeId(personId: number, typeId: number)`

- **Description**: Retrieves an address by its type for a specific person.
- **Parameters**:
  - `personId`: The ID of the associated person.
  - `typeId`: The ID of the address type.

#### `getAddressById(addressId: number)`

- **Description**: Retrieves a specific address by ID.
- **Parameters**:
  - `addressId`: The unique ID of the address.

#### `update(addressId: number, data: UpdatePersonAddressDTO)`

- **Description**: Updates an address’s fields by its ID.
- **Parameters**:
  - `addressId`: The unique ID of the address to update.
  - `data`: Updated address data.

#### `remove(addressId: number)`

- **Description**: Deletes an address by its ID.
- **Parameters**:
  - `addressId`: The unique ID of the address to delete.

### Folder Structure

```plaintext
|── dto/                         # Data Transfer Objects
│   ├── create-address.dto.ts    # DTO for creating addresses
│   └── update-address.dto.ts    # DTO for updating addresses
|── address.controller.ts        # Controller for address
|── address.module.ts            # Module definition for address
|── address.service.ts           # Service class for address logic
├── address.service.spec.ts      # Testing file for address service
```

---

# Address Type

**AddressType** module provides management capabilities for address types within a system, enabling CRUD operations and localization features. This module is especially useful for applications that require multiple address categorizations (e.g., residential, commercial) with support for multi-language labels.

### Controller Endpoints

#### `POST /address-types`

- **Description**: Creates a new address type.
- **Body**:
  - `CreateAddressTypeDTO`: The data required to create an address type, including fields like name and additional optional properties.

#### `GET /address-types`

- **Description**: Retrieves all address types, supporting pagination and localization.
- **Parameters**:
  - `paginationParams (query param, optional)`: Controls pagination parameters (page, limit).
  - `locale (query param, optional)`: The locale code to filter address type translations.

#### `GET /address-types/:id`

- **Description**: Retrieves a specific address type by its ID.
- **Parameters**:
  - `id (URL param)`: The unique ID of the address type.

#### `PATCH /address-types/:id`

- **Description**: Updates an existing address type.
- **Parameters**:
  - `id (URL param)`: The unique ID of the address type to update.
- **Body**:
  - `UpdateAddressTypeDTO`: Data for updating the address type’s properties.

#### `DELETE /address-types`

- **Description**: Deletes one or more address types.
- **Body**:
  - `DeleteDTO`: An object containing the IDs of the address types to delete.

### Service Methods

#### `create(data: CreateAddressTypeDTO)`

- **Description**: Creates a new address type entry in the database.
- **Parameters**:
  - `data`: The data required to create an address type, following the CreateAddressTypeDTO structure.

#### `getAddressTypes(locale: string, paginationParams: PaginationDTO)`

- **Description**: Retrieves paginated address types, including translations based on the specified locale.
- **Parameters**:
  - `locale`: The locale code to filter the translations for address type names.
  - `paginationParams`: Pagination parameters like page and limit.

#### `getAddressTypeById(id: number)`

- **Description**: Retrieves a specific address type by its ID.
- **Parameters**:
  - `id`: The unique identifier of the address type to retrieve.

#### `update(id: number, data: UpdateAddressTypeDTO)`

- **Description**: Updates an address type’s fields by its ID.
- **Parameters**:
  - `id`: The unique identifier of the address type to update.
  - `data`: Updated fields for the address type.

#### `remove(data: DeleteDTO)`

- **Description**: Deletes one or more address types by their IDs.
- **Parameters**:
  - `data`: Object containing an array of ids for the address types to delete.

### Folder Structure

```plaintext
|── dto/                              # Data Transfer Objects
│   ├── create-address-type.dto.ts    # DTO for creating address types
│   └── update-address-type.dto.ts    # DTO for updating address types
|── address-type.controller.ts        # Controller for address-type
|── address-type.module.ts            # Module definition for address-type
|── address-type.service.ts           # Service class for address-type logic
├── address-type.service.spec.ts      # Testing file for address-type service
```

---

# Contact

The **Contact** module manages contacts associated with individual profiles, enabling CRUD operations and offering support for multiple contact types. This module allows you to create, retrieve, update, and delete contacts for a person and provides filtering options based on contact type or specific contact IDs.

### Controller Endpoints

#### `POST /persons/:personId/contacts`

- **Description**: Creates a new contact for a person.
- **Parameters**:
  - `personId (URL param)`: The ID of the person associated with the contact.
- **Body:**
  - `CreatePersonContactDTO`: Data required to create the contact, including fields like type_id, value, primary, etc.

#### `GET /persons/:personId/contacts`

- **Description**: Retrieves contacts associated with a specific person, with optional filtering by contact type or contact ID.
- **Parameters**:
  - `personId (URL param)`: The ID of the person.
  - `typeId (query param, optional)`: Filters results by a specific contact type.
  - `contactId (query param, optional)`: Retrieves a specific contact by ID.

#### `PATCH /persons/:personId/contacts/:contactId`

- **Description**: Updates an existing contact for a person.
- **Parameters**:
  - `personId (URL param)`: The ID of the person.
  - `contactId (URL param)`: The ID of the contact to update.
- **Body**:
  - `UpdatePersonContactDTO`: Data for updating contact fields.

#### `DELETE /persons/:personId/contacts/:contactId`

- **Description**: Deletes a contact associated with a person.
- **Parameters**:
  - `personId (URL param)`: The ID of the person.
  - `contactId (URL param)`: The ID of the contact to delete.

### Service Methods

#### `create(personId: number, data: CreatePersonContactDTO)`

- **Description**: Creates a new contact entry in the database linked to a specific personId.
- **Parameters**:
  - `personId`: The ID of the associated person.
  - `data`: Contact data, including type_id, value, primary, and other details.

#### `getContacts(personId: number)`

- **Description**: Retrieves paginated contact data associated with a specific person.
- **Parameters**:
  - `personId`: The ID of the associated person.

#### `getContactByTypeId(personId: number, typeId: number)`

- **Description**: Retrieves a contact by its type for a specific person.
- **Parameters**:
  - `personId`: The ID of the associated person.
  - `typeId`: The ID of the contact type.

#### `getContactById(contactId: number)`

- **Description**: Retrieves a specific contact by ID.
- **Parameters**:
  - `contactId`: The unique ID of the contact.

#### `update(contactId: number, data: UpdatePersonContactDTO)`

- **Description**: Updates a contact’s fields by its ID.
- **Parameters**:
  - `contactId`: The unique ID of the contact to update.
  - `data`: Updated contact data.

#### `remove(contactId: number)`

- **Description**: Deletes a contact by its ID.
- **Parameters**:
  - `contactId`: The unique ID of the contact to delete.

### Folder Structure

```plaintext
|── dto/                         # Data Transfer Objects
│   ├── create-contact.dto.ts    # DTO for creating contacts
│   └── update-contact.dto.ts    # DTO for updating contacts
|── contact.controller.ts        # Controller for contact
|── contact.module.ts            # Module definition for contact
|── contact.service.ts           # Service class for contact logic
├── contact.service.spec.ts      # Testing file for contact service
```

---

# Contact Type

**Contact Type** module manages different categories or types of contacts, supporting internationalization, pagination, and CRUD operations. This allows admins to define and maintain the types of contacts associated with person records.

### Controller Endpoints

#### `POST /contact-types`

- **Description**: Creates a new contact type.
- **Body**:
  - `CreateContactTypeDTO`: The data required to create a contact type, including fields like name and optional translations.

#### `GET /contact-types`

- **Description**: Retrieves paginated contact types, including localized translations based on the provided locale.
- **Parameters**:
  - `paginationParams (query)`: Optional pagination parameters from @hedhog/pagination.
  - `locale (query)`: The locale code for retrieving contact type translations.

#### `GET /contact-types/:id`

- **Description**: Retrieves a contact type by its ID.
- **Parameters**:
  - `id (URL param)`: The unique ID of the contact type.

#### `PATCH /contact-types/:id`

- **Description**: Updates an existing contact type.
- **Parameters**:
  - `id (URL param)`: The unique ID of the contact type to update.
- **Body**:
  - `UpdateContactTypeDTO`: Updated data for the contact type, including translated values.

#### `DELETE /contact-types`

- **Description**: Deletes multiple contact types by their IDs.
- **Body**:
  - `DeleteDTO`: A list of IDs to delete.

### Service Methods

#### `create(data: CreateContactTypeDTO)`

- **Description**: Creates a new contact type record.
- **Parameters**:
  - `data`: Information to create the contact type, including name and optional translations.

#### `getContactTypes(locale: string, paginationParams: PaginationDTO)`

- **Description**: Retrieves paginated contact types, applying locale-based translations.
- **Parameters**:
  - `locale`: The locale code for the required translation.
  - `paginationParams`: Pagination options.

#### `getContactTypeById(id: number)`

- **Description**: Retrieves a specific contact type by its ID.
- **Parameters**:
  - `id`: The unique ID of the contact type.

#### `update(id: number, data: UpdateContactTypeDTO)`

- **Description**: Updates an existing contact type by ID.
- **Parameters**:
  - `id`: The unique ID of the contact type.
  - `data`: New data for updating the contact type.

#### `remove({ ids }: DeleteDTO)`

- **Description**: Deletes multiple contact types specified by an array of IDs.
- **Parameters**:
  - `ids`: Array of contact type IDs to delete.

### Folder Structure

```plaintext
|── dto/                              # Data Transfer Objects
│   ├── create-contact-type.dto.ts    # DTO for creating contact-types
│   └── update-contact-type.dto.ts    # DTO for updating contact-types
|── contact-type.controller.ts        # Controller for contact-type
|── contact-type.module.ts            # Module definition for contact-type
|── contact-type.service.ts           # Service class for contact-type logic
├── contact-type.service.spec.ts      # Testing file for contact-type service
```

---

# Country

**Country** module has a simple setup for managing and retrieving country data. This module includes a basic controller to fetch all countries and a service to interface with the database using `PrismaService`.

### Controller Endpoints

#### `GET /countries`

- **Description**: Retrieves a list of all countries.

### Service Methods

#### `getAll()`

- **Description**: Retrieves all countries from the database.

### Folder Structure

```plaintext
|── country.controller.ts        # Controller for country
|── country.module.ts            # Module definition for country
|── country.service.ts           # Service class for country logic
├── country.service.spec.ts      # Testing file for contact-type service
```

---

# Custom

The **Custom** module is used to manage custom data associated with persons. This module includes a controller to handle various endpoints for CRUD operations on custom data and a service to interact with the database via `PrismaService`.

### Controller Endpoints

#### `POST /persons/:personId/customs`

- **Description**: Creates a custom record for a specific person.
- **Parameters**:
  - `personId` (path): ID of the person.
  - `data` (body): Object containing custom data (`name`, `value`, etc.) as defined in `CreatePersonCustomDTO`.

#### `GET /persons/:personId/customs`

- **Description**: Retrieves a list of all custom records for a specific person.
- **Parameters**:
  - `personId` (path): ID of the person.
  - `typeId` (query, optional): Filters custom records by type.
  - `id` (query, optional): Retrieves a specific custom record by ID if provided.

#### `PATCH /persons/:personId/customs/:customId`

- **Description**: Updates a specific custom record.
- **Parameters**:
  - `personId` (path): ID of the person.
  - `customId` (path): ID of the custom record.
  - `data` (body): Object containing updated custom data fields as defined in `UpdatePersonCustomDTO`.

#### `DELETE /persons/:personId/customs/:customId`

- **Description**: Deletes a specific custom record.
- **Parameters**:
  - `personId` (path): ID of the person.
  - `customId` (path): ID of the custom record.

### Service Methods

#### `create(personId: number, data: CreatePersonCustomDTO)`

- **Description**: Creates a custom record associated with a specific person.
- **Parameters**:
  - `personId`: ID of the person.
  - `data`: Object containing custom data (`name`, `value`, etc.).

#### `getCustoms(personId: number)`

- **Description**: Retrieves all custom records for a specific person with pagination.
- **Parameters**:
  - `personId`: ID of the person.

#### `getCustomByTypeId(personId: number, typeId: number)`

- **Description**: Retrieves a custom record for a person filtered by a specific type ID.
- **Parameters**:
  - `personId`: ID of the person.
  - `typeId`: ID of the custom type.

#### `getCustomById(customId: number)`

- **Description**: Retrieves a specific custom record by its ID.
- **Parameters**:
  - `customId`: ID of the custom record.

#### `update(customId: number, data: UpdatePersonCustomDTO)`

- **Description**: Updates a specific custom record with new data.
- **Parameters**:
  - `customId`: ID of the custom record.
  - `data`: Object containing updated custom data fields.

#### `remove(customId: number)`

- **Description**: Deletes a specific custom record.
- **Parameters**:
  - `customId`: ID of the custom record.

### Folder Structure

```plaintext
|── dto/                         # Data Transfer Objects
│   ├── create-custom.dto.ts     # DTO for creating customs
│   └── update-custom.dto.ts     # DTO for updating customs
|── custom.controller.ts         # Controller for custom
|── custom.module.ts             # Module definition for custom
|── custom.service.ts            # Service class for custom logic
├── custom.service.spec.ts       # Testing file for custom service
```

---

# Custom Type

The **Custom Type** module is responsible for managing types for custom data associated with persons. It includes a controller to handle CRUD operations and a service to manage database interactions using `PrismaService` and `PaginationService`.

### Controller Endpoints

#### `POST /custom-types`

- **Description**: Creates a new custom type.
- **Parameters**:
  - `data` (body): Object containing custom type data as defined in `CreateCustomTypeDTO`.

#### `GET /custom-types`

- **Description**: Retrieves a paginated list of custom types.
- **Parameters**:
  - `paginationParams` (query): Optional pagination parameters.

#### `GET /custom-types/:id`

- **Description**: Retrieves a specific custom type by its ID.
- **Parameters**:
  - `id` (path): ID of the custom type.

#### `PATCH /custom-types/:id`

- **Description**: Updates a specific custom type.
- **Parameters**:
  - `id` (path): ID of the custom type.
  - `data` (body): Object containing updated custom type fields as defined in `UpdateCustomTypeDTO`.

#### `DELETE /custom-types`

- **Description**: Deletes multiple custom types based on provided IDs.
- **Parameters**:
  - `data` (body): Object containing an array of IDs to delete as defined in `DeleteDTO`.

### Service Methods

#### `create(data: CreateCustomTypeDTO)`

- **Description**: Creates a new custom type in the database.
- **Parameters**:
  - `data`: Object with fields required to define a custom type.

#### `getcustomTypes(paginationParams: PaginationDTO)`

- **Description**: Retrieves a paginated list of custom types with optional search filters.
- **Parameters**:
  - `paginationParams`: Optional pagination and filtering parameters.

#### `getcustomTypeById(id: number)`

- **Description**: Retrieves a specific custom type by ID.
- **Parameters**:
  - `id`: ID of the custom type.

#### `update(id: number, data: UpdateCustomTypeDTO)`

- **Description**: Updates a custom type with new data.
- **Parameters**:
  - `id`: ID of the custom type.
  - `data`: Object containing updated custom type fields.

#### `remove(data: DeleteDTO)`

- **Description**: Deletes custom types with specified IDs.
- **Parameters**:
  - `data`: Object containing an array of custom type IDs to delete.

### Folder Structure

```plaintext
|── dto/                          # Data Transfer Objects
│   ├── create-custom-type.dto.ts # DTO for creating custom-types
│   └── update-custom-type.dto.ts # DTO for updating custom-types
|── custom-type.controller.ts     # Controller for custom types
|── custom-type.module.ts         # Module definition for custom types
|── custom-type.service.ts        # Service class for custom type logic
├── custom-type.service.spec.ts   # Testing file for custom type service
```

---

# Document

The **Document** module handles operations related to documents associated with persons, including CRUD operations and pagination. It allows retrieving documents based on various criteria, such as document ID and type ID.

### Controller Endpoints

#### `POST /persons/:personId/documents`

- **Description**: Creates a new document for a specified person.
- **Parameters**:
  - `personId` (path): ID of the person associated with the document.
  - `data` (body): Document data as defined in `CreatePersonDocumentDTO`.

#### `GET /persons/:personId/documents`

- **Description**: Retrieves documents for a specified person, with optional filtering by `typeId` or `documentId`.
- **Parameters**:
  - `personId` (path): ID of the person whose documents are being retrieved.
  - `typeId` (query): Optional type ID to filter documents by type.
  - `documentId` (query): Optional document ID to retrieve a specific document.

#### `PATCH /persons/:personId/documents/:documentId`

- **Description**: Updates a specific document associated with a person.
- **Parameters**:
  - `personId` (path): ID of the person.
  - `documentId` (path): ID of the document to be updated.
  - `data` (body): Document data as defined in `UpdatePersonDocumentDTO`.

#### `DELETE /persons/:personId/documents/:documentId`

- **Description**: Deletes a specific document.
- **Parameters**:
  - `personId` (path): ID of the person.
  - `documentId` (path): ID of the document to delete.

### Service Methods

#### `create(personId: number, data: CreatePersonDocumentDTO)`

- **Description**: Creates a new document for a specific person.
- **Parameters**:
  - `personId`: ID of the person associated with the document.
  - `data`: Object containing document information as defined in `CreatePersonDocumentDTO`.

#### `getDocuments(personId: number)`

- **Description**: Retrieves all documents for a specific person, with pagination.
- **Parameters**:
  - `personId`: ID of the person.

#### `getDocumentByTypeId(personId: number, typeId: number)`

- **Description**: Retrieves a document by its type ID for a specific person.
- **Parameters**:
  - `personId`: ID of the person.
  - `typeId`: Type ID of the document.

#### `getDocumentById(documentId: number)`

- **Description**: Retrieves a document by its unique document ID.
- **Parameters**:
  - `documentId`: ID of the document.

#### `update(documentId: number, data: UpdatePersonDocumentDTO)`

- **Description**: Updates a document’s data.
- **Parameters**:
  - `documentId`: ID of the document to update.
  - `data`: Document data to update.

#### `remove(documentId: number)`

- **Description**: Deletes a document by its ID.
- **Parameters**:
  - `documentId`: ID of the document to delete.

### Folder Structure

```plaintext
├── dto
│   ├── create-document.dto.ts   # DTO for creating a document
│   └── update-document.dto.ts   # DTO for updating a document
|── document.controller.ts       # Controller for document routes
|── document.module.ts           # Module definition for documents
|── document.service.ts          # Service class for document operations
├── document.service.spec.ts     # Testing file for document service
```

---

# Document Type

The **Document Type** module manages document type definitions used for categorizing documents associated with persons. It includes operations for creating, reading, updating, and deleting document types, with support for pagination and localization.

### Controller Endpoints

#### `POST /document-types`

- **Description**: Creates a new document type.
- **Parameters**:
  - `data` (body): Document type data as defined in `CreateDocumentTypeDTO`.

#### `GET /document-types`

- **Description**: Retrieves all document types with optional pagination and locale-based translations.
- **Parameters**:
  - `paginationParams` (query): Optional pagination parameters.
  - `locale` (header): Locale for fetching translated document type names.

#### `GET /document-types/:id`

- **Description**: Retrieves a document type by its unique ID.
- **Parameters**:
  - `id` (path): ID of the document type.

#### `PATCH /document-types/:id`

- **Description**: Updates a specific document type.
- **Parameters**:
  - `id` (path): ID of the document type.
  - `data` (body): Document type data to update as defined in `UpdateDocumentTypeDTO`.

#### `DELETE /document-types`

- **Description**: Deletes multiple document types by ID.
- **Parameters**:
  - `data` (body): Array of IDs of document types to delete, as defined in `DeleteDTO`.

### Service Methods

#### `create(data: CreateDocumentTypeDTO)`

- **Description**: Creates a new document type entry.
- **Parameters**:
  - `data`: Object containing document type information as defined in `CreateDocumentTypeDTO`.

#### `getDocumentTypes(locale: string, paginationParams: PaginationDTO)`

- **Description**: Retrieves all document types with pagination and locale-based translations.
- **Parameters**:
  - `locale`: Locale for fetching translated document type names.
  - `paginationParams`: Pagination parameters.

#### `getDocumentTypeById(id: number)`

- **Description**: Retrieves a document type by its unique ID.
- **Parameters**:
  - `id`: ID of the document type.

#### `update(id: number, data: UpdateDocumentTypeDTO)`

- **Description**: Updates a document type.
- **Parameters**:
  - `id`: ID of the document type to update.
  - `data`: Document type data as defined in `UpdateDocumentTypeDTO`.

#### `remove(data: DeleteDTO)`

- **Description**: Deletes multiple document types.
- **Parameters**:
  - `data`: Object containing an array of IDs to delete.

### Folder Structure

```plaintext
├── dto
│   ├── create-document-type.dto.ts   # DTO for creating a document type
│   ├── update-document-type.dto.ts   # DTO for updating a document type
|── document-type.controller.ts       # Controller for document type routes
|── document-type.module.ts           # Module definition for document types
|── document-type.service.ts          # Service class for document type operations
├── document-type.service.spec.ts     # Testing file for document type service
```

---

# Person

The **Person** module is designed to manage person-related data, including details such as types, documents, contacts, addresses, and custom fields. It supports multilingual features for localized data representation and provides various operations for creating, retrieving, updating, and deleting persons in the system.

## Controller Endpoints

### `POST /persons`

- **Description**: Creates a new person in the system.
- **Parameters**:
  - `data` (body): Data for the person, defined in `CreatePersonDTO`.

### `GET /persons`

- **Description**: Retrieves all persons with pagination and locale-based translations.
- **Parameters**:
  - `paginationParams` (query): Optional pagination parameters.
  - `locale` (header): Locale to fetch translated names of person types.

### `GET /persons/:id`

- **Description**: Retrieves a person by their ID.
- **Parameters**:
  - `id` (path): Unique identifier of the person.

### `PATCH /persons/:id`

- **Description**: Updates a specific person's details.
- **Parameters**:
  - `id` (path): Unique identifier of the person.
  - `data` (body): Data for updating, defined in `UpdatePersonDTO`.

### `DELETE /persons`

- **Description**: Deletes multiple persons by their IDs.
- **Parameters**:
  - `data` (body): Array of person IDs to delete, defined in `DeleteDTO`.

## Service Methods

### `create(data: CreatePersonDTO)`

- **Description**: Creates a new person in the database.
- **Parameters**:
  - `data`: Object containing person information as defined in `CreatePersonDTO`.

### `getPersons(locale: string, paginationParams: PaginationDTO)`

- **Description**: Retrieves all persons with pagination and locale-based translations.
- **Parameters**:
  - `locale`: Locale to fetch translated names of person-related data.
  - `paginationParams`: Pagination parameters.

### `getPersonById(id: number)`

- **Description**: Retrieves a person by their unique ID.
- **Parameters**:
  - `id`: Unique identifier of the person.

### `update(id: number, data: UpdatePersonDTO)`

- **Description**: Updates a person's details in the database.
- **Parameters**:
  - `id`: Unique identifier of the person to be updated.
  - `data`: Data for updating, as defined in `UpdatePersonDTO`.

### `remove(data: DeleteDTO)`

- **Description**: Deletes multiple persons from the database by their IDs.
- **Parameters**:
  - `data`: Object containing an array of person IDs to delete.

---

# Person Type

The **Person Type** module manages person type classifications used for categorizing different types of persons within the application. It provides endpoints for creating, reading, updating, and deleting person types, supporting pagination and locale-based translations.

### Controller Endpoints

#### `POST /person-types`

- **Description**: Creates a new person type.
- **Parameters**:
  - `data` (body): Data for the person type, defined in `CreatePersonTypeDTO`.

#### `GET /person-types`

- **Description**: Retrieves all person types with pagination and locale-based translations.
- **Parameters**:
  - `paginationParams` (query): Optional pagination parameters.
  - `locale` (header): Locale to fetch translated names of person types.

#### `GET /person-types/:id`

- **Description**: Retrieves a person type by its ID.
- **Parameters**:
  - `id` (path): ID of the person type.

#### `PATCH /person-types/:id`

- **Description**: Updates a specific person type.
- **Parameters**:
  - `id` (path): ID of the person type.
  - `data` (body): Data for updating, defined in `UpdatePersonTypeDTO`.

#### `DELETE /person-types`

- **Description**: Deletes multiple person types by IDs.
- **Parameters**:
  - `data` (body): Array of person type IDs to delete, defined in `DeleteDTO`.

### Service Methods

#### `create(data: CreatePersonTypeDTO)`

- **Description**: Creates a new person type.
- **Parameters**:
  - `data`: Object containing person type information as defined in `CreatePersonTypeDTO`.

#### `getPersonTypes(locale: string, paginationParams: PaginationDTO)`

- **Description**: Retrieves all person types with pagination and locale-based translations.
- **Parameters**:
  - `locale`: Locale to fetch translated names of person types.
  - `paginationParams`: Pagination parameters.

#### `getPersonTypeById(id: number)`

- **Description**: Retrieves a person type by its ID.
- **Parameters**:
  - `id`: ID of the person type.

#### `update(id: number, data: UpdatePersonTypeDTO)`

- **Description**: Updates a person type.
- **Parameters**:
  - `id`: ID of the person type to update.
  - `data`: Data for updating, as defined in `UpdatePersonTypeDTO`.

#### `remove(data: DeleteDTO)`

- **Description**: Deletes multiple person types.
- **Parameters**:
  - `data`: Object containing an array of person type IDs to delete.

### Folder Structure

```plaintext
├── dto
│   ├── create-person-type.dto.ts     # DTO for creating a person type
│   ├── update-person-type.dto.ts     # DTO for updating a person type
|── person-type.controller.ts         # Controller for person type routes
|── person-type.module.ts             # Module definition for person types
|── person-type.service.ts            # Service class for person type operations
├── person-type.service.spec.ts       # Testing file for person type service
```
