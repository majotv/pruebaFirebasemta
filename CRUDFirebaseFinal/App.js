import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { List } from './screens/List';
import { Form } from './screens/Form';
import  {ListProduct}  from './screens/ListProduct';
import  {FormProduct} from './screens/FormProduct';
import {CargarImagen} from './componentes/CargadorImagen'
import {FormCombo} from './screens/FormCombo';
import {ListCombo} from './screens/ListCombo'
import {ListProductPrecio} from './screens/ListProductPrecio'
import {FormPrecio} from './screens/FormPrecio';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ListProductScreen">
        <Stack.Screen name="ProductosScreen" component={FormProduct} />
        <Stack.Screen name="ListProductScreen" component={ListProduct} />
        <Stack.Screen name="Form" component={List} />
        <Stack.Screen name="CargarImagenScren" component={CargarImagen} />
        <Stack.Screen name="ComboScreen" component={FormCombo} />
        <Stack.Screen name="ListComboScreen" component={ListCombo} />
        <Stack.Screen name="ListProductPrecioScreen" component={ListProductPrecio} />
       <Stack.Screen name="PrecioScreen" component={FormPrecio} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;

