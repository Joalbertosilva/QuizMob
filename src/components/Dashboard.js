import React, { useState } from 'react';
import { futebol } from '../perguntas/futebol';
import { anime } from '../perguntas/anime';

function Dashboard() {
  const [pontuacao, setPontuacao] = useState(0);
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [mostraResultado, setMostraResultado] = useState(false);
  const [temaSelecionado, setTemaSelecionado] = useState('');

  const temas = {
    futebol: futebol,
    anime: anime
  };

  const selecionarTema = (tema) => {
    setTemaSelecionado(tema);
    setPerguntaAtual(0);
    setPontuacao(0);
    setMostraResultado(false);
  };

  const verificarResposta = (event) => {
    event.preventDefault();
    const selectedOption = document.querySelector(`input[name="pergunta${perguntaAtual}"]:checked`);
    const perguntas = temas[temaSelecionado];
    
    if (selectedOption && selectedOption.value === perguntas[perguntaAtual].respostaCorreta) {
      setPontuacao(pontuacao + 1);
      if (perguntaAtual < perguntas.length - 1) {
        setPerguntaAtual(perguntaAtual + 1);
      } else {
        setMostraResultado(true);
      }
    } else {
      setMostraResultado(true);
    }
  };

  const perguntas = temaSelecionado ? temas[temaSelecionado] : [];

  return (
    <div>
      {!temaSelecionado ? (
        <>
          <h3>Escolha o tema</h3>
          <button onClick={() => selecionarTema('anime')}>Anime</button>
          <button onClick={() => selecionarTema('futebol')}>Futebol</button>
        </>
      ) : (
        <>
          <h1>Bem-vindo ao nosso quiz</h1>
          {!mostraResultado ? (
            <form onSubmit={verificarResposta}>
              <div>
                <p>{perguntas[perguntaAtual]?.pergunta}</p>
                {perguntas[perguntaAtual]?.opcoes.map((opcao, i) => (
                  <label key={i}>
                    <input type="radio" name={`pergunta${perguntaAtual}`} value={opcao} />
                    {opcao}
                  </label>
                ))}
              </div>
              <button type="submit">Responder</button>
            </form>
          ) : (
            <p>Sua pontuação: {pontuacao} de {perguntas.length}</p>
          )}
        </>
      )}
    </div>
  );
}

export default Dashboard;
