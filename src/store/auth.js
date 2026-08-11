import { createContext } from 'react';

const AuthContext = createContext({ userId: null, email: null });

export default AuthContext;
