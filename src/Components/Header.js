// Header.js
import { GiTomato } from "react-icons/gi"

const Header = () => {
    return (
        <header className="App-header">
            <div className="wrapper">
                <div className="logoOval">
                    
                    <h1 className="logo"><GiTomato /> toma_to-do <GiTomato /></h1>
                </div>
            </div>
        </header>
    )
}

export default Header;