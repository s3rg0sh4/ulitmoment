import React, { useState } from 'react';
import { Button, Card, Col, Image, Placeholder, Row } from "react-bootstrap";
// import ProfilePic from "../ProfilePic.jpg";
import Container from "react-bootstrap/Container";
import { useForm } from "react-hook-form";
import { api } from '../api';
import UserSettings from './UserSettings';
import { useParams } from 'react-router-dom';

function UserPage() {    
    const { id } = useParams();


    const { data: user, isSuccess, isUninitialized } = api.useGetUserByIdQuery(id!);

    return (
        <div>
            <Container className="profileForm p-3 mt-5 col-md-8 align-self-center d-grid">
                <Row>
                    <Col xl={2} md={3} xs={4}>
                        {user?.pic
                            ? <Image alt='' src={"data:image/jpeg;base64," + user?.pic} thumbnail />
                            : <Placeholder className='h-100 d-grid w-100' />
                        }
                    </Col>
                    <Col xl={10} md={9} xs={8}>
                        {!isUninitialized && isSuccess
                            ? <div className=''>
                                <h5>{user!.fullname}</h5>
                                <h5>{user!.role}</h5>
                                <h6>{user!.phone}</h6>
                            </div>
                            : <Placeholder as={Card.Text} animation="glow" className='h-100 d-grid'>
                                <Placeholder xs={6} />
                                <Placeholder xs={4} />
                            </Placeholder>
                        }
                    </Col>
                </Row>
                <Row>
                    <span className='mt-3'>
                        {user?.about}
                    </span>
                </Row>
            </Container>
        </div>
    );
}

export default UserPage;