import { View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './components/store';
import { output } from './src/output';
import MacrosText from './components/macro-components/macro-text';
import MacroTotals from './components/macro-totals';
import TabView from './components/tab-view';

const App = () => {
  return (
    <View className='container mx-auto bg-teal-700'>
      <Provider store={store}>
        <View className='flex flex-row justify-between'>
          <MacrosText className='text-3xl p-3'>Macro</MacrosText>
          <MacrosText className='text-lg p-3'>Nutrition Profile</MacrosText>
        </View>
        <MacroTotals />
        <TabView />
      </Provider>
    </View>
  );
};
export default App;
