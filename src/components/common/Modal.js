import React from 'react'

export default function Modal({ children, className, header, showModal }) {
    return (
        <div className='modal pt-5'>
            <div className="border card-body modal-content">
                <div className="d-flex justify-content-between">
                    <h4 className="c-blue-">{header} </h4>
                    <button onClick={showModal} data-role="btn-icon" className="text-white position-relative" >&times;</button>
                </div>
                <div className={`${className} container-fluid mt-3`}>
                    {children}
                </div>
            </div>
        </div>
    )
}
