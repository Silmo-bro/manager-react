import './popup.css';
import { useEffect } from 'react';

function CheckEntries(props) {

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
                <h4>Entry error: check entries and try again.
                    There may be some missing entries.
                </h4>
                <button onClick={props.handleClose}>Close</button>
            </div>
        </div>
    )
}

export default CheckEntries