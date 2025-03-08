import { useEffect, useState } from "react";
import axios from "axios";

function Profile({ personClicked, setPersonClicked, operations, capabilities, setCapabilities }) {
    const [operationsCount, setOperationsCount] = useState("");
    const [sortMode, setSortMode] = useState("none"); // Tracks sorting state

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
                                                {experienceLevels.map((level, i) => (
                                                    <option key={i} value={level}>
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
                </div>
            </div>
        );
    } else {
        return <div></div>;
    }
}

export default Profile;
