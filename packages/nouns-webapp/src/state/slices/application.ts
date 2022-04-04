import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { grey } from '../../utils/nounBgColors';

export interface AlertModal {
  show: boolean;
  title?: string;
  isEthereum?: boolean;
  message?: string;
  onSuccess?: () => void;
}

interface ApplicationState {
  stateBackgroundColor: string;
  isCoolBackground: boolean;
  isSwitching: boolean;
  alertModal: AlertModal;
  eth: number;
  mona: number;
  chainId: number;
  walletConnecting: boolean;
}

const initialState: ApplicationState = {
  stateBackgroundColor: grey,
  isCoolBackground: true,
  isSwitching: false,
  alertModal: {
    show: false,
  },
  eth: 0,
  mona: 0,
  chainId: 1,
  walletConnecting: false,
};

export const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setStateBackgroundColor: (state, action: PayloadAction<string>) => {
      state.stateBackgroundColor = action.payload;
      state.isCoolBackground = action.payload === grey;
    },
    setPrices: (state, action: PayloadAction<{ eth: number; mona: number }>) => {
      state.eth = action.payload.eth;
      state.mona = action.payload.mona;
    },
    setAlertModal: (state, action: PayloadAction<AlertModal>) => {
      state.alertModal = action.payload;
    },
    setIsSwitching: (state, action: PayloadAction<boolean>) => {
      state.isSwitching = action.payload;
    },
    setChainId: (state, action: PayloadAction<number>) => {
      state.chainId = action.payload;
    },
    setWalletConnecting: (state, action: PayloadAction<boolean>) => {
      state.walletConnecting = action.payload;
    }
  },
});

export const { setStateBackgroundColor, setAlertModal, setPrices, setIsSwitching, setChainId, setWalletConnecting } =
  applicationSlice.actions;

export default applicationSlice.reducer;
