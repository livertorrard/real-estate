import { configureStore } from '@reduxjs/toolkit';
import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';
import { rootReducer } from './rootReducer';

// ----------------------------------------------------------------------

const store = configureStore({
  reducer: rootReducer,
});

const useSelector = useReduxSelector;

const useDispatch = () => useReduxDispatch();


export { store, useDispatch, useSelector};
