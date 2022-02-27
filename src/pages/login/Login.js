import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, error } = useLogin()

    const handleSubmit = (e) => {
        e.preventDefault()
        login(email, password)
    }
  return (
    <div className="container-xxl mt-5" style={ {width: '33%', minWidth: "500px"}}>
        {error && <p className="lead fw-bold text-center text-light rounded border bg-danger p-2">{error}</p>}
        <div className="card">
            <div className="card-body">
                <h4 className="card-title">Login</h4>
                <div className="card-body">
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <label className="form-label">
                            <div className="input-group">
                                <span className="input-group-text">Email:</span>
                                <input className="form-control" type="email" onChange={(e) => setEmail(e.target.value)} value={email}/>
                            </div>
                            <div className="input-group mt-4">
                                <span className="input-group-text">Password:</span>
                                <input className="form-control" type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                            </div>
                            <button className="btn btn-outline-warning mt-4">Login</button>
                        </label>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}
