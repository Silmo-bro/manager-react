import './popup.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import DatePicker, { setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CheckEntries from "./CheckEntries.jsx";
import DeleteWarning from "./DeleteWarning.jsx";


function TaskNotes({ taskClicked, setTaskClicked, taskStatuses, people, tasks, setTasks }) {

    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const [owner, setOwner] = useState("");
    const [status, setStatus] = useState("");
    const [statusDate, setStatusDate] = useState("");
    const [dueDate, setDueDate] = useState();
    const [notes, setNotes] = useState([]);
    const [checkEntry, setCheckEntry] = useState(false);
    const [deleteWarning, setDeleteWarning] = useState(false);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                handleCancel();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleCancel]);

    useEffect(() => {
        if (taskClicked) {
            const currentTask = tasks.find(task => task.id === taskClicked);
            if (currentTask) {
                setTitle(currentTask.title);
                setDetails(currentTask.details);
                setStatus(currentTask.status);
                setStatusDate(currentTask.status_date);

                if (currentTask.owner.length < 1) {
                    setOwner("Unassigned");
                } else {
                    setOwner(currentTask.owner);
                }

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

    async function handleUpdateStatus() {
        // Send new status to backend to update task
        const updatedStatus = document.getElementById("status").value;
        const updatedStatusDate = new Date().toLocaleDateString("en-GB");
        const response = await axios.post("http://127.0.0.1:8080/api/notes-update-status", {
            taskClicked,
            updatedStatus,
            updatedStatusDate
        });
        // After backend returns updated tasks, update tasks state (causes re-render with new task status)
        setTasks(response.data.tasks);
    };

    async function handleUpdateOwner() {
        // Send new owner to backend to update task
        const updatedOwner = document.getElementById("owner").value;
        const response = await axios.post("http://127.0.0.1:8080/api/notes-update-owner", {
            taskClicked,
            updatedOwner
        });
        // After backend returns updated tasks, update tasks state (causes re-render with new task owner)
        setTasks(response.data.tasks);
    };

    async function updateDueDate(dueDate) {
        // Convert to client's local date string (provided by AI)
        const formattedDueDate = dueDate ? dueDate.toLocaleDateString("en-GB") : null

        // Send new due date to backend to update task
        const response = await axios.post("http://127.0.0.1:8080/api/notes-update-date-due", {
            taskClicked,
            formattedDueDate
        });
        // Update dueDate state with new due date
        setDueDate(dueDate);
        setTasks(response.data.tasks);
    };

    async function handleSaveNotes() {
        // Send notes to backend
        const noteEntry = document.getElementById("note-entry").value;

        if (noteEntry) {

            const entryDate = document.getElementById("entry-date").textContent.trim();
            const response = await axios.post("http://127.0.0.1:8080/api/notes", {
                taskClicked,
                entryDate,
                noteEntry
            });
            // Update notes state
            setNotes(response.data.notes);
            document.getElementById("note-entry").value = "";
        }
        else {
            setCheckEntry(true);
        }
    };

    function handleCancel() {
        setDeleteWarning(false);
        setTaskClicked();
    };

    function handleClose() {
        setCheckEntry(false);
    };

    function handleDelete() {
        setDeleteWarning(true);
    };

    async function handleAcceptWarning() {
        // Send task id to backend for deletion of task
        await axios.post("http://127.0.0.1:8080/api/delete-task", { taskClicked });
        setDeleteWarning(false);
        setTaskClicked();
    };

    function handleAbortWarning() {
        setDeleteWarning(false);
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
                            <option>Unassigned</option>
                            {people.map((people, index) => (
                                <option key={index}>{people.name}</option>
                            ))}</select>
                        <h3 className="second-flex">Due date:</h3>
                        <DatePicker id="date_due" selected={dueDate} onChange={(dueDate) => updateDueDate(dueDate)} dateFormat="dd/MM/yyyy" />
                    </div>
                    <h5 className="status-info">Status last updated: {statusDate}</h5>
                    <h3 className="top-input-label">Notes</h3>
                    <div className="input-container">
                        <table className="notes-table">
                            <thead>
                                <tr>
                                    <th>Timeline</th>
                                    <th>Entry</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td id="entry-date" className="timeline-date">
                                        {new Date().toLocaleDateString("en-GB")}
                                    </td>
                                    <td>
                                        <textarea id="note-entry" type="text" placeholder="Add new entry here"></textarea>
                                    </td>
                                </tr>
                                {notes.slice().reverse().map((note, index) => (
                                    <tr key={index}>
                                        <td className="timeline-date">{note.date}</td>
                                        <td>{note.info}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button className="save-notes" onClick={handleSaveNotes}>Add entry</button>
                    </div>
                    <button className="popup-cancel" onClick={handleCancel}>Save/Close</button>
                    <button onClick={handleDelete}>Delete task</button>
                </div>
                {checkEntry && <CheckEntries handleClose={handleClose} />}
                {deleteWarning && <DeleteWarning handleAcceptWarning={handleAcceptWarning} handleAbortWarning={handleAbortWarning} />}
            </div>
        )
    }
    else {
        return <></>;
    }
}

export default TaskNotes