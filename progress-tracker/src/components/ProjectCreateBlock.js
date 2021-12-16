
export default function ProjectCreateBlock(props){
    return(
        <div>
            <form method={"PUT"}>
                <p>Project's name:</p><br/>
                <input type={"text"} required={true}/>

                <p>Admins</p>
                <select name="Admins" id="adminSelect">
                    <option value={"noFetchYet"}>NoFetchYet</option>
                </select>
                <br/><br/>

                <a onClick={() => {
                    props.changeComponent('Projects');
                }}><big>Create Project</big></a>
            </form>
        </div>
    )
}