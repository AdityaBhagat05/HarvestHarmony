// import nav from "./navbar.jsx";
import i1 from "./assets/mail.jpg"
import i2 from "./assets/pp.jpg"
export default function Home() {
    return (
    <div className="Home">
        <div className="navbar">
            <ul>
                <li><h3>Harvest Harmony</h3></li>
                <li><a href="#">Home</a></li>
                <li><a href="#">Tell us about your farm</a></li>
                <li><a href="#"><img src={i1} alt="mail" /></a></li>
                <li><a href="#"><img src={i2} alt="pp" /></a></li>
            </ul>
        </div>
    </div>
    );
}