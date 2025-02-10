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
        people_db = db.execute("SELECT name, role, start_date FROM people")

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
    tasks_db = db.execute("SELECT id, name, details, date_created, date_planned, date_held, date_done, status, is_hold, off_hold, is_bonus, owner_id FROM tasks")

    # Returns list of dictionaries as JSON
    return jsonify(
        {
            "tasks": tasks_db
        }
    )

if __name__ == "__main__":
    app.run(debug=True, port=8080)