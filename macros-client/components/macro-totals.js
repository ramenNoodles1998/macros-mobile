import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import * as Progress from 'react-native-progress';
import { output } from '../src/output';
import {
  getDailyMacroTotalAsync,
  selectDailyMacroTotals,
  selectCalories,
  selectProtein,
  selectCarbs,
  selectFat,
  getNutritionProfileAsync,
  selectNutritionProfile
} from '../feature/macro-slice';
import { useSelector, useDispatch } from 'react-redux';
import MacroText from './macro-components/macro-text';

const MacroTotals = () => {
  const macroTotals = useSelector(selectDailyMacroTotals);
  const nutritionProfile = useSelector(selectNutritionProfile);
  const [proteinProgress, setProteinProgress] = useState(0)
  const [carbsProgress, setCarbsProgress] = useState(0)
  const [fatProgress, setFatProgress] = useState(0)
  const [caloriesProgress, setCaloriesProgress] = useState(0)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDailyMacroTotalAsync('123'));
    dispatch(getNutritionProfileAsync('123123'))
  }, []);

  useEffect(() => {
    if (!isNaN(macroTotals.protein/nutritionProfile.protein)) {
      setProteinProgress(macroTotals.protein/nutritionProfile.protein);
    }
    if (!isNaN(macroTotals.carbs/nutritionProfile.carbs)) {
      setCarbsProgress(macroTotals.carbs/nutritionProfile.carbs);
    }
    if (!isNaN(macroTotals.fat/nutritionProfile.fat)) {
      setFatProgress(macroTotals.fat/nutritionProfile.fat);
    }
    if (!isNaN(macroTotals.calories/nutritionProfile.calories)) {
      setCaloriesProgress(macroTotals.calories/nutritionProfile.calories);
    }
  }, [nutritionProfile, macroTotals]);

  return (
    <View className='px-3 pb-3 mx-3 shadow-2xl bg-teal-800 rounded'>
      <View className='flex flex-row py-1'>
        <MacroText className='p-1 text-lg'>Protein</MacroText>
        <MacroText className='p-1 text-lg'>{macroTotals.protein}g</MacroText>
      </View>
      <Progress.Bar
        progress={proteinProgress}
        width={300}
        color='rgba(19, 78, 74, 1)'
        height={15}
      />
      <View className='flex flex-row py-1'>
        <MacroText className='p-1 text-lg'>Carbs</MacroText>
        <MacroText className='p-1 text-lg'>{macroTotals.carbs}g</MacroText>
      </View>
      <Progress.Bar
        progress={carbsProgress}
        width={300}
        color='rgba(19, 78, 74, 1)'
        height={15}
      />
      <View className='flex flex-row py-1'>
        <MacroText className='p-1 text-lg'>Fat</MacroText>
        <MacroText className='p-1 text-lg'>{macroTotals.fat}g</MacroText>
      </View>
      <Progress.Bar
        progress={fatProgress}
        width={300}
        color='rgba(19, 78, 74, 1)'
        height={15}
      />
      <View className='flex flex-row py-1'>
        <MacroText className='p-1 text-lg'>Calories</MacroText>
        <MacroText className='p-1 text-lg'>{macroTotals.calories}</MacroText>
      </View>
      <Progress.Bar
        progress={caloriesProgress}
        width={300}
        color='rgba(19, 78, 74, 1)'
        height={15}
      />
    </View>
  );
};

export default MacroTotals;
