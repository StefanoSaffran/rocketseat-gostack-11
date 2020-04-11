import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  const loadRepositories = async () => {
    const { data } = await api.get('repositories');
    setRepositories(data);
  }

  useEffect(() => {
    loadRepositories();
  }, []);

  async function handleAddRepository() {
    try {
      const { data } = await api.post('repositories', {
        title: `New repository ${Date.now()}`,
	      url: `https://github.com/StefanoSaffran/new-repository-${Date.now}`,
	      techs: ["ReactJS"]
      })
    } catch(err) {
      alert(err?.response?.data?.error);
    }

    setRepositories([...repositories, data])
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`);

      setRepositories(repositories.filter(repository => repository.id !== id));

    } catch (err) {
      alert(err?.response?.data?.error);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories?.map(repository => (
          <li key={repository?.id}>
            {repository?.title}

            <button onClick={() => handleRemoveRepository(repository?.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
