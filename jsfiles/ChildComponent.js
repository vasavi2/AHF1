import React from 'react';

const ChildComponent = ({setAuth}) => {
    const handleSignUp=()=>{
        setAuth(true)
        
    }
    return (
        <div>
            <h2>child component</h2>
            <button onClick={handleSignUp}>Sign Up</button>
        </div>
    );
};

export default ChildComponent;