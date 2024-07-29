import React, { useState } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Home from './components/Home';
import About from './components/About';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const enviarEmail = (event) => {
    event.preventDefault();

    if (email === 'admin' && password === 'admin') {
      alert('Usuário logado com sucesso!');
      navigate('/dashboard');
    } else {
      alert('Email ou senha inválidos!');
    }

    // Limpa os campos após o envio do formulário
    setEmail('');
    setPassword('');
  };

  return (
    <div className="App">
      <div className='menu'>
        <h2>QuizMob</h2>
        <nav className='link-menu'>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={
          <section className="container-init">
            <h1>Olá, seja bem-vindo</h1>
            <form onSubmit={enviarEmail}>
              <label htmlFor="email">Email: </label>
              <input 
                type="text" 
                name="user_email" // Renomeie os campos de entrada
                id="user_email" 
                placeholder="Insira seu email" 
                value={email} 
                onChange={(event) => setEmail(event.target.value)} 
                autoComplete="off" 
              /><br />
              <label htmlFor="password">Senha: </label>
              <input 
                type="password" 
                name="user_password" // Renomeie os campos de entrada
                id="user_password" 
                placeholder="Insira sua senha" 
                value={password} 
                onChange={(event) => setPassword(event.target.value)} 
                autoComplete="off" 
              />
              <button type="submit">Entrar</button>
            </form>
            <nav className='final-formulario'>
              <ul>
                <li><a href='#'>Esqueceu sua senha?</a></li>
                <li><a href='#'>Cadastre-se</a></li>
              </ul>
            </nav>
          </section>
        } />
      </Routes>
    </div>
  );
}

export default App;
