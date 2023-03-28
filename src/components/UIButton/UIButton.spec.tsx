import { render } from '@testing-library/react';
import { UIButton } from '.';

describe("UIButton Component", () => {
    it('renders correctly', () => {
        const { getByText } = render(
            <UIButton>
                Button
            </UIButton>
        );

        expect(getByText('Button')).toBeInTheDocument();
    });

    it('have correct default classes', () => {
        const { getByText } = render(
            <UIButton>
                Button
            </UIButton>
        );

        expect(getByText('Button')).toHaveClass(`ml-3 
        inline-flex 
        justify-center 
        rounded-md 
        py-2 
        px-4 
        antialiased
        font-medium 
        shadow-sm
        focus:outline-none
        focus:ring-2 
        focus:ring-primary-500 
        focus:ring-offset-2 border-transparent bg-primary-800 text-white hover:bg-primary-600 text-sm`);
    });

    it('type secondary have correct classes', () => {
        const { getByText } = render(
            <UIButton color="secondary">
                Button
            </UIButton>
        );

        expect(getByText('Button')).toHaveClass(`border border-gray-300 bg-white text-gray-700 hover:bg-gray-200`);
    });

    it('type danger have correct classes', () => {
        const { getByText } = render(
            <UIButton color="danger">
                Button
            </UIButton>
        );

        expect(getByText('Button')).toHaveClass(`border-transparent bg-red-700 text-white hover:bg-red-500`);
    });

    it('with big text have correct classes', () => {
        const { getByText } = render(
            <UIButton text="big">
                Button
            </UIButton>
        );

        expect(getByText('Button')).toHaveClass(`text-lg`);
    });
});
