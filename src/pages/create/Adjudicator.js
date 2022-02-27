import { useEffect, useState } from "react"
import { useDocument } from '../../hooks/useDocument'
import { useFirestore } from '../../hooks/useFirestore'

export default function Adjudicator() {
    const { document } = useDocument("award-info", "3RWf2J0uS8BX4MIsPU87")
    const { updateDocument } = useFirestore('award-info')
    const [name, setName] = useState("")
    const [success, setSuccess] = useState(false)
    const [formError, setFormError] = useState(null)
    const [allNames, setAllNames] = useState([])

    useEffect(() => {
        if (document) {
            setAllNames(document.adjudicators)
        }
    },[document])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormError(null)

        if (!name) {
            setFormError('Please fill out a name')
            return
        }
        if (allNames && allNames.includes(name.trim())) {
            setFormError('Name already exists')
            return
        }

        let updates = {
            adjudicators: [
                ...allNames,
                name.trim()
            ]
        }

        await updateDocument("3RWf2J0uS8BX4MIsPU87", updates)

        setSuccess(true)
        setTimeout(() => {
            setSuccess(false)
        }, 3000)
    }

  return (
    <div className="container-xxl">  
        <form className="mt-5" onSubmit={(e) => handleSubmit(e)}>
            <div className="row">
                <div className="col-md-5">
                    <label className="form-label">
                        <div className="input-group">
                            <span className="input-group-text">Name</span>
                            <input className="form-control" type="text" onChange={(e) => setName(e.target.value)} value={name} />
                        </div>
                    </label>
                    <button className="btn btn-warning mb-5">Add New Adjudicator</button>
                    {formError && <p className="lead fw-bold text-center text-light rounded border bg-danger p-2">{formError}</p>}
                    {success && <p className="lead fw-bold text-center text-light rounded border bg-success p-2">Success</p>}
                </div>
                <div className="col-md-5">
                    <h4>Adjudicator Names</h4>
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="col">Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {document && document.adjudicators.map((adjudicator) => (
                                <tr>
                                    <td>{adjudicator}</td>
                                </tr>
                            ))}   
                        </tbody>
                    
                    </table>
                </div>
            </div>
        </form>
    </div>
  )
}
