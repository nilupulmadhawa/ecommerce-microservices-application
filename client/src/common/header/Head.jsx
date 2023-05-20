import React from "react"
import { Link } from "react-router-dom"
import { useStateContext } from "../../context/ContextProvider"

const Head = () => {
    const { user } = useStateContext()
    return (
        <>
            <section className='head'>
                <div className='container d_flex'>
                    <div className='left row'>
                        <i className='fa fa-phone'></i>
                        <label> +94-11-222-3332</label>
                        <i className='fa fa-envelope'></i>
                        <label> support@herbalworld.com</label>
                    </div>
                    <div className='right row RText'>
                        {user?.role == 'seller' && <label>  <Link to='/dashboard' style={{ color: '#fff' }}>Dashboard</Link></label>}
                        <label>Need Help?</label>
                        <span>🏳️‍⚧️</span>
                        <label>EN</label>
                        <span>🏳️‍⚧️</span>
                        <label>USD</label>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Head
