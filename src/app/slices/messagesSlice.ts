import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IMessage } from '../../../typings';


interface ISliceState {
    messages: Array<IMessage>;
}

const initialState: ISliceState = {
  messages: []
}

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    // Update the current array to refetched Items
    addItem: (state: ISliceState, action: PayloadAction<ISliceState>) => {
      state.messages = action.payload.messages
    },

    // Removes Item with the certain id
    removeItem: (state: ISliceState, action: PayloadAction<string>) => {
      state.messages = state.messages.filter((el) => el._id !== action.payload)
    }
  }
})

export const { addItem: addMessages, removeItem: removeMessage } = messagesSlice.actions; 
export default messagesSlice.reducer;