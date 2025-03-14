function People({ people, setPersonClicked, setPeopleForm }) {

  // Update setPerson state with name of person clicked
  function handlePersonClicked(name) {
    setPersonClicked(name);
  }

  function handleOpenForm() {
    setPeopleForm(true);
  }

  return (
    <div className="table-container">
      <h2>People (select person to view profile)</h2>
      <table className="people-table">
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
      <button onClick={handleOpenForm} className="small-button">Add new person</button>
    </div>
  );
}

export default People