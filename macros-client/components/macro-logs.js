import React, { useState, useEffect } from 'react';
import { View, FlatList, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import MacroText from './macro-components/macro-text';
import {
  saveFoodLogAsync,
  getFoodLogsAsync,
  selectFoodLogs,
  deleteFoodLogAsync,
  selectDailyMacroTotals,
  removeDailyMacroTotal,
  addDailyMacroTotal,
  selectCalories,
} from '../feature/macro-slice';
import { MaterialIcons } from '@expo/vector-icons';
import { output } from '../src/output';

const MacroLogs = () => {
  const foodLogs = useSelector(selectFoodLogs);
  const macroTotals = useSelector(selectDailyMacroTotals);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFoodLogsAsync('123'));
  }, []);

  const deleteFoodLog = (log) => {
    dispatch(removeDailyMacroTotal(log));
    dispatch(deleteFoodLogAsync(log));
  };

  const saveFoodLog = (log) => {
    dispatch(addDailyMacroTotal(log));
    dispatch(saveFoodLogAsync(log));
  };

  renderFooter = () => {
    if (foodLogs.length === 0) {
      return (
        <View className='flex flex-row justify-center p-2'>
          <MacroText className='text-lg'>No logs for today...</MacroText>
        </View>
      );
    }

    return null;
  };

  return (
    <View className='p-1 mx-3 shadow-2xl rounded-b rounded-tr bg-teal-800 text-center min-h-4/6'>
      <View className='grid grid-flow-row p-2'>
        {/* TODO: add date selector */}
        <MacroText className='col-span-full text-lg text-center'>{macroTotals.date}</MacroText>
      </View>
      <View className='grid grid-flow-row grid-cols-12 p-3 rounded bg-teal-900 align-center justify-center'>
        <View className='col-span-4'>
          <MacroText className='text-lg text-center'>Protein</MacroText>
        </View>
        <View className='col-span-4'>
          <MacroText className='text-lg text-center'>Carbs</MacroText>
        </View>
        <View className='col-span-3'>
          <MacroText className='text-lg text-center'>Fat</MacroText>
        </View>
        <View className='col-span-1'>
        </View>
      </View>
      <FlatList
        data={foodLogs}
        renderItem={({ item, index }) => (
          <View className={'grid grid-flow-row grid-cols-12 p-3' + (index % 2 === 0 ? '' : ' rounded bg-teal-900')}>
            <MacroText className='col-span-4 text-center'>{item.protein}g</MacroText>
            <MacroText className='col-span-4 text-center'>{item.carbs}g</MacroText>
            <MacroText className='col-span-3 text-center'>{item.fat}g</MacroText>
            <Pressable className='col-span-1 text-center' onPress={() => deleteFoodLog(item)}>
              <MaterialIcons name='delete' size={20} color='red' />
            </Pressable>
          </View>
        )}
        keyExtractor={(fl) => fl.id + fl.date}
        ListFooterComponent={this.renderFooter}
      ></FlatList>
    </View>
  );
};

export default MacroLogs;
