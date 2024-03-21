
import { Modal, View, Pressable, TextInput } from 'react-native';
import Slider from '@react-native-community/slider';
import { useEffect, useState } from 'react';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import {
  selectDailyMacroTotals,
  saveFoodLogAsync,
  addDailyMacroTotal,
  selectCalories,
  setCalories
} from '../../feature/macro-slice';
import MacroText from '../macro-components/macro-text';
import { output } from '../../src/output';

const NutritonProfileModal = (props) => {
  const [calories, setCalories] = useState(2000);
  const [protein, setProtein] = useState(600/4);
  const [carbs, setCarbs] = useState(800/4);
  const [fat, setFat] = useState(600/9);

  const setMacroProtein = (value) => {
    setProtein(value);
    const difference = value - protein;
    // IF Positive protein has been increased
    if(difference < 0 && carbs < calories / 4) {
    // carbs are max increase fat
    }
    if(difference < 0) {
      // increase carbs unless they are max
    }


    if(fat > 0) {
      //decreae fat
    } 
      // decrease carbs

  }

  const requestAxios = async () => {
    var x = await axios.get('http://localhost:3030/api/get-nutrition-profile');
    console.log(x);
  }


  // useEffect(async () => {
  // }, []);

  return (
    // <Pressable onPress={() => props.setModalVisible(!props.modalVisible)}>
    <Modal
      animationType='fade'
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => props.setModalVisible(!props.modalVisible)}
    >
      <View className='m-auto bg-teal-800 shadow-2xl rounded h-1/2 w-5/6'>
        <View className='flex justify-end pb-3  bg-teal-900 pt-1 px-1'>
          <Pressable
            onPress={() => props.setModalVisible(!props.modalVisible)}
            className='p-1 self-end rounded'
          >
            <MacroText>Close</MacroText>
          </Pressable>
          <MacroText className='self-center text-lg'>
            Nutrition Profile 
          </MacroText>
        </View>
        <View className='p-3'>
          <View className='flex flex-row'>
            <MacroText>Protein</MacroText>
            <MacroText className='px-2'>{protein}g</MacroText>
          </View>
          <Slider
            minimumValue={0}
            maximumValue={(calories / 4)}
            value={protein}
            onValueChange={setProtein}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
          />
        </View>
        <View className='p-3'>
          <View className='flex flex-row'>
            <MacroText>Carbs</MacroText>
            <MacroText className='px-2'>{carbs}g</MacroText>
          </View>
          <Slider
            minimumValue={0}
            maximumValue={(calories / 4)}
            value={carbs}
            onValueChange={setCarbs}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
          />
        </View>
        <View className='p-3'>
          <View className='flex flex-row'>
            <MacroText>Fat</MacroText>
            <MacroText className='px-2'>{fat}g</MacroText>
          </View>
          <Slider
            minimumValue={0}
            maximumValue={(calories / 9)}
            value={fat}
            onValueChange={setFat}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
          />
        </View>
        <View className='p-3'>
          <MacroText>Calories</MacroText>
          <TextInput
            onChangeText={setCalories}
            value={calories}
            placeholder={'Enter Calories'}
            className='block mt-3 text-white w-full rounded-md border-0 py-1.5 pl-5 pr-20 ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6'
          ></TextInput>
        </View>
          <Pressable
            onPress={() => requestAxios()}
            className='p-1 self-end rounded'
          >
            <MacroText>Close</MacroText>
          </Pressable>
      </View>
    </Modal>
    // </Pressable>
    //TODO: setup carbs protein fat and calorie goals. Then set on save.
  );
};

export default NutritonProfileModal;
