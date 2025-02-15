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


@app.route("/api/tasks", methods=['GET'])
def tasks():
    
    # Fetch tasks dynamically from database
    tasks_db = db.execute("SELECT * FROM tasks")

    # Returns list of dictionaries as JSON
    return jsonify(
        {"tasks": tasks_db})


@app.route("/api/capables", methods=['GET'])
def capables():

    capables_db = db.execute(
        "SELECT people.name, operations.operation, capabilities.experience FROM people LEFT JOIN capabilities ON people.id=capabilities.person_id LEFT JOIN operations ON operations.id=capabilities.operation_id"
    )

    return jsonify({"capabilities": capables_db})


@app.route("/api/operations", methods=['GET', 'POST'])
def operations():

    if request.method == 'GET':
        operations_db = db.execute("SELECT * FROM operations")
        return jsonify({"operations": operations_db})
    
    elif request.method == 'POST':
        data = request.json
        db.execute("INSERT INTO operations (operation) VALUES (?)", data["operation"])
        return jsonify({"newOperation": data})


if __name__ == "__main__":
    app.run(debug=True, port=8080)