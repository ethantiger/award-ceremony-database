import './Create.css'

import Select from 'react-select'
import { useEffect, useState } from 'react'

import { useFirestore } from '../../hooks/useFirestore'

export default function Entry({info, diff}) {
    const { addDocument } = useFirestore("award-entry")
    const [awards, setAwards] = useState([])
    const [judges, setJudges] = useState([])
    const [years, setYears] = useState([])

    const [high, setHigh] = useState([])
    const [medium, setMedium] = useState([])
    const [low, setLow] = useState([])
    
    const [formError, setFormError] = useState(null)
    const [success, setSuccess] = useState(false)
    const [award, setAward] = useState('')
    const [name, setName] = useState('')
    const [year, setYear] = useState('')
    const [pair, setPair] = useState(false)

    useEffect(() => {
        if (info) {
            setAwards(info.awards.map((award) => {
                return {value: award, label: award}
            }))
            setJudges(info.adjudicators.map((judge) => {
                return {value: judge, label: judge}
            }))
            setYears(info.years.map((year) => {
                return {value: year, label: year}
            }))
        }
        if (diff) {
            setHigh(diff.high)
            setMedium(diff.medium)
            setLow(diff.low)
        }
    },[info, diff])
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormError(null)

        if (!award) {
            setFormError('Please select an award')
            return
        }
        if (!name) {
            setFormError('Please select an adjudicator')
            return
        }
        if (!year) {
            setFormError('Please select a year')
            return
        }
        if (!pair) {
            setFormError('Please select whether they worked in pairs or not')
            return
        }

        let difficulty = 'NA'
        if (high && high.includes(award.value)) {
            difficulty = 'High'
        }else if (medium && medium.includes(award.value)) {
            difficulty = 'Medium'
        } else if (low && low.includes(award.value)) {
            difficulty = 'Low'
        }
        const entry = {
            award: award.value,
            difficulty,
            name: name.value,
            year: year.value,
            pair: pair.value
        }
        await addDocument(entry)
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
                    <label>
                        <span>Award</span>
                        <Select
                            onChange={(option) => setAward(option)}
                            options={awards}
                        />
                    </label>
                </div>
                <div className="col-md-3">
                    <label>
                        <span>Adjudicator</span>
                        <Select
                            onChange={(option) => setName(option)}
                            options={judges}
                        />
                    </label>
                </div>
                <div className="col-md-2">
                    <label>
                        <span>Year</span>
                        <Select
                            onChange={(option) => setYear(option)}
                            options={years}
                        />
                    </label>
                </div>
                <div className="col-md-2">
                    <label>
                        <span>Worked in Pair</span>
                        <Select
                            onChange={(option) => setPair(option)}
                            options={[
                                {value: true, label: 'True' },
                                {value: false, label: 'False'}
                        ]}
                        />
                    </label>
                </div>
            </div>
            <button className="btn btn-warning mb-5">Add New Entry</button>
            {formError && <p className="lead fw-bold text-center text-light rounded border bg-danger p-2">{formError}</p>}
            {success && <p className="lead fw-bold text-center text-light rounded border bg-success p-2">Success</p>}
        </form>
    </div>
  )
}
