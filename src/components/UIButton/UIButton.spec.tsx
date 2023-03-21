
import {render } from '@testing-library/react';
import { UIButton } from '.';

test('active link renders correctly', () => {
    const {debug} = render(
    <UIButton>
    Button    
    </UIButton>)

    debug();
})