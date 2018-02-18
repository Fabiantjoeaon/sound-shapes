import React from 'react';
import styled from 'styled-components';
import SwitchParameter from '../Parameters/SwitchParameter';
import KnobParameter from '../Parameters/KnobParameter';
import StyledModule from '../styled/StyledModule';
import StyledTitle from '../styled/StyledTitle';

const StyledFilter = styled(StyledModule)`
    .top,
    .bottom {
        height: 50%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-around;
    }
`;
const Filter = ({ filter, setParameter, settings, gridColumns, gridRows }) => {
    return (
        <StyledFilter
            flexDir="column"
            gridColumns={gridColumns}
            gridRows={gridRows}
        >
            <StyledTitle>Filter</StyledTitle>
            <div className="top">
                <SwitchParameter
                    param="type"
                    value={filter.type}
                    module="filter"
                    setParameter={setParameter}
                    options={settings.type.options}
                    width={100 / 3}
                    height={100}
                />
                <KnobParameter
                    param="frequency"
                    setParameter={setParameter}
                    value={filter.frequency.value}
                    module="filter"
                    min={settings.frequency.min}
                    max={settings.frequency.max}
                    width={100 / 3}
                    height={100}
                />
                <SwitchParameter
                    param="rolloff"
                    value={filter._rolloff}
                    module="filter"
                    setParameter={setParameter}
                    options={settings.rolloff.options}
                    width={100 / 3}
                    height={100}
                />
            </div>
            <div className="bottom">
                <KnobParameter
                    param="Q"
                    name="resonance"
                    setParameter={setParameter}
                    value={filter.Q.value}
                    module="filter"
                    min={settings.Q.min}
                    max={settings.Q.max}
                />
                <KnobParameter
                    param="gain"
                    setParameter={setParameter}
                    value={filter.gain.value}
                    module="filter"
                    min={settings.gain.min}
                    max={settings.gain.max}
                />
            </div>
        </StyledFilter>
    );
};

export default Filter;
