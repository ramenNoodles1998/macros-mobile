import React, { useEffect } from 'react';
import { View } from 'react-native';
import * as Progress from 'react-native-progress';
import { output } from '../src/output';
import {
  addDailyMacroTotal,
  getDailyMacroTotalAsync,
  selectDailyMacroTotals,
} from '../feature/macro-slice';
import { useSelector, useDispatch } from 'react-redux';
import MacroText from './macro-components/macro-text';

const MacroTotals = () => {
  const macroTotals = useSelector(selectDailyMacroTotals);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDailyMacroTotalAsync('123'));
  }, []);

  return (
    <View className='px-3 pb-3 mx-3 shadow-2xl bg-teal-800 rounded'>
      <View className='flex flex-row py-1'>
        <MacroText className='p-1 text-lg'>Protein</MacroText>
        <MacroText className='p-1 text-lg'>{macroTotals.protein}g</MacroText>
      </View>
      <Progress.Bar
        progress={0.3}
        width={300}
        color='rgba(19, 78, 74, 1)'
        height={15}
      />
      <View className='flex flex-row py-1'>
        <MacroText className='p-1 text-lg'>Carbs</MacroText>
        <MacroText className='p-1 text-lg'>{macroTotals.carbs}g</MacroText>
      </View>
      <Progress.Bar
        progress={0.3}
        width={300}
        color='rgba(19, 78, 74, 1)'
        height={15}
      />
      <View className='flex flex-row py-1'>
        <MacroText className='p-1 text-lg'>Fat</MacroText>
        <MacroText className='p-1 text-lg'>{macroTotals.fat}g</MacroText>
      </View>
      <Progress.Bar
        progress={0.3}
        width={300}
        color='rgba(19, 78, 74, 1)'
        height={15}
      />
    </View>
  );
};

export default MacroTotals;
