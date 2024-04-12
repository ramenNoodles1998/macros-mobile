import React, { useEffect, useState } from 'react';
import MacroText from './macro-components/macro-text';
import {
  selectFoodItems,
  getFoodItemsAsync,
  deleteFoodItemAsync,
  addDailyMacroTotal,
  saveFoodLogAsync,
} from '../feature/macro-slice';
import { View, FlatList, Pressable, TextInput } from 'react-native';
import FoodItemModal from './modals/food-item-modal';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { output } from '../src/output';

const FoodItemTable = () => {
  const [macro, setMacro] = useState({
    name: '',
    protein: 0,
    carbs: 0,
    fat: 0,
    serving: '',
    calories: 0,
  });
  const [foodItemModalVisible, setFoodItemModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFoodItems, setFilteredFoodItems] = useState([]);
  const foodItems = useSelector(selectFoodItems);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFoodItemsAsync('123'));
  }, []);

  useEffect(() => {
    if(searchQuery === '') {
      setFilteredFoodItems(foodItems);
      return;
    } 
    
    const foundFood = foodItems.filter(f => f.name.includes(searchQuery));
    setFilteredFoodItems([...foundFood]);
  }, [foodItems]);

  const deleteFoodItem = (item) => {
    dispatch(deleteFoodItemAsync(item));
  };

  const addFoodItem = (item) => {
    console.log(item);
    let foodItem = {
      ...item,
    };
    dispatch(addDailyMacroTotal(foodItem));
    dispatch(saveFoodLogAsync({
      date: moment().format('LLLL').split(',').join(''),
      ...foodItem
    }));
  };

  const openModal = (item) => {
    setMacro({ ...item });
    setFoodItemModalVisible(true);
  };

  const onChangeSearchQuery = (value) => {
    setSearchQuery(value);

    const foundFood = foodItems.filter(f => f.name.includes(value));
    setFilteredFoodItems(foundFood);
  };

        // TODO: fix height css for food table.
        //still add more icons for food items.
  return (
    <View className='h-4/6'>
      <FoodItemModal
        isEdit={true}
        macro={macro}
        setModalVisible={setFoodItemModalVisible}
        modalVisible={foodItemModalVisible}
      ></FoodItemModal>
      <TextInput
        onChangeText={onChangeSearchQuery}
        value={searchQuery}
        placeholder={'Search Food Items...'}
        inputMode='numeric'
        className='block text-white w-full rounded-md border-0 py-1.5 pl-5 pr-20 ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6'
      >
        
      </TextInput>
      <FlatList
        data={searchQuery.length > 0 ? filteredFoodItems : foodItems}
        renderItem={({ item, index }) => (
          <View className='my-3'>
            <View className='flex flex-row justify-center bg-teal-900 rounded-t'>
              <MacroText className='text-xl'>{item.name}</MacroText>
            </View>
            <View className='pt-3 pb-1 bg-teal-900'>
              <View className='flex flex-row justify-around px-3 mx-1'>
                <MacroText className='w-20 text-center'>Protein</MacroText>
                <MacroText className='w-20 text-center'>Carbs</MacroText>
                <MacroText className='w-20 text-center'>Fat</MacroText>
              </View>
            </View>                                  
            <View className='pb-3 pt-1 bg-teal-900'>
              <View className='flex flex-row justify-around p-3 mx-1 bg-teal-700 rounded'>
                <MacroText className='w-20 text-center'>{item.protein}g</MacroText>
                <MacroText className='w-20 text-center'>{item.carbs}g</MacroText>
                <MacroText className='w-20 text-center'>{item.fat}g</MacroText>
              </View>
            </View>
            <View className='flex flex-row justify-end p-1 bg-teal-900 rounded-b'>
              <Pressable onPress={() => addFoodItem(item)}>
                <MacroText
                  className='m-1 p-1 rounded bg-teal-700 w-20 '
                >
                  Quick Add
                </MacroText>
              </Pressable>
              <Pressable onPress={() => openModal(item)}>
                <MacroText className='m-1 p-1 rounded bg-slate-800 w-20'>
                  Edit
                </MacroText>
              </Pressable>
              <Pressable onPress={() => deleteFoodItem(item)}>
                <MacroText className='m-1 p-1 rounded bg-red-800 w-20'>
                  Delete
                </MacroText>
              </Pressable>
            </View>
          </View>
        )}
        keyExtractor={(fi) => fi.name}
      />
    </View>
  );
};

export default FoodItemTable;
