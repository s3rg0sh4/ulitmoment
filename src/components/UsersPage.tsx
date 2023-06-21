import React, { useEffect, useState } from 'react';
import Container from "react-bootstrap/Container";
import { Button, Col, FormControl, ListGroup, Row, Table } from "react-bootstrap";
import { User } from '../types/user';
import { api } from '../api';
import UserCreate from './UserCreate';
import { useNavigate } from 'react-router-dom';
// import UserCreate from "./UserCreate";

interface Props {
    role?: string,
    search?: boolean
}

function UsersPage({ role, search }: Props) {
    const navigate = useNavigate();
    const { data: users } = api.useUserListQuery();

    // const [users, setUsers] = useState<User[]>([])
    const [filter, setFilter] = useState('')
    const [filtered, setFiltered] = useState<User[]>([])

    useEffect(() => {
        if (users) {
            if (filter !== '') {
                setFiltered(users.filter(user => user.fullname.toUpperCase().includes(filter.toUpperCase())))
            } else {
                setFiltered(users)
            }
        }
    }, [filter])


    useEffect(() => {
        if (users) {
            if (role) {
                setFiltered(users.filter(user => user.role.includes(role)));
            } else {
                setFiltered(users);
            }
        }
    }, [users])

    return (
        <Container className="mt-3">
            {search
                ? <Row>
                    <FormControl placeholder='Найти пользователя' value={filter} onChange={(e) => setFilter(e.target.value)} className="mb-3" />
                </Row>
                : <Row>
                    <Col md={8}>
                        <FormControl placeholder='Найти пользователя' value={filter} onChange={(e) => setFilter(e.target.value)} className="mb-3" />
                    </Col>
                    <Col md={4} className='d-flex'>
                        <div className='ms-auto mb-3'>
                            <UserCreate />
                        </div>
                    </Col>
                </Row>
            }
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
                                    <Button variant="outline-dark" size='sm' className='mb-0 ms-auto' onClick={() => navigate(`/user/${user.id}`)}>
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