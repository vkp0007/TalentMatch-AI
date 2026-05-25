import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import {

    getUserProfile

} from "../api/authApi";



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

        setUser(null);
    };



    // =================================================
    // LOAD USER
    // =================================================

    const loadUser =
        async () => {

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


                setUser(
                    response.user
                );

            } catch (error) {

                console.log(error);

                localStorage.removeItem(
                    "token"
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