# Helgen Project

This project has two folder, one for the frontend project and one for the backend, to run this project correctly you should do:

1. Open two terminals or open both folders separately and locate yourself inside each individual project.
2. Execute "npm install" command on both projects terminal.
3. Once both projects are installed correctly you can now open your browser and search "http://localhost:4200/" (This should be the route for the project).
4. Use one of 3 users to login and see and use the project.
  - Admin user: (email: admin@gmail.com, password: admin) 
    - Admin can access both maps and users components, in which he can: -maps: See the map component with all the markers showing, these markers can be shown or not shown depending if Admin wishes to see them by selected buses, this filter is on the navbar on the left in form of a dropdown.
    - Users: Administrate the users that are registered, Admin can create a user from the "new user" button on which it will open a dialog to fill out new user data, Admin can update an existing user by clicking on the edit button on the desired user, this will open the same dialog but with the form already filled out with the selected users data, Admin can also delete desired user by clicking on delete button.
  - Operador user: (email: operador@gmail.com, password: operador)
    - Operador can only see the map but will be loaded without markers and markers will be disabled.
  - User user: (email: user@gmail.com, password: user)
    - User can see the map component with all the markers showing, these markers can be shown or not shown depending if Admin wishes to see them by selected buses, this filter is on the navbar on the left in form of a dropdown.
5. When desired user can logout and all credentials will be erased.

**Reasons for the use of certain elements:**
1. Front End: 
 - I decided to use mapTiler or mapLibre for the display of a map due to it be more accessible and short learning curve for beginners, it offers a lot of functionalities and is very customizable, it is also very friendly for web development due to it being looking good in both web and mobile apps. 
 - All of the information being displayed is completely remote, that was one of my key concerns revolving this project and the reason why i decided on making a api backend server to handle all of the petitions for the information like POST GET PUT and DELETE.
 - I also decided that this project needed a navbar for easy access and navigation between the components and for a better communication between these I decided to use two different ways, via the parent to child using @input and using this as an observable to see changes every time value changes, also via the child to parent using @output and EventEmitter so that also every-time there is a change the correct communication will be done between these components. This generated a application in which there is great communication between components and every time a change happens and a child needs to be modified this update happens seamlessly. 
 - I decided to use mat dialog to use a modal for creating and editing users, this was done because we can subscribe to any changes emitted from the dialog and we can update in real time are user table, and also for us to have a better control over the modal (easier for us to send data and configurations).

2. Back End:
  - I decided to use a BD in mongo to do it being very simple to use as a simple data storer and also the flexibility of mongo for data structures.
  - I made my API in node using express and mongoose. Node was an easy choice for this due it being of very high performance for real time apps and its very simple scalability, express was the obvious choice due to us using node and are project being an angular project.