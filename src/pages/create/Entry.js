import './Create.css'

import Select from 'react-select'
import { useEffect, useState } from 'react'

import { useDocument } from '../../hooks/useDocument'
export default function Entry() {
    const { document, error } = useDocument("award-info", "3RWf2J0uS8BX4MIsPU87")
    const [awards, setAwards] = useState([])
    const [judges, setJudges] = useState([])
    const [years, setYears] = useState([])

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
    },[document])
    console.log(awards, judges, years)
    
    const handleSubmit = (e) => {
        e.preventDefault()
        
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
            <button className="btn btn-warning">Add New Entry</button>
        </form>
    </div>
  )
}
