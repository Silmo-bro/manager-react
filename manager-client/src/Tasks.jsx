function Tasks({ tasks }) {

    return(
        <>
        {tasks.map((task, index) => (
            <div key={index}>
              <span>{task.name} {task.details} {task.date_created} {task.date_planned} {task.status}</span>
              <br></br>
            </div>
          ))}
        </>
    );
}

export default Tasks