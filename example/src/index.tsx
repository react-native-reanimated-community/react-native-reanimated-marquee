import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View } from 'react-native-ui-lib';

import Home from './home';
import Normal from './normal';
import { window } from '@/constants/index';
import { isWeb } from '@/utils/index';
import { QRCode } from './components/QRCode';

const Stack = createNativeStackNavigator<RootStackParamList>();

export type RootStackParamList = {
    Home: undefined;
    Normal: undefined;
    Parallax: undefined;
    Stack: undefined;

    Complex: undefined;
    AdvancedParallax: undefined;
    PauseAdvancedParallax: undefined;
    ScaleFadeInOut: undefined;
    RotateInOut: undefined;
    RotateScaleFadeInOut: undefined;
    AnimTabBar: undefined;
    Marquee: undefined;

    SnapCarouselComplex: undefined;
    SnapCarouselLoop: undefined;
};

const WebContainer: React.FC = ({ children }) => {
    return (
        <View
            style={{
                height: '100%',
                width: window.width,
                alignSelf: 'center',
            }}
        >
            {children}
        </View>
    );
};

function App() {
    const app = (
        <React.Suspense fallback={null}>
            <View flex>
                <NavigationContainer>
                    <Stack.Navigator
                        initialRouteName="Home"
                        screenOptions={{
                            contentStyle: {
                                flex: 1,
                                backgroundColor: 'white',
                            },
                            headerRight: ({ tintColor }) => (
                                <View row centerV>
                                    {isWeb && (
                                        <>
                                            <QRCode tintColor={tintColor} />
                                        </>
                                    )}
                                </View>
                            ),
                        }}
                    >
                        <Stack.Screen name="Home" component={Home} />
                        <Stack.Screen name="Normal" component={Normal} />
                    </Stack.Navigator>
                </NavigationContainer>
            </View>
        </React.Suspense>
    );

    if (isWeb) {
        return <WebContainer>{app}</WebContainer>;
    }

    return app;
}

export default App;
