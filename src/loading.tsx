import { useEffect, useState } from 'react';

function stop(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('success');
    }, ms);
  });
}

function fetchSomething(url: string, callback: () => void) {
  if (url === '/api1') {
    stop(1000).then(() => {
      callback();
    });
  } else if (url === '/api2') {
    stop(2000).then(() => {
      callback();
    });
  }
}

function Loading() {
  return (
    <div>Loading...</div>
  );
}

function AppLoading() {
  return (
    <CompoentA />
  );
}

function CompoentA() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSomething('/api1', () => {
      // ...省略一些逻辑
      setLoading(false);
    });
  }, []);

  return (
    <>
      <div>我是组件A 的部分内容</div>
      {
        loading ? <Loading /> : <CompoentB />
      }
    </>
  );
}

function CompoentB() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSomething('/api2', () => {
      // ...省略一些逻辑
      setLoading(false);
    });
  }, []);

  return (
    <>
      <div>我是组件B 的部分内容</div>
      {
        loading ? <Loading /> : <div>我是组件B 异步加载的内容</div>
      }
    </>
  );
}

export default AppLoading;