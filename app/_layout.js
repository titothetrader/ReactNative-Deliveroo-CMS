import { Stack } from 'expo-router/stack'
import { store } from './store'
import { Provider } from 'react-redux'

export default function Layout() {
  return (
    // Connect Redux store
    <Provider store={store}>

      {/*  Wrap Expo Routing */}
      <Stack 
        screenOptions={{
          headerShown: false,
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
      </Stack>
    </Provider>
  )
}