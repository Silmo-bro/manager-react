import './popup.css';

function CheckEntries(props) {

    return (
        <div className="popup-error">
            <div className="popup-inner">
                <h4>Entry error: check entries and try again.
                    There may be some missing entries.
                </h4>
                <button onClick={props.handleClose}>Close</button>
            </div>
        </div>
    )
}

export default CheckEntries