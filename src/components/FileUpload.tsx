import React, { useState } from 'react';
import { Button, Form } from "react-bootstrap";

interface FileUploadProps {
    label: string
}

function FileUpload({label}: FileUploadProps) {

    const [files, setFiles] = useState<FileList | null>(null);

    const clickHandler = () => {
        const data = new FormData();
        if (files !== null) {
            for (const file of (Array.from(files)))
                data.append(`file`, file, file.name);
        }
    }

    return (
        <div>
            <Form.Group controlId="formFileMultiple" className="">
                <Form.Label>{label}</Form.Label>
                <Form.Control type="file" multiple onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFiles(e.currentTarget.files)} />
                <div className='d-grid'>
                    <Button className="my-3" variant={"outline-primary"} onClick={clickHandler}>Загрузить</Button>
                </div>
            </Form.Group>
        </div>
    );
}

export default FileUpload;