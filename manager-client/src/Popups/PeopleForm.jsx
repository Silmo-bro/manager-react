import './popup.css';
import axios from 'axios';
import { useState } from 'react';
import CheckEntries from "./CheckEntries.jsx";
import DatePicker, { setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function PeopleForm({ peopleForm, people, setPeople, setPeopleForm }) {

    const [checkEntry, setCheckEntry] = useState(false);
    const [startDate, setStartDate] = useState()
    
    async function handleAddNewPerson() {

        // Get individual user input values
        const name = document.getElementById("name").value;
        const role = document.getElementById("role").value;
        const start_date = document.getElementById("start_date").value;

        // Check if all fields completed
        if (name && role && start_date) {
            // Post new person's variables to back-end and await response
            const response = await axios.post("http://127.0.0.1:8080/api/people", {
                name,
                role,
                start_date,
            });

            // Update people state with response received from back-end
            setPeople([...people, response.data.newPerson]);

            // Reset peopleForm to false
            setPeopleForm(false);
        }
        else {
            setCheckEntry(true);
        }
    };

    function updateDate(date) {
        setStartDate(date);
    };

    function handleCancel() {
        setPeopleForm(false);
    };

    function handleClose() {
        setCheckEntry(false);
    };

    if (peopleForm) {
        return (
            <div className="popup">
                <div className="popup-inner">
                    <h2>Add new person</h2>
                    <br />
                    <div className="input-container">
                        <div>
                            <h3 className="top-input-label">Name*</h3>
                            <input id="name"></input>
                        </div>
                        <div>
                            <h3 className="top-input-label">Role*</h3>
                            <input id="role"></input>
                        </div>
                        <div>
                            <h3 className="top-input-label">Start date*</h3>
                            <DatePicker id="start_date" selected={startDate} onChange={(date) => updateDate(date)} dateFormat="dd/MM/yyyy" />
                        </div>
                    </div>
                    <button className="submit-form" onClick={handleAddNewPerson}>Add new person</button>
                    <button className="popup-cancel" onClick={handleCancel}>Cancel</button>
                </div>
                {checkEntry && <CheckEntries handleClose={handleClose} />}
            </div>
        )
    }
    else {
        return <></>;
    }
}

export default PeopleForm