import * as React from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { window } from './constants';
import Animated, { Easing } from 'react-native-reanimated';
import { Text, View } from 'react-native';

const PAGE_WIDTH = window.width / 2;

function ReactionContainer(props: {
    text: string;
    children: (
        text: React.ReactElement,
        layout?: { width: number }
    ) => React.ReactElement;
}) {
    const [width, setWidth] = React.useState<number>();
    const [layout, setLayout] = React.useState<{ width: number }>();

    React.useEffect(() => {
        if (typeof width === 'number') {
            setLayout({ width });
        }
    }, [width]);

    React.useEffect(() => {
        setLayout(undefined);
    }, [props.text]);

    const text = (
        <Animated.View
            style={[
                {
                    flexWrap: 'wrap',
                    width: layout?.width,
                },
            ]}
        >
            <Text
                onLayout={({ nativeEvent }) => {
                    if (typeof layout === 'undefined') {
                        setWidth(nativeEvent.layout.width);
                    }
                }}
            >
                {props.text}
            </Text>
        </Animated.View>
    );

    return React.cloneElement(props.children(text, layout), {
        key: props.text,
    });
}

const Index: React.FC<{ text: string }> = ({ text }) => {
    return (
        <ReactionContainer text={text}>
            {(textElement, layout) => {
                return (
                    <View
                        style={{
                            alignItems: 'center',
                            flex: 1,
                            marginTop: 24,
                        }}
                    >
                        <Carousel
                            width={layout?.width ?? PAGE_WIDTH}
                            height={30}
                            style={{
                                width: 200,
                            }}
                            enableSnap={false}
                            pagingEnabled={false}
                            loop
                            autoPlay
                            withAnimation={{
                                type: 'timing',
                                config: {
                                    duration: 10000,
                                    easing: Easing.linear,
                                },
                            }}
                            autoPlayInterval={0}
                            data={[...new Array(6).keys()]}
                            renderItem={() => textElement}
                            enabled={false}
                        />
                    </View>
                );
            }}
        </ReactionContainer>
    );
};

export default Index;
