import React, { useEffect, useState } from 'react';
import Container from "react-bootstrap/Container";
import { Button, Col, Dropdown, FormControl, ListGroup, Row, Table } from "react-bootstrap";
import { User } from '../types/user';
import { api } from '../api';
import UserCreate from './UserCreate';
// import UserCreate from "./UserCreate";

function UsersPage() {
    const { data: users } = api.useUserListQuery();

    const rows = [{
        img: "",
        fullName: "",
        school: "",
        grade: "",
        id: ""
    }]

    // const [users, setUsers] = useState<User[]>([])
    const [filter, setFilter] = useState('')
    const [filtered, setFiltered] = useState<User[]>([])

    useEffect(() => {
        if (users) {
            if (filter != '') {
                setFiltered(users.filter(user => user.fullname.toUpperCase().includes(filter.toUpperCase())))
            } else {
                setFiltered(users)
            }
        }

    }, [filter])


    useEffect(() => {
        if (users) {
            setFiltered(users);
        }
    }, [users])

    return (
        <Container className="mt-3">
            <Row>
                <Col md={8}>
                    <FormControl placeholder='Поиск пользователя' value={filter} onChange={(e) => setFilter(e.target.value)} className="mb-3" />
                </Col>
                <Col md={4} className='d-flex'>
                    <div className='ms-auto mb-3'>
                        <UserCreate />
                    </div>
                </Col>
            </Row>
            <Table className="table-light " responsive hover>
                <thead>
                    <tr>
                        <th scope='col'>Пользователь</th>
                        <th scope='col'>Должность</th>
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
                                    <p className='fw-normal my-auto'>{user.role}</p>
                                </div>
                            </td>
                            <td>
                                <div className='d-flex'>
                                    <Button variant="outline-dark" size='sm' className='mb-0 ms-auto'>
                                        Посмотреть
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}

export default UsersPage;