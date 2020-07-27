import React from 'react';
import styled from "styled-components";

const ErrImg = styled.img`
max-width: 100%;
`;

const ErrorMessage = () => {
return(
    <>
        <ErrImg src={process.env.PUBLIC_URL + 'img/error.jpg'} alt=""/>
        <span>Something goes wrong</span>

    </>
)
};
export default ErrorMessage;