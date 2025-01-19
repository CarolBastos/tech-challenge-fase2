import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    names: [
        'Câmbio de Moeda',
        'DOC/TED',
        'Empréstimo e Financiamento'
    ]
}

const transactionNameSlices = createSlice({
    name: 'transactionTypes',
    initialState
})

export default transactionNameSlices.reducer