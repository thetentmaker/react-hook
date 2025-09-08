import { useCallback, useMemo } from "react";
import { Text, View } from "react-native";

interface HookTestComponentUseCallbackProps {
  a: number;
  b: number;
}

const HookTestComponentUseCallback = ({ a, b }: HookTestComponentUseCallbackProps) => {
  const doSome = useCallback(() => {
    return a + b;
  }, [a, b]);
  return <Text>useCallback 결과값 :{doSome()}</Text>;
};

export default HookTestComponentUseCallback;
