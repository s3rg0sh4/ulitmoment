import React, { useEffect, useState } from 'react';
import { Button, FormControl, Row } from "react-bootstrap";

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
        <div className="col-md-10 offset-1 my-5">
            <Row>
                <FormControl placeholder='Введите название курса' value={filter} onChange={(e) => setFilter(e.target.value)} className="mb-5" />
            </Row>

            <CourseCreate />


            <Row xs={12} md={3} xxl={4} className="g-5">
                {filtered.map((card) => (

                    <CourseCard key={card.id} pic={card.pic as File} title={card.name} about={card.about} id={card.id} />

                ))}
            </Row>


        </div>

    );
}

export default CoursesPage;