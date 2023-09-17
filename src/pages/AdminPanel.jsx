// import React from 'react'
// import { Link } from 'react-router-dom';

// const AdminPanel = () => {

//   console.log(localStorage.getItem("token"))
// if(localStorage.getItem("token") == undefined){
//                 window.location="/"
//             }



         
// function handleRoute(){
//     localStorage.removeItem("token");
//     window.location = navigate("/")();
//   }
//   return (
//  <>
// <Link onClick={handleRoute}>Out</Link>


// <p>Hi</p>
// <h1>ok</h1>
 
//  </>
//   )
// }

// export default AdminPanel

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUserRole = localStorage.getItem('userRole');
        console.log('User Role:', storedUserRole); // Add this line for debugging
  
        if (storedUserRole) {
            setUserRole(storedUserRole);
        }

        if (!token) {
            window.location.href = '/'; // Redirect to the homepage if not logged in
            console.log('User Role:', storedUserRole); // Add this line for debugging
  
        }
    }, []);

    function handleLogout() {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        window.location.href = '/'; // Redirect to the homepage
    }

    return (
        <div>
            <Link onClick={handleLogout}>Logout</Link>
            {userRole === 'admin' && (
                <>
                    <p>Welcome, Admin!</p>
                    <h1>Admin Panel</h1>
                    {/* Add additional admin-specific content here */}
                </>
            )}
            {userRole === 'student' && (
                <>
                    <p>Welcome, Student!</p>
                    {/* Add student-specific content here */}
                </>
            )}
        </div>
    );
};

export default AdminPanel;

