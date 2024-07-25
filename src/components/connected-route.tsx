import {Navigate, Outlet, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {IUser} from "../models/user.model";
import {AuthService} from "../services/auth.service";
import {ServiceErrorCode} from "../services/service.result";

export interface ConnectedRouteAttributes {
    access?: string;
}

function ConnectedRoute(attributes: ConnectedRouteAttributes) {

    const address = localStorage.getItem("address");
    const [isLoading, setIsLoading] = useState(true);
    const [ok, setOk] = useState<boolean>(false);

    useEffect(() => {
        const fetchUser = async () => {
            if(!address) {
                setIsLoading(false);
                return;
            }
            const res = await AuthService.info(localStorage.getItem("address") as `0x${string}`);
            if(res.errorCode === ServiceErrorCode.success && res.result) {
                setOk(true)
            }
            setIsLoading(false);
        };
        fetchUser();
    }, [address]);

    if(isLoading) {
        return (
            <div>Checking access...</div>
        );
    }

    if(!ok) {
        localStorage.removeItem('address');
        return <Navigate to="/subscribe" />;
    }

    return <Outlet />
}

export default ConnectedRoute;
