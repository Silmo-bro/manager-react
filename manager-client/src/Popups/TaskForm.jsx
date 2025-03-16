import "./popup.css";
import { useState } from "react";
import axios from 'axios';
import DatePicker, { setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function TaskForm({ taskForm, setTaskForm, people, taskStatuses }) {

    const [createdDate, setCreatedDate] = useState(new Date());
    const [dueDate, setDueDate] = useState();

    function handleCancel() {
        setTaskForm(false);
    }

    async function handleAddNewTask() {
        // Get all task details
        const title = document.getElementById("title").value;
        const owner = document.getElementById("owner").value;
        const details = document.getElementById("details").value;
        const date_created = document.getElementById("date_created").value;
        const date_due = document.getElementById("date_due").value;
        const status = document.getElementById("status").value;

        if (title && owner && details && date_created && status) {
            await axios.post("http://127.0.0.1:8080/api/newtask", {
                title,
                owner,
                details,
                date_created,
                date_due,
                status
            });
        }

        setTaskForm(false);
    }

    if (taskForm) {
        return (
            <div className="popup">
                <div className="popup-inner">
                    <h2>Add new task</h2>
                    <br />
                    <div>
                        <div className="input-container">
                            <h3>Title*</h3>
                            <input id="title"></input>
                            <h3>Delegate*</h3>
                            <select id="owner">
                                <option disabled selected></option>
                                {people.map((people, index) => (
                                    <option key={index}>{people.name}</option>
                                ))}</select>
                        </div>
                        <h3 className="top-input-label">Details*</h3>
                        <textarea id="details" type="text"></textarea>
                        <div className="input-container">
                            <h3>Date assigned*</h3>
                            <DatePicker id="date_created" selected={createdDate} onChange={(createdDate) => setCreatedDate(createdDate)} dateFormat="dd/MM/yyyy" />
                            <h3>Due date</h3>
                            <DatePicker id="date_due" selected={dueDate} onChange={(dueDate) => setDueDate(dueDate)} dateFormat="dd/MM/yyyy" />
                        </div>
                        <br />
                        <div className="input-container">
                            <h3>Status*</h3>
                            <select id="status">
                                <option disabled selected></option>
                                {taskStatuses.map((status, index) => (
                                    <option key={index}>{status}</option>
                                ))}</select>
                        </div>
                        <button className="submit-form" onClick={handleAddNewTask}>Add new task</button>
                    </div>
                    <button className="popup-cancel" onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        )
    }
    else {
        return <></>;
    }
}

export default TaskForm