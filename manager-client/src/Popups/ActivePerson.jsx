import './popup.css';
import { useEffect } from 'react';

function ActivePerson(props) {

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                props.handleClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [props.handleClose]);

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