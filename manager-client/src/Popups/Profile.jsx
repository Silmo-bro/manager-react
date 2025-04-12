import { useEffect, useState } from "react";
import axios from "axios";
import './popup.css';
import DeleteWarning from "./DeleteWarning.jsx";
import ActivePerson from "./ActivePerson.jsx";


function Profile({ personClicked, setPersonClicked, operations, capabilities, setCapabilities }) {
    const [operationsCount, setOperationsCount] = useState("");
    const [sortMode, setSortMode] = useState("none"); // Tracks sorting state
    const [deleteWarning, setDeleteWarning] = useState(false);
    const [activePersonWarning, setActivePersonWarning] = useState(false);

    // Define experience level options
    const experienceLevels = ["Untrained", "Basic", "Intermediate", "Expert", "Master"];

    useEffect(() => {
        if (personClicked) {
            async function fetchOperationsCountAndCapabilities() {
                const response = await axios.get("http://127.0.0.1:8080/api/profile", { params: { personClicked } });
                setOperationsCount(response.data.operationsCount);
                setCapabilities(response.data.capabilities);
            };

            fetchOperationsCountAndCapabilities();
        }
    }, [personClicked, operations]);

    function handleCloseProfile() {
        setDeleteWarning(false);
        setPersonClicked("");
    }

    // Function to find the matching experience level for an operation
    const getExperienceLevel = (operationName) => {
        if (!capabilities) return "Untrained";

        const capability = capabilities.find(
            (cap) => cap.operation === operationName && cap.person === personClicked
        );

        return capability ? capability.experience : "Untrained";
    };

    // Handle experience level change
    const handleExperienceChange = async (operationName, newExperience) => {
        try {
            await axios.post("http://127.0.0.1:8080/api/profile", {
                person: personClicked,
                operation: operationName,
                experience: newExperience
            });

            // Update local state to reflect the change
            const updatedCapabilities = capabilities ? [...capabilities] : [];
            const existingIndex = updatedCapabilities.findIndex(
                cap => cap.operation === operationName && cap.person === personClicked
            );

            if (existingIndex !== -1) {
                updatedCapabilities[existingIndex] = {
                    ...updatedCapabilities[existingIndex],
                    experience: newExperience
                };
            } else {
                updatedCapabilities.push({
                    operation: operationName,
                    person: personClicked,
                    experience: newExperience
                });
            }

            setCapabilities(updatedCapabilities);

        } catch (error) {
            console.error("Failed to update experience level:", error);
        }
    };

    // Function to handle sorting when the button is clicked
    const handleSort = () => {
        if (sortMode === "none") {
            setSortMode("asc");
        } else if (sortMode === "asc") {
            setSortMode("desc");
        } else {
            setSortMode("none");
        }
    };

    // Sort operations based on the selected mode
    let sortedOperations = [...operations];

    if (sortMode === "asc") {
        sortedOperations.sort((a, b) =>
            experienceLevels.indexOf(getExperienceLevel(a.operation)) -
            experienceLevels.indexOf(getExperienceLevel(b.operation))
        );
    } else if (sortMode === "desc") {
        sortedOperations.sort((a, b) =>
            experienceLevels.indexOf(getExperienceLevel(b.operation)) -
            experienceLevels.indexOf(getExperienceLevel(a.operation))
        );
    } else {
        sortedOperations.sort((a, b) => a.operation.localeCompare(b.operation));
    }

    function handleDelete() {
        setDeleteWarning(true);
    };

    async function handleAcceptWarning() {
        // Send person id to backend for deletion of person
        const response = await axios.post("http://127.0.0.1:8080/api/delete-person", { personClicked });
        console.log(response.data.success)
        // If returns success
        if (response.data.success) {
            setDeleteWarning(false);
            setPersonClicked();
        }
        else {
            // If returns failure due to still having open tasks or operations
            // Throw warning to remove all open tasks and operations
            setDeleteWarning(false);
            setActivePersonWarning(true);
        };
    };

    function handleClose() {
        setActivePersonWarning(false);
    };

    if (personClicked) {
        return (
            <div className="popup">
                <div className="popup-inner">
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
                                    <th>
                                        Experience
                                        <button className="sort-button" onClick={handleSort}>
                                            {sortMode === "none" ? "↑↓" :
                                                sortMode === "asc" ? "↑" :
                                                    "↓"}
                                        </button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedOperations.map((operation, index) => {
                                    const currentExperience = getExperienceLevel(operation.operation);
                                    return (
                                        <tr key={index}>
                                            <td>{operation.operation}</td>
                                            <td>
                                                <select
                                                    value={currentExperience}
                                                    onChange={(e) => handleExperienceChange(operation.operation, e.target.value)}
                                                >
                                                    {experienceLevels.map((level, index) => (
                                                        <option key={index} value={level}>
                                                            {level}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <button onClick={handleDelete}>Delete person</button>
                    </div>
                </div>
                {deleteWarning && <DeleteWarning handleAcceptWarning={handleAcceptWarning} />}
                {activePersonWarning && <ActivePerson handleClose={handleClose} />}
            </div>
        );
    } else {
        return <div></div>;
    }
}

export default Profile;
