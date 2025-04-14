import axios from "axios";
import { useState } from "react";
import DeleteWarning from "./DeleteWarning";


function OperationDetails({ operationClicked, setOperationClicked }) {

    const [deleteWarning, setDeleteWarning] = useState(false);

    function handleCancel() {
        setOperationClicked("");
        setDeleteWarning(false);
    };

    async function handleDeleteOperation() {
        setDeleteWarning(true);
    };

    async function handleAcceptWarning() {
        const operationToDelete = operationClicked[0];
        await axios.post("http://127.0.0.1:8080/api/delete-operation", { operationToDelete });
        setOperationClicked("");
        setDeleteWarning(false);
    };

    if (operationClicked) {
        return (
            <div className="popup">
                <div className="popup-inner">
                    <h2>{operationClicked[0]}</h2>
                    <h3>{operationClicked[1]}</h3>
                    <button onClick={handleDeleteOperation}>Delete Operation</button>
                    <button className="popup-cancel" onClick={handleCancel}>Cancel</button>
                </div>
                {deleteWarning && <DeleteWarning handleAcceptWarning={handleAcceptWarning} />}
            </div>
        )
    }
    else {
        return <></>;
    }
}

export default OperationDetails