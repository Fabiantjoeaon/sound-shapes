import React from 'react';
import styled from 'styled-components';
import KnobParameter from '../Parameters/KnobParameter';
import SwitchParameter from '../Parameters/SwitchParameter';

import StyledModule from '../styled/StyledModule';

const StyledOctaves = styled(SwitchParameter)`
    .inner {
        flex-flow: row nowrap;
        width: 100%;
        height: 100%;
        div {
            
        }
    }
`;

const OctaveControls = ({
    currentOctave,
    setParameter,
    setOctave,
    slideOctave,
    settings,
    gridColumns,
    gridRows
}) => (
    <StyledModule gridColumns={gridColumns} gridRows={gridRows}>
        <StyledOctaves
            setOctave={setOctave}
            options={settings.pitch.options}
            value={currentOctave}
            module="octave"
            width={100 / 3}
            height={100}
            param="octave"/>
        <div>
            <button onClick={() => slideOctave(-1)}>
                &larr;
            </button>
            <button onClick={() => slideOctave(1)}>
                &rarr;
            </button>
        </div>
    </StyledModule>
);

export default OctaveControls;
