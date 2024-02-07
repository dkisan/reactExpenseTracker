import { useDispatch, useSelector } from "react-redux"
import { expenseactions } from "../store/expenseslice"

const ExpenseShow = (props) => {

    const expense = useSelector(state => state.expense.expenses)
    const totalamount = useSelector(state => state.expense.totalamount)
    const dispatch = useDispatch()

    const deleteHandler = (event) => {
        const id = event.target.parentElement.getAttribute('id')
        fetch(`https://reactcrud-51072-default-rtdb.firebaseio.com//expense/${id}.json`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => {
                console.log('deleted successfully')
                const exp = [...expense]
                const latestexp = exp.filter(e => e.name !== id)
                dispatch(expenseactions.addExpense(latestexp))

            })
            .catch(err => {
                console.log(err.message)
            })
    }

    return (
        <div className="flex flex-col items-center mt-5">
            <h1><u>Expenses</u></h1>
            <ul>
                {expense.map((e, i) => {
                    return <li id={e.name} key={i}>{e.amount}-{e.description}-{e.category}
                        <button onClick={props.editHandler} className="border-blue-500 text-white bg-blue-500 p-2 rounded-md mx-2 my-1">Edit</button>
                        <button onClick={deleteHandler} className="border-red-500 text-white bg-red-500 p-2 rounded-md mx-2 my-1">Delete</button>
                    </li>
                })}
            </ul>

            {totalamount > 10000 && 
                <button className="border-blue-500 text-white bg-blue-500 p-2 rounded-md mx-2 my-1">Active Premium</button>
            }
        </div>

    )
}

export default ExpenseShow;