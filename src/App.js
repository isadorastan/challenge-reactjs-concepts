import React, { useState, useEffect } from 'react';
import api from './services/api';

import './styles.css';

function App() {
    const [repositories, setRepositories] = useState([]);

    useEffect(() => {
        api.get('/repositories')
            .then(response => {
                setRepositories(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    async function handleAddRepository() {
        api.post('/repositories', {
            title: `Novo projeto ${Date.now()}`,
            url: 'http://github.com/...',
            techs: ['Node.js']
        })
            .then(response => {
                setRepositories([...repositories, response.data]);
            })
            .catch(error => {
                console.error(error);
            });
    }

    async function handleRemoveRepository(id) {
        api.delete(`/repositories/${id}`)
            .then(() => {
                setRepositories(repositories.filter(repo => repo.id !== id));
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div>
            <ul data-testid="repository-list">
                {repositories.map(repo => (
                    <li key={repo.id}>
                        {repo.title}
                        <button onClick={() => handleRemoveRepository(repo.id)}>Remover</button>
                    </li>
                ))}
            </ul>

            <button onClick={handleAddRepository}>Adicionar</button>
        </div>
    );
}

export default App;
