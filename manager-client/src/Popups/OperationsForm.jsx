import './popup.css';
import axios from 'axios';
import { useState } from 'react';
import CheckEntries from "./CheckEntries.jsx";


function OperationsForm({ operationsForm, operations, setOperations, setOperationsForm }) {

    const [checkEntry, setCheckEntry] = useState(false);

    async function handleAddNewOperation() {
        // Get user input value
        const newOperation = document.getElementById("newOperation").value;

        // Check if all fields completed
        if (newOperation) {
            // Post new operation variable to back-end and await response
            const response = await axios.post("http://127.0.0.1:8080/api/operations", { operation: newOperation });

            // Update operation state with response received from back-end
            const updatedOperations = [...operations, response.data.newOperation];

            setOperations(updatedOperations);

            // Reset OperationsForm to false
            setOperationsForm(false);
        }
        else {
            setCheckEntry(true);
        }
    };

    function handleCancel() {
        setOperationsForm(false);
    };

    function handleClose() {
        setCheckEntry(false);
    };

    if (operationsForm) {
        return (
            <div className="popup">
                <div className="popup-inner">
                    <h2>Add new operation</h2>
                    <br />
                    <h3 className="top-input-label">Operation*</h3>
                    <input id="newOperation"></input>
                    <button className="submit-form" onClick={handleAddNewOperation}>Add new operation</button>
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

export default OperationsForm