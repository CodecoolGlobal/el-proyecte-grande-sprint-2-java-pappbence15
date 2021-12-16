
export default function ProjectCreateButton(props){
    return (
        <a onClick={() => {
            props.changeComponent('Create_Project');
        }}>
            <big>Create New Project</big>
        </a>
    )
}