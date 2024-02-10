import { useRef, useState } from "react";
import ExpenseShow from "./ExpenseShow";
import { useDispatch, useSelector } from "react-redux";
import { expenseactions } from "../store/expenseslice";

const ExpenseForm = (props) => {

    const amountRef = useRef()
    const descRef = useRef()
    const catRef = useRef()

    const [update, setUpdate] = useState({ status: false, id: '' })
    const expense = useSelector(state => state.expense.expenses)
    const user = useSelector(state => state.auth.email)

    const dispatch = useDispatch()

    const editHandler = (event) => {
        const id = event.target.parentElement.getAttribute('id')
        const data = expense.filter(e => e.name === id)

        amountRef.current.value = data[0].amount
        descRef.current.value = data[0].description
        catRef.current.value = data[0].category
        setUpdate({ status: true, id: id })

    }

    const expHandler = async (event) => {
        event.preventDefault()

        const obj = {
            amount: amountRef.current.value,
            description: descRef.current.value,
            category: catRef.current.value
        }



        if (!update.status) {
            try {
                const response = await fetch(`https://reactcrud-51072-default-rtdb.firebaseio.com/expense/${user}/expense.json`, {
                    method: 'POST',
                    body: JSON.stringify(obj),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                if (response.ok) {
                    const data = await response.json()
                    // console.log(data)
                    if (data.name) {
                        const exps = [...expense]
                        obj.name = data.name
                        exps.push(obj)
                        dispatch(expenseactions.addExpense(exps))
                        amountRef.current.value = ''
                        descRef.current.value = ''
                        catRef.current.value = 'Food'
                    }
                } else {
                    const data = await response.json()
                    throw (data.error)
                }
            }
            catch (err) {
                console.log(err.message)
            }

        } else {
            try {
                const response = fetch(`https://reactcrud-51072-default-rtdb.firebaseio.com/expense/${user}/expense/${update.id}.json`, {
                    method: 'PUT',
                    body: JSON.stringify(obj),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                if (response.ok) {
                    obj.name = update.id
                    const exps = [...expense]
                    const expIdx = exps.findIndex(p => p.name === update.id)
                    exps[expIdx] = obj
                    dispatch(expenseactions.addExpense(exps))
                    setUpdate({ status: false, id: '' })
                    amountRef.current.value = ''
                    descRef.current.value = ''
                    catRef.current.value = 'Food'

                } else {
                    const data = await response.json()
                    throw (data.error)
                }
            }
            catch (err) {
                console.log(err.message)
                const t = confirm('Some Error Occured !!! Do you want to cancel edit expense')
                if (t) {
                    setUpdate({ status: false, id: '' })
                    amountRef.current.value = ''
                    descRef.current.value = ''
                    catRef.current.value = 'Food'
                }
            }
        }


    }

    const cancelHandler = () => {
        setUpdate(false)
        amountRef.current.value = ''
        descRef.current.value = ''
        catRef.current.value = 'Food'
    }

    return (
        <div>
            <div className="flex justify-center items-center mt-5">
                <form action="" className="w-1/2 border-b-2 p-4 flex gap-2">
                    <input className='text-black' ref={amountRef} type="number" name="" placeholder="Enter Amount" id="" />
                    <input className='text-black' ref={descRef} type="text" name="" placeholder="Enter Description" id="" />
                    <select className='text-black' ref={catRef} name="" id="">
                        <option value="Food">Food</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Salary">Salary</option>
                    </select>
                    <button onClick={expHandler} className="border border-blue-500 bg-blue-500 text-white w-max p-1 rounded-md">{update.status ? 'Update Expense' : 'Add Expense'}</button>
                    {update.status && <button onClick={cancelHandler} className="border border-blue-500 bg-blue-500 text-white w-max p-1 rounded-md">Cancel</button>}
                </form>
            </div>
            <ExpenseShow editHandler={editHandler} />
        </div>

    )
}

export default ExpenseForm;