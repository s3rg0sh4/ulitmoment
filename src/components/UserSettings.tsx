import React, { useState } from 'react';
import { Button, Form, Modal, Stack } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { UserInfo } from '../types/user';
import { api } from '../api';

interface UserSettingsProps {
    userInfo: UserInfo
}

function UserSettings({ userInfo }: UserSettingsProps) {
    const [update, result] = api.useUpdateUserMutation();
    const { register, handleSubmit, setValue } = useForm<UserInfo>({
        defaultValues: userInfo,
    });
    register('pic');

    const submitHandler = (data: UserInfo) => {
        update(data).then(() => {
            // window.location.reload()
        })

        handleClose();
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div>
            <Button variant="primary" onClick={handleShow}>
                Редактировать профиль
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Form onSubmit={handleSubmit(submitHandler)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Редактировать</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Stack className="gap-1">
                                <Form.Group>
                                    <Form.Label>Номер телефона</Form.Label>
                                    <Form.Control {...register("phone")} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>О себе</Form.Label>
                                    <Form.Control as='textarea' rows={3} {...register("about")} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Аватар</Form.Label>
                                    <Form.Control type="file" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        if (e.currentTarget.files) {
                                            setValue("pic", e.currentTarget.files[0])
                                        }
                                    }} />
                                </Form.Group>
                            </Stack>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Отменить
                        </Button>
                        <Button variant="primary" type={"submit"}>
                            Сохранить
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
}

export default UserSettings;