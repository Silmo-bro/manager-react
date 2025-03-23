import './popup.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import DatePicker, { setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TaskNotes({ taskClicked, setTaskClicked, taskStatuses, people, tasks }) {

    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const [owner, setOwner] = useState("");
    const [status, setStatus] = useState("");
    const [dueDate, setDueDate] = useState();
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        if (taskClicked) {
            const currentTask = tasks.find(task => task.id === taskClicked);
            if (currentTask) {
                setTitle(currentTask.title);
                setDetails(currentTask.details);
                setOwner(currentTask.owner);
                setStatus(currentTask.status);

                if (currentTask.date_due) {
                    const [day, month, year] = currentTask.date_due.split('/');
                    setDueDate(new Date(year, month - 1, day));
                } else {
                    setDueDate(null);
                }
            }
        }
    }, [taskClicked, tasks]);

    useEffect(() => {
        const fetchNotes = async () => {
            const response = await axios.get("http://127.0.0.1:8080/api/notes", { params: { taskClicked } });
            setNotes(response.data.notes);
        };

        fetchNotes();
    }, [taskClicked]);

    function handleUpdateStatus() {
        // Send new status to backend to update task
        // After backend returns updated tasks, update tasks state (causes re-render with new task status)
        // This may not work, might need to find way to trigger update to tasks
    };

    function handleUpdateOwner() {
        // Send new owner to backend to update task
        // After backend returns updated tasks, update tasks state (causes re-render with new task owner)
        // This may not work, might need to find way to trigger update to tasks
    };

    function updateDueDate() {
        // Send new due date to backend to update task
        // Update dueDate state with new due date
        // Trigger re-render somehow? Probably by running setDueDate to update state
    };

    function handleSaveNotes() {
        // Send notes to backend
        // Update notes state
    };

    function handleCancel() {
        setTaskClicked();
    };

    if (taskClicked) {
        return (
            <div className="popup">
                <div className="popup-inner">
                    <h2>{title}</h2>
                    <h3>{details}</h3>
                    <div className="input-container">
                        <div className="input-container">
                            <h3>Status:</h3>
                            <select id="status" value={status} onChange={handleUpdateStatus}>
                                {taskStatuses.map((status, index) => (
                                    <option key={index}>{status}</option>
                                ))}</select>
                        </div>
                        <h3 className="second-flex">Delegate:</h3>
                        <select id="owner" value={owner} onChange={handleUpdateOwner}>
                            {people.map((people, index) => (
                                <option key={index}>{people.name}</option>
                            ))}</select>
                        <h3 className="second-flex">Due date:</h3>
                        <DatePicker id="date_due" selected={dueDate} onChange={(dueDate) => updateDueDate(dueDate)} dateFormat="dd/MM/yyyy" />
                    </div>
                    <h3 className="top-input-label">Notes</h3>
                    <div className="input-container">
                        <table className="notes-table">
                            <thead>
                                <tr>
                                    <th>Timeline</th>
                                    <th>Notes</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="timeline-date">
                                        {new Date().toLocaleDateString("en-GB")}
                                    </td>
                                    <td>
                                        <textarea id="note-entry" type="text" placeholder="Enter new note here"></textarea>
                                    </td>
                                </tr>
                                {notes.map((note, index) => (
                                    <tr key={index}>
                                        <td className="timeline-date">{note.date}</td>
                                        <td>{note.info}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button className="save-notes" onClick={handleSaveNotes}>Save</button>
                    </div>
                    <button className="popup-cancel" onClick={handleCancel}>Close</button>
                </div>
            </div>
        )
    }
    else {
        return <></>;
    }
}

export default TaskNotes