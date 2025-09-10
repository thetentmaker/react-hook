# React Hooks에 대하여

| <img src="./images/index.png" alt="Index Image" width="300"> | <img src="./images/second.png" alt="Second Image" width="300"> |
|:---:|:---:|
| Index Image | Second Image |

## 목차
1. [What is Hook?](#1-what-is-hook)
2. [실무에서 자주 사용하는 Library Hook](#2-실무에서-자주-사용하는-library-hook)
3. [최적화를 위한 Memoization](#4-최적화를-위한-memoization)

---

## 1. What is Hook?

### Hook이란?
Hook은 React에서 **state**와 기타 **side effect**들을 다루기 위해 탄생한 기능입니다.

### Hook을 만든 이유

#### (1) 컴포넌트 간 상태 관련 로직 재사용의 어려움
- 기존에는 컴포넌트 간 상태 관련 로직을 재사용하기 어려웠습니다
- Hook을 통해 로직을 재사용할 수 있게 되었습니다

#### (2) 컴포넌트가 커질수록 복잡해지는 로직
- 컴포넌트가 커질수록 복잡한 로직들이 얽혀있게 됩니다
- **단일 책임 원칙**에서도 벗어나는 문제가 발생했습니다

#### (3) 클래스 컴포넌트의 혼란
- **`this` 키워드**로 인한 좋지 못한 개발 경험
- 클래스 컴포넌트 사용 시 발생하는 다양한 혼란들

### Hook의 사용 규칙

#### 최상단에서 Hook 사용하기
- Hook은 **컴포넌트의 최상단**에서 사용해야 합니다
- React에서는 선언하는 Hook의 **순서**에 따라 접근할 수 있는 **인덱스 값**이 부여됩니다
- 조건부로 Hook을 호출하면 인덱스 값이 달라져 **의도치 않은 버그**가 발생할 수 있습니다

---

## 2. 실무에서 자주 사용하는 Library Hook

### useBackHandler
### useAppState
### useRoute(expo)
### useIsFocused
### useFocusEffect
### useRef
### useMount
---

## 3. 최적화를 위한 Memoization
### useMemo
- 값을 메모이제이션하여 의존성 배열의 값이 변경될 때만 다시 계산
- 비용이 큰 계산 작업을 최적화할 때 사용
- 예시처럼 a + b 계산 결과를 캐싱하여 불필요한 재계산 방지
```tsx
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
```
### useCallback
- 함수를 메모이제이션하여 의존성 배열의 값이 변경될 때만 새로운 함수 생성
- 자식 컴포넌트에 콜백 함수를 전달할 때 불필요한 리렌더링 방지
- useMemo는 계산된 값을 반환하고, useCallback은 메모이제이션된 함수를 반환
```tsx
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

```
### useBackHandler
- Android에서 뒤로가기 버튼을 처리할 때 사용하는 Hook
- 사용자가 뒤로가기 버튼을 눌렀을 때의 동작을 커스터마이징할 수 있습니다
```tsx
  useBackHandler(() => {
    console.log("backHandler");
    return true;
  });

```

### useAppState
- **iOS와 Android** 모두에서 앱의 상태(활성/비활성/백그라운드)를 감지하는 Hook
  - iOS: active, inactive, background
  - AND: active, background
- 앱이 포그라운드에서 백그라운드로 전환되거나 그 반대의 상황을 감지할 수 있습니다

```tsx
  const appState = useAppState();
  console.log("appState", appState);
```
### useRoute
```tsx
router.push('/second');
```

### useIsFocused
- 현재 화면이 **포커스 상태**인지를 확인하는 Hook
- **반환값**을 제공하며, 다른 화면으로 이동하면 현재 화면의 포커스가 `false`가 됩니다

```tsx
  const isFocused = useIsFocused()

  useEffect(() => {
    console.log("useEffect", isFocused);
    if(isFocused) {
        console.log("isFocused");
    }
  }, [isFocused]);

```

### useFocusEffect
- 해당 화면이 **포커스될 때 호출**되는 Hook
- 화면이 포커스될 때마다 특정 로직을 실행하고 싶을 때 사용합니다

```tsx
  useFocusEffect(() => {
    console.log("useFocusEffect");
  },);

```

### useRef
- **useRef**는 `ScrollView`, `TextInput` 등과 함께 사용됩니다
- **state가 아니기 때문에** React 철학에 따라 **리렌더링되지 않습니다**
- useScrollToTop과 함께 사용하여 스크롤 위치를 제어할 수 있습니다


```tsx
  const scrollViewRef = useRef<ScrollView>(null);
  
  const scrollToTop = () => {
    console.log("scrollToTop 버튼이 눌렸습니다!");
    scrollViewRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  const scrollToBottom = () => {
    console.log("scrollToBottom 버튼이 눌렸습니다!");
    scrollViewRef.current?.scrollToEnd({
      animated: true,
    });
  };
  
  return (
    <View style={styles.container}>
      <ScrollView 
        ref={scrollViewRef}

```
### useMount
- 내부에서 **useEffect**를 사용하지만, **의도를 명확하게** 하기 위해 사용합니다
- useEffect는 **다용도**이기 때문에:
  - 코드 **가독성이 떨어질** 수 있습니다
  - useEffect를 **여러 개 사용하면** 코드 분석이 어려워집니다
- useMount를 사용하면 컴포넌트 **마운트 시점의 로직**임을 명확히 알 수 있습니다

```tsx
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};
```

### useUnmount
- 내부에서 useEffect의 cleanup 함수를 사용하지만, 의도를 명확하게 하기 위해 사용합니다
- useEffect의 return 함수는 다양한 용도로 사용되기 때문에, 단순히 보면 언마운트 로직인지 파악하기 어려울 수 있습니다
- useUnmount를 사용하면 컴포넌트 언마운트 시점의 로직임을 명확히 알 수 있습니다
```tsx
export const useUnmount = (callback: () => void) => {
  const callbackRef = useRef(callback);
  
  callbackRef.current = callback;

  useEffect(() => {
    return () => {
      callbackRef.current();
    };
  }, []);
};
```
<br><br>

# Hook 의 이해

## React Hook이란?

- Hook은 함수형 컴포넌트에서 React의 상태 관리, 생명주기, 그리고 다양한 기능들을 사용할 수 있게 해주는 특별한 함수입니다. 
- 함수명이 'use'로 시작하며, 컴포넌트 로직을 재사용 가능한 형태로 분리할 수 있게 해줍니다.
- React 16.8부터 도입되어 함수형 컴포넌트가 클래스 컴포넌트의 모든 기능을 사용할 수 있게 만든 핵심 기술입니다.

### Hook의 특징
- 함수명이 `use`로 시작 (useState, useEffect, useContext 등)
- 함수형 컴포넌트와 다른 Hook 내부에서만 호출 가능
- 내장된 Hook을 이용하거나 결합하여 커스텀 Hook 생성 가능
- React 16.8부터 도입

## 📈 Hook이 등장한 이유

### 1. **클래스 컴포넌트의 복잡성 문제**
```ts
// 클래스 컴포넌트 - 복잡하고 장황함
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <View>
        <Text>{this.state.count}</Text>
        <TouchableOpacity onPress={this.handleClick}>
          <Text>증가</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
```

### 2. **로직 재사용의 어려움**
- HOC(Higher-Order Components)와 Render Props 패턴의 복잡함
- "Wrapper Hell" 문제 발생
- 컴포넌트 간 상태 로직 공유의 어려움

### 3. **생명주기 메서드의 한계**
- 관련 있는 코드가 여러 생명주기 메서드에 분산됨
- 관련 없는 로직이 같은 생명주기 메서드에 섞임
- Effect는 외부 시스템과의 동기화를 위한 "탈출구" 개념으로 재정의됨

## Class Component vs Function Component

### Class Component (과거)

**장점:**
- 상태 관리 가능 (this.state)
- 생명주기 메서드 사용 가능
- 레퍼런스 메서드 정의 가능

**단점:**
- 코드가 길고 복잡함
- this 바인딩 필요
- 번들 크기가 큼
- 최적화가 어려움
- 테스트가 복잡함

```javascript
class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      loading: true,
      error: null
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch(`/api/users/${this.props.userId}`);
      const user = await response.json();
      this.setState({ user, loading: false });
    } catch (error) {
      this.setState({ error, loading: false });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.fetchUser();
    }
  }

  render() {
    const { user, loading, error } = this.state;
    
    if (loading) return <Text>로딩 중...</Text>;
    if (error) return <Text>오류 발생: {error.message}</Text>;
    
    return (
      <View>
        <Text>{user.name}</Text>
        <Text>{user.email}</Text>
      </View>
    );
  }
}
```

### Function Component + Hooks (현재)

**장점:**
- 코드가 간결하고 읽기 쉬움
- 로직 재사용이 쉬움 (Custom Hook)
- 성능 최적화가 쉬움
- 테스트가 간단함
- 번들 크기가 작음

```javascript
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/users/${userId}`);
        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]); // userId가 변경될 때만 실행

  if (loading) return <Text>로딩 중...</Text>;
  if (error) return <Text>오류 발생: {error.message}</Text>;

  return (
    <View>
      <Text>{user.name}</Text>
      <Text>{user.email}</Text>
    </View>
  );
}
```

## Function Component가 주류가 된 이유

### 1. **개발 생산성 향상**
- 보일러플레이트 코드 대폭 감소
- 직관적인 상태 관리
- 함수형 프로그래밍 패러다임과 잘 맞음

### 2. **로직 재사용성**
```javascript
// Custom Hook으로 로직 재사용
function useUserData(userId) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 사용자 데이터 페칭 로직
  }, [userId]);

  return { user, loading };
}

// 여러 컴포넌트에서 재사용 가능
function UserProfile({ userId }) {
  const { user, loading } = useUserData(userId);
  // ...
}

function UserCard({ userId }) {
  const { user, loading } = useUserData(userId);
  // ...
}
```

### 3. **성능 최적화**
- React.memo로 쉬운 메모이제이션
- useMemo, useCallback으로 정밀한 최적화
- 컴파일러 최적화에 유리

### 4. **React Native에서의 이점**
- 모바일 앱의 성능이 중요 → Hook의 최적화 이점 극대화
- Hot Reloading 시 상태 유지가 더 안정적

## 🛠️ 주요 Hook 종류 (공식 분류)

### State Hooks
- **useState**: 직접 업데이트할 수 있는 상태 변수 선언
- **useReducer**: Reducer 함수 내부의 업데이트 로직을 사용하여 상태 변수 선언

### Context Hooks
- **useContext**: Context를 읽고 구독

### Ref Hooks
- **useRef**: 렌더링에 사용되지 않는 정보 보유 (DOM 노드, Timeout ID 등)
- **useImperativeHandle**: 컴포넌트에 노출되는 Ref를 커스텀 (드물게 사용)

### Effect Hooks
- **useEffect**: 컴포넌트를 외부 시스템에 연결하고 동기화
- **useLayoutEffect**: 브라우저가 화면을 다시 그리기 전에 실행
- **useInsertionEffect**: React가 DOM을 변경하기 전에 실행 (라이브러리용)

### Performance Hooks
- **useMemo**: 비용이 많이 드는 계산 결과를 캐시
- **useCallback**: 함수 정의를 최적화된 컴포넌트에 전달하기 전에 캐시
- **useTransition**: State 전환을 Non-Blocking으로 표시
- **useDeferredValue**: UI의 중요하지 않은 부분 업데이트를 지연

### Other Hooks (주로 라이브러리 작성자용)
- **useDebugValue**: React 개발자 도구 레이블 커스텀
- **useId**: 컴포넌트가 고유 ID를 자신과 연결
- **useSyncExternalStore**: 컴포넌트가 외부 저장소를 구독
- **useActionState**: 액션을 통해 State를 관리

### React Native 특화 Hooks
- **useColorScheme**: 다크모드 감지
- **useDeviceOrientation**: 기기 방향 감지
- **useFocusEffect**: 화면 포커스 시 실행

## 📊 실제 프로젝트에서의 비교

### 개발 시간
- 클래스 컴포넌트: 평균 30% 더 많은 코드 작성 시간
- 함수 컴포넌트 + Hook: 간결하고 빠른 개발

### 유지보수성
- Hook 기반: 로직별로 코드 분리 가능
- 버그 발생률 감소
- 코드 리뷰 효율성 증대

### 성능
- 번들 크기: 평균 15-20% 감소
- 런타임 성능: 미미한 개선 (상황에 따라 다름)
- 개발 도구 지원 향상

## 🎯 결론

### Function Component + Hook을 사용해야 하는 이유

1. **React 팀의 공식 권장사항**
   - 새로운 기능은 Hook 중심으로 개발
   - 클래스 컴포넌트는 레거시 지원만

2. **팀 개발 효율성**
   - 일관된 코드 스타일
   - 쉬운 코드 리뷰
   - 빠른 온보딩

3. **미래 호환성**
   - React 18+ 새 기능들은 Hook 기반
   - Concurrent Features 지원
   - Server Components와의 호환성

### 마이그레이션 전략
- 새 컴포넌트는 모두 Hook 사용
- 기존 클래스 컴포넌트는 점진적 마이그레이션
- Custom Hook으로 공통 로직 추출

<br>

# React Hook Dependencies
## 왜 Primitive를 사용해야 할까?

---

## 📋 목차

1. [문제 상황](#문제-상황)
2. [React의 Dependencies 비교 원리](#react의-dependencies-비교-원리)
3. [왜 깊은 복사를 하면 안 될까?](#왜-깊은-복사를-하면-안-될까)
4. [올바른 해결책](#올바른-해결책)
5. [useMemo 활용법](#usememo-활용법)
6. [실전 팁](#실전-팁)

---

## 🚨 문제 상황

### 예상과 다르게 동작하는 코드

```tsx
function UserProfile({ userData }) {
  const userConfig = {
    name: userData.name,
    theme: 'dark',
    notifications: true
  };

  useEffect(() => {
    console.log('사용자 설정이 변경됨');
    updateUserSettings(userConfig);
  }, [userConfig]); // 🔥 매 렌더링마다 실행됨!

  return <div>사용자: {userData.name}</div>;
}
```

**문제점**: `userData.name`이 같아도 useEffect가 계속 실행됨

---

## ⚙️ React의 Dependencies 비교 원리

### React는 얕은 비교(Shallow Comparison)를 사용

```tsx
// React 내부적으로 이렇게 동작
function areHookInputsEqual(prevDeps, nextDeps) {
  if (prevDeps === null || nextDeps === null) {
    return false;
  }

  for (let i = 0; i < prevDeps.length; i++) {
    if (Object.is(prevDeps[i], nextDeps[i])) {
      continue;
    }
    return false;
  }
  return true;
}
```

### Object.is()의 동작 방식

```tsx
// ✅ Primitive 값 - 값으로 비교
Object.is(1, 1);           // true
Object.is('hello', 'hello'); // true
Object.is(true, true);     // true

// ❌ 객체 - 참조로 비교
const obj1 = { name: 'John' };
const obj2 = { name: 'John' };
Object.is(obj1, obj2);     // false (서로 다른 참조)
Object.is(obj1, obj1);     // true (같은 참조)
```

---

## 🤔 왜 깊은 복사를 하면 안 될까?

### 1. 성능 문제

```javascript
// ❌ 매번 깊은 복사를 한다면?
function deepEqual(obj1, obj2) {
  // 모든 속성을 재귀적으로 비교
  // 큰 객체의 경우 매우 느림
}

// 렌더링할 때마다 이런 비교가 실행된다면?
// 📊 성능 저하 심각!
```

### 2. 복잡성 증가

- 중첩된 객체 처리
- 순환 참조 처리  
- 함수, Date, RegExp 등 특수 객체 처리
- 배열과 객체의 혼합 구조

### 3. 예측 불가능한 동작

```tsx
const config = {
  settings: {
    theme: 'dark',
    user: userData // 🔥 외부에서 변경 가능
  }
};

// deepEqual로 비교해도
// userData가 mutable하면 예측 불가능
```

### 4. React의 설계 철학과 맞지 않음

- React는 **불변성(Immutability)** 원칙을 따름
- 빠른 비교를 통한 성능 최적화가 목표
- 단순하고 예측 가능한 동작

---

## ✅ 올바른 해결책

### 1. Primitive 값 사용

```tsx
// ❌ 객체 전체를 dependency에
function UserProfile({ userData }) {
  useEffect(() => {
    updateUserSettings(userData);
  }, [userData]); // 매번 실행됨
}

// ✅ 필요한 primitive 값만
function UserProfile({ userData }) {
  useEffect(() => {
    updateUserSettings({
      name: userData.name,
      email: userData.email
    });
  }, [userData.name, userData.email]); // 값이 실제로 변할 때만 실행
}
```

### 2. 구조분해할당 활용

```tsx
function UserProfile({ userData }) {
  const { name, email, age } = userData;

  useEffect(() => {
    console.log('사용자 정보 변경:', { name, email, age });
  }, [name, email, age]); // 명확하고 안전함
}
```

---

## 🎯 useMemo 활용법

### 객체를 dependency로 사용하고 싶다면?

```tsx
function DataTable({ filters, sorting }) {
  // ✅ useMemo로 안정적인 객체 생성
  const queryConfig = useMemo(() => ({
    filters: {
      category: filters.category,
      price: filters.price
    },
    sort: {
      field: sorting.field,
      order: sorting.order
    },
    limit: 20
  }), [
    filters.category,    // primitive
    filters.price,       // primitive  
    sorting.field,       // primitive
    sorting.order        // primitive
  ]);

  useEffect(() => {
    fetchData(queryConfig);
  }, [queryConfig]); // 이제 안전함!
}
```

### useMemo vs 직접 primitive 사용

```javascript
// 방법 1: useMemo 사용
const config = useMemo(() => ({
  apiKey: apiKey,
  timeout: timeout  
}), [apiKey, timeout]);

useEffect(() => {
  makeRequest(config);
}, [config]);

// 방법 2: 직접 primitive 사용 (권장)
useEffect(() => {
  const config = { apiKey, timeout };
  makeRequest(config);
}, [apiKey, timeout]); // 더 간단하고 명확함
```

---

### 2. 객체 props 처리

```tsx
// ❌ 전체 객체
function MyComponent({ user, settings }) {
  useEffect(() => {
    // ...
  }, [user, settings]);
}

// ✅ 필요한 값만 추출
function MyComponent({ user, settings }) {
  const { user: { id, name }, settings: { theme, lang } } = props;
  
  useEffect(() => {
    // ...
  }, [id, name, theme, lang]);
}
```

### 3. 커스텀 훅 활용

```tsx
// 재사용 가능한 로직을 커스텀 훅으로
function useUserData(userId, includeProfile = false) {
  const [userData, setUserData] = useState(null);
  
  useEffect(() => {
    fetchUserData(userId, includeProfile);
  }, [userId, includeProfile]); // primitive 값들만
  
  return userData;
}
```

---

## 📝 정리

### 핵심 원칙

1. **Primitive 값 사용**: 가장 안전하고 예측 가능
2. **얕은 비교 이해**: React가 `Object.is()`로 비교함을 기억
3. **불변성 유지**: 객체를 직접 수정하지 말고 새로 생성
4. **useMemo 활용**: 복잡한 객체가 필요한 경우에만 사용

### 성능과 안정성을 모두 잡는 방법

```tsx
// 🎯 Best Practice
function OptimizedComponent({ data }) {
  const { id, name, status } = data;
  
  const expensiveConfig = useMemo(() => ({
    // 복잡한 계산이나 변환
    processedData: processData(data),
    settings: getSettings(id)
  }), [id, name, status]); // primitive dependencies
  
  useEffect(() => {
    updateComponent(expensiveConfig);
  }, [expensiveConfig]);
  
  return <Text>{name}</Text>;
}
```

---

## ❓ Q&A

**Q: 항상 primitive만 사용해야 하나요?**  
A: 대부분의 경우 그렇습니다. 객체가 꼭 필요하다면 useMemo를 활용하세요.

**Q: 성능상 차이가 얼마나 날까요?**  
A: 작은 컴포넌트에서는 미미하지만, 복잡한 앱에서는 상당한 차이가 납니다.

**Q: 기존 코드를 어떻게 리팩토링할까요?**  
A: ESLint 규칙을 켜서 경고를 확인하고, 점진적으로 개선하세요.

<br>

## 🔧 React.memo - 컴포넌트 메모이제이션

**React.memo는 Hook은 아니지만 Hook과 함께 사용하는 중요한 최적화 도구입니다.**

### React.memo란?
- 고차 컴포넌트(HOC)로 컴포넌트를 감싸서 메모이제이션 제공
- props가 변경되지 않으면 재렌더링을 건너뜀
- 함수형 컴포넌트의 `PureComponent` 역할

### 사용법
```tsx
// 기본 사용법
const MyComponent = React.memo(function MyComponent({ name }) {
  return <Text>Hello {name}</Text>;
});

// 화살표 함수와 함께
const MyComponent = React.memo(({ name }) => {
  return <Text>Hello {name}</Text>;
});

// 커스텀 비교 함수 사용
const MyComponent = React.memo(({ name, age }) => {
  return <Text>Hello {name}, {age}</Text>;
}, (prevProps, nextProps) => {
  // true를 반환하면 재렌더링 건너뜀
  return prevProps.name === nextProps.name && prevProps.age === nextProps.age;
});
```

### Hook과의 조합 패턴
```tsx
import React, { useState, useCallback, useMemo } from 'react';

// 자식 컴포넌트를 memo로 최적화
const ExpensiveChild = React.memo(({ data, onUpdate }) => {
  console.log('ExpensiveChild 렌더링');
  
  return (
    <View>
      {data.map(item => (
        <TouchableOpacity key={item.id} onPress={() => onUpdate(item.id)}>
          <Text>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
});

// 부모 컴포넌트에서 useCallback과 useMemo 활용
function ParentComponent() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' }
  ]);

  // useCallback으로 함수 메모이제이션
  const handleUpdate = useCallback((id) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, updated: true } : item
    ));
  }, []);

  // useMemo로 데이터 메모이제이션
  const expensiveData = useMemo(() => {
    return items.filter(item => item.name.includes('Item'));
  }, [items]);

  return (
    <View>
      <TouchableOpacity onPress={() => setCount(count + 1)}>
        <Text>Count: {count}</Text>
      </TouchableOpacity>
      
      {/* memo + useCallback + useMemo 조합으로 최적화 */}
      <ExpensiveChild 
        data={expensiveData} 
        onUpdate={handleUpdate} 
      />
    </View>
  );
}
```

### 언제 사용해야 할까?

**사용하면 좋은 경우:**
- 렌더링 비용이 높은 컴포넌트
- 자주 렌더링되지만 props가 자주 변하지 않는 컴포넌트
- 리스트의 아이템 컴포넌트
- 복잡한 계산을 포함하는 컴포넌트

**사용하지 않는 것이 좋은 경우:**
- props가 자주 변하는 컴포넌트
- 렌더링 비용이 낮은 간단한 컴포넌트
- 항상 다른 props를 받는 컴포넌트

### React Native에서의 활용
```javascript
// 리스트 아이템 최적화
const ChatMessage = React.memo(({ message, user, timestamp }) => {
  return (
    <View style={styles.messageContainer}>
      <Text style={styles.username}>{user.name}</Text>
      <Text>{message}</Text>
      <Text style={styles.timestamp}>{timestamp}</Text>
    </View>
  );
});

// FlatList와 함께 사용
function ChatScreen() {
  const [messages, setMessages] = useState([]);

  const renderMessage = useCallback(({ item }) => (
    <ChatMessage 
      message={item.text}
      user={item.user}
      timestamp={item.timestamp}
    />
  ), []);

  return (
    <FlatList
      data={messages}
      renderItem={renderMessage}
      keyExtractor={(item) => item.id}
    />
  );
}
```

### 주의사항
1. **과도한 사용 금지**: 모든 컴포넌트에 memo를 적용할 필요 없음
2. **참조 동등성**: 객체나 함수 props는 useCallback, useMemo와 함께 사용
3. **측정 후 적용**: 성능 문제가 실제로 있을 때만 적용
4. **얕은 비교**: 기본적으로 얕은 비교만 수행 (필요시 커스텀 비교 함수 사용)

## 실제 프로젝트에서의 비교

### 개발 시간
- 클래스 컴포넌트: 평균 30% 더 많은 코드 작성 시간
- 함수 컴포넌트 + Hook: 간결하고 빠른 개발

### 유지보수성
- Hook 기반: 로직별로 코드 분리 가능
- 버그 발생률 감소
- 코드 리뷰 효율성 증대

### 성능
- 번들 크기: 평균 15-20% 감소
- 런타임 성능: 미미한 개선 (상황에 따라 다름)
- 개발 도구 지원 향상
