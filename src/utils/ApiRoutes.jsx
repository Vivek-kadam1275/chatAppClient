export const baseUrl=import.meta.env.VITE_HOST_API;

// authentication routes:
export const signupRoute=`${baseUrl}/api/auth/signup`;
export const loginRoute=`${baseUrl}/api/auth/login`;

export const logoutRoute=`${baseUrl}/api/auth/logout`


// set avatar routes:
export const setAvatar=`${baseUrl}/api/chatApp/setAvatar`;

//getAllUsers:
export const getAllUsers=`${baseUrl}/api/chatApp/getAllUsers`;


// addMessage:

export const addMsg=`${baseUrl}/api/messages/addMsg`;

//  getMessages:
export const getMsgs=`${baseUrl}/api/messages/getMsgs`
