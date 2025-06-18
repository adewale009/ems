<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

<h2 align="center">Employee Management System (EMS)</h2>

<p align="center">A modular, scalable backend system for managing employees and departments, built with NestJS, PostgreSQL, and TypeORM.</p>

<p align="center">
  <a href="https://nestjs.com/" target="_blank"><img src="https://img.shields.io/badge/framework-nestjs-red.svg" alt="NestJS" /></a>
  <a href="https://www.postgresql.org/" target="_blank"><img src="https://img.shields.io/badge/database-postgresql-blue.svg" alt="PostgreSQL" /></a>
  <a href="https://www.typescriptlang.org/" target="_blank"><img src="https://img.shields.io/badge/language-typescript-yellow.svg" alt="TypeScript" /></a>
</p>

---

## Project Overview

This Employee Management System (EMS) provides a backend API to manage:

- Employee records
- Department assignments
- Modular scalability for future RBAC, role assignments, pagination, file uploads, and more

Built for maintainability using:

- **NestJS**
- **PostgreSQL**
- **TypeORM**
- **Clean Architecture**
- **SOLID Principles**

**GitHub Repo:** [github.com/adewale009/ems](https://github.com/adewale009/ems)

---

## Architecture & Workflow

follows a layered Clean Architecture structure with Domain-Driven Design:

Controller → Broker → Use Case → Service → Repository → Database


Each module is self-contained and follows the atomic file structure. Code is separated into layers for testability and clarity.

---

## Modules

### Employee Module

- **Create Employee**
- **Get All Employees**
- **Get Single Employee**
- **Update Employee**
- **Delete Employee**
- **Assign to Department**

#### Employee Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/create-employee` | Create a new employee |
| GET    | `/employees` | Get list of all employees |
| GET    | `/get-employee` | Get a single employee by ID |
| PATCH  | `/update-employee` | Update an employee |
| DELETE | `/delete-employee` | Delete an employee |
| PATCH  | `/assign-department` | Assign employee to a department |

---

### Department Module

- **Create Department**
- **Get All Departments**
- **Get Single Department**
- **Update Department**
- **Delete Department**

#### Department Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST   | `/create-department` | Create a new department |
| GET    | `/department-all` | Get list of all departments |
| GET    | `/:id` | Get a department by ID |
| PATCH  | `/update-department` | Update a department |
| DELETE | `/delete-department` | Delete a department |

---

## Process Flow Example

### Creating & Assigning an Employee

Client → Controller → Broker → CreateEmployeeUseCase  
→ EmployeeService → EmployeeRepository → PostgreSQL

Then:  
Client → Controller → Broker → AssignEmployeeToDepartmentUseCase  
→ DepartmentService → DepartmentRepository → PostgreSQL
→ Validates employee & department → Saves relation


---

## Tech Stack

- **Backend Framework:** NestJS (TypeScript)
- **Database:** PostgreSQL
- **ORM:** TypeORM
- **Docs:** Swagger (OpenAPI)
- **Testing:** Jest
- **Dev Tools:** ESLint, Prettier, Postman

---

## API Documentation

- Swagger UI: [http://localhost:3001/api](http://localhost:3001/api)  

---

## Postman Collection

- Postman Collection: [EMS Postman Docs]([https://www.postman.com/collections/your-postman-link-here](https://grey-meadow-397736.postman.co/workspace/59e77523-bda8-45cf-9d9d-64c624e195ba/collection/26326672-6c96be8a-dfd3-4655-9601-bdb17f5f660c?action=share&source=copy-link&creator=26326672)) 

---

## Blockers & Resolutions

### Circular Dependencies
- **Problem:** Module import loops broke DI
- **Solution:** Restructured into clean module boundaries using CoreModule and dependency injection.

###  Employee–Department Link Logic
- **Problem:** No logic to assign employees to departments
- **Solution:** Introduced a broker and `AssignDepartmentUseCase` to bridge logic properly.

### DB Setup Issues
- **Problem:** PostgreSQL config differed across systems
- **Solution:** Added `.env.example`, standard PostgreSQL config, and recommended Docker option for local DB.

### Testing On Postman Issues
- **Problem:** Bugs while testing
- **Solution:** Debugged the codebase, mostly the usecases and service logics
---

## Running Locally

```bash
# 1. Clone the repo
git clone https://github.com/adewale009/ems.git
cd ems

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env

# 4. Run DB migrations if needed
npm run migration:run

# 5. Start development server
npm run start:dev

# Swagger available at http://localhost:3000/api
```
## Running Tests

- Unit tests
npm run test

- E2E tests
npm run test:e2e

- Coverage report
npm run test:cov

## Future Improvements
- Role-Based Access Control (RBAC)

- Full Audit Logs

- Webhooks for HR notifications

- Cloud-based DB config (for staging/production)

- CI/CD Integration with GitHub Actions or CircleCI

- Image/File uploads

- Pagination, Filtering & Sorting

## Maintainer
Adewale – Backend Developer

Architected project structure

Implemented core modules and business logic

Led documentation and code quality

## License
This project is open-sourced under the MIT license.

docs: replaced default readme with complete EMS documentation
