import { View, Pressable } from 'react-native';
import { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './components/store';
import { output } from './src/output';
import MacrosText from './components/macro-components/macro-text';
import MacroTotals from './components/macro-totals';
import NutritonProfileModal from './components/modals/nutrition-profile-modal';
import TabView from './components/tab-view';

const App = () => {
  const [nutritionProfileModalVisible, setNutritionProfileModalVisible] = useState(false);
  return (
    <View className='container mx-auto bg-teal-700'>
      <Provider store={store}>
        <NutritonProfileModal
          setModalVisible={setNutritionProfileModalVisible}
          modalVisible={nutritionProfileModalVisible}
        ></NutritonProfileModal>
        <View className='flex flex-row justify-between'>
          <MacrosText className='text-3xl p-3'>Macro</MacrosText>
          <Pressable
            onPress={() => setNutritionProfileModalVisible(!nutritionProfileModalVisible)}
          >
            {/* TODO: add cog icon */}
            <MacrosText className='text-lg p-3'>Nutrition Profile</MacrosText>
          </Pressable>
        </View>
        <MacroTotals />
        <TabView />
      </Provider>
    </View>
  );
};
export default App;
