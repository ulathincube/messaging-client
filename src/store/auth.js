import { createContext } from 'react';

const AuthContext = createContext({ user_id: null, email: null });

export default AuthContext;
