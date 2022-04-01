import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AccountState {
  activeAccount?: string;
  showConnectModal: boolean;
}

const initialState: AccountState = {
  activeAccount: undefined,
  showConnectModal: false,
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setActiveAccount: (state, action: PayloadAction<string | undefined | null>) => {
      state.activeAccount = action.payload === null ? undefined : action.payload;
    },
    setShowConnectModal: (state, action: PayloadAction<boolean>) => {
      state.showConnectModal = action.payload;
    },
  },
});

export const { setActiveAccount, setShowConnectModal } = accountSlice.actions;

export default accountSlice.reducer;
