from flask import Flask, jsonify, request
from flask_cors import CORS
from cs50 import SQL

# Initialise Flask app
app = Flask(__name__)

# Enable CORS for all origins (consider restricting in production, research CORS docs)
cors = CORS(app, origins='*')

# Connect to SQL database
db = SQL("sqlite:///manager.db")


@app.route("/api/people", methods=['GET', 'POST'])
def people():

    # Check if get request is received
    if request.method == 'GET':
        # Fetch users dynamically from database
        people_db = db.execute("SELECT * FROM people")

        # Returns list of dictionaries as JSON
        return jsonify({"people": people_db})
    
    # Check if post request is received
    elif request.method == 'POST':
        # Assign json data received to data variable
        data = request.json
        # Insert received name, role and start date data into database
        db.execute("INSERT INTO people (name, role, start_date) VALUES (?, ?, ?)", data["name"], data["role"], data["start_date"])
        # Return data of new person to front-end
        return jsonify({"newPerson": data})
    

@app.route("/api/delete-person", methods=['POST'])
def deleteperson():
    data = request.json
    # Check for assigned tasks
    task_count = db.execute("SELECT COUNT(*) as count FROM tasks WHERE owner = ? AND status != 'Complete'", data["personClicked"])
    # Check for assigned operations
    operation1_count = db.execute("SELECT COUNT(*) as count FROM operations WHERE responsible1 = ?", data["personClicked"])
    operation2_count = db.execute("SELECT COUNT(*) as count FROM operations WHERE responsible2 = ?", data["personClicked"])
    # Check if either assigned tasks or assigned operations returned true
    assigned_total = task_count[0]['count'] + operation1_count[0]['count'] + operation2_count[0]['count']
        # If true, return failure message to front end
    if (assigned_total > 0):
        return jsonify({"success": False, "message": "Person has active assignments"})
        # If false, delete person and return succeess message to front end
    else:
        db.execute("DELETE FROM people WHERE name = ?", data["personClicked"])
        return jsonify({"success": True, "message": "Person successfully deleted"})


@app.route("/api/newtask", methods=['POST'])
def newtask():
    data = request.json
    db.execute("INSERT INTO tasks (title, details, date_created, date_due, status, status_date, owner) VALUES (?, ?, ?, ?, ?, ?, ?)", data["title"], data["details"], data["date_created"], data["date_due"], data["status"], data["date_created"], data["owner"])
    return jsonify({"success": True, "message": "Task created successfully"})


@app.route("/api/tasks", methods=['GET'])
def tasks():
    # Fetch tasks dynamically from database
    tasks_db = db.execute("SELECT * FROM tasks")

    # Returns list of dictionaries as JSON
    return jsonify(
        {"tasks": tasks_db})


@app.route("/api/delete-task", methods=['POST'])
def deletetask():
    data = request.json
    db.execute("DELETE FROM task_notes WHERE notes_id = ?", data["taskClicked"])
    db.execute("DELETE FROM tasks WHERE id = ?", data["taskClicked"])
    return jsonify({"success": True, "message": "Task created successfully"})

@app.route("/api/notes", methods=['GET', 'POST'])
def notes():

    if request.method == 'GET':
        taskid = request.args.get('taskClicked')
        notes = db.execute("SELECT * FROM task_notes WHERE notes_id = ?", taskid)
        return jsonify({"notes": notes})
    
    if request.method == 'POST':
        data = request.json
        db.execute("INSERT INTO task_notes (notes_id, date, info) VALUES (?, ?, ?)", data["taskClicked"], data["entryDate"], data["noteEntry"])
        notes = db.execute("SELECT * FROM task_notes WHERE notes_id = ?", data["taskClicked"])
        return jsonify({"notes": notes})
    

@app.route("/api/notes-update-status", methods=['POST'])
def notesupdatestatus():

    data = request.json
    db.execute("UPDATE tasks SET (status, status_date) = (?, ?) WHERE id = ?", data["updatedStatus"], data["updatedStatusDate"], data["taskClicked"])
    tasks_db = db.execute("SELECT * FROM tasks")
    return jsonify(
        {"tasks": tasks_db})
    

@app.route("/api/notes-update-owner", methods=['POST'])
def notesupdateowner():

    data = request.json
    db.execute("UPDATE tasks SET owner = ? WHERE id = ?", data["updatedOwner"], data["taskClicked"])
    tasks_db = db.execute("SELECT * FROM tasks")
    return jsonify(
        {"tasks": tasks_db})


@app.route("/api/notes-update-date-due", methods=['POST'])
def notesupdatedatedue():

    data = request.json
    db.execute("UPDATE tasks SET date_due = ? WHERE id = ?", data["formattedDueDate"], data["taskClicked"])
    tasks_db = db.execute("SELECT * FROM tasks")
    return jsonify(
        {"tasks": tasks_db})


@app.route("/api/operations", methods=['GET', 'POST'])
def operations():

    if request.method == 'GET':
        operations_db = db.execute("SELECT * FROM operations")
        return jsonify({"operations": operations_db})
    
    elif request.method == 'POST':
        data = request.json
        db.execute("INSERT INTO operations (operation) VALUES (?)", data["operation"])
        return jsonify({"newOperation": data})
    

@app.route("/api/assignment", methods=['POST'])
def assignment():

    data = request.json
    db.execute("UPDATE operations SET ? = ? WHERE operation = ?", data["responsibleKey"], data["assignee"], data["operation"])
    operations_db = db.execute("SELECT * FROM operations")
    return jsonify({"operations": operations_db})


@app.route("/api/profile", methods=['GET', 'POST'])
def profile():

    if request.method =='GET':
        name = request.args.get('personClicked')
        operations_count = db.execute("SELECT COUNT(*) as count FROM operations WHERE responsible1 = ?", name)

        capabilities = db.execute("SELECT * FROM capabilities")

        return jsonify({
            "operationsCount": operations_count[0]["count"],
            "capabilities": capabilities
            })
    
    if request.method == 'POST':
        data = request.json

        if(db.execute("SELECT * FROM capabilities WHERE operation = ? AND person = ?", data["operation"], data["person"])):
            db.execute("UPDATE capabilities SET experience = ? WHERE operation = ? AND person = ?", data["experience"], data["operation"], data["person"])
        else:
            db.execute("INSERT INTO capabilities (operation, person, experience) VALUES (?, ?, ?)", data["operation"], data["person"], data["experience"])

        return jsonify({"success": True, "message": "Experience updated successfully"})


if __name__ == "__main__":
    app.run(debug=True, port=8080)