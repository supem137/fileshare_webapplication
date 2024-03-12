import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const PasswordBox = () => {
  const [password, setPassword] = useState('');
  const { id } = useParams();

  return (
    <>
      <Form.Label htmlFor="inputPassword">Enter File Password</Form.Label>
      <Form.Control
        type="password"
        id="inputPassword"
        onChange={(e) => setPassword(e.target.value)}
      />

      <a href={`http://localhost:3000/password/${id}?password=${password}`}>
        download
      </a>
    </>
  );
};

export default PasswordBox;
