import './Create.css'

import Select from 'react-select'
import { useEffect, useState } from 'react'

import { useDocument } from '../../hooks/useDocument'
import { useFirestore } from '../../hooks/useFirestore'

export default function Entry() {
    const { document } = useDocument("award-info", "3RWf2J0uS8BX4MIsPU87")
    const { addDocument } = useFirestore("award-entry")
    const [awards, setAwards] = useState([])
    const [judges, setJudges] = useState([])
    const [years, setYears] = useState([])

    const { document: rankingDoc } = useDocument("award-difficulty", 'hoxAT5NRUuol306P6CcV')
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
        if (document) {
            setAwards(document.awards.map((award) => {
                return {value: award, label: award}
            }))
            setJudges(document.adjudicators.map((judge) => {
                return {value: judge, label: judge}
            }))
            setYears(document.years.map((year) => {
                return {value: year, label: year}
            }))
        }
        if (rankingDoc) {
            setHigh(rankingDoc.high)
            setMedium(rankingDoc.medium)
            setLow(rankingDoc.low)
        }
    },[document, rankingDoc])
    
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

        let difficulty = 0
        if (high && high.includes(award.value)) {
            difficulty = 3
        }else if (medium && medium.includes(award.value)) {
            difficulty = 2
        } else if (low && low.includes(award.value)) {
            difficulty = 1
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
            {formError && <p className="lead fw-bold text-danger">{formError}</p>}
            {success && <p className="lead fw-bold text-success">Success</p>}
        </form>
    </div>
  )
}
