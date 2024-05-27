# Learning Management System (LMS) Platform

## Introduction

This Learning Management System (LMS) platform is developed using Next.js and serves as a comprehensive solution for online education. It supports both students and teachers, providing various features to facilitate online learning and course management. This project was created for educational purposes to explore and implement modern web development technologies and practices.

## Features

### For Teachers
- **Course Creation:** Create and manage courses.
- **Chapter Management:** Add and organize chapters within courses.
- **Content Upload:** Upload chapter-wise videos, PDFs, and other materials.
- **Media Handling:** Use Uploadthing for managing uploads and Mux for video presentation.

### For Students
- **Course Enrollment:** Enroll in available courses.
- **Content Access:** Access course videos and materials uploaded by teachers.

## Technologies Used

- **Frontend:** Next.js
- **Authentication:** Clerk.js for sign-in and sign-up functionality.
- **File Uploads:** Uploadthing for handling uploads of videos, PDFs, photos, and other files.
- **Video Streaming:** Mux for video presentation within the app.
- **Payment Integration:** Stripe for handling payments.
- **Database:** Prisma ORM for interacting with a PostgreSQL database.
- **UI Components:** Shadcn library for styling and UI components.

## Setup and Installation

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL
- Stripe Account
- Mux Account
- Clerk.js Account
- Uploadthing Account

### Steps

1. **Clone the Repository**
   ```sh
   git clone <repository_url>
   cd <repository_directory>
   ```

2. **Install Dependencies**
   ```sh
   npm install
   ```

3. **Environment Variables**
   Copy the provided `.env.example` to `.env` and fill in the necessary values.

4. **Run Database Migrations**
   ```sh
   npx prisma migrate dev
   ```

5. **Start the Development Server**
   ```sh
   npm run dev
   ```

6. **Access the Application**
   Open your browser and navigate to `http://localhost:3000`.

## Project Structure

- **/pages**: Contains all the Next.js pages for routing.
- **/components**: Reusable UI components.
- **/lib**: Configuration files and utility functions.
- **/prisma**: Prisma schema and migration files.
- **/public**: Static assets like images and icons.
- **/styles**: Global styles and CSS modules.

## How to Use

### Teacher Workflow
1. Sign up or log in using Clerk.js.
2. Create a new course.
3. Add chapters to the course.
4. Upload videos and materials to each chapter using Uploadthing.
5. Manage courses and content through the teacher dashboard.

### Student Workflow
1. Sign up or log in using Clerk.js.
2. Browse available courses.
3. Enroll in a course.
4. Access course content, including videos and materials, through the student dashboard.
5. Complete course and track progress.

## Contributions

Contributions are welcome! Feel free to submit issues or pull requests to enhance the functionality and improve the platform.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Clerk.js](https://clerk.dev/)
- [Uploadthing](https://uploadthing.com/)
- [Mux](https://mux.com/)
- [Stripe](https://stripe.com/)
- [Prisma](https://www.prisma.io/)
- [Shadcn](https://shadcn.dev/)

---

This project was developed for learning purposes only.
