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
    const [clickCoordinates, setClickCoordinates] = useState({ x: 0, y: 0 });

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

    const handleSvgClick = (event) => {
        const svg = event.currentTarget;
        const point = svg.createSVGPoint();
        point.x = event.clientX;
        point.y = event.clientY;
        const transformPoint = point.matrixTransform(svg.getScreenCTM().inverse());
        setClickCoordinates({ x: transformPoint.x, y: transformPoint.y });
    };

    const Gai = () => (
        <div className="img-container">
            <img src="https://media.valorant-api.com/agents/9f0d8ba9-4140-b941-57d3-a7ad57c6b417/killfeedportrait.png" alt="Brimstone" className="maps" />
            <div className="img-name">Brimstone</div>
        </div>
    );

    return (
        <div>
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
            <svg width="1000" height="1000" onClick={handleSvgClick}>
                <image
                    xlinkHref={maps.find((item) => item.displayName === itemName)?.displayIcon}
                    x="0"
                    y="0"
                    width="100%"
                    height="100%"
                    preserveAspectRatio="none"
                    className="mapdata"
                />
                <rect x={Number(clickCoordinates.x)-5} y={Number(clickCoordinates.y)-5} width="10" height="10" fill="orange"></rect>
            </svg>
            <div>
                <h3>Clicked Coordinates:</h3>
                <p>X: {clickCoordinates.x}, Y: {clickCoordinates.y}</p>
                
            </div>
            <div>
                <h3>Brimstone:</h3>
            </div>
        </div>
    );
}

export default Skill;
