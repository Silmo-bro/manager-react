function Tasks({ tasks, setTaskForm }) {

  function handleOpenForm() {
    setTaskForm(true);
  }

  return (
    <div className="tasks-container">
      <div className="table-container">
        <h2>Open Tasks</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Delegate</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((tasks, index) => (
              <tr key={index}>
                <td className="task-title">{tasks.title}</td>
                <td>{tasks.owner}</td>
                <td>{tasks.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleOpenForm} className="small-button">Add new task</button>
      </div>
    </div>
  );
}

export default Tasks