import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    types: [
        'depósito',
        'saque',
        'transferência'
    ]
}

const transactionTypesSlices = createSlice({
    name: 'transactionTypes',
    initialState
})

export default transactionTypesSlices.reducer