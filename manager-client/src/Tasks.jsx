import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

function Tasks({ tasks, setTaskClicked }) {

    function handleTaskClicked(taskId) {
        setTaskClicked(taskId);
    };

    return (
        <div>
            <h2>All Tasks (select task to view/update notes)</h2>
            <table className="task-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Details</th>
                        <th>Date created</th>
                        <th>Date due</th>
                        <th>Status</th>
                        <th>Status date</th>
                        <th>Delegate</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task, index) => (
                        <tr key={index} onClick={() => handleTaskClicked(task.id)}>
                            <td className="task-title2">{task.title}</td>
                            <td className="task-details">{task.details}</td>
                            <td>{task.date_created}</td>
                            <td>{task.date_due}</td>
                            <td>{task.status}</td>
                            <td>{task.status_date}</td>
                            <td>{task.owner}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Tasks