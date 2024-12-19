// import React, { useEffect, useState, useRef } from 'react';
// import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

// import { jwtDecode } from 'jwt-decode';

// function LoginU() {
//     return (
//         <>
//             <GoogleOAuthProvider clientId="626774493944-i3o0bcoou3v2u4nlg3etlpe6ccjcibmi.apps.googleusercontent.com">
//                 <div>
//                     <h2>Đăng nhập để xem tác giả</h2>
//                     <GoogleLogin
//                         onSuccess={(credentialResponse) => {
//                             const decoded = jwtDecode(
//                                 credentialResponse?.credential,
//                             );

//                             console.log(decoded);
//                         }}
//                         onError={() => {
//                             console.log('Login Failed');
//                         }}
//                     />
//                     ;
//                 </div>
//             </GoogleOAuthProvider>
//         </>
//     );
// }

// export default LoginU;