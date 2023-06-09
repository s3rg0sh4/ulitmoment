import React, { useState } from 'react';
import { Button, Card, Col, Image, Placeholder, Row } from "react-bootstrap";
// import ProfilePic from "../ProfilePic.jpg";
import Container from "react-bootstrap/Container";
import { useForm } from "react-hook-form";
import { api } from '../api';
import UserSettings from './UserSettings';

function Profile() {
    const { data: user, isSuccess, isUninitialized } = api.useGetUserQuery();



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
                                <div className='mt-5'>
                                    <UserSettings userInfo={user} />
                                </div>
                            </div>
                            : <Placeholder as={Card.Text} animation="glow" className='h-100 d-grid'>
                                <Placeholder xs={6} />
                                <Placeholder xs={4} />
                                <Placeholder.Button className='mt-auto' variant="dark" xs={4} />
                            </Placeholder>
                        }
                    </Col>
                </Row>
                <Row>
                    <span>
                        {user?.about}
                    </span>
                </Row>
                {/* <UserSettings/> */}
            </Container>
        </div>
    );
}

export default Profile;