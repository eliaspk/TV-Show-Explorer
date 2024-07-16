# TV Show Explorer Frontend

## Overview

Frontend for the TV Show Explorer webapp, a platform that allows users to discover, search, and manage their favorite TV shows. Built with React and TypeScript. No pagination as of yet.

Deployed website: http://tv-explorer.s3-website-us-east-1.amazonaws.com/

Backend code can be found here: https://github.com/eliaspk/TV-Show-Explorer-Backend

## Features

- Search for TV shows by title
- View detailed information about TV shows, including seasons and episodes
- Add and remove shows from favorites (requires authentication)
- User authentication (sign up, sign in, sign out)
- Responsive design for desktop and mobile devices

## Technologies Used

- React
- TypeScript
- React Query (for state management and data fetching)
- React Router (for routing)
- Tailwind CSS (for styling)
- AWS Amplify (for authentication)

## Prerequisites

- Node.js (v20.13.1)
- npm or yarn

## Setup

1. Clone the repository:

   ```
   git clone [Your repository URL]
   cd [Your project directory]
   ```

2. Install dependencies:

   ```
   npm install
   ```

   or if you're using yarn:

   ```
   yarn install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:

   ```
   REACT_APP_API_URL=your_backend_api_url
   REACT_APP_COGNITO_USER_POOL_ID=your_cognito_user_pool_id
   REACT_APP_COGNITO_CLIENT_ID=your_cognito_client_id
   ```

4. [Any additional setup steps]

## Running the Application

To start the development server:

```
npm start
```

or if you're using yarn:

```
yarn start
```

The application will be available at `http://localhost:3000`.
