
const ExpenseShow = (props) => {

    return (
        <div className="flex flex-col items-center mt-5">
            <h1><u>Expenses</u></h1>
            <ul>
                {props.exp.map((e,i)=>{
                    return <li key={i}>{e.amount}-{e.description}-{e.category}</li>
                })}
            </ul>
        </div>

    )
}

export default ExpenseShow;