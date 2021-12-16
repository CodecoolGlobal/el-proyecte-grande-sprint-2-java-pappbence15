import * as url from "url";

const {useState, useEffect} = require("react");

function Settings(props){
    const [notifications, setNotifications] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    useEffect(()=>{
        fetch("/settings")
            .then(res => res.json())
            .then(
                (result) => {
                    setNotifications(result.notifications);
                    setIsLoaded(true);
                },(error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if(error){
        return(<div className='error-message'>
            {error.message}
        </div>)
    }else if (!isLoaded){
        return(
            <div className='loading-container'>
                Loading...
            </div>
        )
    }else{
        return(
            <div className='settings-controller'>
                <div className='settings-mode'>
                    <p>Notifications</p>
                <label className="switch">
                    <input type="checkbox" checked={notifications} onClick={handleNotificationClick}/>
                        <span className="slider round"/>
                </label>
                </div>
                <div className='settings-mode'>
                    <p>Dark mode</p>
                    <label className="switch">
                        <input type="checkbox" checked={props.darkMode} onClick={handleDarkModeClick}/>
                            <span className="slider round"/>
                    </label>
                </div>
            </div>
        )
    }

    function handleNotificationClick(){
        const url = `/settings/update/notifications/${!notifications}`;
        fetch(url, {method: "POST"});
        setNotifications(!notifications);
    }

    function handleDarkModeClick() {
        const url = `/settings/update/darkMode/${!props.darkMode}`;
        fetch(url, {method: "POST"});
        props.setTheme(!props.darkMode);
    }
}



export default Settings;