import React, { useEffect, useState } from "react"
import { useFirestore } from '../../hooks/useFirestore'
import Select from 'react-select'
import { getDocs, collection } from "firebase/firestore"
import { db } from '../../firebase/config'

export default function Adjudicator({info, entries}) {
    const { updateDocument } = useFirestore('award-info')
    const { updateDocument: updateEntry } = useFirestore('award-entry')
    const [name, setName] = useState("")
    const [currentName, setCurrentName] = useState('')
    const [newName, setNewName] = useState("")
    const [success, setSuccess] = useState(false)
    const [formError, setFormError] = useState(null)
    const [allNames, setAllNames] = useState([])
    const [options, setOptions] = useState([])

    useEffect(() => {
        if (info) {
            setAllNames(info.adjudicators)
            setOptions(info.adjudicators.map((judge) => {
                return {value: judge, label: judge}
            }))
        }
    },[info])

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

    const handleClick = async (adjudicator) => {
        const names = allNames.filter((name) => {
            return adjudicator !== name
        })
        let updates = {
            adjudicators: [
                ...names
            ]
        }
        await updateDocument("3RWf2J0uS8BX4MIsPU87", updates)
        setSuccess(true)
        setTimeout(() => {
            setSuccess(false)
        }, 3000)
    }

    const handleChange = async () => {
        setFormError(null)
        // Edit award-info
        if (!currentName) {
            return setFormError('Please select a name')
        }
        if (!newName) {
            return setFormError('Please fill out a new name')
        }
        if (currentName === newName) {
            return setFormError('Current name cannot be the same as new name')
        }
        const updates = info.adjudicators.map((judge) => {
            if (judge === currentName) {
                return newName
            } else {
                return judge
            }
        })
        await updateDocument('3RWf2J0uS8BX4MIsPU87', {adjudicators: updates})

        // Edit entries
        const colRef = collection(db, 'award-entry')
        getDocs(colRef)
            .then(snapshot => {
                snapshot.docs.forEach(doc => console.log(doc.data()))
            })
        //await updateEntry(entries[0].id, {name: 'Vay Y.'})
        
    }

  return (
    <div className="container-xxl">  
        <form className="mt-5" onSubmit={(e) => handleSubmit(e)}>
            <div className="row">
                <div className="col-md-5">
                    <h4>Create new adjudicator</h4>
                    <label className="form-label">
                        <div className="input-group">
                            <span className="input-group-text">Name</span>
                            <input className="form-control" type="text" onChange={(e) => setName(e.target.value)} value={name} />
                        </div>
                    </label>
                    <button type="submit" className="btn btn-warning mb-5">Add New Adjudicator</button>
                    <h4>Edit an adjudicator</h4>
                    <label>
                        <div className="input-group">
                            <span className="input-group-text">Change</span>
                            <Select
                                styles={{
                                    container: base => ({
                                        ...base,
                                        flex: 1
                                      })
                                }}
                                onChange={(option) => setCurrentName(option.value)}
                                options={options}
                            />
                        </div>
                    </label>
                    <label className="form-label">
                        <div className="input-group">
                            <span className="input-group-text">To</span>
                            <input className="form-control" type="text" onChange={(e) => setNewName(e.target.value)} value={newName} />
                        </div>
                    </label>
                    <button type="button" className="btn btn-warning mb-5" onClick={handleChange}>Confirm</button>
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
                            {info && info.adjudicators.map((adjudicator) => {
                            const id = `Id${Math.round(Math.random() * 10000)}`
                            return (
                                <tr key={adjudicator}>
                                    <td>{adjudicator} 
                                        <div className="modal fade" id={id} tabIndex="-1">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title">Are you sure?</h5>
                                                    </div>
                                                    <div className="modal-body">
                                                        <p>You are about to delete {adjudicator}.</p>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => handleClick(adjudicator)}>Delete</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    
                                    <span className="float-end" data-bs-toggle="modal" data-bs-target={`#${id}`}><i className="bi bi-trash-fill"></i></span></td>
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
