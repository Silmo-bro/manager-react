import './popup.css';

function DeleteWarning(props) {

    return (
        <div className="popup-error">
            <div className="popup-inner">
                <h4>Warning: this action cannot be undone!
                </h4>
                <div>
                    <button onClick={props.handleAcceptWarning}>Confirm</button>
                    <button className="second-flex" onClick={props.handleAbortWarning}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteWarning