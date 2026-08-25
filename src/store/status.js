import { createContext } from 'react';

const StatusContext = createContext({ type: 'idle', message: '' });

export default StatusContext;
