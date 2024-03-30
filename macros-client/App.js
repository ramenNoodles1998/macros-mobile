import { View, Pressable } from 'react-native';
import { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './components/store';
import { output } from './src/output';
import MacrosText from './components/macro-components/macro-text';
import MacroTotals from './components/macro-totals';
import NutritonProfileModal from './components/modals/nutrition-profile-modal';
import TabView from './components/tab-view';
import { MaterialIcons } from '@expo/vector-icons';

const App = () => {
  const [nutritionProfileModalVisible, setNutritionProfileModalVisible] =
    useState(false);
  return (
    <View className='container mx-auto bg-teal-700'>
      <Provider store={store}>
        <NutritonProfileModal
          setModalVisible={setNutritionProfileModalVisible}
          modalVisible={nutritionProfileModalVisible}
        ></NutritonProfileModal>
        <View className='flex flex-row justify-between'>
          <MacrosText className='text-3xl px-3 py-1'>Macro</MacrosText>
          <Pressable
            className='px-3 py-1'
            onPress={() =>
              setNutritionProfileModalVisible(!nutritionProfileModalVisible)
            }
          >
            <View className='flex flex-row items-center'>
              <MacrosText className='text-lg pr-1'>
                Nutrition Profile
              </MacrosText>
            </View>
          </Pressable>
        </View>
        <MacroTotals />
        <TabView />
      </Provider>
    </View>
  );
};
export default App;
