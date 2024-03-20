
import { Modal, View, TextInput, Pressable } from 'react-native';
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
        <View className='m-auto bg-teal-800 shadow-2xl rounded'>
            <MacroText>HELLO NUTRITIONs</MacroText>
        </View>
    </Modal>
    // </Pressable>
  );
};

export default NutritonProfileModal;
