import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

export default function Menu() {
    const [menus, setMenus] = useState([]);

    const fetchMenu = () => {
        fetch("http://localhost:5000/api/menus")
            .then(response => response.json())
            .then(json => setMenus(json))
            .catch(error => console.error('Error fetching menus:', error));
    };

    useEffect(() => {
        fetchMenu();
    }, []);

    return (
        <>
        <Navbar/>
        <section className='menu heroSection' style={{marginTop:'-150px'}} id='menu'>
            <div className="container" style={{marginTop:'60px'}}>
                <div className="heading_section">
                    <h1 className="heading">Menus</h1>
                    <p>Welcome to our restaurant! Enjoy an unparalleled tasting experience with our diverse range of delicious dishes</p>
                </div>
                <div className="dishes_container">
                    {menus.map(menu => (
                        <div className="card" key={menu.id}>
                            <img src={menu.imageLink} alt={menu.name} />
                            <h3>{menu.name}</h3>
                            <p>{menu.description}</p>
                            <p>Price: ${menu.price.toFixed(2)}</p>
                            <button>{menu.category}</button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
        </>
    );
}
