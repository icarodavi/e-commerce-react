import { render } from '@testing-library/react';
import App from './App';

jest.mock('@tanstack/react-query', () => {
    return {
        useQuery() {
            return [{ id: 1, thumbnail: "url", title: "title", price: 100 }]
        }
    }
});

describe('Main page', () => {
    it('renders correctly', () => {
        const { getByText } = render(<App />);
        expect(getByText('Women')).toBeInTheDocument();
    })
});