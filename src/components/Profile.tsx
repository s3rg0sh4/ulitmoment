import React, {useState} from 'react';
import {Button, Col, Image, Placeholder, Row} from "react-bootstrap";
// import ProfilePic from "../ProfilePic.jpg";
import Container from "react-bootstrap/Container";
import {useForm} from "react-hook-form";
import { api } from '../api';
// import UserSettings from "./UserSettings";

function Profile() {
    const {data: user, isSuccess, isUninitialized} = api.useGetUserQuery();
    // const name = "Амогус Импостер Мафиозович"
    const role = "Преподаватель"
    const workLocation = "Космический корабль"
    const aboutMe = "Предатель обладает явной тягой к убийству и умению управлять сложной техникой, стараясь всеми силами не выдать себя, при этом убив всех остальных людей, не дав себя рассекретить, для чего игроку управляющим им приходится убеждать других членов команды в том, что он не является предателем. При этом, похоже предатель может существовать без кислорода.\n"
    // const profilePic = {ProfilePic}



    return (
        <div>
            <Container className="profileForm p-3 mt-5 col-md-8 align-self-center d-grid">
                <Row>
                    <Col xs={2}>
                        <Image alt='' src={"data:image/jpeg;base64," + user?.pic} width="150" height="200" thumbnail/>
                    </Col>
                    <Col xs={10}>
                        {!isUninitialized && isSuccess ? <h5>{user!.surname} {user!.name} {user!.patronymic}</h5> : <Placeholder xs={6}/>}
                        <h5>Должность: {role}</h5>
                        <h5>Место работы: {workLocation}</h5>
                    </Col>
                </Row>
                <Row>
                    <span>
                        {aboutMe}
                    </span>
                </Row>
                {/* <UserSettings/> */}
            </Container>
        </div>
    );
}

export default Profile;