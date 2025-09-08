import { useEffect, useRef } from 'react';

/**
 * 컴포넌트가 언마운트될 때 실행되는 커스텀 훅
 * 클린업 로직을 명확하게 하기 위해 사용
 */
export const useUnmount = (callback: () => void) => {
  const callbackRef = useRef(callback);
  
  // 최신 콜백을 항상 유지
  callbackRef.current = callback;

  useEffect(() => {
    // 언마운트 시에만 실행되는 클린업 함수 반환
    return () => {
      callbackRef.current();
    };
  }, []); // 빈 의존성 배열로 마운트 시에만 등록, 언마운트 시에만 실행
};
