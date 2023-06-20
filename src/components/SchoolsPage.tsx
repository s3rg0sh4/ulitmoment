import React, { useEffect, useState } from 'react';
import { Button, Col, FormControl, Row, Table } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { api } from '../api';
import { School } from '../types/school';
import SchoolCreate from './SchoolCreate';
import SchoolModal from './SchoolModal';

function SchoolPage() {
    const { data: schools } = api.useSchoolListQuery();

    const [filter, setFilter] = useState('')
    const [filtered, setFiltered] = useState<School[]>([])

    useEffect(() => {
        if (schools) {
            if (filter != '') {
                setFiltered(schools.filter(school => school.name.toUpperCase().includes(filter.toUpperCase())))
            } else {
                setFiltered(schools)
            }
        }
    }, [filter])


    useEffect(() => {
        if (schools) {
            setFiltered(schools);
        }
    }, [schools])

    return (
        <Container className="mt-3">
            <Row>
                <Col md={8}>
                    <FormControl placeholder='Найти школу' value={filter} onChange={(e) => setFilter(e.target.value)} className="mb-3" />
                </Col>
                <Col md={4} className='d-flex'>
                    <div className='ms-auto'>
                        <SchoolCreate />
                    </div>
                </Col>
            </Row>
            <Table className="table-light col-5" responsive hover>
                <thead>
                    <tr>
                        <th scope='col'>Школа</th>
                        <th scope='col'></th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.map(school => (
                        <tr key={school.id}>
                            <td>
                                <div className='d-flex align-items-center'>
                                    <div className=''>
                                        <p className='fw-bold mb-0'>{school.name}</p>
                                    </div>
                                </div>
                            </td>
                            <td className=" d-flex justify-content-end">
                                <SchoolModal school={school}/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}

export default SchoolPage;