import { useState } from 'react';
import axios from 'axios';

const Drive = () => {
  const [file, setFile] = useState(null);
  const token = localStorage.getItem('token');

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post('http://localhost:5000/api/drive', formData, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          Authorization: token 
        }
      });
      alert("File Uploaded to uploads/ folder! ");
    } catch (err) { alert("Upload failed"); }
  };

  return (
    <div className="drive-container">
      <h2> Google Drive UPLOAD</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload to Server</button>
    </div>
  );
};

export default Drive;