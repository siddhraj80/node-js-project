import { useState, useEffect } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error("Error fetching data:", err));
  }, []);

  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    fetch('http://localhost:5000/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email })
    })
    .then(res => res.json())
    .then(() => {
      
      setUsers([...users, { name, email }]);
      setName('');
      setEmail('');
    });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Full-Stack</h1>
      
      
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <button type="submit">Add User</button>
      </form>

      <h2>Registered Users:</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}><strong>{user.name}</strong> — {user.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;