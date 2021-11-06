/// <reference types="jest" />
import { render, screen } from '@testing-library/react';
import App from '../src/components/app';
//import { test, expect } from '@types/jest';

test('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});
