'use client';

import { useState } from 'react';

export function ImageUpload() {
  const [file, setFile] = useState<File>();
  

  return (
    <div>
      
      <button
        onClick={async () => {
          console.log(file)
          if (file) {
            
            // you can run some server action or api here
            // to add the necessary data to your database
           
          }
        }}
      >
        Upload
      </button>
    </div>
  );
}