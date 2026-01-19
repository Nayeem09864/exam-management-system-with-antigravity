# Exam Management System (EMS)

A comprehensive web-based Exam Management System designed to facilitate the creation, management, and execution of online MCQ examinations. This system provides distinct portals for Examiners and Candidates, allowing for efficient exam administration and fair assessment.

## 🚀 Features

### for Examiners
- **Dashboard**: Overview of exams and candidates.
- **Question Management**: centralized question bank management.
- **Exam Creation**: Flexible exam creation tools.
- **Candidate Management**: Manage candidates, including bulk import via Excel.
- **Results & Evaluation**: Automated result generation and reporting.

### for Candidates
- **Secure Access**: Secure login and exam access controls.
- **Exam Interface**: Timed examination interface with auto-submission.
- **History**: View past exam results and performance.

### General
- **Role-Based Authentication**: Secure access using JWT (JSON Web Tokens) with Spring Security.
- **Responsive Design**: Modern, responsive UI built with Angular and Tailwind CSS.
- **Data Import**: Support for importing data via Excel files.

## 🛠 Technology Stack

### Backend
- **Language**: Java 17
- **Framework**: Spring Boot 3.2.0
- **Security**: Spring Security, JWT (Base64 encoded tokens)
- **Database**: MySQL (Production), H2 (Test/Dev)
- **Data Access**: Spring Data JPA
- **Utilities**: Lombok, Apache POI (Excel processing)
- **Build Tool**: Maven

### Frontend
- **Framework**: Angular v20
- **Styling**: Tailwind CSS 3.4
- **Language**: TypeScript
- **Build Tool**: Angular CLI

## 📋 Prerequisites

Before running the application, ensure you have the following installed:
- **Java Development Kit (JDK) 17**
- **Node.js** (Latest LTS recommended)
- **Maven**
- **MySQL Server**
- **Angular CLI** (`npm install -g @angular/cli`)

## ⚙️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd celestial-planetarium
```

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. The application is configured to use **H2 Database** (In-Memory) by default for development. No extra database setup is required to start.
   - Access H2 Console: `http://localhost:8085/h2-console`
   - JDBC URL: `jdbc:h2:mem:ems_db`
   - User: `sa`, Password: (empty)
   
3. (Optional) To use MySQL, update `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/ems_db
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
   ```
4. Build the application:
   ```bash
   mvn clean install
   ```
5. Run the application:
   ```bash
   mvn spring-boot:run
   ```
   The backend server will start on `http://localhost:8085`.

### 3. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   ng serve
   ```
4. Open your browser and navigate to `http://localhost:4200`.

## 🔒 Configuration

### Environment Variables / Properties
The backend uses standard Spring Boot configuration. Key properties to check in `application.properties`:
- `spring.datasource.*`: Database connection details.
- `jwt.secret`: Secret key for JWT token generation.
- `jwt.expiration`: Token expiration time.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
