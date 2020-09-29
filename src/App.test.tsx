import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import fetch from 'cross-fetch'
import App from './App';

import configureStore from './Store'
import { Provider } from 'react-redux';
const { store } = configureStore({})

 jest.mock('cross-fetch', () => jest.fn(() => new Promise((res) => {
   res({
     json : () => {
       return {
         items: [
           {
             id: '1',
             login: 'reactivepixel'
            }
         ]
       }
     }
   })
 })))

it('Should be able to search github', async () => {
  const { getByPlaceholderText, getByText } = render(
     <Provider store={store}>
      <App />
    </Provider>
  );
  const linkElement = getByPlaceholderText(/Start typing to search../i);
  fireEvent.change(linkElement, { target: { value: 'react' }}) 
  await wait(() => expect(getByText('reactivepixel')).toBeInTheDocument(), { timeout: 2000 })
});

it('Should memoize previous values', async () => {
  const { getByPlaceholderText, getByText } = render(
     <Provider store={store}>
      <App />
    </Provider>
  );
  const linkElement = getByPlaceholderText(/Start typing to search../i);
  fireEvent.change(linkElement, { target: { value: 'react' }}) 
  await wait(() => expect(getByText('reactivepixel')).toBeInTheDocument(), { timeout: 2000 })
  expect(fetch).toHaveBeenCalledTimes(1)
});