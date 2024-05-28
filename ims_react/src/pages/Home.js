import React, { useEffect } from 'react'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { BsArrowUpRightCircleFill } from 'react-icons/bs'
import { MdOutlineContactPage } from 'react-icons/md'
import '../style/home.css'
import { Navigate } from 'react-router-dom'

const Home = () => {



// useEffect(() => {
//     debugger
//     const token = localStorage.getItem('token');
//     if (token) {
//         // User is logged in
//     } else {
//         // Redirect to login page
//         window.location.href = '/'; // or wherever your login page is
//     }
//     if (token) {
//         // User is already logged in, redirect to home page
//         window.location.href = '/home'; // or wherever your home page is
//     } else {
//         // User needs to log in
//     }
// })

    return (
        <>

            <div className="home">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="item">
                            <div className="inner">
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div className="media">
                                        <MdOutlineContactPage />
                                    </div>
                                    <div className="media">
                                        <BiDotsHorizontalRounded />
                                    </div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <p>500.00</p>
                                    <div className="arrow">
                                        <BsArrowUpRightCircleFill style={{ color: "rgb(94, 53, 177)" }} />
                                    </div>
                                </div>
                                <p className='desc'>Total</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="item" style={{ background: "#1E88E5" }}>
                            <div className="inner">
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div className="media" style={{ background: "#1565C0" }}>
                                        <MdOutlineContactPage />
                                    </div>
                                    <div className="media">
                                        <BiDotsHorizontalRounded style={{ background: "#1565C0" }} />
                                    </div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <p>500.00</p>
                                    <div className="arrow">
                                        <BsArrowUpRightCircleFill style={{ color: "#1565C0" }} />
                                    </div>
                                </div>
                                <p className='desc' style={{ color: "#90CAF9" }}>Total</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="item" style={{ background: "#F37A7E" }}>
                            <div className="inner">
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div className="media" style={{ background: "#ce5f60" }}>
                                        <MdOutlineContactPage />
                                    </div>
                                    <div className="media" style={{ background: "#ce5f60" }}>
                                        <BiDotsHorizontalRounded />
                                    </div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <p>500.00</p>
                                    <div className="arrow">
                                        <BsArrowUpRightCircleFill style={{ color: "rgb(94, 53, 177)" }} />
                                    </div>
                                </div>
                                <p className='desc' style={{ color: "#ce5f60" }}>Total</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Home
