import React from 'react';

function SignInButton() {
    const handleSignIn = () => {
        //Bhagat ka sign in 
        <div>
      <Link to="App.jsx/login">Login</Link>
    </div>
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
