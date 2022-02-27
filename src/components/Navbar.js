import { NavLink, Link } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"
import { useLogout } from '../hooks/useLogout'

import './Navbar.css'

export default function Navbar() {
    const { user } = useAuthContext()
    const { logout } = useLogout()

    return (
        <>
        <div className="navbar navbar-expand-md navbar-light bg-warning">
            <div className="container-xxl">
                <div className="navbar-brand">
                    <Link className="nav-link text-dark fw-bold" to="/"><i className="bi bi-bar-chart-fill"></i> English Awards Database</Link>
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
                        <li className="nav-item d-md-none">
                            <a href="#sidebar" className="nav-link" data-bs-toggle="offcanvas" role="button">Create <i className="bi bi-plus-circle-fill"></i></a>
                        </li>
                        {!user &&
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/login">Login</NavLink>
                        </li>
                        }
                        {user &&
                        <>
                        <li className="nav-item ms-2 d-none d-md-inline">
                            <a href="#sidebar" className="btn btn-dark text-light" data-bs-toggle="offcanvas" role="button">Create <i className="bi bi-plus-circle-fill"></i></a>
                        </li>
                        <li className="nav-item ms-2 d-none d-md-inline">
                            <button className="btn btn-danger text-light" onClick={() => logout()}>Logout</button>
                        </li>
                        </>
                        }
                    </ul>
                </div>
            </div>
        </div>
        <div className="offcanvas offcanvas-start" tabIndex="-1" id="sidebar">
            <div className="offcanvas-header">
                <div className="offcanvas-title">
                    <p className="display-6">Create New</p>
                </div>
            </div>
            <div className="offcanvas-body text-end">
                <Link className="nav-link text-secondary fw-bold" to="/create/entry"><i className="bi bi-file-bar-graph-fill"></i> Database Entry</Link>
                <Link className="nav-link text-secondary fw-bold" to="/create/adjudicator"><i className="bi bi-person-fill"></i> Adjudicator</Link>
                <Link className="nav-link text-secondary fw-bold" to="/create/award"><i className="bi bi-award-fill"></i> Award</Link>
                <Link className="nav-link text-secondary fw-bold" to="/create/year"><i className="bi bi-calendar-fill"></i> Year</Link>
            </div>
            
        </div>
        </>
    )
}