import './popup.css';
import axios from 'axios';

function PeopleForm({ peopleForm, people, setPeople, setPeopleForm }) {

    async function handleAddNewPerson() {

        // Get individual user input values
        const name = document.getElementById("name").value;
        const role = document.getElementById("role").value;
        const start_date = document.getElementById("start_date").value;

        // Create new person object
        const newPerson = { name, role, start_date };

        // Check if all fields completed
        if (document.getElementById("name").value && document.getElementById("role").value && document.getElementById("start_date").value) {
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
    }

    function handleCancel() {
        setPeopleForm(false);
    }

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
                            <input id="start_date"></input>
                        </div>
                    </div>
                    <button className="submit-form" onClick={handleAddNewPerson}>Add new person</button>
                    <button className="popup-cancel" onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        )
    }
    else {
        return <></>;
    }
}

export default PeopleForm