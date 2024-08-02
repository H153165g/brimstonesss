import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import './map.css';

function Skill() {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const itemName = query.get('name');
    const [maps, setMaps] = useState([]);
    const [brim, setBrim] = useState(null);
    const [a, setA] = useState(false);

    useEffect(() => {
        const fetchMaps = async () => {
            try {
                const response = await fetch('https://valorant-api.com/v1/maps');
                const data = await response.json();
                setMaps(data.data);
            } catch (error) {
                console.error('Error fetching the maps data', error);
            }
        };
        
        const fetchBrim = async () => {
            try {
                const response = await fetch("https://valorant-api.com/v1/agents/9f0d8ba9-4140-b941-57d3-a7ad57c6b417");
                const data = await response.json();
                setBrim(data.data);
            } catch (error) {
                console.error('Error fetching brim data', error);
            }
        };

        fetchBrim();
        fetchMaps();
        setA(true);
    }, []);

    const Gai = () => (
        <div className="img-container">
            <img src="https://media.valorant-api.com/agents/9f0d8ba9-4140-b941-57d3-a7ad57c6b417/killfeedportrait.png" alt="Brimstone" className="maps" />
            <div className="img-name">Brimstone</div>
        </div>
    );

    return (
        <div>
            <img src={maps.find((item) => item.displayName === itemName)?.splash} alt={itemName} className="map-image"/>
            <h2>{itemName}</h2>
            <div>
                {a && brim ? (
                    brim.abilities.map((item, index) => (
                        <div key={index} className="img-container">
                            <img src={item.displayIcon} alt={item.displayName} className="ability-icon" />
                            <div className="img-name">{item.displayName}</div>
                        </div>
                    ))
                ) : (
                    <Gai />
                )}
            </div>
            <div>
                <h3>Brimstone:</h3>
                <pre>{JSON.stringify(brim, null, 2)}</pre>
            </div>
        </div>
    );
}

export default Skill;
