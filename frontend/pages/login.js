import React, {useState} from 'react'; /*
'useState' is a conventional name. `useState` is a function that acts as a hook, managing the component's state, and when the state changes, the event triggers a state update. 'react' is the name of the package in Node.js.
*/
import styles from "../styles/login.module.css";
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL; // We store the value of the environment variable that next.js read from the node.js process environment variables during the build; next.js only reads variables that begin with NEXT_PUBLIC.

export default function LoginPage() { // It defines this as a React Page component because it's located in the "/pages" directory. If it were in "/app", it would be a route component.
  const [email, setEmail] = useState(''); /* 'email' is the component's state value. setEmail is a standard function returned by useState, used
 to update the component's state. React internally re-executes the component's function, reconciles the virtual DOM, and updates the necessary 
parts of the real DOM. setEmail can receive a callback that allows calculating the component's current state based on its previous state.
  */
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(username, email, password);
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, email, password})
    });

    const data = await res.json();

    if (!res.ok) {
      console.error(data);
      return;
    };

    console.log('User created', data);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        email,
        password
      })
    });
    const result = await res.json();
    if (!res.ok) {
      console.error(result);
      return;
    };
    console.log(`Res ${res}\nResult ${result}`);
    window.location.href = '/';
  };

  /* value is the parameter passed to the input; it receives the value associated with the username variable, which stores the current state of the component.
  onChange is the event triggered when the input value changes, and when this happens, we execute a callback that updates the input value. */

  return (
    <form className={styles.container}>
      <h1>Login / Registro</h1>
      <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}/>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/> 
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegister}>Register</button>
      <Link href="/api/auth/login/google">Login or Register with google OAuth2</Link>
    </form>
  );
};
