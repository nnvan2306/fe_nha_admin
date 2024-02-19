import { useState } from "react";
import { uploadFileService } from "../../../service/imgService";
import { createTeamService } from "../../../service/teamService";

export default function View() {
    const [file, setFile] = useState(null);
    const [code, setCode] = useState(0);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleChangeFile = (e) => {
        console.log(e.target.files[0]);
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        let dataBuider = {
            code: code,
            name: name,
            description: description,
            file: file,
        };
        console.log(dataBuider);
        await createTeamService(dataBuider);
    };

    const handleUploadFile = async () => {
        const formData = new FormData();
        formData.append("file", file);
        await uploadFileService(formData);
    };
    return (
        <>
            <input
                type="number"
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input type="file" onChange={handleChangeFile} name="file" />
            <button onClick={handleUpload}>upload</button>
            <button onClick={handleUploadFile}>file</button>
        </>
    );
}
