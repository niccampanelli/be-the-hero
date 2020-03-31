import React, { useState, useEffect } from 'react';
import logoImg from '../../assets/logo.svg';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import './styles.css'
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';


export default function Profile() {
    const [incidents, setIncidents] = useState([]);

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    const history = useHistory();

    useEffect(() => {api.get('profile', {
        headers: { 
            Authorization: ongId, 
            }
         }).then(response => {
            setIncidents(response.data);
         })
        }, [ongId]);

        async function handleDeleteIncident(id) {
            try{
                await api.delete(`incidents/${id}`, 
                    { headers: {
                        Authorization: ongId,
                    }}
                    );

                    setIncidents(incidents.filter(incident => incident.id !== id))
            }
            catch (err) {
                alert('Erro ao deletar, tente novamente mais tarde.')
            }
        }

        function handleLogout() {
            localStorage.clear();

            history.push('/');
        }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="" draggable="false" />
                <span>Bem Vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button type="button" onClick={handleLogout}><FiPower size={18} color="#e02041"/></button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
                {
                    incidents.map(incident => (
                        
                        <li key={incident.id}>
                            <strong>Caso:</strong>
                            <p>{incident.title}</p>
                            <strong>Descrição:</strong>
                            <p>{incident.description}</p>
                            <strong>Valor:</strong>
                            <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                            <button type="button" onClick={() => handleDeleteIncident(incident.id)}> <FiTrash2 size={20} color="#aab"/> </button>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}