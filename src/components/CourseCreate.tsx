import React, { useState, useEffect } from 'react';
import { Button, Form, Modal, Stack } from "react-bootstrap";
import { FieldValues, useForm } from "react-hook-form";
import FileUpload from "./FileUpload";
import { api } from '../api';
import { Course } from '../types/course';

function CourseCreate() {
    const [create, result] = api.useAddCourseMutation();

    const { register, handleSubmit, setValue } = useForm<Course>()
    register("pic", { required: true });

    const [show, setShow] = useState(false);
    const submitHandler = (data: Course) => {
        create(data).then(() => {
            window.location.reload()
        })

        handleClose();
    }

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
                Добавить курс
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={handleSubmit(submitHandler)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Создание курса</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Stack className="gap-3">
                            <Form.Group>
                                <Form.Label>Название курса</Form.Label>
                                <Form.Control {...register("name", { required: true })} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Текст карточки</Form.Label>
                                <Form.Control {...register("about", { required: true })} />
                            </Form.Group>
                            {/* <FileUpload label="Добавьте картинку курса"/> */}
                            <Form.Group>
                                <Form.Label>Картинка курса</Form.Label>
                                <Form.Control type="file" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    if (e.currentTarget.files) {
                                        setValue("pic", e.currentTarget.files[0])
                                    }
                                }} />
                            </Form.Group>

                        </Stack>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Отменить
                        </Button>
                        <Button variant="primary" type={"submit"}>
                            Сохранить
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
}

export default CourseCreate;