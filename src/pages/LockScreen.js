import React from 'react';

export default function LockScreen({ handleChange, handleSubmit }) {
    return (
        <div className="position-fixed ml-lock-screen">
            <form action="" className="ml-center text-center text-white" onSubmit={handleSubmit} autoComplete="off">
                <div className="ml-lock-avatar rounded-circle mx-auto d-flex justify-content-center align-items-center">
                    <img src="" alt="" className="img-fluid" />
                </div>
                <h4 className="mt-4 font-weight-normal">Brendon Chirume</h4>
                <div className="my-4">
                    <input type="password" name="lockScreenPass" id="" className="rounded border ml-lock-pass no-outline" placeholder="Password" onChange={handleChange} autoComplete="off" />
                </div>
                <button type="submit" className="btn shadow-none btn-outline-light shadow-none cursor px-5 rounded-pill"><span className="mx-3">Unlock</span></button>
            </form>
        </div>
    )
}
