import axios from "axios";
import { useEffect } from "react";

function Operations({ operations, setOperations, people, setOperationsForm }) {
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
    }

    function handleOpenForm() {
        setOperationsForm(true);
      }

    return (
        <div className="table-container">
            <h2>Operations</h2>
            <table>
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
            <button onClick={handleOpenForm} className="small-button">Add new operation</button>
        </div>
    );
}

export default Operations