import './popup.css';

function TaskForm({ taskForm, setTaskForm }) {

    function handleCancel() {
        setTaskForm(false);
    }

    if (taskForm) {
        return (
            <div className="popup">
                <div className="popup-inner">
                    <h2>Add new task</h2>
                    <br/>
                    <div>
                        <input id="title" placeholder="Title"></input>
                        <input id="owner" placeholder="Delegate"></input>
                        <br/>
                        <textarea id="details" type="text" placeholder="Details"></textarea>
                        <br/>
                        <input id="date_created" placeholder="Date created"></input>
                        <input id="status" placeholder="Status"></input>
                        <br/>
                        <button>Add new task</button>
                    </div>
                    <button className="popup-cancel" onClick={handleCancel}>Cancel</button>
                </div>
            </div>
        )
    }
    else {
        return <></>;
    }
}

export default TaskForm