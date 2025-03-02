import { useEffect, useState } from "react";
import axios from "axios";

function Profile({ personClicked, setPersonClicked, operations, capabilities, setCapabilities }) {

    const [operationsCount, setOperationsCount] = useState("")

    useEffect(() => {
        if (personClicked) {
            async function fetchOperationsCount() {
                const response = await axios.get("http://127.0.0.1:8080/api/profile", { params: { personClicked } });
                setOperationsCount(response.data.operationsCount);
            };

            async function fetchCapabilities() {
                const response = await axios.get("http://127.0.0.1:8080/api/profile", { params: { personClicked } });
                setCapabilities(response.data.capabilities);
            };

            fetchOperationsCount();
            fetchCapabilities();
        }
    }, [personClicked, operations]);


    function handleCloseProfile() {
        setPersonClicked("");
    }


    if (personClicked) {

        return (
            <div className="profile-container">
                <div className="profile-header">
                    <h2>{personClicked}</h2>
                    <button className="close-button" onClick={handleCloseProfile}>Close profile</button>
                </div>
                <div className="profile-stats">
                    <p>Primary operations currently assigned: {operationsCount}</p>
                    <p>Tasks open: </p>
                </div>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Operation</th>
                                <th>Experience</th>
                                <th>Start date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {operations.map((operations, index) => (
                                <tr key={index}>
                                    <td>{operations.operation}</td>
                                    <td>
                                        Experience level
                                    </td>
                                    <td>
                                        DATE
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        )
    }
    else {
        return (
            <div></div>
        )
    };
}

export default Profile