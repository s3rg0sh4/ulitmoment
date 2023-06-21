import React, { useState, useEffect } from 'react'
import { api } from '../api';
import { Button, Container, Form, Modal, Stack } from 'react-bootstrap';
import { School } from '../types/school';
import { UserModel } from '../types/user';
import { useForm } from 'react-hook-form';

interface Props {
    id?: number,
    school: School
}

const SchoolModal = ({ id, school }: Props) => {
    //const { data: school } = api.useGetSchoolQuery(id);


    const submitHandler = () => {

        handleClose();
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <div>
            <Button variant="outline-dark" size='sm' onClick={handleShow}>
                Посмотреть
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{school?.name}</Modal.Title>
                </Modal.Header>
                <Container className='m-3'>
                    <Stack gap={2}>
                        <span>Адрес: {school?.address}</span>
                        <span>Телефон: {school?.phone}</span>
                        <div>
                            <UserCreate/>
                        </div>
                    </Stack>
                </Container>
            </Modal>
        </div>
    )
}

export default SchoolModal


function UserCreate() {
    const [signOn, res] = api.useSignOnMutation();

    const {register, handleSubmit} = useForm<UserModel>()

    const [show, setShow] = useState(false);
    const submitHandler = (data: UserModel) => {
        data.role="ROLE_PUPIL";
        signOn(data).then(() => {
            window.location.reload()
        });
    }
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div>
            <Button variant="outline-dark" onClick={handleShow}>
                Добавить ученика
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