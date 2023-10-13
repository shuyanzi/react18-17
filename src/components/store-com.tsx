import React, { useState, useTransition } from 'react';
import { flushSync } from 'react-dom';
import LongList from '../long-list';
import MobxUpdate from '../mobx-update';
import AppLoading from '../loading';
import SAppLoading from '../s-loading';
import { Provider as MobxProvider } from "mobx-react";
import { RootStore } from "../store";

function StoreMain() {
  console.log('点 click me 之后，看我出现几次就知道渲染了几次。');
  const [count, setCount] = useState(0);
  const [msg, setMsg] = useState('hello');
  const [text, setText] = useState('');
  const [liLen, setLiLen] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [transitionText, setTransitionText] = useState('');
  const [tLen, setTLen] = useState(0);

  function handleClick() {
    console.log('点了');
    // setCount(c => c + 1);
    // setMsg('it\'s me');
    setTimeout(() => {
      setCount(c => c + 1);
      setMsg('it\'s me');
      setCount(c => c + 1);
      // flushSync(() => {
      //   setCount(c => c + 1);
      // });
      // flushSync(() => {
      //   setMsg('it\'s me');
      // }); 
    }, 1000);
  }
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
    setLiLen(e.currentTarget.value.length);
  }
  const handleTransitionChange = (e: React.FormEvent<HTMLInputElement>) => {
    setTransitionText(e.currentTarget.value);
    startTransition(() => {
      setTLen(e.currentTarget.value.length);
    });
  }

  return (
    <div>
      <MobxProvider {...RootStore}>
        <MobxUpdate />
        <AppLoading />
        <hr />
        <SAppLoading />
        <p>flag: {msg}</p>
        <p>count: {count}</p>
        <button onClick={handleClick}>click me</button>
        <br />
        no transition:
        <input type='text' value={text} onChange={handleChange} />
        <br />
        has transition:
        <input type='text' value={transitionText} onChange={handleTransitionChange} />
        <LongList liLen={liLen} />
        {isPending ? <h3>Loading</h3> : <LongList liLen={tLen} />}
      </MobxProvider>
    </div>
  );
}
export default StoreMain;
