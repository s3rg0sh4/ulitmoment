import { useEffect, useState } from "react";
import { Button, ButtonGroup, Container, Dropdown, Nav, Navbar } from "react-bootstrap";
import { set } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

function NavBar() {
    const navigate = useNavigate();
    const [isAuthed, setIsAuthed] = useState(false);

    // useEffect(() => {


    //     // Add event listener for 'storage' event
    //     window.addEventListener('storage', handleStorageChange);

    //     // Clean up the event listener on component unmount
    //     return () => {
    //       window.removeEventListener('storage', handleStorageChange);
    //     };
    //   }, []);

    const location = useLocation();

    useEffect(() => {
        if (localStorage.getItem("auth")) {
            setIsAuthed(true);
        } else {
            setIsAuthed(false);
        }
    }, [location])

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>
                    {/* <img
                        alt=""
                        src={""}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '} */}
                    UlitMoment
                </Navbar.Brand>
                {isAuthed ? (
                    <div>
                        <Navbar.Toggle />
                        <Navbar.Collapse className="">
                            <Nav className="">
                                <Nav.Link href="/courses">Курсы</Nav.Link>
                                <Nav.Link href="/schools">Школы</Nav.Link>
                                <Nav.Link href="/users">Пользователи</Nav.Link>
                            </Nav>
                            <Nav>
                                <Dropdown as={ButtonGroup} className="ms-auto">
                                    <Button variant="success" onClick={() => navigate("/profile")}>Профиль</Button>
                                    <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
                                    <Dropdown.Menu>
                                        <Dropdown.Item href="/login" onClick={() => localStorage.removeItem('auth')}>Выйти</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </div>
                ) : <div />
                }
            </Container>
        </Navbar>
    );
}

export default NavBar;