import axios from "axios";
import { useState } from "react";

function Operations({ operations, setOperations, people }) {

    async function handleAddNewOperation() {

        // Get user input value
        const newOperation = document.getElementById("newOperation").value;

        // Check if all fields completed
        if (newOperation) {
            // Post new operation variable to back-end and await response
            const response = await axios.post("http://127.0.0.1:8080/api/operations", { operation: newOperation });

            // Update operation state with response received from back-end
            setOperations([...operations, response.data.newOperation]);

            // Clear input values
            document.getElementById("newOperation").value = "";
        }
    }

    async function handleAssignment(event, operationName, responsibleKey) {
        // Get selected option, operation name and responsible 1 or 2
        const newAssignment = { 
            operation: operationName, 
            responsibleKey: responsibleKey, 
            assignee: event.target.value 
        };

        // Post selected option to back-end and await response
        const response = await axios.post("http://127.0.0.1:8080/api/assignment", newAssignment);

        // Update operation state with response received from back-end
        setOperations(response.data.operations)
    }

    return (
        <div className="table-container">
            <h2>Operations</h2>
            <table>
                <thead>
                    <tr>
                        <th>Operation</th>
                        <th>1° Responsible <br/> (select to assign)</th>
                        <th>2° Responsible <br/> (select to assign)</th>
                    </tr>
                </thead>
                <tbody>
                    {operations.map((operations, index) => (
                        <tr key={index}>
                            <td>{operations.operation}</td>
                            <td className="operations-row">Assigned: 
                                <select className={(operations.responsible1 ?? "") === "" ? "vacant-selected" : ""} value={operations.responsible1 || ""} onChange={(event) => handleAssignment(event, operations.operation, "responsible1")}>
                                    <option value="">Vacant</option>
                                {people.map((people, index) => (
                                    <option key={index}>{people.name}</option>
                                    ))}</select>
                            </td>
                            <td className="operations-row">Assigned: 
                                <select className={(operations.responsible2 ?? "") === "" ? "vacant-selected" : ""} value={operations.responsible2 || ""} onChange={(event) => handleAssignment(event, operations.operation, "responsible2")}>
                                    <option value="">Vacant</option>
                                {people.map((people, index) => (
                                    <option key={index}>{people.name}</option>
                                    ))}</select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="input-container">
                <input id="newOperation" placeholder="Operation"></input>
                <button onClick={handleAddNewOperation}>Add new operation</button>
            </div>
        </div>
    );
}

export default Operations