# PEOPLE MANAGEMENT SYSTEM
#### Video Demo: https://youtu.be/zkPUwAMUX0c
#### Description: Operational management tool used for tracking information about team operations and tasks. Technology stack includes React, Flask and SQLite.

# INTENDED USE & REQUIREMENTS
The People Management System is intended for users who are responsible for managing the workload of a team. This may include managers, leaders, coaches or anyone who may need to maintain reliable oversight of the team's current operational performance and assigned tasks. 

## DEFINITIONS
1. Operation: a recurring or continuous activity that must be carried in a timely manner so that an organisation can continue to meet its goals.
2. Task: a one-off transactional action item that has clear deliverables and, typically, a target date.
3. Experience: level of competency.

## SYSTEM REQUIREMENTS
**Requirement 1: List of operational responsibilities**\
As a manager, I want to create a list of operational responsibilities available for delegation so that I can visualise and evaluate the amount of work my team does, and therefore the amount of resources I need.

As a manager, I want to maintain a list of operational responsibilities so that I can assure continuous coverage of the areas of work my team is accountable for delivering.

**Requirement 2: Tracking operational responsibilities**\
As a manager, I want to be able to track the operational responsibilities that I have delegated to people so that I can have visibility of their workload and hold them accountable.

**Requirement 3: Tracking operational experience**\
As a manager, I want to be able to track which operational responsibilities someone in my team has done before so that I remain aware of who can do what. This can be useful when juggling resources since I will know who has prior experience with an operational responsibility. 

**Requirement 4: Tracking tasks**\
As a manager, I want to assign tasks to people so that I can keep track of their workload, hold staff accountable and ensure timely delivery (such as by reassigning the task if timely delivery is at risk)
    
**Requirement 5: Tracking task updates**\
As a manager, I want to record progress updates for assigned tasks so that I can keep records for future reference. 

# SYSTEM FILES
This software tool is a web-based React application controlled by a python flask server. User information is stored in a SQLite database.

> Design decision: In an earlier version of the People Management System, I attempted to use the same technology stack involved in Week 9's Problem Set -- Finance. However, I wanted to explore a more modern user experience; one that didn't require the user to refresh or load a new web page every time an action was taken. Through my research, I learned about React and decided to use it because of its useful *state* and *component* capabilities which would provide the modern user experience I was seeking. 

Note: only the files authored for this project are discussed in this document. Files that were automatically installed as part of React, Python, SQL or other off-the-shelf packages are excluded from discussion.

`manager-react` is the root folder. Within the root folder, we have:
* `manager-client` containing all front end files including the main `App.jsx` and `index.html` components. All the React components are within this directory. Further information is provided in the subsqeuent *FRONT END* section. 
* `manager-server` containing all back end files including `main.py` which contains the python flask code and `manager.db` for storing user information. Further information is provided in the subsequent *BACK END* section.

## FRONT END
The front end is a single page view. From the user's perspective, there are three main areas of interest:
* Tasks: This larger section spans across the width of the viewing window. It mainly contains a table listing tasks with key features including sorting, filtering, adding new tasks and viewing specific task note details. Refer to the *TASKS* section for further information. 
* Operations: This section spans half the width of the viewing window. It contains a list of operations that have been added by the user. Key features include assigning responsibilities, adding new operations and viewing specific operational details. Refer to the *OPERATIONS* section for further information. 
* People: This sections spans half the width of the viewing window. It contains a list of people that have been added by the user. Key features include viewing adding new people and viewing a person's profile. Refer to the *PEOPLE* section for further information. 

The front end directory `manager-client` contains the following key folders and files; specifically, the code written for the People Management System are stored in the `src` folder:
* Main components: The specific main component files are discussed further in the *MAIN COMPONENTS* section. In summary, the main components include any React components that were not rendered as a popup window. 

* `Popups`: This folder contains files relevant for the popup features of the application. Popup windows are used to manage certain use events such as collecting input form the user or providing more detailed information about an operation or task.

> Design notes: In earlier versions of the People Management System, I had intended for the entire user interface to be on a single view, without popups. In this original design, the application would render the information in an element and allow the user to input or change information in the same element. This eventually cluttered the user interface, and it also became very difficult to implement elements that were simultaneously capable of retreiving information from the backend, rendering it in the front end *and* serving as input fields for the user to update the information. That's when the solution of popups came to me. In the current version, the main view is mainly used to display the current state of information about the team, the main view also allows users to provide high-level updates but more detailed actions such as adding new tasks, deleting tasks or updating existing tasks are carried out in popup windows. This resulted in a much cleaner user experience. 

## COMPONENTS
The following diagram represents the layout and relationships of each component. 

```
Main View (App.jsx)
│
├── Tasks (Tasks.jsx)
│   ├── Add New Task Form (TaskForm.jsx) (p)
│   │   └── Check Entries Warning (CheckEntries.jsx) (p)
│   └── Task Notes (TaskNotes.jsx) (p)
│       ├── Check Entries Warning (CheckEntries.jsx) (p)
│       └── Delete Warning (DeleteWarning.jsx) (p)
│
├── Operations (Operations.jsx)
│   ├── Add New Operation Form (OperationsForm.jsx) (p)
│   │   └── Check Entries Warning (CheckEntries.jsx) (p)
│   └── Operation Details (OperationDetails.jsx) (p)
│       └── Delete Warning (DeleteWarning.jsx) (p)
│
└── People (People.jsx)
   ├── Add New Person (PeopleForm.jsx) (p)
   │   └── Check Entries Warning (CheckEntries.jsx) (p)
   └── Profile (Profile.jsx) (p)
       ├── Active Person Warning (ActivePerson.jsx) (p)
       └── Delete Warning (DeleteWarning.jsx) (p)

(p) = conditionally rendered popup windows
```

### FUNCTIONS

### TASKS

#### Tasks.jsx
This component is the main tasks area where information about tasks and task actions can be carried out by the user. The tasks area is mainly a table which shows all tasks within the system. The table contains the following headers: title, details, date created, date due, status, status date and delegate. Date created, date due and status date can be sorted using sort buttons in the relevant header. In the delegate column, if the task is *unassigned* then the font and cell border changes to a red colour. 

Above the table, there are select menus which can be used to filter the table based on the user's requirements. The table can be filtered by status or delegate as needed. The user click the `Reset filters` (or `Reset filters and sorting` if applicable) to reset the table accordingly.

The information within the tasks area is refreshed dynamically if changes are made such as adding a new task or updating task notes. The user can click the `Add new task button` or select the row showing the task of interest to add a new task or open up the task notes, respectively. 

> Design notes: The filtering and sorting functions were written by an AI platform. 

#### TASKS POPUPS

#### TaskForm.jsx
This component is utilised when the user wants to add a new task to the system. This component is conditionally rendered when the user clicks the `Add new task` button. When conditions are met, this component will return a popup window containing a form for thte user to input the task title, delegate, task details, date created, due date and task status. The title, date created and status are mandatory fields. The use can click the `Add new task` button to confirm or `Cancel` to return. 

> Design notes: The add new task form was the primary reason for implementing popup windows. The level of information, information formats and user input verification needed made it too cumbersome and disruptive for the user experience to implement in the main view so it became more efficient to move this entire functionality into a separate component that would render only when needed. The add new task form has a combination of text input, select menus, text areas and--of most interest--*datepickers*. State management is included where appropriate to manage select menu options and date states. Implementing datepickers were quite tricky because of different date formats. Due to some poor design choices in the beginning, the date formats had to be converted between the front end and back end. In future, better planning could have reduced some of the inefficiencies in managing date formats. 

#### TaskNotes.jsx
This component is utilised when the user wants to view or update information about a task. This component is conditionally rendered when the user selects a task from the task table of the main task component (`Tasks.jsx`). Selection is implemented by clicking in the row containing the relevant task of interest. When the conditions are met, this component will return a popup window which will render the task name, status, date of status last updated,delegate, due date and a notes table. The status, delegate and due date can be updated by the user which will trigger a state refresh; the information is also dynamically updated in the task table of the main task component. The notes table works like diary entries; it has a timeline and a text area for the user to provide new entries. Newest entries appear at the top. The user can click `Add entry` to save the entry into the timeline. A new text area will appear so that user can provide the next entry when needed. An error will appear if the user attempts to save a blank entry. The user can also click the `Delete task` button to delete the task or the `Save/Close` button to return. 

### OPERATIONS

#### Operations.jsx
This component is the main operations area where information about operations that have been added to the system are listed. The user carries out tasks about operations from here. The main operations area has a table that contains all the available operations. The headers include: operation, primary responsible and secondary responsible. 

For each operation, if a responsibility is "vacant" then the font and border of that cell will change to a red colour. 

Each row in the operation table can be clicked on by the user which will open up the operation details popup.

Underneath the table, the user can click the `Add new operation` button which will cause the operations form popup to appear. 

#### OPERATIONS POPUPS

#### OperationsForm.jsx
This component is utilised when the user wants to add a new operation to the system. This component is conditionally rendered when the user clicks the `Add new operation` button. When the conditions are met, this component will return a popup window containing a form for the user to input the operation name and a detailed description about the operation. Only the name of the operation is a mandatory field. The user can click the `Add new operation` button to confirm or `Cancel` to return. 

#### OperationDetails.jsx
This component is utilised when the user clicks one of the operations listed in the operations table of the main operations component (`Operations.jsx`). The operation clicked is passed into `OperationDetails.jsx` which then uses this information to render details about the operation. The details rendered include the name of the operation and a detailed description about the operation input by the user when the operation was originally added to the system. From this view, the user can click `Close` or press `ESC` to return to the main view. There is also a `Delete operation` button if the operation is no longer required. 

### PEOPLE
This component is the main people area where the user can view information and carry out tasks related to people. The people area has a table which contains a list of all the people which have been added to the system. The headers include: the person's name, role and start date.

The user can select any row in the table to open the user's profile; this causes the profile popup to appear.

Underneath the table, the user can click the `Add new person` button which will cause the people form popup to appear. 

#### PEOPLE POPUPS

#### PeopleForm.jsx
This component is utilised when the user wants to add a new person to the system. This component is conditionally rendered when the user clicks the `Add new person` button. When the conditions are met, this component will return a popup window containing a form for the user to input the person's name, their role and start date. All three fields are mandatory. The user can click the `Add new person` button to confirm or `Cancel` to return. 

#### Profile.jsx
This component is utilised when the user wants to view the profile of a person. This component is conditionally rendered when the user selects a person from the person table of the main people component (`People.jsx`). Selection is implemented by clicking in the row containing the relevant person of interest. When the conditions are met, this component will return a popup window which will render the person's name, the number of primary operations currently assigned, the number of tasks open and, if applicable, a table showing the level of experience this person has for each available operation in the system. If no operations have been added to the system yet, the table will not render. In this component, the user can adjust the person's experience level for each operation through select menus. The user can also click the `Delete person` button to delete the person from the system or `Close profile` to return. 

#### ActivePerson.jsx
This component is utilised when the user attempts to delete a person. This component conditionally renders if the user attempts to delete a person that is currently assigned to an Operation or has an open task assigned to them. If the conditions are met, the component will return a popup window to inform the user that the person cannot be deleted. The user must click the `OK` button to return and unassign any operations or open tasks. This component also includes an event listener enabling the user to press the `ESC` key instead of having to click the `OK` button to return. 

### UNIVERSAL POPUPS

#### CheckEntries.jsx
This component is utilised when the user attempts to submit a form. This component conditionally renders if the user attempts to submit a form that has missing, incomplete or unacceptable information. If the conditions are met, the component will return a popup window to inform the user to check the entries and try again. The user must click the `OK` button to return and try again. This component also includes an event listener enabling the user to press the `ESC` key instead of having to click the `OK` button to return. 

#### DeleteWarning.jsx
This component is utilised when the user attempts to delete an operation, task or person. This component renders during the deletion process. It returns a popup window informing the user that the act of deleting cannot be undone. The user must click `Confirm` if they wish to proceed. Alternatively, the user can click `Cancel` or press the `ESC` key to return. 

### CSS
There are two CSS files in the file system:
* `src/index.css` This is the primary CSS file which contains all the styles for the front end.
* `popups/popup.css` This is a secondary CSS file predominantly used for styles within the popup windows.

> Design notes: The CSS files were not planned very well and grew naturally as the project progressed. There is some overlap between `index.css` and `popup.css`. In future projects, more planning would be beneficial so that the CSS ends up more organised. Alternatively, the CSS structure can be reviewed and improved after the project has developed further along but this would require considerable effort since the a lot of the style identifiers (class names, etc) are scattered throughout the front end files. 

## BACK END
The back end files include a flask server running in python and a SQLite database. 

### PYTHON FLASK CONTROLLER

#### /api/people

If GET request is received, returns all data from the People table.
If POST request is received, inserts the new person's information into the People table. Returns the new person's information.

#### /api/delete-person

Receives person's name via POST.

Executes SQL query to get count of tasks currently assigned to person's name.\
Executes SQL query to get count of operations where person's name is assigned as primary responsible.\
Executes SQL query to get count of operations where person's name is assigned as secondary responsible. 

Adds all counts together to get count of total assignments. Then, checks if total assignments is greater than 0. 

If greater than 0, returns failure message to inform user that person has active assignments.
Else, executes SQL query to delete person from People table. Then, returns success message to inform user that person has been successfully deleted. 

#### /api/newtask

Recevies task information via POST.

Executes SQL query to insert task information into Tasks table. 

Returns success message to inform user that task has been created successfully.

#### /api/tasks

Returns all data from Tasks table.

#### /api/delete-task

Receives a task ID via POST.

Deletes data from Task_Notes table where there's a matching ID.
Deletes data from Task table where there's a matching ID.

Returns success message informing user task has been deleted successfully.

#### /api/notes

If GET request is received, returns all data from Task_Notes table where there's a matching task ID.
If POST request is received, inserts new task note information into othe Task_Notes table. Then, returns all data from Task_Notes table where there's a matching task ID. 

#### /api/notes-update-status

Receives task ID and status details via POST.

Executes SQL query to update Tasks table with new status details where there's a matching task ID.

Returns all data from the Tasks table. 

#### /api/notes-update-owner

Receives task ID and new task owner name via POST.

Executes SQL query to update Tasks table with new task owner name where there's a matching task ID.

Returns all data from the Tasks table. 

#### /api/notes-update-date-due

Receives task ID and new due date via POST.

Executes SQL query to update Tasks table with new due date where there's a matching task ID.

Returns all data from the Tasks table. 

#### /api/operations

If GET request is received, returns all data from the Operations table. 

If POST request is received, inserts the new operation's information into the Operations table. Returns the new operations's information.

#### /api/delete-operation

Receives operation name via POST.

Executes SQL query to delete operation from Operations table where there's a matching operation name. 

Returns success message to inform user that operation has been deleted successfully.

#### /api/assignment

Receives a responsibility key (primary or secondary selection), the assignee's name and the operation nasme via POST.

Executes SQL query to update Operations table with new assignment details. 

Returns all data from the Operations table. 

#### /api/profile

If GET request is received, assigns person's name to a variable. 
Executes SQL queries to get the following information:
* Count of operations where there's a matching person's name
* Count of tasks where there's a matching person's name and the task status is not already closed
* All data from the capabilities table
Returns all data in a combined json file.

If POST request is received, checks if there are matching capabilities already in the Capabilities table.
If true, executes SQL query to update Capabilities table with new capabiltiies information. 
Else, executes SQL query to insert new capabilities information into the Capabilities table. 
Returns success message to inform user that experience has been updated successfully.

### SQLITE DATABASE

The SQLite database contains the tables indicated below. 


```
CREATE TABLE people (
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    start_date TEXT NOT NULL
);

CREATE TABLE operations (
    operation TEXT NOT NULL,
    responsible1 TEXT,
    responsible2 TEXT,
    details TEXT,
);

CREATE TABLE capabilities (
    operation TEXT NOT NULL,
    person TEXT NOT NULL,
    experience TEXT NOT NULL
);

CREATE TABLE tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    title TEXT NOT NULL,
    details TEXT NOT NULL,
    date_created TEXT NOT NULL,
    date_due TEXT,
    date_done TEXT,
    status TEXT NOT NULL,
    status_date TEXT NOT NULL,
    owner TEXT NOT NULL
);

CREATE TABLE task_notes (
    notes_id INTEGER NOT NULL,
    date TEXT NOT NULL,
    info TEXT NOT NULL,
    FOREIGN KEY (notes_id) REFERENCES tasks(id)
);
```
> Decision notes: The tables were deleted and recreated numerous times during this project. Initially, the tables had more unique IDs and foreign key references. The original intention was to ensure that each person and operation could be uniquely identified even if they shared the same name. The foreign key references were an attempt to apply more rigidity and best practice to handling the tables.

> As the project progressed, I realised that it would be significantly more difficult to handle the unique IDs and multiple foreign key references and since the expected use cases for this project were relatively simple, I decided to forego alot of the control and  and just simply use people names and operation names.

> Of course, this would result in undesired behaviour if the user were to ever add people or operations with the same names. This is something the user will have to be aware of until a future update. 