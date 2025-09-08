import { useEffect } from 'react';

/**
 * 컴포넌트가 마운트될 때 한 번만 실행되는 커스텀 훅
 * useEffect의 의도를 명확하게 하기 위해 사용
 */
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []); // 빈 의존성 배열로 마운트 시에만 실행
};
