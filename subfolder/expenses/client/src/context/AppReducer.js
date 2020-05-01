export default (state, action) => {
    switch(action.type) {
        // actions set in GlobalState.js
        case 'DELETE_TRANSACTION':
            return {
                ...state,
                // send down all the transactions except the one that was deleted
                transactions: state.transactions.filter(transaction => transaction.id !== action.payload)
            }

        case 'ADD_TRANSACTION':
            return {
                ...state,
                // send down all the transactions, including the new one
                transactions: [action.payload, ...state.transactions]
            }

        default:
            return state;
    }
}