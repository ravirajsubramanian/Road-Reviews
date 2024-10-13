# Road Reviews

The goal of this application is to create a comprehensive directory of road reviews, helping users assess road conditions before traveling. It aims to improve travel experiences by providing reliable user-generated insights on road quality, safety, and conditions.

## Description
The Road Reviews is an open-source project designed to provide a platform where users can share and explore reviews of roads. The application allows users to search for roads by name or source and destination cities, view their quality and reliability ratings, and contribute their own ratings and reviews to help others make informed travel decisions.

## How to Install

### Prerequisites
- Node.js (v14 or higher)
- PostgreSQL
- NPM (comes with Node.js)

### Environment Setup
1. Clone the repository:  
   ```bash
   git clone https://github.com/ravirajsubramanian/road-reviews.git
   ```
2. Navigate to the project folder:  
   ```bash
   cd road-reviews
   ```

#### Backend Installation (Express.js)
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install the dependencies:  
   ```bash
   npm install
   ```
3. Set up the database:
   - Install a PostgreSQL database by following the instructions provided in the [official documentation](https://www.postgresql.org/download/).
   - Create a `.env` file in the backend folder and add your database credentials like so:
     ```
     DATABASE_URL=postgres://YOUR-USERNAME:YOUR-PASSWORD@localhost:5432/roads
     ```
     Replace the placeholders with your actual username and password.
   - Ensure you add the .env file to your .gitignore file to avoid committing your credentials.
     ```bash
     echo ".env" >> .gitignore
     ```
   - Switch the user to the postgres user:  
     ```bash
     sudo -i -u postgres
     ```
   - Access the postgres shell:
     ```bash
     psql
     ```
   - Set a password for the postgres user:  
     ```sql
     \password postgres
     ```
     Enter and confirm your desired password.

   - Create the database and user:  
     ```sql
     CREATE DATABASE roads;
     CREATE USER your_username WITH PASSWORD 'your_password';
     ```
   - Grant privileges to the roads database:  
     ```sql
     GRANT ALL PRIVILEGES ON DATABASE roads TO your_username;
     ```
   - Connect to the database:
     ```bash
     psql -d roads -U your_username
     ```
     You will be prompted to enter your password.

   - Create the tables in the database:  
      ```sql
      -- Create 'users' table
      CREATE TABLE users (
         id SERIAL PRIMARY KEY,
         full_name VARCHAR(100) NOT NULL,
         email VARCHAR(100) UNIQUE NOT NULL,
         password VARCHAR(255) NOT NULL
      );
      -- Create 'roads' table
      CREATE TABLE roads (
         id SERIAL PRIMARY KEY,
         name VARCHAR(255) NOT NULL,
         connecting VARCHAR(255)[] NOT NULL,
         rating FLOAT NOT NULL,
         lanes INTEGER NOT NULL,
         signals BOOLEAN NOT NULL,
         potholes BOOLEAN NOT NULL
      );
      -- Create 'reviews' table
      CREATE TABLE reviews (
         id SERIAL PRIMARY KEY,
         road_id INTEGER NOT NULL REFERENCES roads(id) ON DELETE CASCADE,
         rating FLOAT NOT NULL,
         review TEXT NOT NULL
      );
      ```
   - [Optional] Verify the tables were created successfully:  
     ```sql
     \dt
     ```
     You should see the following tables:
     ```
     roads  | reviews  | users
     ```
   - Insert the initial data into the database:  
     ```sql
     -- Insert 'users' data
     INSERT INTO users (id, full_name, email, password) VALUES
      (1, 'Tony Stark', 'tony@starkindustries.com', 'your_hashed_password1'),
      (2, 'Steve Jobs', 'jobs@apple.com', 'your_hashed_password2');
     -- Insert 'roads' data
     INSERT INTO roads (id, name, connecting, rating, lanes, signals, potholes) VALUES
      (1, 'Chennai-Trichy Highway', ARRAY['Chennai','Villupuram','Trichy'], 4.5, 4, TRUE, FALSE),
      (2, 'Chennai-Tanjore Highway', ARRAY['Chennai','Villupuram','Panruti','Kumbakonam','Tanjore'], 3.8, 6, FALSE, TRUE),
      (3, 'East Coast Road (ECR)', ARRAY['Chennai','Mayiladuthurai','Velankanni'], 4.2, 2, TRUE, TRUE),
      (4, 'Chennai-Bengaluru Highway', ARRAY['Chennai', 'Kanchipuram', 'Vellore', 'Krishnagiri', 'Hosur', 'Electronic City', 'Bangalore'], 4.5, 4, TRUE, FALSE);
     -- Insert 'reviews' data
     INSERT INTO reviews (id, road_id, rating, review) VALUES
      (1, 1, 4, 'good'),
      (2, 1, 5, 'great'),
      (3, 2, 3.8, 'average'),
      (4, 3, 4.2, 'Awesome');
      (5, 4, 4.5, 'Smooth'); 
   - Verify the data was inserted successfully:
     ```sql
     SELECT * FROM users;
     SELECT * FROM roads;
     SELECT * FROM reviews;
     ```
     You should see the output with the inserted data.
     ```
   - Exit the postgres shell:  
     ```sql
     \q
     ```
4. Start the backend server:
   ```bash
   npm start
   ```
   This will start the backend server at `http://localhost:3005`.

### Frontend Installation (React.js)
1. Navigate to the frontend folder:  
   ```bash
   cd frontend
   ```
2. Install frontend dependencies:  
   ```bash
   npm install
   ```
3. Start the frontend development server:  
   ```bash
   npm start
   ```
   This will launch the frontend at `http://localhost:3006`.

## How to Use

1. After installing and running both backend and frontend servers, open a web browser and navigate to `http://localhost:3006`.
2. Use the search feature to look up roads by name or by specifying source and destination cities.
3. Click on any road listing to view reviews, quality ratings, and other details.
4. To contribute a review, click on the "Add Review" button and submit your rating and feedback.

## How to Deploy

### Backend (Node.js - Express.js)
1. Ensure all environment variables are set up properly in the `.env` file.
2. Build the project:  
   ```bash
   npm run build
   ```
3. Deploy the backend to your preferred Node.js hosting service (e.g., Heroku, AWS, etc.).
4. Set up the PostgreSQL database in your production environment.

### Frontend (React)
1. Build the frontend for production:  
   ```bash
   npm run build
   ```
2. Deploy the frontend build files (`build` folder) to your preferred hosting platform (e.g., Vercel, Netlify, or static hosting on AWS S3).
3. Ensure the frontend can communicate with the backend API by setting the correct API base URL.

## How to Contribute

We welcome contributions from the community! Whether it's code improvements or content (reviews and ratings), here’s how you can help:

### Code Contribution
1. Fork the repository.
2. Create a new branch for your feature or bug fix:  
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit them:  
   ```bash
   git commit -m "Add your feature"
   ```
4. Push your branch to your fork:  
   ```bash
   git push origin feature/your-feature-name
   ```
5. Submit a pull request to the `main` branch.

### Content Contribution
You can contribute reviews and road ratings directly through the web interface. To provide feedback on existing features or suggest new ones, please submit an issue in the GitHub repository.

## License Information
This project is licensed under the MIT License. You are free to use, modify, and distribute the code, as long as proper credit is given to the original authors. For more information, please refer to the [LICENSE](./LICENSE) file.
