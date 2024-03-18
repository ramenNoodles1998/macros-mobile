import React, { useEffect, useState } from 'react';
import MacroText from './macro-components/macro-text';
import {
  selectFoodItems,
  getFoodItemsAsync,
  deleteFoodItemAsync,
  addDailyMacroTotal,
  selectDailyMacroTotals,
} from '../feature/macro-slice';
import { View, FlatList, Pressable } from 'react-native';
import FoodItemModal from './modals/food-item-modal';
import { useDispatch, useSelector } from 'react-redux';
import { output } from '../src/output';
import { AddMacroLog } from '../feature/macro-api';

const FoodItemTable = () => {
  const [macro, setMacro] = useState({
    name: '',
    protein: 0,
    carbs: 0,
    fat: 0,
    serving: '',
  });
  const [foodItemModalVisible, setFoodItemModalVisible] = useState(false);
  const foodItems = useSelector(selectFoodItems);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFoodItemsAsync('123'));
  }, []);

  const deleteFoodItem = (item) => {
    dispatch(deleteFoodItemAsync(item));
  };

  const addFoodItem = (item) => {
    dispatch(addDailyMacroTotal({ ...item }));
    dispatch(AddMacroLog({ ...item }));
  };

  const openModal = (item) => {
    setMacro({ ...item });
    setFoodItemModalVisible(true);
  };

  return (
    <View>
      <FoodItemModal
        isEdit={true}
        macro={macro}
        setModalVisible={setFoodItemModalVisible}
        modalVisible={foodItemModalVisible}
      ></FoodItemModal>
      <FlatList
        data={foodItems}
        renderItem={({ item, index }) => (
          <View
            className={
              'grid grid-flow-row grid-cols-12 justify-items-center m-2 p-1 rounded ' +
              (index % 2 == 0 ? 'bg-teal-900' : 'bg-teal-800')
            }
          >
            <MacroText className='col-span-3 row-span-3 text-lg'>
              {item.name}
            </MacroText>
            <MacroText className='col-span-5 text-center'>
              {item.protein}g protein
            </MacroText>
            <Pressable className='col-span-4' onPress={() => addFoodItem(item)}>
              <MacroText
                className={
                  'm-1 p-1 rounded ' +
                  (index % 2 == 0 ? 'bg-teal-800' : 'bg-teal-900')
                }
              >
                Quick Add
              </MacroText>
            </Pressable>
            <MacroText className='col-start-4 col-end-9 text-center'>
              {item.carbs}g carbs
            </MacroText>
            <Pressable
              className='col-start-9 col-end-12'
              onPress={() => openModal(item)}
            >
              <MacroText
                className={
                  'm-1 p-1 rounded ' +
                  (index % 2 == 0 ? 'bg-teal-800' : 'bg-teal-900')
                }
              >
                Edit
              </MacroText>
            </Pressable>
            <MacroText className='col-start-4 col-end-9 text-center'>
              {item.fat}g fat
            </MacroText>
            <Pressable
              className='col-start-10 col-end-12'
              onPress={() => deleteFoodItem(item)}
            >
              <MacroText
                className={
                  'm-1 p-1 rounded ' +
                  (index % 2 == 0 ? 'bg-teal-800' : 'bg-teal-900')
                }
              >
                Delete
              </MacroText>
            </Pressable>
          </View>
        )}
        keyExtractor={(fi) => fi.name}
      />
    </View>
  );
};
//TODO next layout
//name
// p c f //macros listed
// actions

export default FoodItemTable;
