import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div>
            <div className="w-full h-max p-4 border border-b-orange-400 flex justify-between items-center">
                <h1 className="italic font-bold text-xl">Welcome to Expense Tracker</h1>
                <p className="bg-gray-200 p-2 rounded-full w-max">Your Profile is Incomplete. <Link to='/profile' className="text-blue-700 font-semiboldold">Complete Now</Link></p>
            </div>
        </div>
    )
}

export default Home;