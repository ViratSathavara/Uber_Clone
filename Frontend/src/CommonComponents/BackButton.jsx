import React from 'react';
import { Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const BackButton = ({ onClick, className = '' }) => {
  return (
    <Button 
      onClick={onClick}
      className={`absolute text-center ${className}`}
    >
      <ExpandMoreIcon className="text-black" />
    </Button>
  );
};

export default BackButton;