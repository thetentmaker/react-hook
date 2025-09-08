import { useMemo } from "react";
import { Text, View } from "react-native";

interface HookTestComponentUseMemoProps {
  a: number;
  b: number;
}

const HookTestComponentUseMemo = ({ a, b }: HookTestComponentUseMemoProps) => {
  const text = useMemo(() => {
    return a + b;
  }, [a, b]);
  return <Text>useMemo 결과값 :{text}</Text>;
};

export default HookTestComponentUseMemo;
