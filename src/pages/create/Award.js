import { useEffect, useState } from "react"
import { useFirestore } from '../../hooks/useFirestore'
import Select from 'react-select'

import './Create.css'

export default function Award({info, diff}) {
    const { updateDocument } = useFirestore('award-info')
    const { updateDocument: updateDifficulty } = useFirestore('award-difficulty')
    const [award, setAward] = useState("")
    const [difficulty, setDifficulty] = useState(null)
    const [success, setSuccess] = useState(false)
    const [formError, setFormError] = useState(null)
    const [allAwards, setAllAwards] = useState([])
    const [allDifficulty, setAllDifficulty] = useState(null)

    const [high, setHigh] = useState([])
    const [medium, setMedium] = useState([])
    const [low, setLow] = useState([])

    const options = [
        {value: 'NA', label: 'NA'},
        {value: 'Low', label: 'Low'},
        {value: 'Medium', label: 'Medium'},
        {value: 'High', label: 'High'}
    ]


    useEffect(() => {
        if (info) {
            setAllAwards(info.awards)
        }
        if (diff) {
            setAllDifficulty(diff)
            setHigh(diff.high)
            setMedium(diff.medium)
            setLow(diff.low)
        }
    },[info, diff])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormError(null)

        if (!award) {
            setFormError('Please fill out an award')
            return
        }
        if (!difficulty && difficulty !== 0) {
            setFormError('Please fill out a difficulty')
            return
        }
        if (allAwards && allAwards.includes(award.trim())) {
            setFormError('Award already exists')
            return
        }

        let updates = {
            awards: [
                ...allAwards,
                award.trim()
            ]
        }

        let diffUpdates = null
        if (difficulty === 'NA') {
            diffUpdates = {
                na: [
                    ...allDifficulty.na,
                    award
                ]
            }
        } else if (difficulty === 'Low') {
            diffUpdates = {
                low: [
                    ...allDifficulty.low,
                    award
                ]
            }
        } else if (difficulty === 'Medium') {
            diffUpdates = {
                medium: [
                    ...allDifficulty.medium,
                    award
                ]
            }
        } else if (difficulty === 'High') {
            diffUpdates = {
                high: [
                    ...allDifficulty.high,
                    award
                ]
            }
        }

        await updateDocument("3RWf2J0uS8BX4MIsPU87", updates)
        await updateDifficulty('hoxAT5NRUuol306P6CcV', diffUpdates)

        setSuccess(true)
        setTimeout(() => {
            setSuccess(false)
        }, 3000)
    }

    const handleClick = async (awardSelected) => {
        console.log(awardSelected)
        const awards = allAwards.filter((award) => {
            return awardSelected !== award
        })
        let updates = {
            awards: [
                ...awards
            ]
        }

        let diffAwards = []
        let diffUpdates = {}
        if (high && high.includes(awardSelected)) {
            diffAwards = allDifficulty.high.filter((award) => {
                return awardSelected !== award
            })
            diffUpdates = {
                high: [
                    ...diffAwards
                ]
            }
        }else if (medium && medium.includes(awardSelected)) {
            diffAwards = allDifficulty.medium.filter((award) => {
                return awardSelected !== award
            })
            diffUpdates = {
                medium: [
                    ...diffAwards
                ]
            }
        } else if (low && low.includes(awardSelected)) {
            diffAwards = allDifficulty.low.filter((award) => {
                return awardSelected !== award
            })
            diffUpdates = {
                low: [
                    ...diffAwards
                ]
            }
        } else {
            diffAwards = allDifficulty.na.filter((award) => {
                return awardSelected !== award
            })
            diffUpdates = {
                na: [
                    ...diffAwards
                ]
            }
        }
        await updateDocument("3RWf2J0uS8BX4MIsPU87", updates)
        await updateDifficulty('hoxAT5NRUuol306P6CcV', diffUpdates)
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
                            <span className="input-group-text">Award Name</span>
                            <input className="form-control" type="text" onChange={(e) => setAward(e.target.value)} value={award} />
                        </div>
                    </label>
                    <label>
                        <div className="input-group">
                            <span className="input-group-text">Difficulty</span>
                            <Select
                                styles={{
                                    container: base => ({
                                        ...base,
                                        flex: 1
                                      })
                                }}
                                onChange={(option) => setDifficulty(option.value)}
                                options={options}
                            />
                        </div>
                    </label>
                    <button className="btn btn-warning mb-5">Add New Award</button>
                    {formError && <p className="lead fw-bold text-center text-light rounded border bg-danger p-2">{formError}</p>}
                    {success && <p className="lead fw-bold text-center text-light rounded border bg-success p-2">Success</p>}
                </div>
                <div className="col-md-5">
                    <h4>Awards</h4>
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="col">Award Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {info && info.awards.map((award) => {
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
