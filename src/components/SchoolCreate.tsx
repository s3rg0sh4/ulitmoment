import React, {useState} from 'react';
import {Button, Form, Modal, Stack} from "react-bootstrap";
import {useForm} from "react-hook-form";
import { UserModel } from '../types/user';
import { api } from '../api';
import { roles } from '../types/roles';
import { School } from '../types/school';

function SchoolCreate() {
    const [post, res] = api.useAddSchoolMutation();

    const {register, handleSubmit} = useForm<School>()

    const [show, setShow] = useState(false);
    const submitHandler = (data: School) => {
        post(data).then(() => {
            // window.location.reload()
        });
    }
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div>
            <Button variant="primary" onClick={handleShow} className='mb-3'>
                Добавить школу
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={handleSubmit(submitHandler)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Добавить школу</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Stack className="gap-3">
                            <Form.Group>
                                <Form.Label>Название</Form.Label>
                                <Form.Control {...register("name")}/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Адрес</Form.Label>
                                <Form.Control {...register("address")}/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Номер телефона</Form.Label>
                                <Form.Control {...register("phone")}/>
                            </Form.Group>

                        </Stack>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Отменить
                        </Button>
                        <Button variant="primary" type={"submit"}>
                            Добавить школу
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

        </div>
    );
}

export default SchoolCreate;