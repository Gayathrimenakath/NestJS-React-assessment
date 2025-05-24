# Syntech Assessment - Full Stack React & NestJS Project

This project consists of a **NestJS backend** and a **React (Vite) frontend**.

## Project Structure

- `/backend` - NestJS API server handling project data and operations.
- `/frontend` - React app for UI, managing project details and assets.
- Root directory contains scripts to run both servers concurrently.

## API Endpoints
- POST /projects/:projectID/newLink — Add a new link
- POST /projects/:projectID/newCustomField — Add a new custom field

## Future Improvements

- Expand media handling to support file uploads.
- Improve validation with custom error messages and inline hints.
- Make Modal components resuable
- Add test

### Install the dependencies

Install dependencies for both the frontend and backend:

```bash
npm install-all
```

### Run Both Servers Concurrently

From the root directory, use the following command to start both servers:

```bash
npm run dev
```

This will:

- Start the NestJS backend server on **http://localhost:3000.**
- Start the React (Vite) frontend development server on **http://localhost:5173.**
- Open your browser and navigate to **http://localhost:5173** to view the application.