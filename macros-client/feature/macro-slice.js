import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  AddMacroLog,
  AddFoodItem,
  GetFoodItems,
  DeleteFoodItem,
  GetFoodLogs,
  DeleteFoodLog,
  SaveFoodLog,
  SaveDailyMacroTotal,
  GetDailyMacroTotal,
} from './macro-api';

export const addFoodItemAsync = createAsyncThunk(
  'macros/addFoodItem',
  async (macros, { dispatch }) => {
    let response = await AddFoodItem(macros);
    dispatch(addFoodItem(response.data));
  }
);

export const getFoodItemsAsync = createAsyncThunk(
  'macros/getFoodItems',
  async (id, { dispatch }) => {
    let response = await GetFoodItems();
    dispatch(addFoodItems(response.data));
  }
);

export const deleteFoodItemAsync = createAsyncThunk(
  'macros/deleteFoodItem',
  async (foodItem, { dispatch }) => {
    let response = await DeleteFoodItem(foodItem);
    dispatch(deleteFoodItem(response.data));
  }
);

export const getFoodLogsAsync = createAsyncThunk(
  'macros/getFoodLogs',
  async (id, { dispatch }) => {
    let response = await GetFoodLogs();
    dispatch(addFoodLogs(response.data));
  }
);

export const deleteFoodLogAsync = createAsyncThunk(
  'macros/deleteFoodLog',
  async (log, { dispatch }) => {
    let response = await DeleteFoodLog(log);
    dispatch(deleteFoodLog(response.data));
  }
);

export const saveFoodLogAsync = createAsyncThunk(
  'macros/saveFoodLog',
  async (log, { dispatch }) => {
    let response = await SaveFoodLog(log);
    dispatch(saveFoodLog(response.data));
  }
);

export const getDailyMacroTotalAsync = createAsyncThunk(
  'macros/getDailyMacroTotal',
  async (id, { dispatch }) => {
    let response = await GetDailyMacroTotal();
    dispatch(saveDailyMacroTotal(response.data));
  }
);

export const macrosSlice = createSlice({
  name: 'macros',
  initialState: {
    dailyMacroTotals: {
      date: '',
      protein: 0,
      carbs: 0,
      fat: 0,
    },
    foodItems: [],
    foodLogs: [],
  },
  reducers: {
    addFoodItem: (state, action) => {
      state.foodItems = [action.payload, ...state.foodItems];
    },
    addFoodItems: (state, action) => {
      state.foodItems = action.payload;
    },
    deleteFoodItem: (state, action) => {
      state.foodItems = state.foodItems.filter(
        (fi) => fi.name !== action.payload.name
      );
    },
    addFoodLogs: (state, action) => {
      state.foodLogs = action.payload;
    },
    deleteFoodLog: (state, action) => {
      state.foodLogs = state.foodLogs.filter(
        (fi) => fi.date !== action.payload.date
      );
    },
    saveFoodLog: (state, action) => {
      const index = state.foodLogs.findIndex(
        (fl) => action.payload.date === fl.date
      );
      state.foodLogs.splice(index, 1, action.payload);
    },
    removeDailyMacroTotal: (state, action) => {
      state.dailyMacroTotals = {
        protein: state.dailyMacroTotals.protein - action.payload.protein,
        carbs: state.dailyMacroTotals.carbs - action.payload.carbs,
        fat: state.dailyMacroTotals.fat - action.payload.fat,
      };
    },
    saveDailyMacroTotal: (state, action) => {
      state.dailyMacroTotals = action.payload;
    },
    addDailyMacroTotal: (state, action) => {
      state.dailyMacroTotals = {
        protein: state.dailyMacroTotals.protein + action.payload.protein,
        carbs: state.dailyMacroTotals.carbs + action.payload.carbs,
        fat: state.dailyMacroTotals.fat + action.payload.fat,
      };
    },
  },
});

export const {
  addFoodItem,
  addFoodItems,
  deleteFoodItem,
  addFoodLogs,
  deleteFoodLog,
  saveFoodLog,
  saveDailyMacroTotal,
  removeDailyMacroTotal,
  addDailyMacroTotal,
} = macrosSlice.actions;

export const selectDailyMacroTotals = (state) =>
  state.macrosSliceReducer.dailyMacroTotals;
export const selectFoodItems = (state) => state.macrosSliceReducer.foodItems;
export const selectFoodLogs = (state) => state.macrosSliceReducer.foodLogs;

export default macrosSlice.reducer;
