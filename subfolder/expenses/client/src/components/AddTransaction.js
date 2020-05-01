import React, {useState, useContext} from 'react';
import { GlobalContext } from '../context/GlobalState';

export const AddTransaction = () => {
    // state variables needed for Text and Amount
    const [text, setText] = useState('');
    const [amount, setAmount] = useState(0);

    const { addTransaction } = useContext(GlobalContext);

    const onSubmit = e => {
            e.preventDefault();

            // component level state is hooked to the inputs, so no need to redefine values for text and amount
            const newTransaction = {
                id: Math.floor(Math.random() * 1000000),
                text,
                // amount defaults to string, but + before the value converts it to a num
                amount: +amount
            }

            addTransaction(newTransaction);
    }

    return (
        <>
            <h3>Add new Transaction</h3>
            <form onSubmit={onSubmit}>
                <div className='form-control'>
                    <label htmlFor='text'>Text</label>
                    {/* value and onChange tie the state variables to the input*/}
                    <input type='text' value={text} onChange={(e) => setText(e.target.value)} placeholder='Description' />
                </div>
                <div className='form-control'>
                    <label htmlFor='amount'>
                        Amount <br />
                        (negative - expense, positive - income)
                    </label>
                    <input type='number' value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='Amount' />
                </div>
                <button className='btn'>Add Transaction</button>
            </form>
        </>
    )
}