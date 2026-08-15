import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import {
    getUserProfile
} from "../api/auth.api.js";


const AuthContext =
    createContext();


// =====================================================
// PROVIDER
// =====================================================

export const AuthProvider = ({
    children
}) => {

    const [
        user,
        setUser
    ] = useState(null);


    const [
        loading,
        setLoading
    ] = useState(true);


    // =================================================
    // LOGIN
    // =================================================

    const login = (data) => {

        localStorage.setItem(
            "token",
            data.token
        );

        setUser(
            data.user
        );
    };


    // =================================================
    // LOGOUT
    // =================================================

    const logout = () => {

        localStorage.removeItem(
            "token"
        );

        localStorage.removeItem(
            "user"
        );

        setUser(null);
    };


    // =================================================
    // LOAD USER
    // =================================================

const loadUser = async () => {

    try {

        const token =
            localStorage.getItem(
                "token"
            );


        if (!token) {

            setLoading(false);

            return;
        }


        const response =
            await getUserProfile();


        const userData =
            response?.data?.user;


        if (!userData) {

            throw new Error(
                "Invalid user profile response"
            );
        }


        setUser(
            userData
        );


    } catch (error) {

        console.error(
            "Failed to load user:",
            error
        );

        localStorage.removeItem(
            "token"
        );

        localStorage.removeItem(
            "user"
        );

        setUser(null);

    } finally {

        setLoading(false);
    }
};


    // =================================================
    // INITIAL LOAD
    // =================================================

    useEffect(() => {

        loadUser();

    }, []);


    // =================================================
    // CONTEXT
    // =================================================

    return (

        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout
            }}
        >

            {children}

        </AuthContext.Provider>
    );
};


// =====================================================
// CUSTOM HOOK
// =====================================================

export const useAuth = () => {

    return useContext(
        AuthContext
    );
};