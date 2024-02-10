import { useDispatch, useSelector } from "react-redux"
import { expenseactions } from "../store/expenseslice"
import { themeactions } from "../store/themeslice"

const ExpenseShow = (props) => {

    const expense = useSelector(state => state.expense.expenses)
    const totalamount = useSelector(state => state.expense.totalamount)
    const theme = useSelector(state => state.theme.theme)
    const isPremium = useSelector(state => state.theme.active)
    const user = useSelector(state => state.auth.email)
    const dispatch = useDispatch()


    const deleteHandler = async (event) => {
        try {
            const id = event.target.parentElement.getAttribute('id')
            const response = await fetch(`https://reactcrud-51072-default-rtdb.firebaseio.com/expense/${user}/expense/${id}.json`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            if (response.ok) {
                console.log('deleted successfully')
                const exp = [...expense]
                const d = exp.filter(e => e.name === id)
                const latestexp = exp.filter(e => e.name !== id)
                dispatch(expenseactions.addExpense(latestexp))
                if (totalamount - +d[0].amount < 10000) {
                    const res = await fetch(`https://reactcrud-51072-default-rtdb.firebaseio.com/expense/${user}/isPrem.json`, {
                        method: 'PUT',
                        body: JSON.stringify({ isPremium: false, theme: 'Light' }),
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    })
                    if (res.ok) {
                        const data = await res.json()
                        dispatch(themeactions.deactivatePremium())
                        dispatch(themeactions.addpremium('Light'))
                        localStorage.getItem('ExpenseIsPremium', data.isPremium)
                    } else {
                        const data = await res.json()
                        throw (data.error)
                    }

                }
            } else {
                const data = await response.json()
                throw (data.error)
            }
        }
        catch (err) {
            console.log(err.message)
        }
    }

    const activePremiumHandler = async () => {
        try {
            const response = await fetch(`https://reactcrud-51072-default-rtdb.firebaseio.com/expense/${user}/isPrem.json`, {
                method: 'PUT',
                body: JSON.stringify({ isPremium: true, theme: 'Light' }),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            if (response.ok) {
                const data = await response.json()
                dispatch(themeactions.activatePremium(data.isPremium))
                localStorage.getItem('ExpenseIsPremium', data.isPremium)
            } else {
                const data = await response.json()
                throw (data.error)
            }
        }
        catch (err) {
            console.log(err.message)
        }

    }

    const downloadHandler = () => {
        const txt = JSON.stringify(expense)
        let data = new Blob([txt], { type: 'text/csv' })
        const url = window.URL.createObjectURL(data)
        const a = document.createElement('a')
        a.href = url
        a.download = 'expense.txt'
        a.click()
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

            {!isPremium && totalamount > 10000 &&
                <button onClick={activePremiumHandler} className="border-blue-500 text-white bg-blue-500 p-2 rounded-md mx-2 my-1">Activate Premium</button>
            }
            {isPremium && totalamount > 10000 &&
                <button onClick={downloadHandler} className="border-blue-500 text-white bg-blue-500 p-2 rounded-md mx-2 my-1">Download Expenses</button>
            }
        </div>

    )
}

export default ExpenseShow;