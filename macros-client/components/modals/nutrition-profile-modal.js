import { Modal, View, Pressable, TextInput } from 'react-native';
import Slider from '@react-native-community/slider';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  setProtein,
  setCarbs,
  setFat,
  setCalories,
  setNutritionProfile,
  saveNutritionProfileAsync,
  selectNutritionProfile,
} from '../../feature/macro-slice';
import MacroText from '../macro-components/macro-text';
import { output } from '../../src/output';

const NutritonProfileModal = (props) => {
  const [ogNutritionProfile, setOgNutritionProfile] = useState({});
  const nutritionProfile = useSelector(selectNutritionProfile);
  const dispatch = useDispatch();
  
  useEffect(() => {
    setOgNutritionProfile({...nutritionProfile});
  }, [props.modalVisible]);

  const saveNutritionProfile = () => {
    dispatch(
      saveNutritionProfileAsync({
        protein: Number(nutritionProfile.protein),
        carbs: Number(nutritionProfile.carbs),
        fat: Number(nutritionProfile.fat),
        calories: Number(nutritionProfile.calories),
      })
    );
    props.setModalVisible(!props.modalVisible);
  };

  const onProteinChange = (value) => {
    dispatch(setProtein(value));
    dispatch(setCalories(value * 4 + nutritionProfile.carbs * 4 + nutritionProfile.fat * 9));
  };

  const onCarbsChange = (value) => {
    dispatch(setCarbs(value));
    dispatch(setCalories(value * 4 + nutritionProfile.protein * 4 + nutritionProfile.fat * 9));
  };

  const onFatChange = (value) => {
    dispatch(setFat(value));
    dispatch(setCalories(value * 9 + nutritionProfile.protein * 4 + nutritionProfile.carbs * 4));
  };
  
  const closeModal = () => {
    dispatch(setNutritionProfile({...ogNutritionProfile}));
    props.setModalVisible(!props.modalVisible)
  };

  return (
    // <Pressable onPress={() => props.setModalVisible(!props.modalVisible)}>
    <Modal
      animationType='fade'
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => close()}
    >
      <View className='m-auto bg-teal-800 shadow-2xl rounded'>
        <View className='flex justify-end pb-2 bg-teal-900 pt-1 px-1'>
          <Pressable
            onPress={() => closeModal()}
            className='p-2 self-end rounded'
          >
            <MacroText>Close</MacroText>
          </Pressable>
          <MacroText className='self-center text-lg'>
            Nutrition Profile
          </MacroText>
        </View>
        <View className='flex flex-col justify-center content-center p-2'>
          <View className='m-1 p-2 bg-teal-900 rounded'>
            <MacroText>Protein</MacroText>
            <TextInput
              onChangeText={onProteinChange}
              value={Math.round(nutritionProfile.protein)}
              placeholder={'Enter Protein...'}
              inputMode='numeric'
              className='block mt-1 text-white w-full rounded-md border-0 py-1.5 pl-5 pr-20 ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6'
            />
          </View>
          <View className='m-1 p-2 bg-teal-900 rounded'>
            <MacroText>Carbs</MacroText>
            <TextInput
              onChangeText={onCarbsChange}
              value={Math.round(nutritionProfile.carbs)}
              placeholder={'Enter Carbs...'}
              inputMode='numeric'
              className='block mt-1 text-white w-full rounded-md border-0 py-1.5 pl-5 pr-20 ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6'
            />
          </View>
          <View className='m-1 p-2 bg-teal-900 rounded'>
            <MacroText>Fat</MacroText>
            <TextInput
              onChangeText={onFatChange}
              value={Math.round(nutritionProfile.fat)}
              placeholder={'Enter Fat...'}
              inputMode='numeric'
              className='block mt-1 text-white w-full rounded-md border-0 py-1.5 pl-5 pr-20 ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6'
            ></TextInput>
          </View>
          <View className='m-1 p-2 bg-teal-900 rounded'>
            <MacroText>Calories</MacroText>
            <TextInput
              onChangeText={setCalories}
              value={nutritionProfile.calories}
              placeholder={'Enter Calories'}
              className='block mt-1 text-white w-full rounded-md border-0 py-1.5 pl-5 pr-20 ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6'
            ></TextInput>
          </View>
          <View className='p-2'>
            <Pressable
              onPress={() => saveNutritionProfile()}
              className='p-2 m-2 bg-teal-900 rounded'
            >
              <MacroText className='text-center'>Save</MacroText>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
    // </Pressable>
    //TODO: setup carbs protein fat and calorie goals. Then set on save.
  );
};

export default NutritonProfileModal;
