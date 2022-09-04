import styled from "styled-components"

export const StyledContainer = styled.div`
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;

`

export const StyledTitle = styled.h2`
font-size: 34px;
color: #000000;
margin-top: 64px;

@media (max-width: 390px) {
    font-size:16px;
    color: #232323;
    margin-top: 25px;
}

`