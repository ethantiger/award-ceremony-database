import { useEffect, useState } from "react"
import { useDocument } from '../../hooks/useDocument'
import { useFirestore } from '../../hooks/useFirestore'

export default function Award() {
    const { document } = useDocument("award-info", "3RWf2J0uS8BX4MIsPU87")
    const { updateDocument } = useFirestore('award-info')
    const [award, setAward] = useState("")
    const [success, setSuccess] = useState(false)
    const [formError, setFormError] = useState(null)
    const [allAwards, setAllAwards] = useState([])

    useEffect(() => {
        if (document) {
            setAllAwards(document.awards)
        }
    },[document])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setFormError(null)

        if (!award) {
            setFormError('Please fill out an award')
            return
        }
        if (allAwards && allAwards.includes(award)) {
            setFormError('Award already Exists')
            return
        }

        let updates = {
            awards: [
                ...allAwards,
                award
            ]
        }

        await updateDocument("3RWf2J0uS8BX4MIsPU87", updates)

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
                </div>
            </div>
            <button className="btn btn-warning mb-5">Add New Award</button>
            {formError && <p className="lead fw-bold text-danger">{formError}</p>}
            {success && <p className="lead fw-bold text-success">Success</p>}
        </form>
    </div>
  )
}
