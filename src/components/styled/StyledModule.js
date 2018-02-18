import styled from 'styled-components';

const StyledModule = styled.div`
    grid-column: ${props => props.gridColumns};
    grid-row: ${props => props.gridRows};
    position: relative;
    display: flex;
    flex-flow: ${props => props.flexDir} nowrap;
    justify-content: space-around;
    // border-right: 1px solid #000;
`;

export default StyledModule;
