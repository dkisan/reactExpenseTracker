import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ExpenseForm from "./ExpenseForm";
import { useDispatch, useSelector } from "react-redux";
import { expenseactions } from "../store/expenseslice";
import { authactions } from "../store/authslice";

const Home = () => {
    const [isverify, setIsverify] = useState(false)

    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.auth)

    const navigate = useNavigate()


    const getExp = () => {
        fetch('https://reactcrud-51072-default-rtdb.firebaseio.com//expense.json')
            .then(async res => {
                if (res.ok) {
                    const data = await res.json()
                    if (data) {
                        const obj = []
                        Object.entries(data).map(d => {
                            d[1].name = d[0]
                            obj.push(d[1])
                        })
                        dispatch(expenseactions.addExpense(obj))
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

    useEffect(() => {
        if (userInfo.isLogin) {
            getUser();
            getExp();
        } else {
            navigate('/login')
        }
    }, [])


    const getUser = () => {
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAY6PIq34nDju030WEkLJCKVdKmx_39C68', {
            method: 'POST',
            body: JSON.stringify({
                // idToken: localStorage.getItem('ExpenseUToken'),
                idToken: userInfo.idToken,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(async res => {
                if (res.ok) {
                    const data = await res.json()
                    if (data.users) {
                        if (data.users[0].emailVerified) {
                            setIsverify(true)
                        }
                    }
                } else {
                    return res.json().then(data => {
                        console.log(data.error.message)
                    })
                }
            })
            .catch(err => {
                console.log(err.message)
            })


    }

    const veryfyEmailHandler = (event) => {
        event.preventDefault()


        fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAY6PIq34nDju030WEkLJCKVdKmx_39C68', {
            method: 'POST',
            body: JSON.stringify({
                // idToken: localStorage.getItem('ExpenseUToken'),
                idToken: userInfo.idToken,
                requestType: "VERIFY_EMAIL"
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(async res => {
                if (res.ok) {
                    const data = await res.json()
                    alert('Email has been Sent')
                } else {
                    return res.json().then(data => {
                        console.log(data.error.message)
                    })
                }
            })
            .catch(err => {
                console.log(err.message)
            })


    }

    const logoutHandler = () => {
        dispatch(authactions.logout())
        localStorage.removeItem('ExpenseUToken')
        navigate('/login')
    }

    return (
        <div>
            <div className="w-full h-max p-4 border border-b-orange-400 flex justify-between items-center">
                <h1 className="italic font-bold text-xl">Welcome to Expense Tracker</h1>
                <div className="flex flex-col gap-2 items-center">
                    <p className="bg-gray-200 p-2 rounded-full w-max">Your Profile is Incomplete. <Link to='/profile' className="text-blue-700 font-semiboldold">Complete Now</Link></p>
                    <div className="flex gap-4">
                        {!isverify && <button onClick={veryfyEmailHandler} className="border border-red-500 text-red-500 w-max p-1 rounded-md">Verify Email</button>}
                        <button onClick={logoutHandler} className="border border-red-500 bg-red-500 text-white w-max p-1 rounded-md">Logout</button>
                    </div>
                </div>
            </div>
            <ExpenseForm />
            {/* <ExpenseShow exp={exp} setExp={setExp}/> */}
        </div>
    )
}

export default Home;