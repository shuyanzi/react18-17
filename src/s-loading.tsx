import { Suspense } from 'react';

function stop(ms: number) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('success');
    }, ms);
  });
}

function promiseWrapper(promise: Promise<any>) {
  let status = 'pending';
  let result: any;
  return {
    read() {
      if (status === 'pending') {
        throw promise.then(
          res => {
            status = 'success';
            result = res;
          },
          err => {
            status = 'error';
            result = err;
          }
        );
      } else if (status === 'error') {
        throw result;
      } else if (status === 'success') {
        return result;
      }
    }
  };
}

function Loading() {
  return (
    <div>Loading...</div>
  );
}

function SAppLoading() {
  const resourceA = promiseWrapper(stop(1000));
  const resourceB = promiseWrapper(stop(2000));

  return (
    <>
      <Suspense fallback={<Loading />}>
        <CompoentA data={resourceA} />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <CompoentB data={resourceB} />
      </Suspense>
    </>
    // 下面是串行方式
    // <>
    //   <Suspense fallback={<Loading />}>
    //     <CompoentA data={resourceA} />
    //     <Suspense fallback={<Loading />}>
    //       <CompoentB data={resourceB} />
    //     </Suspense>
    //   </Suspense>
    // </>
  );
}


function CompoentA(props: any) {
  const result = props.data.read();
  if (result === 'success') {
    return (
      <>
        <div>我是组件A 的部分内容</div>
      </>
    );
  } else {
    return null;
  }
}

function CompoentB(props: any) {
  const result = props.data.read();
  if (result === 'success') {
    return (
      <>
        <div>我是组件B 的部分内容</div>
        <div>我是组件B 异步加载的内容</div>
      </>
    );
  } else {
    return (
      <>
        <div>我是组件B 的部分内容</div>
      </>
    );
  }
}

export default SAppLoading;