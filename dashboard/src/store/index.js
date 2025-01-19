import {configureStore} from '@reduxjs/toolkit';
import transactionTypes from '../features/TransactionTypes/transactionTypesSlice'
import transactionsName from '../features/TransactionsName/transactionNameSlice'

const store = configureStore({
    reducer: {
        transactionTypes,
        transactionsName
    }
})

export default store