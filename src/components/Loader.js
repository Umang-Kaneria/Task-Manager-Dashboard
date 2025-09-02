import React from 'react';
import { CircularProgress } from '@mui/material';

const Loader = () => (
  <div className="flex items-center justify-center h-full w-full">
    <CircularProgress />
  </div>
);

export default Loader;
