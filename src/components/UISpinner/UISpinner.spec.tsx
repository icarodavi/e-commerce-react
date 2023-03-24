import { render } from '@testing-library/react';
import { UISPinner } from '.';

describe("UISpinner Component", () => {
    
    it('renders correctly', () => {
        const {  getByTestId } = render(
            <UISPinner data-testid="spin" />)
    
        expect(
            getByTestId('spin')
        ).toBeInTheDocument();
    });
    
})