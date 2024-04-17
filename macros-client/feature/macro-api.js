import axios from 'axios';
const API_STRING = 'http://44.223.70.101:3030';

export async function AddMacroLog(macros) {
  try {
    await axios.post(`${API_STRING}/api/save-macro-log`, macros);
  } catch (e) {
    console.warn(e);
  }
}

export async function AddFoodItem(foodItem) {
  try {
    //TODO: get user id.
    return await axios.post(`${API_STRING}/api/save-food-item`, {
      id: '123123',
      ...foodItem,
    });
  } catch (e) {
    console.warn(e);
    return;
  }
}

export async function DeleteFoodItem(foodItem) {
  try {
    return await axios.post(`${API_STRING}/api/delete-food-item`, {
      id: '123123',
      ...foodItem,
    });
  } catch (e) {
    console.warn(e);
    return;
  }
}

export async function GetFoodItems() {
  try {
    return await axios.get(`${API_STRING}/api/get-food-items`);
  } catch (e) {
    console.warn(e);
    return;
  }
}

export async function GetFoodLogs() {
  try {
    return await axios.get(`${API_STRING}/api/get-macro-logs`);
  } catch (e) {
    console.warn(e);
  }
}

export async function DeleteFoodLog(log) {
  try {
    return await axios.post(`${API_STRING}/api/delete-macro-log`, {
      id: '123123',
      ...log
    });
  } catch (e) {
    console.warn(e);
  }
}

export async function SaveFoodLog(log) {
  try {
    return await axios.post(`${API_STRING}/api/save-macro-log`, {
      id: '123123',
      ...log
    });
  } catch (e) {
    console.warn(e);
  }
}

export async function SaveDailyMacroTotal(macro) {
  try {
    return await axios.post(`${API_STRING}/api/save-daily-macro-total`, {
      ...macro
    });
  } catch (e) {
    console.warn(e);
  }
}


export async function GetDailyMacroTotal() {
  try {
    return await axios.get(`${API_STRING}/api/get-daily-macro-total`);
  } catch (e) {
    console.warn(e);
  }
}

export async function GetNutritionProfile() {
  try {
    return await axios.get(`${API_STRING}/api/get-nutrition-profile`);
  } catch (e) {
    console.warn(e);
  }
}

export async function SaveNutritionProfile(nutritionProfile) {
  try {
    return await axios.post(`${API_STRING}/api/save-nutrition-profile`, nutritionProfile);
  } catch (e) {
    console.warn(e);
  }
}

