import { useState, useEffect } from 'react'
import Select from 'react-select'

import DataEntries from './DataEntries'

export default function Database({entries, info}) {

    const [awards, setAwards] = useState([])
    const [judges, setJudges] = useState([])
    const [years, setYears] = useState([])

    const [award, setAward] = useState('')
    const [name, setName] = useState('')
    const [year, setYear] = useState('')
    const [pair, setPair] = useState(null)

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
    },[info])
  return (
    <div className="mt-5 container-xxl">
      <h4>Filter by:</h4>
      <div className="row">
        <div className="col-md-6">
            <label>
                <span>Award</span>
                <Select
                    onChange={(option) => setAward(option.value)}
                    options={[{value: "", label: 'All'},...awards]}
                />
            </label>
        </div>
        <div className="col-md-2">
            <label>
                <span>Adjudicator</span>
                <Select
                    onChange={(option) => setName(option.value)}
                    options={[{value: "", label: 'All'},...judges]}
                />
            </label>
        </div>
        <div className="col-md-2">
            <label>
                <span>Year</span>
                <Select
                    onChange={(option) => setYear(option.value)}
                    options={[{value: "", label: 'All'},...years]}
                />
            </label>
        </div>
        <div className="col-md-2">
            <label>
                <span>Worked in Pair</span>
                <Select
                    onChange={(option) => setPair(option.value)}
                    options={[
                        {value: null, label: 'All'},
                        {value: true, label: <i className="bi bi-check"></i> },
                        {value: false, label: <i className="bi bi-x"></i>}
                ]} 
                />
            </label>
        </div>
      </div>
      {entries && 
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Award</th>
            <th scope="col">Name</th>
            <th scope="col">Year</th>
            <th scope="col">Worked in pair</th>
            <th scope="col">Difficulty</th>
          </tr>
        </thead>
        <tbody>
          <DataEntries 
            entries={entries}
            award={award} 
            name={name} 
            year={year} 
            pair={pair} 
          />
        </tbody>
      </table>
      }
    </div>
  )
}
