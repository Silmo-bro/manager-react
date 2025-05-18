import axios from "axios";
import { useEffect } from "react";

function Operations({ operations, setOperations, people, setOperationsForm, setOperationClicked }) {
    // Sort operations alphabetically when they load or change
    useEffect(() => {
        if (operations && operations.length > 0) {
            const isSorted = operations.every((op, i) =>
                i === 0 || op.operation.localeCompare(operations[i - 1].operation) >= 0
            );

            if (!isSorted) {
                const sortedOperations = [...operations].sort((a, b) =>
                    a.operation.localeCompare(b.operation)
                );
                setOperations(sortedOperations);
            }
        }
    }, [operations, setOperations]);

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
        const updatedOperations = response.data.operations;

        setOperations(updatedOperations);
    };

    function handleOpenForm() {
        setOperationsForm(true);
    };

    function handleOperationClicked(operation, details) {
        setOperationClicked([operation, details]);
    };

    if (operations.length > 0)
        return (
            <div className="table-container">
                <h2>Operations (select to view details)</h2>
                <table className="operations-table">
                    <thead>
                        <tr>
                            <th>Operation</th>
                            <th>1° Responsible <br /> (select to assign)</th>
                            <th>2° Responsible <br /> (select to assign)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {operations.map((operations, index) => (
                            <tr key={index}>
                                <td onClick={() => handleOperationClicked(operations.operation, operations.details)}>{operations.operation}</td>
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
                <button onClick={handleOpenForm} className="small-button">Add new operation</button>
            </div>
        );
    else
        return (
            <div className="table-container">
            <h2>Operations (select to view details)</h2>
            <h3>There are no operations in the system. Click button below to add an operation.</h3>
            <button onClick={handleOpenForm} className="small-button">Add new operation</button>
            </div>
        )
}

export default Operations