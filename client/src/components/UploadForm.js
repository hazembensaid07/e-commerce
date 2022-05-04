import { Button } from '@material-ui/core';
import React from 'react';  

const UploadForm = () =>{

  return (
    <div >
      <Button
  variant="contained"
  component="label"
>
  Upload File
  <input
    type="file"
    hidden
  />
</Button>
    </div>
  );
}

export default UploadForm;