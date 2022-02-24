import { NavLink, Link } from "react-router-dom"

import './Navbar.css'

export default function Navbar() {
    return (
        <div className="navbar navbar-expand-md navbar-light bg-warning">
            <div className="container-xxl">
                <div className="navbar-brand">
                    <Link className="nav-link text-dark fw-bold" to="/">English Awards Database</Link>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-end align-center" id="nav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/database">Database</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/awards-judged">Awards Judged</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/difficulty">Difficulty</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/winners">Past Winners</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}