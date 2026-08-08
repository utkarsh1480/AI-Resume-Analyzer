# GenAi

A full-stack interview preparation platform with AI-powered report generation, resume parsing, and PDF export.

## Project Structure

- `Client/` - React + Vite frontend
- `Server/` - Node.js + Express backend

## Features

- Upload a resume PDF and generate an AI-driven interview report
- Save interview reports per authenticated user
- Generate custom PDF resumes from AI content
- Secure authentication with JWT cookies

## Requirements

- Node.js 20+ (recommended)
- MongoDB running locally or accessible via URI
- Google GenAI API key in the server environment

## Setup

### Server

1. Open terminal in `Server/`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file next to `server.js` with:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/genai
   GOOGLE_GENAI_API_KEY=your_google_genai_api_key
   JWT_SECRET=your_jwt_secret
   ```
4. Start the backend:
   ```bash
   npm start
   ```

### Client

1. Open terminal in `Client/`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend:
   ```bash
   npm run dev
   ```

## Usage

1. Register or login from the app frontend
2. Upload a resume PDF or provide a self description
3. Submit the form to generate an interview report
4. View saved reports and download AI-generated PDF resumes

## Notes

- The backend uses cookies for auth. The frontend `axios` config includes `withCredentials: true`.
- The AI service is configured in `Server/src/services/ai.services.js`.
- Resume parsing uses `pdf-parse` and exported PDFs use `puppeteer`.

## Folder overview

- `Client/src/feature/Interview/` - interview report pages, hooks, services
- `Server/src/controllers/` - API controllers
- `Server/src/routes/` - express routes
- `Server/src/services/` - AI and auth logic
- `Server/src/Model/` - Mongoose models
