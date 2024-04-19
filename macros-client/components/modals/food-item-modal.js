import { Modal, View, TextInput, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addFoodItemAsync, deleteFoodItemAsync } from '../../feature/macro-slice';
import MacroText from '../macro-components/macro-text';
import { output } from '../../src/output';

const FoodItemModal = (props) => {
  const dispatch = useDispatch();
  const [name, onChangeName] = useState('');
  const [ogName, setOgName] = useState('');
  const [protein, onChangeProtein] = useState('');
  const [carbs, onChangeCarbs] = useState('');
  const [fat, onChangeFat] = useState('');

  useEffect(() => {
    if(props.isEdit) {
      setOgName(props.macro.name);
      onChangeName(props.macro.name);
      onChangeProtein(props.macro.protein);
      onChangeCarbs(props.macro.carbs);
      onChangeFat(props.macro.fat);
    }
  }, [props.modalVisible]);


  const addMacro = () => {
    if(props.isEdit) {
      dispatch(
        deleteFoodItemAsync({
          name: ogName,
          protein: Number(protein),
          carbs: Number(carbs),
          fat: Number(fat),
          calories: Number((protein * 4) + (carbs * 4) + (fat * 9)),
        })
      );
    }

    dispatch(
      addFoodItemAsync({
        name,
        protein: Number(protein),
        carbs: Number(carbs),
        fat: Number(fat),
        calories: Number((protein * 4) + (carbs * 4) + (fat * 9)),
      })
    );
    onChangeName('');
    onChangeProtein('');
    onChangeCarbs('');
    onChangeFat('');
    onChangeServing('');
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
        <View className='flex justify-end pb-2  bg-teal-900 pt-1 px-1'>
          <Pressable
            onPress={() => props.setModalVisible(!props.modalVisible)}
            className='p-2 self-end rounded'
          >
            //TODO: add overgoing on macros
            //potentially creating and caching userId.
            <MacroText>Close</MacroText>
          </Pressable>
          <MacroText className='self-center text-lg'>{props.isEdit ? 'Edit' : 'Add'} Food Item</MacroText>
        </View>
        <View className='flex flex-col justify-center content-center p-2'>
          <View className='m-1 p-2 bg-teal-900 rounded'>
            <MacroText>Name</MacroText>
            <TextInput
              onChangeText={onChangeName}
              value={name}
              placeholder={'Enter Name'}
              className='block mt-1 text-white w-full rounded-md border-0 py-1.5 pl-5 pr-20 ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6'
            ></TextInput>
          </View>
          <View className='m-1 p-2 bg-teal-900 rounded'>
            <MacroText>Protein</MacroText>
            <TextInput
              onChangeText={onChangeProtein}
              value={protein}
              placeholder={'Enter Protein...'}
              inputMode='numeric'
              className='block mt-1 text-white w-full rounded-md border-0 py-1.5 pl-5 pr-20 ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6'
            />
          </View>
          <View className='m-1 p-2 bg-teal-900 rounded'>
            <MacroText>Carbs</MacroText>
            <TextInput
              onChangeText={onChangeCarbs}
              value={carbs}
              placeholder={'Enter Carbs...'}
              inputMode='numeric'
              className='block mt-1 text-white w-full rounded-md border-0 py-1.5 pl-5 pr-20 ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6'
            />
          </View>
          <View className='m-1 p-2 bg-teal-900 rounded'>
            <MacroText>Fat</MacroText>
            <TextInput
              onChangeText={onChangeFat}
              value={fat}
              placeholder={'Enter Fat...'}
              inputMode='numeric'
              className='block mt-1 text-white w-full rounded-md border-0 py-1.5 pl-5 pr-20 ring-1 ring-inset ring-gray-300 placeholder:text-gray-300 focus:ring-2 focus:ring-inset focus:ring-gray-300 sm:text-sm sm:leading-6'
            ></TextInput>
          </View>
          <Pressable
            onPress={() => addMacro()}
            className='p-2 m-2 bg-teal-900 rounded'
          >
            <MacroText className='text-center'>{props.isEdit ? 'Edit' : 'Add'}</MacroText>
          </Pressable>
        </View>
      </View>
    </Modal>
    // </Pressable>
  );
};

export default FoodItemModal;

