import axios from "axios";

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

    return (
        <div className="operations-container">
            <h2>Operations</h2>
            <table>
                <thead>
                    <tr>
                        <th>Operation</th>
                        <th>1° Responsible</th>
                        <th>2° Responsible</th>
                    </tr>
                </thead>
                <tbody>
                    {operations.map((operations, index) => (
                        <tr key={index}>
                            <td>{operations.operation}</td>
                            <td><select>{people.map((people, index) => (
                                <option key={index}>{people.name}</option>
                            ))}</select></td>
                            <td><select>{people.map((people, index) => (
                                <option key={index}>{people.name}</option>
                            ))}</select></td>
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