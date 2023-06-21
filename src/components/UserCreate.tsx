import React, {useState} from 'react';
import {Button, Form, Modal, Stack} from "react-bootstrap";
import {useForm} from "react-hook-form";
import { UserModel } from '../types/user';
import { api } from '../api';
import { roles } from '../types/roles';

function UserCreate() {
    const [signOn, res] = api.useSignOnMutation();

    const {register, handleSubmit} = useForm<UserModel>()

    const [show, setShow] = useState(false);
    const submitHandler = (data: UserModel) => {
        signOn(data).then(() => {
            window.location.reload()
        });
    }
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
                Создать пользователя
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={handleSubmit(submitHandler)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Создание пользователя</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Stack className="gap-3">
                            <Form.Group>
                                <Form.Label>Адрес электронной почты</Form.Label>
                                <Form.Control type="email" placeholder="name@example.com" {...register("email")}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Фамилия</Form.Label>
                                <Form.Control {...register("surname")}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Имя</Form.Label>
                                <Form.Control {...register("name")}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Отчество</Form.Label>
                                <Form.Control {...register("patronymic")}/>
                            </Form.Group>

                            <div>
                                {roles.map((roles) => (
                                    <Form.Check
                                        key={roles.value} className="mb-3"
                                        inline
                                        label={roles.label}
                                        value={roles.value}
                                        type="radio"
                                        {...register("role")}
                                    />
                                ))}
                            </div>
                        </Stack>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Отменить
                        </Button>
                        <Button variant="primary" type={"submit"}>
                            Создать пользователя
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>

        </div>
    );
}

export default UserCreate;