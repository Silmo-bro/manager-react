import axios from "axios";

function People({ people, setPeople, setPersonClicked }) {

  async function handleAddNewPerson() {

    // Get individual user input values
    const name = document.getElementById("name").value;
    const role = document.getElementById("role").value;
    const start_date = document.getElementById("start_date").value;

    // Create new person object
    const newPerson = { name, role, start_date };

    // Check if all fields completed
    if (document.getElementById("name").value && document.getElementById("role").value && document.getElementById("start_date").value) {
      // Post new person's variables to back-end and await response
      const response = await axios.post("http://127.0.0.1:8080/api/people", {
        name,
        role,
        start_date,
      });

      // Update people state with response received from back-end
      setPeople([...people, response.data.newPerson]);

      // Clear input values
      document.getElementById("name").value = "";
      document.getElementById("role").value = "";
      document.getElementById("start_date").value = "";
    }

  }

  // Update setPerson state with name of person clicked
  function handlePersonClicked(name) {
    setPersonClicked(name);
  }

  return (
    <div className="table-container">
      <h2>People</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Start date</th>
          </tr>
        </thead>
        <tbody>
          {/*Map the people state to an array, index it*/}
          {people.map((person, index) => (
            <tr key={index}>
              {/*Render the name, role and start date in each row with on-click function to get name*/}
              <td onClick={() => handlePersonClicked(person.name)}>{person.name}</td>
              <td onClick={() => handlePersonClicked(person.name)}>{person.role}</td>
              <td onClick={() => handlePersonClicked(person.name)}>{person.start_date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="input-container">
        <input id="name" placeholder="Name"></input>
        <input id="role" placeholder="Role"></input>
        <input id="start_date" placeholder="Start Date"></input>
        <button onClick={handleAddNewPerson}>Add new person</button>
      </div>
    </div>
  );
}

export default People