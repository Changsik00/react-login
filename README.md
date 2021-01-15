### Create App With Antd

[https://ant.design/docs/react/use-with-create-react-app](https://ant.design/docs/react/use-with-create-react-app)

```
npx create-react-app  react-login
cd react-login
yarn add antd
yarn add @craco/craco
yarn add craco-less
```

add craco.config.js file

### State Management

[Recoil](https://recoiljs.org/docs/introduction/installation)

```
yarn add recoil
```

[어느블로거 Recoil 레시피](https://taegon.kim/archives/10125)

### Api Test site

[reqres](https://reqres.in/)



### Loading Atom 의 기능 변화 
### chapter1 > 기본 UI
>App > loading, login 컴포넌트가 있음\
app 전역에서 loading component를 recoil 을 통해서 제어\
atom state만 사용함

### chapter2 > Selector 적용
>Feature-Envy, DRY 가 발생하는 부분을 추상화 하기 위해서 Selector를 사용함\
get > state 사용 및 subscribe\
set > 원하는 state update 및 re-reder

### chpater3 > timeout(debounce 효과)으로 loading 강제 종료
>race condition으로 atom에 count에서 교착상태가 일어 날경우를 대비해서\
showLoading 이후 5초 지나면 강제로 hideLoading 되도록 reset 기능 추가

### chapter4 > fetchWithLoading으로 showLoading(), hideLoading() 숨기기
   