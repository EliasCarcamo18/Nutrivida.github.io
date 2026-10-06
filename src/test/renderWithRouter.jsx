import { render } from '@testing-library/react';
import { HashRouter } from 'react-router';

export const renderWithRouter = (ui) => {
  return render(ui, { wrapper: HashRouter });
};