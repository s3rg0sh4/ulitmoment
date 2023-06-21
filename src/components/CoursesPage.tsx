import React, { useEffect, useState } from 'react';
import { Button, Col, Container, FormControl, Row } from "react-bootstrap";

import CourseCard from "./CourseCard";
import CourseCreate from "./CourseCreate";
import { api } from '../api';
import { Course } from '../types/course';

function CoursesPage() {
    const { data: courses } = api.useCourseListQuery();

    const [filter, setFilter] = useState('')
    const [filtered, setFiltered] = useState<Course[]>([])

    useEffect(() => {
        if (courses) {
            if (filter != '') {
                setFiltered(courses.filter(course => course.name.toUpperCase().includes(filter.toUpperCase())))
            } else {
                setFiltered(courses)
            }
        }
    }, [filter])


    useEffect(() => {
        if (courses) {
            setFiltered(courses);
        }
    }, [courses])


    return (
        <Container className='mt-3'>
            <Row>
                <Col md={9}>
                    <FormControl placeholder='Найти курс' value={filter} onChange={(e) => setFilter(e.target.value)} className="mb-3" />
                </Col>
                <Col md={3} className='d-flex'>
                    <div className='ms-auto mb-3'>
                        <CourseCreate />
                    </div>
                </Col>
            </Row>


            <Row xs={2} md={3} xl={4} xxl={6} className="gy-4">
                {filtered.map((card) => (

                    <CourseCard key={card.id} pic={card.pic as File} title={card.name} about={card.about} id={card.id} />

                ))}
            </Row>
        </Container>
    );
}

export default CoursesPage;