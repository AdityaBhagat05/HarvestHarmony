import React from 'react';

function SignInButton() {
    const handleSignIn = () => {
        //Bhagat ka sign in 
        console.log('Sign in clicked');
    };

    return (
        <button 
            onClick={handleSignIn}
            className="sign-in-button"
        >
            Sign In
        </button>
    );
}

export default SignInButton;
