// test, step1: component renders only title and author
import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import BlogForm from './components/BlogForm';
import BlogShow from './components/BlogShow';

// 1. config for the test 2. render method renders component using testing library
// 3. expectes that renders only title and author
test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true,
  };

  const component = render(<Note note={note} />);

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  );
});
