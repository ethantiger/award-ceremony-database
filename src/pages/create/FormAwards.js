import Select from 'react-select'
import { useEffect, useState } from 'react'
import { useFirestore } from '../../hooks/useFirestore'

import './Create.css'

export default function FormAwards({info, form}) {
    const { updateDocument } = useFirestore('award-form')
    const [options, setOptions] = useState([])
    const [award, setAward] = useState('')
    const [formError, setFormError] = useState(null)
    const [success, setSuccess] = useState(null)

    useEffect(() => {
        if (info) {
            setOptions(info.awards.map((award) => {
                return {value: award, label: award}
            }))
        }
    },[info])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!award) {
            return setFormError('Please add an award')
        }
        if (form.awards.includes(award.trim())) {
            return setFormError('Award already exists')
        }
        await updateDocument('5l1hf9Mg33jRNyMHCZpd', {awards: [...form.awards, award.trim()]})
        setSuccess(true)
        setTimeout(() => {
            setSuccess(false)
        }, 3000)
    }

    const handleClick = async (awardSelected) => {
        const awards = form.awards.filter((award) => {
            return awardSelected !== award
        })
        let updates = {
            awards: [
                ...awards
            ]
        }
        await updateDocument("5l1hf9Mg33jRNyMHCZpd", updates)
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
                        <h4>If Award doesn't exist:</h4>
                        <label className="form-label">
                            <div className="input-group">
                                <span className="input-group-text">Award Name</span>
                                <input className="form-control" type="text" onChange={(e) => setAward(e.target.value)} />
                            </div>
                        </label>
                        <label>
                            <h4>If Award does exist:</h4>
                            <div className="input-group">
                                <span className="input-group-text">Award Name</span>
                                <Select
                                    styles={{
                                        container: base => ({
                                            ...base,
                                            flex: 1
                                          })
                                    }}
                                    onChange={(option) => setAward(option.value)}
                                    options={options}
                                />
                            </div>
                        </label>
                        <h5>Award to be added: <p className="lead">{award}</p></h5>
                        <button className="btn btn-warning mb-5">Allow</button>
                        {formError && <p className="lead fw-bold text-center text-light rounded border bg-danger p-2">{formError}</p>}
                        {success && <p className="lead fw-bold text-center text-light rounded border bg-success p-2">Success</p>}
                    </div>
                    <div className="col-md-5">
                        <h4>Awards allowed on form</h4>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className="col">Award Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {form && form.awards.map((award) => {
                                    const id = `Id${Math.round(Math.random() * 10000)}`
                                    return (
                                    <tr key={award}>
                                        <td>{award} 
                                            <div className="modal fade" id={id} tabIndex="-1">
                                                <div className="modal-dialog">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title">Are you sure?</h5>
                                                        </div>
                                                        <div className="modal-body">
                                                            <p>You are about to delete {award}.</p>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => handleClick(award)}>Delete</button>
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