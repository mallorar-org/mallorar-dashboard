import React from 'react'

export default function Dropdown({ children, active }) {
    const activeItem = tab => {
        console.log(active);

    }
    return (
        <div className="ml-dropdown">
            <div className="ml-active-tile">{active}</div>
            <div className="ml-dropper">{children}</div>
        </div>
    )
}
