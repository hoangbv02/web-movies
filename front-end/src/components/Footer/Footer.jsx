import "./Footer.scss";
import { images } from "../../assets/images";
const Footer=()=> {
    return <div className="footer">
        <img src={images.logo} alt="logo" />
        <div className="body">
            <ul className="list">
                <li className="item">Home</li>
                <li className="item">Contact us</li>
                <li className="item">Term of services</li>
                <li className="item">About us</li>
            </ul>
            <ul className="list">
                <li className="item">Live</li>
                <li className="item">FAQ</li>
                <li className="item">Premium</li>
                <li className="item">Pravacy policy</li>
            </ul>
            <ul className="list">
                <li className="item">You must watch</li>
                <li className="item">Recent release</li>
                <li className="item">Top IMDB</li>
            </ul>
        </div>
    </div>;
}

export default Footer;
