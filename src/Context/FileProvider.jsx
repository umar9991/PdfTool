import React, { createContext, useReducer } from 'react';

const FileContext = createContext();

const fileReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FILES':
      return { ...state, files: action.payload };
    case 'ADD_FILE':
      return { ...state, files: [...state.files, ...action.payload] };
    case 'REMOVE_FILE':
      return { ...state, files: state.files.filter((_, i) => i !== action.payload) };
    case 'CLEAR_FILES':
      return { ...state, files: [] };
    case 'SET_PROCESSING':
      return { ...state, isProcessing: action.payload };
    case 'SET_RESULT':
      return { ...state, processResult: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_ACTIVE_TOOL':
      return { ...state, activeTool: action.payload };
    default:
      return state;
  }
};

const initialState = {
  files: [],
  isProcessing: false,
  processResult: null,
  error: null,
  activeTool: null,
};

const FileProvider = ({ children }) => {
  const [state, dispatch] = useReducer(fileReducer, initialState);

  return (
    <FileContext.Provider value={{ state, dispatch }}>
      {children}
    </FileContext.Provider>
  );
};

export { FileContext, FileProvider };
