import "./Header.scss";

import React, {useEffect, useState} from "react";

import {ReactComponent as Hamburger} from "../../../icons/hamburger.svg";
import {ReactComponent as Logo} from "../../../icons/logo.svg";
import Overlay from "../../molecules/Overlay";
import MainDrawerContent from "../../templates/MainDrawerContent/MainDrawerContent";
import Drawer from "../Drawer/Drawer";
import Container from "../../atoms/Container";
import axios from "axios";
import {ENDPOINT} from "../../../helpers/urls";

const baseclass = "header";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [profileData, setProfileData] = useState({
        name: "",
    })

    const isAuthed = Boolean(localStorage.getItem("jwt"))
    const hasCompletedRegistration = Boolean(localStorage.getItem("completedRegistration"))

    useEffect(() => {
        const JWT = localStorage.getItem("jwt");

        const config = {
            headers: {Authorization: `Bearer ${JWT}`}
        };

        axios.get(ENDPOINT.PETS.GET_FIRST, config)
            .then(result => {
                setProfileData({
                    ...profileData,
                    ...result.data,
                })

                console.log("Success: ", result);
            })
            .catch(error => {
                console.log("Error: ", error);
            });
    }, [])

    return (
        <header className={baseclass}>
            <Container className={`${baseclass}__logo`}>
                <Logo className={`${baseclass}__logo_image`}/>
                <h2 className={`${baseclass}__logo_name`}>
                    {profileData.name ? `${profileData.name}` : "Pet Pad"}
                </h2>
            </Container>

            {isAuthed && hasCompletedRegistration && (
                <span onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <Hamburger className={`${baseclass}__hamburger`}/>
                </span>
            )}

            {isMenuOpen && (
                <>
                    <Drawer>
                        <MainDrawerContent/>
                    </Drawer>
                    <Overlay version="drawer"/>
                </>
            )}
        </header>
    );
};

export default Header;
