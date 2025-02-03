import logo from "./assets/logo.avif"
export default function navbar() {
    return (
        <div className="background-image">
            <nav className="navbar">
                <img src={logo} alt="logo" />
                <h1>Hello Harmony</h1>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Services</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </nav>
        </div>
    );
}