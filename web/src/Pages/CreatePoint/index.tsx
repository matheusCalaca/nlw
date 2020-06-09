import React, { useEffect, useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowDownLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import axios from 'axios';

import api from '../../services/api';
import './styles.css';
import logo from '../../assets/logo.svg';

interface Item {
    id: number;
    title: string;
    image_url: string;
}

interface IBGEUFResponse {
    sigla: string;
}
interface IBGECityResponse {
    nome: string;
}


const CreatePoint = () => {

    const [items, setItems] = useState<Item[]>([])
    const [ufs, setUfs] = useState<string[]>([])
    const [cities, setCities] = useState<string[]>([])
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
    });

    const [selectedUf, setSelectedUF] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);
    const [initalPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
    


    useEffect(() => {
        api.get('items').then(response => {
            setItems(response.data);
        })
    }, []);


    useEffect(() => {
        
        navigator.geolocation.getCurrentPosition(position => {
            const {latitude, longitude} = position.coords;
            setInitialPosition([latitude, longitude])
        })
    }, []);


    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
            const ufInitials = response.data.map(uf => uf.sigla);
            setUfs(ufInitials);
        })
    }, []);


    useEffect(() => {
        if (selectedUf !== "0") {
            axios
                .get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
                .then(response => {
                    const cityNames = response.data.map(city => city.nome);
                    setCities(cityNames);
                })
        }
        return;


    }, [selectedUf]);

    function handelSelectUf(event: ChangeEvent<HTMLSelectElement>) {
        const uf = event.target.value;
        setSelectedUF(uf);
    }

    function handelSelectCity(event: ChangeEvent<HTMLSelectElement>) {
        const city = event.target.value;
        setSelectedCity(city);
    }

    function handelMapClick(event: LeafletMouseEvent) {
        setSelectedPosition([
            event.latlng.lat,
            event.latlng.lng,
        ]);
    }
    
    function handelInputChange(event: ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target
        setFormData({
            ...formData, [name]: value
        })
    }
    

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
                            onChange={handelInputChange}
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
                                onChange={handelInputChange}
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
                                onChange={handelInputChange}
                            />
                        </div>
                    </div>
                </fieldset>
                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>selecione o Endereço no mapa</span>
                    </legend>

                    <Map center={initalPosition} zoom={15} onclick={handelMapClick}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={selectedPosition} />
                    </Map>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">
                                Estado (UF)
                            </label>
                            <select
                                name="uf"
                                id="uf"
                                value={selectedUf}
                                onChange={handelSelectUf}
                            >
                                <option value="0">Selecione um Estado</option>
                                {
                                    ufs.map(uf => (
                                        <option key={uf} value={uf}>{uf}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="field">
                            <label htmlFor="city">
                                Cidade
                            </label>
                            <select
                                name="city"
                                id="city"
                                value={selectedCity}
                                onChange={handelSelectCity}
                            >
                                <option value="0">Selecione uma Cidade</option>
                                {
                                    cities.map(city => (
                                        <option key={city} value={city} > {city}</option>
                                    ))
                                }
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
                        {items.map(item => (
                            <li key={item.id}>
                                <img src={item.image_url} alt={item.title} />
                                <span>{item.title}</span>
                            </li>
                        ))}

                    </ul>
                </fieldset>

                <button type="submit">Cadastrar Ponto de Coleta</button>
            </form>
        </div>
    )

};

export default CreatePoint;