import { useState } from "react";
import { Link } from "react-router-dom";
import { signup } from '../../api/auth'

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // To display feedback to the user

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await signup(username, password);
      console.log(response);
      // Assuming the response has a message property
      setMessage(response.message || 'Signup successful!');
    } catch (error) {
      setMessage('Error during signup. Please try again.');
    }
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" // Changed from "username" to "text"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input 
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button>Signup</button>
      </form>
      {message && <p>{message}</p>} {/* Display feedback */}
      <span>
        {'Already a Signed Up? '}
        <Link to="/auth/signin">Go to Signin</Link>
        {' instead.'}
      </span>
    </div>
  )
}
