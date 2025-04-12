import './popup.css';

function DeleteWarning(props) {

    return (
        <div className="popup-error">
            <div className="popup-inner">
                <h4>Warning: this action cannot be undone! Click OK to proceed.
                </h4>
                <button onClick={props.handleAcceptWarning}>OK</button>
            </div>
        </div>
    )
}

export default DeleteWarning