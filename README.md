# My Project

This project is [Aviasales test task]. It is developed using React, Redux, TypeScript, RTK Query, and other technologies.

## Installation

1. Clone the repository to your computer:

    ```bash
    git clone https://github.com/KotsemirK/Test-task.git
    ```

2. Navigate to the project directory:

    ```bash
    cd your-project
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

## Running JSON Server

JSON Server is used for developing a fake API. It will listen for requests at `http://localhost:3001`.

1. Start the JSON Server:

    ```bash
    json-server --watch "src/ticketList.json" --port 3001
    ```

## Running Webpack Server

Webpack server is used for developing the frontend of the project. It will listen for file changes and refresh the page as needed. By default, the Webpack server listens on port `9000`.

1. Start the Webpack server:

    ```bash
    npx webpack serve --mode development
    ```

After starting both servers, you can start developing your project. Open your browser and navigate to `http://localhost:9000/` to view your application.
