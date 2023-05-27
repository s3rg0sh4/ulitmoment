import React, { useState } from 'react';
import { Button, Card, Col, Image, Placeholder, Row } from "react-bootstrap";
// import ProfilePic from "../ProfilePic.jpg";
import Container from "react-bootstrap/Container";
import { useForm } from "react-hook-form";
import { api } from '../api';
import UserSettings from './UserSettings';
// import UserSettings from "./UserSettings";

function Profile() {
    const { data: user, isSuccess, isUninitialized } = api.useGetUserQuery();
    // const name = "Амогус Импостер Мафиозович"
    const role = "Преподаватель"
    const workLocation = "Космический корабль"
    const aboutMe = "Предатель обладает явной тягой к убийству и умению управлять сложной техникой, стараясь всеми силами не выдать себя, при этом убив всех остальных людей, не дав себя рассекретить, для чего игроку управляющим им приходится убеждать других членов команды в том, что он не является предателем. При этом, похоже предатель может существовать без кислорода.\n"
    // const profilePic = {ProfilePic}



    return (
        <div>
            <Container className="profileForm p-3 mt-5 col-md-8 align-self-center d-grid">
                <Row>
                    <Col xl={2} md={3} xs={4}>
                        {user?.pic
                            ? <Image alt='' src={"data:image/jpeg;base64," + user?.pic} width="150" height="200" thumbnail />
                            : <Placeholder className='h-100 d-grid w-100' />
                        }
                    </Col>
                    <Col xl={10} md={9} xs={8}>
                        {!isUninitialized && isSuccess
                            ? <div className=''>
                                <h5>{user!.fullname}</h5>
                                <h5>{user!.role}</h5>
                                <div className='mt-5'>
                                    <UserSettings />
                                </div>
                            </div>
                            : <Placeholder as={Card.Text} animation="glow" className='h-100 d-grid'>
                                <Placeholder xs={7} />
                                <Placeholder xs={6} />
                                <Placeholder.Button className='mt-auto' variant="dark" xs={12} />
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