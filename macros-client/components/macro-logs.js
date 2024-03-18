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
} from '../feature/macro-slice';
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

  return (
    <View className='p-3 mx-3 shadow-2xl rounded-b bg-teal-800'>
      <View className='flex flex-row justify-between'>
        <MacroText className='text-lg'>Macro Logs</MacroText>
        {/* TODO: add date selector */}
        <MacroText className='text-lg'>Date {macroTotals.date}</MacroText>
      </View>
      <View className='grid grid-flow-row grid-cols-9'>
        <View className='col-span-2'>
          <MacroText>Protein</MacroText>
        </View>
        <View className='col-span-2'>
          <MacroText>Carbs</MacroText>
        </View>
        <View className='col-span-2'>
          <MacroText>Fat</MacroText>
        </View>
        <View className='col-span-3'>
          <MacroText>Actions</MacroText>
        </View>
      </View>
      <FlatList
        data={foodLogs}
        renderItem={({ item }) => (
          <View className='grid grid-flow-row grid-cols-9'>
            <MacroText className='col-span-2'>{item.protein}</MacroText>
            <MacroText className='col-span-2'>{item.carbs}</MacroText>
            <MacroText className='col-span-2'>{item.fat}</MacroText>
            <View className='col-span-3 flex flex-row'>
              <Pressable onPress={() => deleteFoodLog(item)}>
                <MacroText>Delete</MacroText>
              </Pressable>
              {/* TODO: doesnt work should open modal. */}
              <Pressable onPress={() => saveFoodLog(item)}>
                <MacroText>Edit</MacroText>
              </Pressable>
            </View>
          </View>
        )}
        keyExtractor={(fl) => fl.id + fl.date}
      ></FlatList>
    </View>
  );
};

export default MacroLogs;
