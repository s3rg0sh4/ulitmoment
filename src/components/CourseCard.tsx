import React from 'react';
import { Button, Card, Col } from "react-bootstrap";

interface CourseCardProps {
    id: number
    pic: File,
    title: string,
    about: string,
}

function CourseCard({ id, pic, title, about }: CourseCardProps) {
    return (
        <Col>
            <Card className="mx-auto h-100 profileForm">
                <Card.Img height={150} variant="top" src={"data:image/jpeg;base64," + pic} className="p-0 col-md-0 offset-md-0" />
                <Card.Body className="h-100 d-grid">
                    <Card.Title>{title}</Card.Title>
                    <Card.Text>
                        {about}
                    </Card.Text>
                    <Button className="mt-auto" variant="outline-dark" href={`/course/${id}`}>Подробнее</Button>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default CourseCard;