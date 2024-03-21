
import { Modal, View, Pressable } from 'react-native';
import Slider from '@react-native-community/slider';
import { useEffect, useState } from 'react';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import {
  selectDailyMacroTotals,
  saveFoodLogAsync,
  addDailyMacroTotal,
} from '../../feature/macro-slice';
import MacroText from '../macro-components/macro-text';
import { output } from '../../src/output';

const NutritonProfileModal = (props) => {
  useEffect(() => {
    axios.get('localhost:3030/api/')
  }, []);

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
          <MacroText>Protein</MacroText>
          <Slider
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
          />
        </View>
        <View className='p-3'>
          <MacroText>Carbs</MacroText>
          <Slider
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
          />
        </View>
        <View className='p-3'>
          <MacroText>Fat</MacroText>
          <Slider
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
          />
        </View>
        <View className='p-3'>
          <MacroText>Calories</MacroText>
          <Slider
            minimumValue={0}
            maximumValue={1}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
          />
        </View>
      </View>
    </Modal>
    // </Pressable>
  );
};

export default NutritonProfileModal;
