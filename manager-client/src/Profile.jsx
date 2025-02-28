function Profile({ personClicked, setPersonClicked }) {

    function handleCloseProfile() {
        setPersonClicked("");
    }

    if (personClicked) {
        return (
            <div className="profile-container">
                <div className="profile-header">
                    <h2>{personClicked}</h2>
                    <button onClick={handleCloseProfile}>Close profile</button>
                </div>
                <div className="profile-stats">
                    <p>Operations currently assigned: </p>
                    <p>Tasks open: </p>
                </div>
            </div>
        )
    }
    else {
        return (
            <h2>Select person to view profile</h2>
        )
    };
}

export default Profile