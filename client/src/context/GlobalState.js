import React, {createContext, useReducer} from 'react';
import AppReducer from './AppReducer'

// Initial state
const initialState = {
    transactions: [
        { id: 1, text: 'Flowers', amount: -20 },
        { id: 2, text: 'Salary', amount: 1000 },
        { id: 3, text: 'Book', amount: -10 },
        { id: 4, text: 'Camera', amount: -200 }
    ]   
}

// create context
export const GlobalContext = createContext(initialState);

// Provider component
// provides actions, state to any components in its container
export const GlobalProvider = ({children}) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // Actions
    function deleteTransaction(id){
        dispatch({
            type: 'DELETE_TRANSACTION',
            payload: id
        })
    }

    function addTransaction(transaction){
        dispatch({
            type: 'ADD_TRANSACTION',
            payload: transaction
        })
    }

    return (<GlobalContext.Provider value={{
        transactions: state.transactions,
        deleteTransaction,
        addTransaction
    }}>
        {children}
    </GlobalContext.Provider>)
}