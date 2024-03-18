import axios from 'axios';

export async function AddMacroLog(macros) {
  try {
    await axios.post('http://localhost:3030/api/save-macro-log', macros);
  } catch (e) {
    console.warn(e);
  }
}

export async function AddFoodItem(foodItem) {
  try {
    //TODO: get user id.
    return await axios.post('http://localhost:3030/api/save-food-item', {
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
    return await axios.post('http://localhost:3030/api/delete-food-item', {
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
    return await axios.get('http://localhost:3030/api/get-food-items');
  } catch (e) {
    console.warn(e);
    return;
  }
}

export async function GetFoodLogs() {
  try {
    return await axios.get('http://localhost:3030/api/get-macro-logs');
  } catch (e) {
    console.warn(e);
  }
}

export async function DeleteFoodLog(log) {
  try {
    return await axios.post('http://localhost:3030/api/delete-macro-log', {
      id: '123123',
      ...log
    });
  } catch (e) {
    console.warn(e);
  }
}

export async function SaveFoodLog(log) {
  try {
    return await axios.post('http://localhost:3030/api/save-macro-log', {
      id: '123123',
      ...log
    });
  } catch (e) {
    console.warn(e);
  }
}

export async function SaveDailyMacroTotal(macro) {
  try {
    return await axios.post('http://localhost:3030/api/save-daily-macro-total', {
      ...macro
    });
  } catch (e) {
    console.warn(e);
  }
}


export async function GetDailyMacroTotal() {
  try {
    return await axios.get('http://localhost:3030/api/get-daily-macro-total');
  } catch (e) {
    console.warn(e);
  }
}
