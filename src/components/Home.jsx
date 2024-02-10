import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ExpenseForm from "./ExpenseForm";
import { useDispatch, useSelector } from "react-redux";
import { expenseactions } from "../store/expenseslice";
import { authactions } from "../store/authslice";
import { themeactions } from "../store/themeslice";

const Home = () => {
    const [isverify, setIsverify] = useState(false)

    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.auth)
    const theme = useSelector(state => state.theme.theme)
    const active = useSelector(state => state.theme.active)
    const totalamount = useSelector(state => state.expense.totalamount)
    const user = useSelector(state => state.auth.email)



    const navigate = useNavigate()


    const getExp = async () => {
        try {
            const response = await fetch(`https://reactcrud-51072-default-rtdb.firebaseio.com//expense/${user}/expense.json`)
            if (response.ok) {
                const data = await response.json()
                if (data) {
                    const obj = []
                    Object.entries(data).map(d => {
                        d[1].name = d[0]
                        obj.push(d[1])
                    })
                    dispatch(expenseactions.addExpense(obj))
                }
            } else {
                const data = await response.json()
                throw data.error
            }
        }
        catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        if (userInfo.isLogin) {
            getUser();
            getExp();
            getTheme();
        } else {
            navigate('/login')
        }
    }, [])

    const getTheme = async () => {
        try {
            const response = await fetch(`https://reactcrud-51072-default-rtdb.firebaseio.com/expense/${user}/isPrem.json`)
            if (response.ok) {
                const data = await response.json()
                if (data.theme === 'Light') {
                    dispatch(themeactions.addpremium('Light'))
                } else {
                    dispatch(themeactions.addpremium('Dark'))
                }
                if (data.isPremium) {
                    dispatch(themeactions.activatePremium())
                } else {
                    dispatch(themeactions.deactivatePremium())
                }
            } else {
                const data = await response.json()
                throw data.error
            }
        }
        catch (err) {
            // console.log(err.message)
        }
    }


    const getUser = async () => {
        try {
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAY6PIq34nDju030WEkLJCKVdKmx_39C68', {
                method: 'POST',
                body: JSON.stringify({
                    // idToken: localStorage.getItem('ExpenseUToken'),
                    idToken: userInfo.idToken,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (response.ok) {
                const data = await response.json()
                if (data.users) {
                    if (data.users[0].emailVerified) {
                        setIsverify(true)
                    } else {
                        setIsverify(false)
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

    const veryfyEmailHandler = async (event) => {
        event.preventDefault()

        try {
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAY6PIq34nDju030WEkLJCKVdKmx_39C68', {
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
            if (response.ok) {
                const data = await response.json()
                alert('Email has been Sent')
            } else {
                const data = await response.json()
                throw (data.error)
            }
        }
        catch (err) {
            console.log(err.message)
        }


    }

    const logoutHandler = () => {
        dispatch(authactions.logout())
        localStorage.removeItem('ExpenseUToken')
        localStorage.removeItem('ExpenseUEmail')
        navigate('/login')
    }

    const themeHandler = async (event) => {
        try {
            const theme = event.target.innerText
            const response = await fetch(`https://reactcrud-51072-default-rtdb.firebaseio.com/expense/${user}/isPrem.json`, {
                method: 'PUT',
                body: JSON.stringify({ isPremium: true, theme: theme }),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            if (response.ok) {
                dispatch(themeactions.addpremium(theme))
            }
        }
        catch (err) {
            console.log(err.message)
        }
    }

    return (
        <div className={theme === 'Light' ? 'bg-white w-full  min-h-[100vh]' : 'bg-black text-white w-full min-h-[100vh]'}>
            <div className="w-full h-max p-4 border border-b-orange-400 flex justify-between items-center">
                <h1 className="italic font-bold text-xl">Welcome to Expense Tracker</h1>
                <div className="flex flex-col gap-2 items-center">
                    <p className="bg-gray-200 p-2 rounded-full w-max">Your Profile is Incomplete. <Link to='/profile' className="text-blue-700 font-semiboldold">Complete Now</Link></p>
                    <div className="flex gap-4">
                        {!isverify && <button onClick={veryfyEmailHandler} className="border border-red-500 text-red-500 w-max p-1 rounded-md">Verify Email</button>}
                        <button onClick={logoutHandler} className="border border-red-500 bg-red-500 text-white w-max p-1 rounded-md">Logout</button>
                        {totalamount > 10000 && active && <button className={theme === 'Light' ? 'bg-black text-white p-2 rounded-md' : 'rounded-md bg-white text-orange-500 p-2'} onClick={themeHandler}>{theme === 'Light' ? 'Dark' : 'Light'}</button>}
                    </div>
                </div>
            </div>
            <ExpenseForm />
            {/* <ExpenseShow exp={exp} setExp={setExp}/> */}
        </div>
    )
}

export default Home;