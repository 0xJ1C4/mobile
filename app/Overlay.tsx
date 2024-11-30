import { Canvas, DiffRect, rect, rrect, Line, vec } from "@shopify/react-native-skia";
import { Dimensions, Platform, StyleSheet, View, Text } from "react-native";

const { width, height } = Dimensions.get("window");

const innerDimension = 250;
const cornerSize = 30;

const outer = rrect(rect(0, 0, width, height), 0, 0);
const inner = rrect(
  rect(
    width / 2 - innerDimension / 2,
    height / 2.5 - innerDimension / 2,
    innerDimension,
    innerDimension
  ),
  25,
  25
);

const Overlay = () => {
  return (
    <>
      <Canvas
        style={[
          StyleSheet.absoluteFillObject,
          { height: Dimensions.get('window').height }
        ]}
      >
        <DiffRect inner={inner} outer={outer} color="rgba(0, 0, 0, 0.5)" />
        
        {/* Top-left corner */}
        <Line 
          p1={vec(inner.rect.x, inner.rect.y + cornerSize)} 
          p2={vec(inner.rect.x, inner.rect.y)} 
          color="white" 
          strokeWidth={4} 
        />
        <Line 
          p1={vec(inner.rect.x, inner.rect.y)} 
          p2={vec(inner.rect.x + cornerSize, inner.rect.y)} 
          color="white" 
          strokeWidth={4} 
        />

        {/* Top-right corner */}
        <Line 
          p1={vec(inner.rect.x + inner.rect.width - cornerSize, inner.rect.y)} 
          p2={vec(inner.rect.x + inner.rect.width, inner.rect.y)} 
          color="white" 
          strokeWidth={4} 
        />
        <Line 
          p1={vec(inner.rect.x + inner.rect.width, inner.rect.y)} 
          p2={vec(inner.rect.x + inner.rect.width, inner.rect.y + cornerSize)} 
          color="white" 
          strokeWidth={4} 
        />

        {/* Bottom-left corner */}
        <Line 
          p1={vec(inner.rect.x, inner.rect.y + inner.rect.height - cornerSize)} 
          p2={vec(inner.rect.x, inner.rect.y + inner.rect.height)} 
          color="white" 
          strokeWidth={4} 
        />
        <Line 
          p1={vec(inner.rect.x, inner.rect.y + inner.rect.height)} 
          p2={vec(inner.rect.x + cornerSize, inner.rect.y + inner.rect.height)} 
          color="white" 
          strokeWidth={4} 
        />

        {/* Bottom-right corner */}
        <Line 
          p1={vec(inner.rect.x + inner.rect.width - cornerSize, inner.rect.y + inner.rect.height)} 
          p2={vec(inner.rect.x + inner.rect.width, inner.rect.y + inner.rect.height)} 
          color="white" 
          strokeWidth={4} 
        />
        <Line 
          p1={vec(inner.rect.x + inner.rect.width, inner.rect.y + inner.rect.height - cornerSize)} 
          p2={vec(inner.rect.x + inner.rect.width, inner.rect.y + inner.rect.height)} 
          color="white" 
          strokeWidth={4} 
        />
      </Canvas>
      <View style={styles.textContainer}>
        <Text style={styles.text}>SCAN TO CONNECT</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    alignItems: 'center',
    padding: 10,
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});

export default Overlay;

