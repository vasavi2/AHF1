

import React, { useState, useEffect } from 'react';
 
const Tab2 = () => {
    const [bootModule, setBootModule] = useState(null);
 
    useEffect(() => {
        if (window.location.pathname === '/pipline') {
            import("./bootstrap").then((boot) => {
                setBootModule(boot);
            });
        }
    }, []);
 
    return (
        <div>
            {
            
}
        </div>
    );
};
 
export default Tab2;