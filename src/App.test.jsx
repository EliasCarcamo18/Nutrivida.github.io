import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App Root Component', () => {
  it('renders NutriVida brand header correctly', () => {
    render(
      <HashRouter>
        <App />
      </HashRouter>
    );
    expect(screen.getByText(/NutriVida/i)).toBeInTheDocument();
  });
});