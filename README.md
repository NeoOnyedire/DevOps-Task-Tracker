# DevOps Task Tracker

A full-stack application for managing and tracking DevOps tasks and workflows. The project provides a REST API backend built with Spring Boot and a React frontend for intuitive task management.

## Project Goal

The DevOps Task Tracker aims to provide DevOps teams with a centralized platform to:
- Create, read, update, and delete tasks
- Organize tasks by status (TODO, IN_PROGRESS, DONE)
- Assign tasks to team members
- Track task progress and history
- Streamline DevOps workflow management

## How It Works

### Architecture

The application follows a **three-layer architecture**:

```
Frontend (React/Vite) 
    ↓
REST API (Spring Boot)
    ↓
Database (H2/PostgreSQL)
```

### Core Components

#### Backend (Spring Boot)
- **Controller** (`TaskController`): REST endpoints for task operations
- **Service** (`TaskService`): Business logic for task management
- **Model** (`Task`): Task entity with properties like title, description, status, and assignee
- **Repository** (`TaskRepository`): Data access layer using Spring Data JPA
- **Database**: H2 for development, PostgreSQL support for production

#### Frontend (React)
- **React + Vite**: Modern frontend framework with fast build tooling
- **Axios**: HTTP client for API communication
- **Dashboard**: Main interface for task management
- **TaskCard**: Reusable component for displaying individual tasks

### Task Model

Each task contains:
- **ID**: Unique identifier
- **Title**: Task name
- **Description**: Detailed task information
- **Status**: One of `TODO`, `IN_PROGRESS`, or `DONE`
- **Assignee**: Team member assigned to the task
- **Created At**: Task creation timestamp

## Tech Stack

```
Backend:
- Java 21
- Spring Boot 3.2.2
- Spring Data JPA
- H2 Database (dev)
- PostgreSQL (production)
- Maven

Frontend:
- React 18.2
- Vite 5.0
- Axios 1.6
```

## Getting Started

### Prerequisites
- Java 21+
- Node.js 16+
- Maven 3.6+

### Backend Setup

1. Navigate to the project root directory:
   ```bash
   cd DevOps-Task-Tracker
   ```

2. Build the backend:
   ```bash
   mvn clean install
   ```

3. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```

The backend will start on `http://localhost:8080`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend will typically start on `http://localhost:5173`

## API Endpoints

The backend provides the following REST endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/tasks` | Create a new task |
| GET | `/api/tasks` | Retrieve all tasks |
| GET | `/api/tasks/status/{status}` | Get tasks by status (TODO, IN_PROGRESS, DONE) |
| PUT | `/api/tasks/{id}/status/{status}` | Update task status |
| DELETE | `/api/tasks/{id}` | Delete a task |

### Example Request

Create a new task:
```bash
curl -X POST http://localhost:8080/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Setup CI/CD Pipeline",
    "description": "Configure Jenkins for automated deployment",
    "status": "TODO",
    "assignee": "John Doe"
  }'
```

## Configuration

The application uses `application.yml` for configuration:

```yaml
spring:
  application:
    name: devops-task-tracker
  jpa:
    hibernate:
      ddl-auto: update
  datasource:
    url: jdbc:h2:mem:testdb  # Development
    # For production, use PostgreSQL
```

### Switching Databases

**Development (H2 - In-Memory)**:
```yaml
spring:
  datasource:
    url: jdbc:h2:mem:testdb
    driver-class-name: org.h2.Driver
```

**Production (PostgreSQL)**:
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/devops_tracker
    username: postgres
    password: your_password
    driver-class-name: org.postgresql.Driver
```

## Project Structure

```
DevOps-Task-Tracker/
├── src/
│   ├── main/java/com/naylor/devops/
│   │   ├── DevOpsTaskTrackerApplication.java
│   │   ├── controller/
│   │   │   └── TaskController.java
│   │   ├── model/
│   │   │   └── Task.java
│   │   ├── repository/
│   │   │   └── TaskRepository.java
│   │   └── service/
│   │       └── TaskService.java
│   ├── test/java/...
│   └── resources/
│       └── application.yml
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── api.js
│   │   ├── components/
│   │   │   └── TaskCard.jsx
│   │   └── pages/
│   │       └── Dashboard.jsx
│   ├── package.json
│   └── index.html
├── pom.xml
└── README.md
```

## Testing

Run the test suite:

```bash
mvn test
```

Tests are located in:
- `src/test/java/com/naylor/devops/controller/TaskControllerTest.java`
- `src/test/java/com/naylor/devops/service/TaskServiceTest.java`

## Build for Production

### Backend
```bash
mvn clean package
```

This generates a JAR file in the `target/` directory.

### Frontend
```bash
cd frontend
npm run build
```

This generates optimized static files in the `dist/` directory.

## Running Tests

Backend tests:
```bash
mvn test
```

## Future Enhancements

- [ ] User authentication and authorization
- [ ] Task filtering and sorting UI
- [ ] Task priority levels
- [ ] Due dates and reminders
- [ ] Task comments and activity logs
- [ ] Docker containerization
- [ ] CI/CD pipeline integration
- [ ] WebSocket support for real-time updates

## Contributing

To contribute to this project:
1. Create a feature branch
2. Make your changes
3. Add tests for new functionality
4. Submit a pull request

## License

This project is open source and available under the MIT License.

## Contact

For questions or suggestions, please reach out to the development team.
