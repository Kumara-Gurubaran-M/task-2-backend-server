
## Instructions for Running the Backend Server

### Prerequisites

- **Node.js** (version 14 or higher)
- **npm** (version 6 or higher)
- **Visual Studio Code** or **Visual Studio 2022**

### Setup

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/yourusername/submission-manager-backend.git
    cd submission-manager-backend
    ```

2. **Install Dependencies:**

    ```bash
    npm install express body-parser cors --save
    npm install @types/express @types/cors @types/node typescript ts-node --save-dev
    ```

3. **File Structure:**

    Ensure your project structure looks like this:

    ```
    submission-manager-backend/
    ├── src/
    │   ├── db.json
    │   ├── types.ts
    ├── app.ts
    ├── package.json
    ├── tsconfig.json
    └── README.md
    ```

4. **TypeScript Configuration:**

    Ensure your `tsconfig.json` is configured to compile TypeScript files:

    ```json
    {
      "compilerOptions": {
        "target": "es6",
        "module": "commonjs",
        "strict": true,
        "esModuleInterop": true,
        "outDir": "./dist",
        "rootDir": "./"
      },
      "include": ["src/**/*", "app.ts"]
    }
    ```

5. **Configure Scripts in `package.json`:**

    Ensure your `package.json` has the necessary scripts:

    ```json
    "scripts": {
      "build": "tsc --build",
      "clean": "tsc --build --clean",
      "watch": "tsc --watch"
    }
    ```

### Steps to Run the Server


1. **Run the Server:**

    Press `F5` in Visual Studio 2022. This will launch the backend server in debug mode, allowing you to set breakpoints and debug your code.

### API Endpoints

1. **Health Check:**

    - **GET /ping**

      Responds with `pong`.

2. **Fetch All Submissions:**

    - **GET /read**

      Fetches all submissions from the database.

3. **Search Submissions by Email:**

    - **GET /search?email=<email>**

      Searches for submissions by email.

4. **Create a New Submission:**

    - **POST /submit**

      Creates a new submission.

5. **Update a Submission:**

    - **PUT /update/:timestamp**

      Updates a submission based on its timestamp.

6. **Delete a Submission:**

    - **DELETE /delete/:timestamp**

      Deletes a submission based on its timestamp.

### Example Submission Data

The `db.json` file contains example submission data:

```json
[
  {
    "name": "Kumara Gurubaran M",
    "email": "kumaranm21cse@gmail.com",
    "phone": "7094221425",
    "githubLink": "https://github.com/Kumara-Gurubaran-M",
    "elapsedTime": "00:01:45",
    "timestamp": "2024-06-20T18:39:44.442Z"
  },
  {
    "name": "kumaran M",
    "email": "kumaran@gmail.com",
    "phone": "9894886357",
    "githubLink": "https://www.linkedin.com/in/kumara-gurubara-m/",
    "elapsedTime": "00:00:53",
    "timestamp": "2024-06-20T18:50:19.216Z"
  }
]
```

### License

This project is licensed under the MIT License.

