import { useEffect, useState } from "react";
import axios from "axios";

function Profile({ personClicked, setPersonClicked, operations, capabilities, setCapabilities }) {
    const [operationsCount, setOperationsCount] = useState("");
    
    // Define experience level options
    const experienceLevels = ["Untrained", "Basic", "Intermediate", "Expert", "Master"];

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
            // You would implement API call to update the experience level here
            // Example: await axios.post("http://127.0.0.1:8080/api/updateExperience", {
            //    person: personClicked,
            //    operation: operationName,
            //    experience: newExperience
            // });
            
            // Update local state to reflect the change
            const updatedCapabilities = capabilities ? [...capabilities] : [];
            const existingIndex = updatedCapabilities.findIndex(
                cap => cap.operation === operationName && cap.person === personClicked
            );
            
            if (existingIndex !== -1) {
                // Update existing capability
                updatedCapabilities[existingIndex] = {
                    ...updatedCapabilities[existingIndex],
                    experience: newExperience
                };
            } else {
                // Add new capability
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
                            </tr>
                        </thead>
                        <tbody>
                            {operations.map((operation, index) => {
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
    }
    else {
        return (
            <div></div>
        );
    }
}

export default Profile;