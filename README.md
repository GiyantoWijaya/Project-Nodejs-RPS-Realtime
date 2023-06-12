Project Description: Rock Paper Scissors Game with User Profiles, Score History, and Multiplayer Functionality

The project is a web application developed using Node.js and Express.js, aimed at providing a fun and interactive game of Rock Paper Scissors. The application offers various features, including a table to keep track of game score history, a user profile management system with CRUD operations, and a registration and login system.

The layout of the application includes a footer and navbar that wrap around the entire page, providing a consistent and intuitive user experience. The application also incorporates real-time multiplayer functionality, allowing users to choose between playing against the computer or playing with a friend.

If a user decides to play with a friend, they have the option to create a room. Another user can then join the same room by entering the corresponding room number, enabling them to play together in real time. This feature is made possible through the integration of Socket.io, which facilitates real-time communication between the players.

The project utilizes a PostgreSQL database to store user information, including profiles, game scores, and room details. Encryption using bcrypt is implemented to ensure the security of user passwords.

Additionally, the application includes an Admin user role, providing exclusive access to maintain the CRUD operations for each functionality. The Admin user can manage user profiles, score history, game rooms, and other relevant data.

In summary, this project combines the power of Node.js and Express.js to create an engaging web application for playing Rock Paper Scissors. With features such as user profiles, score history, multiplayer functionality, and secure data storage, the application offers an enjoyable and interactive gaming experience for users.