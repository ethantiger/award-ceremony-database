import { useState, useEffect } from 'react'
import Select from 'react-select'
import { useDocument } from '../../hooks/useDocument'

import DataEntries from './DataEntries'

export default function Database() {
    const { document } = useDocument("award-info", "3RWf2J0uS8BX4MIsPU87")

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
  return (
    <div className="mt-5 container-xxl">
      <h4>Filter by:</h4>
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
      <table className="table">
        <thead>
          <tr>
            <th scope="col-6">Award</th>
            <th scope="col">Name</th>
            <th scope="col">Year</th>
            <th scope="col">Worked in pair</th>
            <th scope="col">Difficulty</th>
          </tr>
        </thead>
        <tbody>
          <DataEntries 
            award={award} 
            name={name} 
            year={year} 
            pair={pair} 
            awards={awards}
            judges={judges}
            years={years}
          />
        </tbody>
      </table>
    </div>
  )
}
