import { createAsyncThunk, createSlice, PayloadAction, Slice, SliceCaseReducers } from '@reduxjs/toolkit';
import axios from 'axios';
import { toCamelCase } from '../common/helpers';
import { RootState } from '../app/store';
import { coinGecko as API } from '../common/endpoints';
import { API_CONFIG as config, http } from '../common/constants';
import { Coin, CoinListState, CoinQueryParams } from '../models';

interface Reducers extends SliceCaseReducers<CoinListState> {
  setCoinQueryParams: (state: CoinListState, action: PayloadAction<CoinQueryParams>) => void;
}

const initialState: CoinListState = {
  value: [],
  status: 'IDLE',
  coinQueryParams: {
    sortingKey: 'market_cap',
    sortingOrder: 'desc',
    page: 1,
    perPage: 30
  }
};

interface Params {
  coinQueryParams: CoinQueryParams;
  append: boolean;
}

export const fetchCoinList = createAsyncThunk('coinList', async (params: Params) => {
  const canceler = axios.CancelToken.source();

  const response = await http.request({
    ...config('coinGecko'),
    url: API.coins(
      params.coinQueryParams.sortingKey,
      params.coinQueryParams.sortingOrder,
      params.coinQueryParams.page,
      params.coinQueryParams.perPage,
      true
    ),
    cancelToken: canceler.token
  });

  const normalizedResponse = toCamelCase(response.data);

  return { data: normalizedResponse, append: params.append } as { data: Coin[], append: boolean }
});

export const selectCoinList: (state: RootState) => CoinListState = (state: RootState) => state.coinList;

const coinListSlice: Slice<CoinListState, Reducers, 'coinList'> = createSlice({
  name: 'coinList',
  initialState,
  reducers: {
    setCoinQueryParams: (state: CoinListState, action: PayloadAction<CoinQueryParams>) => {
      state.coinQueryParams = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoinList.pending, (state) => {
        state.status = 'LOADING';
      })
      .addCase(fetchCoinList.fulfilled, (state, action) => {
        state.status = 'IDLE';
        state.value = action.payload.append ? [...state.value, ...action.payload.data] : action.payload.data;
      })
      .addCase(fetchCoinList.rejected, (state, action) => {
        state.status = 'FAILED';
        state.error = action.error.message;
      })
  },
});

export const { setCoinQueryParams } = coinListSlice.actions;

export default coinListSlice.reducer;