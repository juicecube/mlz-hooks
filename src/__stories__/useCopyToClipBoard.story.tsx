import { storiesOf } from '@storybook/react';
import React, { useState } from 'react';
import { useCopyToClipBoard } from '../index';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [ text, setText ] = useState('');
  const [ state, copyToClipboard] = useCopyToClipBoard({
    callback: (isSuccess) => {
      window.alert(`${isSuccess ? '复制成功' : '复制失败'}`);
    },
  });

  return (
    <div>
      <input
        value={text}
        type="text"
        onChange={(e) => setText(e.target.value)} />
      <button onClick={() => copyToClipboard(text) }>点击复制</button>
      {state.error ? (
        <p>复制失败：{state.error.message}</p>
      ) : (
        state.value && (
          <>
            <p>{`当前复制的值是：${state.isSuccess ? state.value : '复制失败'}`}</p>
            <input
              type="text"
              placeholder="粘贴到这里"/>
          </>
        )
      )}
    </div>
  );
};


storiesOf('Dom|useCopyToClipBoard', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useCopyToClipBoard.md')} />)
  .add('Demo', () => <Demo />);
