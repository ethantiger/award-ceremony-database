import { useEffect, useState } from "react"
import { useDocument } from '../../hooks/useDocument'
import { useFirestore } from '../../hooks/useFirestore'
import Select from 'react-select'

export default function Award() {
    const { document } = useDocument("award-info", "3RWf2J0uS8BX4MIsPU87")
    const { updateDocument } = useFirestore('award-info')

    const { document: diffDoc } = useDocument("award-difficulty", "hoxAT5NRUuol306P6CcV")
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
        if (document) {
            setAllAwards(document.awards)
        }
        if (diffDoc) {
            setAllDifficulty(diffDoc)
            setHigh(diffDoc.high)
            setMedium(diffDoc.medium)
            setLow(diffDoc.low)
        }
    },[document, diffDoc])

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
                            {document && document.awards.map((award) => (
                                <tr key={award}>
                                    <td>{award} <span className="float-end" onClick={() => handleClick(award)}><i className="bi bi-trash-fill"></i></span></td>
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
