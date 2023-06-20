import React, { useState, useEffect } from 'react'
import { api } from '../api';
import { Button, Container, Modal, Stack } from 'react-bootstrap';
import { School } from '../types/school';

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
                    </Stack>
                </Container>
            </Modal>
        </div>
    )
}

export default SchoolModal