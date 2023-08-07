import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

interface ProtectedRoutesProps {
    isSignedIn: boolean;
    children: ReactNode
}

// ==============================|| PROTECTED ROUTES ||============================== //

function ProtectedRoutes({ isSignedIn, children }: ProtectedRoutesProps) {
    if (!isSignedIn) {
        return <Navigate to="/" replace />
    }
    return children
}
export default ProtectedRoutes