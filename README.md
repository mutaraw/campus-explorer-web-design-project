[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/0wrsx4Jb)

# INFO6150 Final Project

## Description

This project involves a study abroad platform that enables users to share, inspire, and help others with their study abroad planning. Going overseas is one of the biggest steps people take in life and the experience comes with a lot of ups and downs. To help mitigate the challenges people face when deciding to go abroad or during their time far away from home, this application acts as a network platform.

User stories and Milestones are defined as follows:

### User Stories: As a student who has studied abroad: - William

- I want to create a profile with information about my study abroad experience.
- I want to share photos and stories from my experience.
- I want to share information on living 101
- I want to compare and save different schools ranking.
- I want to see the attractions, hotels, restaurants near me.

### User Stories: As a student who is planning to study abroad: - Khatantuul

- I want to create a profile with information about my background and interests.
- I want to search for information about different schools.
- I want to see information about living conditions
- I want to see the attractions, hotels, restaurants near me.
- I want to view roommate/accommodation posts
- I want to find cheap flight information
- I want to see location of schools


### User Stories: As student currently studying abroad: - Teja

- I want to see information about living conditions
- I want to see the attractions, hotels, restaurants near me.
- I want to post roommate search
- I want to filter posts to see events.

### Milestones

#### Milestone 1: User profiles and basic functionality

- Create login and registration system
- Allow users to create and edit profiles
- Allow users to create and edit posts
- Allow users to comment on and message each other

#### Milestone 2: Search and recommendation functionality

- Implement search functionality to allow users to find information about different schools and programs
- Implement recommendation functionality to suggest schools and programs based on user interests

#### Milestone 3: Comparison and reminder functionality

- Allow users to save and compare different schools' CVs
- Implement reminder functionality to remind users about application deadlines

#### Milestone 4: Administration and user experience improvements

- Implement administration functionality to allow administrators to manage user profiles and posts
- Implement user experience improvements based on user feedback and testing

#### Milestone 5: Testing and final polish

- Test the platform with real users
- Make any necessary changes based on user feedback
- Polish the platform and prepare it for launch

## REST API

### Users

- GET /users - Retrieve a list of all users.
- GET /users/{user_id} - Retrieve a specific user.
- POST /users - Create a new user.
- PUT /users/{user_id} - Update an existing user.
- DELETE /users/{user_id} - Delete a specific user.

### Schools

- GET /schools - Retrieve a list of all schools.
- GET /schools/{school_id} - Retrieve a specific school.
- POST /schools - Create a new school.
- PUT /schools/{school_id} - Update an existing school.
- DELETE /schools/{school_id} - Delete a specific school.

### Applications

- GET /applications - Retrieve a list of all applications.
- GET /applications/{application_id} - Retrieve a specific application.
- POST /applications - Create a new application.
- PUT /applications/{application_id} - Update an existing application.
- DELETE /applications/{application_id} - Delete a specific application.

### Comments

- GET /comments - Retrieve a list of all comments.
- GET /comments/{comment_id} - Retrieve a specific comment.
- POST /comments - Create a new comment.
- PUT /comments/{comment_id} - Update an existing comment.
- DELETE /comments/{comment_id} - Delete a specific comment.

### Authentication

- POST /login - Authenticate a user with their email and password.
- POST /logout - Log out the current user.

### Authorization

- GET /users/{user_id} - Retrieve a specific user. Only accessible by the user themselves or an admin user.
- POST /schools - Create a new school. Only accessible by admin users.
- PUT /applications/{application_id} - Update an existing application. Only accessible by the user who created the application.
- DELETE /comments/{comment_id} - Delete a specific comment. Only accessible by the user who created the comment or an admin user.

## Object Model

### Entities

- User
- School
- Application
- Comment

### Value Objects

- Date
- Location
- Name
- Time

### Relationships

- A user can have many applications.
- A user can write many comments.
- A school can have many applications.
- A school can receive many comments.
![MicrosoftTeams-image (6)](https://user-images.githubusercontent.com/114849587/233248561-357ed25c-f5fb-4f3f-885a-53a89e5212b6.png)
