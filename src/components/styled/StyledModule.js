import styled from 'styled-components';

const StyledModule = styled.div`
    grid-column: ${props => props.gridColumns};
    grid-row: ${props => props.gridRows};
    display: flex;
    flex-flow: ${props => props.flexDir} nowrap;
    justify-content: space-around;
`;

export default StyledModule;
