import { useRef, useState } from "react";
import ExpenseShow from "./ExpenseShow";

const ExpenseForm = (props) => {

    const amountRef = useRef()
    const descRef = useRef()
    const catRef = useRef()

    const [update, setUpdate] = useState({ status: false, id: '' })

    const editHandler = (event) => {
        const id = event.target.parentElement.getAttribute('id')
        const data = props.exp.filter(e => e.name === id)

        amountRef.current.value = data[0].amount
        descRef.current.value = data[0].description
        catRef.current.value = data[0].category
        setUpdate({ status: true, id: id })

    }

    const expHandler = (event) => {
        event.preventDefault()

        const obj = {
            amount: amountRef.current.value,
            description: descRef.current.value,
            category: catRef.current.value
        }

        if (!update.status) {

            fetch('https://reactcrud-51072-default-rtdb.firebaseio.com/expense.json', {
                method: 'POST',
                body: JSON.stringify(obj),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(async res => {
                    if (res.ok) {
                        const data = await res.json()
                        // console.log(data)
                        if (data.name) {
                            const exps = [...props.exp]
                            obj.name = data.name
                            exps.push(obj)
                            props.setExp(exps)
                        }
                    } else {
                        return res.json().then(data => {
                            alert(data.error.message)
                        })
                    }
                })
                .catch(err => {
                    console.log(err.message)
                })

        } else {
            fetch(`https://reactcrud-51072-default-rtdb.firebaseio.com/expense/${update.id}.json`, {
                method: 'PUT',
                body: JSON.stringify(obj),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(async res => {
                    const exps = [...props.exp]
                    const expIdx = exps.findIndex(p => p.name === update.id)
                    exps[expIdx] = obj
                    props.setExp(exps)
                    setUpdate({ status: false, id: '' })
                    amountRef.current.value = ''
                    descRef.current.value = ''
                    catRef.current.value = 'Food'

                })
                .catch(err => {
                    console.log(err.message)
                })
        }


    }

    return (
        <div>
            <div className="flex justify-center mt-5">
                <form action="" className="w-1/2 border-b-2 p-4">
                    <input ref={amountRef} type="number" name="" placeholder="Enter Amount" id="" />
                    <input ref={descRef} type="text" name="" placeholder="Enter Description" id="" />
                    <select ref={catRef} name="" id="">
                        <option value="Food">Food</option>
                        <option value="Petrol">Petrol</option>
                        <option value="Salary">Salary</option>
                    </select>
                    <button onClick={expHandler} className="border border-blue-500 bg-blue-500 text-white w-max p-1 rounded-md">{update.status ? 'Update Expense' : 'Add Expense'}</button>
                </form>
            </div>
            <ExpenseShow exp={props.exp} setExp={props.setExp} editHandler={editHandler} />
        </div>

    )
}

export default ExpenseForm;