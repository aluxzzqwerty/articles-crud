import jwtDecode from "jwt-decode";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useEffect } from "react";
import { signIn, signOut } from "../feautures/auth-slice";

const GoogleAuth = () => {
    const dispatch = useAppDispatch();
    const isSignedIn = useAppSelector(state => state.auth.isSignedIn);

    const handleCallbackResponse = (response: any) => {
        const userObj: any = jwtDecode(response.credential);
        const userId = userObj.sub;
        const username = userObj.name;
        signInGoogle(userId, username);
    };

    useEffect(() => {
        window.google.accounts.id.initialize({
            client_id: '702803427959-uoei4mn2qu2a3vkd9e5odcli5i9s69oq.apps.googleusercontent.com',
            callback: handleCallbackResponse
        });

        window.google.accounts.id.renderButton(
            document.getElementById("signInDiv"),
            { theme: "filled_black", size: "large" }
        );
    }, []);

    const signInGoogle = (userId: string, username: string) => {
        const authElement = document.getElementById("signInDiv") as HTMLElement;
        authElement.hidden = true;
        dispatch(signIn({userId, username}));
    };

    const signOutGoogle = () => {
        const authElement = document.getElementById("signInDiv") as HTMLElement;
        authElement.hidden = false;
        dispatch(signOut());
    };

    const onSignOutClick = () => {
        signOutGoogle();
    };

    const renderAuthButton = () => {
        if (isSignedIn === null) {
            return null;
        }
        else if (isSignedIn) {
            return (
                <button onClick={onSignOutClick} className="ui red google button">
                    <i className="google icon"></i>
                    Sign Out
                </button>
            );
        }
    }

        return (
            <div className="login-btn">
                <div id="signInDiv"></div>
                {renderAuthButton()}
            </div>
        );
};

export default GoogleAuth;