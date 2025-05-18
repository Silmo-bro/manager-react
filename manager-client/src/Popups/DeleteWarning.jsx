import './popup.css';
import { useEffect } from 'react';

function DeleteWarning(props) {

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                props.handleAbortWarning();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [props.handleAcceptWarning, props.handleAbortWarning]);

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