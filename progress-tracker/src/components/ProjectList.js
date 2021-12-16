import {useEffect, useState} from "react";
import ProjectLink from "./ProjectLink";
import ProjectCreateButton from "./ProjectCreateButton";

export default function ProjectList(props){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        let url = ''
        switch(String(props.userType)){
            case "admin":
                url = "/admin/projects";
                break;
            case "owner":
                url = "/owner/projects";
                break;
            default:
                console.log(props.userType)
        }
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        <ProjectLink name={item.name}
                                     url={'/admin/project/' + item.id}
                                     id={item.id}
                                     changeComponent={props.changeComponent}
                                     changeProject={props.changeProject}
                        />
                    </li>
                ))}
                <br/>
                <ProjectCreateButton
                    url={'/admin/project/create'}
                    changeComponent = {props.changeComponent}
                />
            </ul>
        );
    }
}