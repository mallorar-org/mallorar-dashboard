import React from 'react'

export default function Status({ status }) {
    switch (status) {
        case 'completed': return <div className="ml-status text-nowrap text-center rounded ml-completed">Completed</div>;
        case 'cancelled': return <div className="ml-status text-nowrap text-center rounded">Cancelled</div>;
        default: return <div className="ml-status text-nowrap text-center rounded ml-processing">Processing</div>;
    }
}
