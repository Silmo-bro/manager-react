function Operations() {

    return (
        <div className="operations-container">
        <h2>Operations</h2>
        <table>
        <thead>
          <tr>
            <th>Operation</th>
            <th>1° Responsible </th>
            <th>2° Responsible</th>
          </tr>
        </thead>
        <tbody>
            <tr key={index}>
              <td><select>{person.name}</select></td>
              <td><select>{person.role}</select></td>
              <td><select>{person.start_date}</select></td>
            </tr>
        </tbody>
        </table>
        <div className="input-container">
          <input placeholder="Operation"></input>
          <button>Add new operation</button>
        </div>
      </div>
    )
}

export default Operations