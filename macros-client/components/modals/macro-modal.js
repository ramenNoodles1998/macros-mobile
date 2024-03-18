import { Modal, View, TextInput, Pressable } from 'react-native';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectDailyMacroTotals,
  saveFoodLogAsync,
  addDailyMacroTotal,
} from '../../feature/macro-slice';
import MacroText from '../macro-components/macro-text';
import { output } from '../../src/output';

const MacroModal = (props) => {
  const dispatch = useDispatch();
  const [macros, onChangeMacros] = useState('');
  const addMacro = () => {
    const macro = { protein: 0, carbs: 0, fat: 0, [props.modalType]:Number(macros) }
    dispatch(addDailyMacroTotal(macro));
    dispatch(saveFoodLogAsync(macro));
    onChangeMacros('');
    props.setModalVisible(!props.modalVisible);
  };

  //TODO: set click off modal as close.
  return (
    // <Pressable onPress={() => props.setModalVisible(!props.modalVisible)}>
    <Modal
      animationType='fade'
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => props.setModalVisible(!props.modalVisible)}
    >
      <View className='m-auto bg-teal-800 shadow-2xl rounded'>
        <View className='flex justify-end pb-3  bg-teal-900 pt-1 px-1'>
          <Pressable
            onPress={() => props.setModalVisible(!props.modalVisible)}
            className='p-1 self-end rounded'
          >
            <MacroText>Close</MacroText>
          </Pressable>
          <MacroText className='self-center text-lg'>
            Quick Add {props.modalType}
          </MacroText>
        </View>
        <View className='flex flex-col justify-center content-center p-2'>
          <TextInput
            onChangeText={onChangeMacros}
            value={macros}
            placeholder={'Enter Macro'}
            inputMode='numeric'
            className='block text-white w-full rounded-md border-0 py-1.5 pl-5 pr-20 ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6'
          ></TextInput>
          <Pressable
            onPress={() => addMacro()}
            className='p-2 m-2 bg-teal-900 rounded'
          >
            <MacroText className='text-center'>Add</MacroText>
          </Pressable>
        </View>
      </View>
    </Modal>
    // </Pressable>
  );
};

export default MacroModal;
