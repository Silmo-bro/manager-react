function OpenTasks({ tasks, setTaskForm }) {
  function handleOpenForm() {
    setTaskForm(true);
  }

  const openTasks = tasks.filter(task => task.status !== "Complete");

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
            {openTasks.map((task, index) => (
              <tr key={index}>
                <td className="task-title">{task.title}</td>
                <td>{task.owner}</td>
                <td>{task.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleOpenForm} className="small-button">Add new task</button>
      </div>
    </div>
  );
}

export default OpenTasks