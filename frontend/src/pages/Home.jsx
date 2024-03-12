import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Home = () => {
  const [addFile, setAddFile] = useState('');
  const [password, setPassword] = useState('');
  const [downloadURL, setDownloadURL] = useState('');
  const [message, setMessage] = useState('');

  const uploadFileData = async () => {
    if (addFile === '' || null || undefined) {
      setMessage('Please select your file');
    }

    try {
      const formData = new FormData();
      formData.append('file', addFile);
      formData.append('password', password);

      const response = await fetch(`http://localhost:3000/upload`, {
        method: 'POST',
        body: formData,
      });

      const fileID = await response.json();
      if (fileID.url) {
        setDownloadURL(fileID.url);
      } else {
        setDownloadURL(fileID.serverError);
        setDownloadURL('');
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (addFile !== '') {
      setMessage('');
    }
  }, [addFile]);

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Control
          type="file"
          onChange={(e) => setAddFile(e.target.files[0])}
        />
      </Form.Group>
      <p>{message !== '' && message}</p>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="password">Password</Form.Label>
        <Form.Control
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit" onClick={uploadFileData}>
        Submit
      </Button>

      <Link to={downloadURL}>
        <p>{downloadURL}</p>
      </Link>
    </>
  );
};

export default Home;
