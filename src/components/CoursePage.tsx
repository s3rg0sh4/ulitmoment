import React, { useEffect, useState } from 'react';
import Container from "react-bootstrap/Container";
import { Accordion, Button, Col, Dropdown, DropdownButton, Form, FormControl, FormText, Offcanvas, Row, Stack, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { api } from '../api';
import { AddPupil } from '../types/course';
import UsersPage from './UsersPage';
import { User } from '../types/user';

function CoursePage() {
    const { id } = useParams()

    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [files, setFiles] = useState<File | null>(null);

    const [card, setCard] = useState();

    // useEffect(() => {
    //     fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    //         .then(res => res.json())
    //         .then(data => {
    //             setCard(data)
    //             setLoading(false);
    //         })
    // }, [])

    const [subject, setSubject] = useState(1);

    const scores = []
    for (let i = 0; i < 20; i++) {
        scores.push({ subject: `Тест ${i + 1}`, score: Math.floor(i * 12 % 5 + 1) })
    }

    // const backgroundColor = (score: number) => {
    //     switch (score) {
    //         case 1:
    //         case 2:
    //             return 'danger'
    //         case 3:
    //             return 'warning'
    //         case 4:
    //         case 5:
    //             return "success"
    //         default:
    //             return "white"
    //     }
    // }

    return (

        <div>
            <Container>
                {/* <h3 className="text-center my-5">{!loading && }</h3> */}
            </Container>
            <Container className="mt-3" >
                <Row className="mt-3">
                    <div className="d-flex justify-content-between">
                        {/* <Button>Предыдущее задание</Button> */}
                        <PupilsModal id={id!} />
                        
                        <AddPupilModal id={id!} />

                        {/* <Button>Следующее задание</Button> */}
                    </div>
                </Row>
                <Row className="mt-3">
                    <Accordion alwaysOpen>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Конспект</Accordion.Header>
                            <Accordion.Body>
                                <iframe src="https://onedrive.live.com/embed?resid=C54F1C72091F0F7A%21891&amp;authkey=%21AAL712u9LY88mfg&amp;em=2&amp;wdAr=1.7777777777777777"
                                    width="100%"
                                    height="720"
                                />
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Домашнее задание</Accordion.Header>
                            <Accordion.Body>
                                <iframe src="https://onedrive.live.com/embed?resid=C54F1C72091F0F7A%21907&amp;authkey=!AI1lnipSYDdT_T8&amp;em=2&amp;wdAr=1.7777777777777777"
                                    width="100%"
                                    height="720"
                                />
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>Шпаргалка</Accordion.Header>
                            <Accordion.Body>
                                <iframe src="https://onedrive.live.com/embed?resid=C54F1C72091F0F7A%21885&amp;authkey=!AHN3RCmDfgQUSMA&amp;em=2&amp;wdAr=1.7777777777777777"
                                    width="100%"
                                    height="720"
                                />
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Row>
                <Row>
                    <FormText>
                        {/* {!loading && card.body} */}
                    </FormText>
                </Row>
                <Row className="mt-3">
                    <Stack gap={3}>
                        <div>
                            <h5>Конспект</h5>
                            <Form.Control type='file' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFiles(e.target.files![0])} />
                        </div>
                        <div>
                            <h5>Домашнее задание</h5>
                            <Form.Control type='file' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFiles(e.target.files![0])} />
                        </div>
                        <div>
                            <h5>Шпаргалка</h5>
                            <Form.Control type='file' onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFiles(e.target.files![0])} />
                        </div>
                    </Stack>
                </Row>
            </Container>
        </div>
    );
}

export default CoursePage;

const PupilsModal = ({ id }: { id: string }) => {
    const { data: users } = api.usePupilsQuery(id);

    const [filter, setFilter] = useState('');
    const [filtered, setFiltered] = useState<User[]>([]);

    useEffect(() => {
        if (users) {
            setFiltered(users);
        }
    }, [users])

    const [showPupilAdd, setShowPupilAdd] = useState(false);

    return (
        <div>
            <Button variant="primary" onClick={() => setShowPupilAdd(true)}>
                Ученики
            </Button>
            <Offcanvas placement={"start"} show={showPupilAdd} onHide={() => setShowPupilAdd(false)}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Ученики</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Row>
                        <div>
                            <FormControl placeholder='Найти пользователя' value={filter} onChange={(e) => setFilter(e.target.value)} className="mb-3" />
                        </div>
                    </Row>
                    <Table className="table-light " responsive hover>
                        <thead>
                            <tr>
                                <th scope='col'>Ученик</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(user => (
                                <tr key={user.id}>
                                    <td>
                                        <div>
                                            <div className='d-flex'>
                                                <p className='fw-bold my-auto'>{user.fullname}</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}

const AddPupilModal = ({ id }: { id: string }) => {
    const { data: users } = api.useUserListQuery();

    const [filter, setFilter] = useState('');
    const [filtered, setFiltered] = useState<User[]>([]);
    const [addPupil, res] = api.useAddPupilMutation();

    useEffect(() => {
        if (users) {
            setFiltered(users.filter(user => user.role.includes("Ученик")));
        }
    }, [users])

    const handlePupilAdd = (pupilId: number) => {
        if (id) {
            const add = {
                id: Number(id),
                pupilId: pupilId
            }
            addPupil(add)
        }
    }
    const [showPupilAdd, setShowPupilAdd] = useState(false);

    return (
        <div>
            <Button variant="primary" onClick={() => setShowPupilAdd(true)}>
                Добавить ученика
            </Button>
            <Offcanvas placement={"end"} show={showPupilAdd} onHide={() => setShowPupilAdd(false)}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Добавить ученика на курс</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Row>
                        <div>
                            <FormControl placeholder='Найти пользователя' value={filter} onChange={(e) => setFilter(e.target.value)} className="mb-3" />
                        </div>
                    </Row>
                    <Table className="table-light " responsive hover>
                        <thead>
                            <tr>
                                <th scope='col'>Ученик</th>
                                <th scope='col'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(user => (
                                <tr key={user.id}>
                                    <td>
                                        <div>
                                            <div className='d-flex'>
                                                <p className='fw-bold my-auto'>{user.fullname}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='d-flex'>
                                            <Button variant="outline-dark" size='sm' className='mb-0 ms-auto' onClick={() => handlePupilAdd(user.id)}>
                                                Добавить
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}



{/* <Offcanvas placement={"start"} show={show} onHide={handleClose}>
    <Offcanvas.Header closeButton>
        <Offcanvas.Title>Ученики</Offcanvas.Title>
    </Offcanvas.Header>
    <Offcanvas.Body>
        <Table>
            <tbody>
                {scores.map((score, index) => (
                    <tr key={index}>
                        <td className="text-center align-middle">{score.subject}</td>
                        <td
                            className={`text-center text-white`}>
                            <h5 className={`bg-${backgroundColor(score.score)} p-1 m-0`}>
                                {score.score}
                            </h5>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    </Offcanvas.Body>
</Offcanvas> */}