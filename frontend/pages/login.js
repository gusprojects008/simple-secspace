import React, {useState} from 'react'; /*
'useState' is a conventional name. `useState` is a function that acts as a hook, managing the component's state, and when the state changes, the event triggers a state update. 'react' is the name of the package in Node.js.
*/
import Link from 'next/link';
import styles from '../styles/login.module.css';
import {errors} from '@secspace/shared';

const API_URL = process.env.NEXT_PUBLIC_API_URL; // We store the value of the environment variable that next.js read from the node.js process environment variables during the build; next.js only reads variables that begin with NEXT_PUBLIC.

export default function LoginPage() { // It defines this as a React Page component because it's located in the "/pages" directory. If it were in "/app", it would be a route component.
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(''); /* 'email' is the component's state value. setEmail is a standard function returned by useState, used
 to update the component's state. React internally re-executes the component's function, reconciles the virtual DOM, and updates the necessary 
parts of the real DOM. setEmail can receive a callback that allows calculating the component's current state based on its previous state.
  */
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');
  
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, email, password})
      });
  
      const data = await res.json();
      console.log(data);
  
      if (!res.ok) {
        setStatus('error');
        setMessage(data.code);
        return;
      }
  
      setStatus('success');
      setMessage('Account created successfully');
  
    } catch {
      setStatus('error');
      setMessage('Connection error');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');
  
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify({email, password})
      });
  
      const result = await res.json();
  
      if (!res.ok) {
        setStatus('error');
        setMessage(result.code);
        return;
      }
  
      setStatus('success');
      setMessage('Login successful');
  
      setTimeout(() => {
        window.location.href = '/forum';
      }, 700);
  
    } catch {
      setStatus('error');
      setMessage('Connection error');
    }
  };

  /* value is the parameter passed to the input; it receives the value associated with the username variable, which stores the current state of the component.
  onChange is the event triggered when the input value changes, and when this happens, we execute a callback that updates the input value. */

  return (
    <div className={`container ${styles.loginContainer}`}>
      <main className={styles.content}>
        <form className={styles.login}>
          {status !== 'idle' && (
            <div className={`${styles.feedback} ${styles[status]}`}>
              {message}
            </div>
          )}
          
          <h1 className={styles.title}>Login / Register</h1>

          <input
            className={styles.input}
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />

          <input
            className={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <input
            className={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <div className={styles.actions}>
            <button
              className={styles.primary}
              onClick={handleLogin}
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Loading...' : 'Login'}
            </button>
            
            <button
              className={styles.secondary}
              onClick={handleRegister}
              disabled={status === 'loading'}
            >
              Register
            </button>
          </div>

          <Link className={styles.oauth} href={`${API_URL}/auth/login/google`}>
            Login or register with Google
          </Link>
        </form>
      </main>
    </div>
  );
};
