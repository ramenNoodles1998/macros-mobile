import { View, Pressable } from 'react-native';
import { useState } from 'react';
import MacroLogs from './macro-logs';
import AddMacros from './add-macros';
import { output } from '../src/output';
import MacroText from './macro-components/macro-text';

const TabView = () => {
  const [showAddMacros, setShowAddMacros] = useState(true);

  return (
    <View className='mt-3'>
      <View className='flex flex-row justify-right'>
        <Pressable
          onPress={() => setShowAddMacros(!showAddMacros)}
          className={
            'px-3 ml-3 mr-1 pt-1 rounded-t ' +
            (!showAddMacros ? 'bg-teal-900 ' : 'bg-teal-800 ')
          }
        >
          <MacroText className='text-lg'>Macros</MacroText>
        </Pressable>
        <Pressable
          onPress={() => setShowAddMacros(!showAddMacros)}
          className={
            'px-3 pt-1 rounded-t ' +
            (showAddMacros ? 'bg-teal-900 ' : 'bg-teal-800 ')
          }
        >
          <MacroText className='text-lg'>Logs</MacroText>
        </Pressable>
      </View>
      <View>{!showAddMacros ? <MacroLogs /> : <AddMacros />}</View>
    </View>
  );
};

export default TabView;
