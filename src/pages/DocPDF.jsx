import React from 'react'
import Axios from 'axios'
import FileDownload from 'js-file-download'


export function DocPDF() {



    const downloadFile = () => {
        Axios({
            url: 'http://localhost:3001/users/sendEmailOp',
            method: 'GET',
            responseType: 'blob', // Important
          }).then((response) => {
              FileDownload(response.data, 'file.pdf');
          });
         
        
            
        
      
    }
      return (
        <div>
          <h2>bobbyhadz.com</h2>
    
          <button
            onClick={() => downloadFile()}
          >
            Download file
          </button>
        </div>
      );
    }
