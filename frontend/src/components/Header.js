import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { signOutUser } from "../redux-config/UserSlice";

export default function Header(){
    let {categoryList} = useSelector((store)=>store.Categories);
    let {isLoggedIn} = useSelector((store)=>store.User);
    const dispatch = useDispatch();
    const signOut = ()=>{
        dispatch(signOutUser());
    }
    return <>
        <nav style={{height:"80px"}} className="navbar navbar-expand-sm bg-dark navbar-dark">
            <a className="navbar-brand" href="/sign-in"><b style={{fontSize:"50px", fontFamily:"cursive"}}>E-</b><small style={{fontSize:"50px"}} className="text-danger">Shop</small></a>
             <ul style={{marginLeft:"50px"}} className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" href="/">Home</a>
                </li>
                <li className="nav-item ml-3">
                    <Link className="nav-link" to="/product">Products</Link>
                </li>

                <li className="nav-item dropdown ml-3">
                    <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                        Categories
                    </a>
                    <div className="dropdown-menu">
                    {categoryList.map((category, index) =>
                            <Link key={index} className="dropdown-item" to={`/product/${category._id}`}>{category.name}</Link>
                        )}     
                    </div>
                </li>
                <li className="nav-item ml-3">
                    {isLoggedIn ? "" : <Link className="nav-link" to="/sign-in">Sign In</Link>}
                </li>
                <li className="nav-item ml-3">
                    {isLoggedIn ? "" : <Link className="nav-link" to="/sign-up">Sign Up</Link>}
                </li>
                <li className="nav-item ml-3">
                    {isLoggedIn ? <Link className="nav-link" to="/view-cart">View Cart </Link> : ""}
                </li>
                <li className="nav-item ml-3">
                    {isLoggedIn ? <Link className="nav-link" onClick={signOut}>Sign Out</Link> : ""}
                </li>
                <li className="nav-item ml-5">
                    <form style={{marginLeft:"350px"}} className="form-inline" action="/action_page.php">
                        <input className="form-control mr-sm-2 ml-5" type="text" placeholder="Search"/>
                        <button className="btn btn-success" type="submit">Search</button>
                    </form>
                </li>
            </ul>
        </nav>
    </>
}