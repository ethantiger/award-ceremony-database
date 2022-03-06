import { useFirestore } from "../../hooks/useFirestore"
import { useAuthContext } from '../../hooks/useAuthContext'
export default function FormChoices({form}) {
    const { user } = useAuthContext()
    const { updateDocument } = useFirestore('award-form')

    const handleClick = async (choice) => {
        const updates = form.choices.filter((entry) => {
            return entry.name !== choice 
        })
        await updateDocument('5l1hf9Mg33jRNyMHCZpd', {choices: updates})
    }
  return (
    <div className="container-xxl">
        <div className="row mt-5">
            <p className="lead">Access the form here: </p>
        </div>
        <table className="table mt-2">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">1st</th>
                    <th scope="col">2nd</th>
                    <th scope="col">3rd</th>
                    <th scope="col">4th</th>
                    <th scope="col">5th</th>
                </tr>
            </thead>
            <tbody>
                {form && form.choices.map((judge) => {
                    const id = `Id${Math.round(Math.random() * 10000)}`
                    return (
                    <tr key={id}>
                        <td>{judge.name}</td>
                        <td>{judge.first}</td>
                        <td>{judge.second}</td>
                        <td>{judge.third}</td>
                        <td>{judge.fourth}</td>
                        <td>{judge.fifth}
                        {user && <div className="modal fade" id={id} tabIndex="-1">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Are you sure?</h5>
                                    </div>
                                    <div className="modal-body">
                                        <p>You are about to delete a form entry.</p>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => handleClick(judge.name)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>}
                        {user && <span className="float-end" data-bs-toggle="modal" data-bs-target={`#${id}`}><i className="bi bi-trash-fill"></i></span>}</td>
                    </tr>
                )})}
            </tbody>
        </table>
    </div>
  )
}
