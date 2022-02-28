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
    const [pair, setPair] = useState(null)
    const [limit, setLimit] = useState(25)

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
        <div className="col-md-4">
            <label>
                <span>Award</span>
                <Select
                    onChange={(option) => setAward(option)}
                    options={[{value: "", label: 'All'},...awards]}
                />
            </label>
        </div>
        <div className="col-md-2">
            <label>
                <span>Adjudicator</span>
                <Select
                    onChange={(option) => setName(option)}
                    options={[{value: "", label: 'All'},...judges]}
                />
            </label>
        </div>
        <div className="col-md-2">
            <label>
                <span>Year</span>
                <Select
                    onChange={(option) => setYear(option)}
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
        <div className="col-md-2">
            <label>
                <span>Limit</span>
                <Select
                    onChange={(option) => setLimit(option.value)}
                    options={[
                        {value: null, label: 'No limit'},
                        {value: 25, label: '25'},
                        {value: 50, label: '50' },
                        {value: 100, label: '100'}
                ]} 
                />
            </label>
        </div>
      </div>
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
            award={award} 
            name={name} 
            year={year} 
            pair={pair}
            lim={limit} 
          />
        </tbody>
      </table>
    </div>
  )
}
