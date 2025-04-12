import './popup.css';

function ActivePerson(props) {

    return (
        <div className="popup-error">
            <div className="popup-inner">
                <h4>Error: Person cannot be deleted while Operations or open tasks are assigned. Click OK to return.
                </h4>
                <button onClick={props.handleClose}>OK</button>
            </div>
        </div>
    )
}

export default ActivePerson