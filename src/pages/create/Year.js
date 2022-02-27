import { useEffect, useState } from "react"
import { useDocument } from '../../hooks/useDocument'
import { useFirestore } from '../../hooks/useFirestore'

export default function Year() {
    const { document } = useDocument("award-info", "3RWf2J0uS8BX4MIsPU87")
    const { updateDocument } = useFirestore('award-info')
    const [year, setYear] = useState("")
    const [success, setSuccess] = useState(false)
    const [formError, setFormError] = useState(null)
    const [allYears, setAllYears] = useState([])

    useEffect(() => {
        if (document) {
            setAllYears(document.years)
        }
    },[document])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormError(null)

        if (!year) {
            setFormError('Please fill out a year')
            return
        }
        if (allYears && allYears.includes(year.trim())) {
            setFormError('Year already exists')
            return
        }

        let updates = {
            years: [
                ...allYears,
                year.trim()
            ]
        }

        await updateDocument("3RWf2J0uS8BX4MIsPU87", updates)

        setSuccess(true)
        setTimeout(() => {
            setSuccess(false)
        }, 3000)
    }

    const handleClick = async (yearSelected) => {
        const years = allYears.filter((year) => {
            return yearSelected !== year
        })
        let updates = {
            years: [
                ...years
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
                            <span className="input-group-text">Year</span>
                            <input className="form-control" type="text" onChange={(e) => setYear(e.target.value)} value={year} />
                        </div>
                    </label>
                    <button className="btn btn-warning mb-5">Add New Year</button>
                    {formError && <p className="lead fw-bold text-center text-light rounded border bg-danger p-2">{formError}</p>}
                    {success && <p className="lead fw-bold text-center text-light rounded border bg-success p-2">Success</p>}
                </div>
                <div className="col-md-5">
                    <h4>Years</h4>
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="col">Years</th>
                            </tr>
                        </thead>
                        <tbody>
                            {document && document.years.map((year) => {
                                const id = `Id${Math.round(Math.random() * 10000)}`
                                return (
                                <tr key={year}>
                                    <td>{year} 
                                        <div className="modal fade" id={id} tabIndex="-1">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title">Are you sure?</h5>
                                                    </div>
                                                    <div className="modal-body">
                                                        <p>You are about to delete {year}.</p>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => handleClick(year)}>Delete</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    
                                        <span className="float-end" data-bs-toggle="modal" data-bs-target={`#${id}`}><i className="bi bi-trash-fill"></i></span>
                                    </td>
                                </tr>
                            )})}   
                        </tbody>
                    
                    </table>
                </div>
            </div>
        </form>
    </div>
  )
}
