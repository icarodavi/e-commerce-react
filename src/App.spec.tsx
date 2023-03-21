import { render, screen } from '@testing-library/react';
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
        render(<App />);
        expect(screen.getByText('Women')).toBeInTheDocument();
    })
});