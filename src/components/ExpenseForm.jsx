import { useRef, useState } from "react";

const ExpenseForm = (props) => {

    const amountRef = useRef()
    const descRef = useRef()
    const catRef = useRef()

    const [exp, setExp] = useState([])

    const expHandler = (event) => {
        event.preventDefault()

        const obj = {
            amount: amountRef.current.value,
            description: descRef.current.value,
            category: catRef.current.value
        }
        const exps = [...props.exp]
        exps.push(obj)
        props.setExp(exps)
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