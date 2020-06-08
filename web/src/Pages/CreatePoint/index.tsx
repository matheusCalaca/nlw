import React from 'react';
import { Link } from 'react-router-dom'
import { FiArrowDownLeft } from 'react-icons/fi'

import './styles.css';
import logo from '../../assets/logo.svg';

const CreatePoint = () => {

    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta" />
                <FiArrowDownLeft />
                <Link to="/">Volatar Para Home</Link>
            </header>
            <form>
                <h1>Cadastro do <br></br> ponto de coleta</h1>
                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="name">
                            Nome da Entidade
                            </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                        />
                    </div>
                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">
                                E-mail
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="whatsapp">
                                Whatsapp
                            </label>
                            <input
                                type="text"
                                name="whatsapp"
                                id="whatsapp"
                            />
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>selecione o Endereço no mapa</span>
                    </legend>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">
                                Estado (UF)
                            </label>
                            <select name="uf" id="uf">
                                <option value="0">Selecione um Estado</option>
                            </select>
                        </div>

                        <div className="field">
                            <label htmlFor="city">
                                Cidade
                            </label>
                            <select name="city" id="city">
                                <option value="0">Selecione uma Cidade</option>
                            </select>
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        <h2>Ítens de Coleta</h2>
                        <span>Selecione um ou mais itens Abaixo</span>
                    </legend>
                    <ul className="items-grid" >
                        <li>
                            <img src="" alt=""/>
                            <span>Oleo de cozinha</span>
                        </li>
                    </ul>
                </fieldset>

                <button type="submit">Cadastrar Ponto de Coleta</button>
            </form>
        </div>
    )

};

export default CreatePoint;