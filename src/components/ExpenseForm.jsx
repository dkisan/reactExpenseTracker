import { useRef, useState } from "react";

const ExpenseForm = (props) => {

    const amountRef = useRef()
    const descRef = useRef()
    const catRef = useRef()


    const expHandler = (event) => {
        event.preventDefault()

        const obj = {
            amount: amountRef.current.value,
            description: descRef.current.value,
            category: catRef.current.value
        }

        fetch('https://reactcrud-51072-default-rtdb.firebaseio.com//expense.json', {
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



    }

    return (
        <div className="flex justify-center mt-5">
            <form action="" className="w-1/2 border-b-2 p-4">
                <input ref={amountRef} type="number" name="" placeholder="Enter Amount" id="" />
                <input ref={descRef} type="text" name="" placeholder="Enter Description" id="" />
                <select ref={catRef} name="" id="">
                    <option value="Food">Food</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Salary">Salary</option>
                </select>
                <button onClick={expHandler} className="border border-blue-500 bg-blue-500 text-white w-max p-1 rounded-md">Add Expense</button>
            </form>
        </div>

    )
}

export default ExpenseForm;