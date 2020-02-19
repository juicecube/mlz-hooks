import { storiesOf } from '@storybook/react';
import React, { useState } from 'react';
import { useEvent } from '../index';
import ShowDocs from './util/ShowDocs';

const Demo = () => {
  const [value, setValue] = useState(0);
  const [num, setNum] = useState(0);

  const handler = () => {
    console.log('click');
    setValue(value + 1);
  };

  const add = () => {
    console.log('add');
    setNum(num + 1);
  };

  // FIXME:
  useEvent('click', handler);
  useEvent('click', add, document.getElementById('btn'));

  return (
    <>
      <p>你任意点了{value}次啦</p>
      <p>你点了按钮{num}次啦</p>
      <button id="btn" >+++++++</button>
    </>
  );
};


storiesOf('Dom|useEvent', module)
  .add('Docs', () => <ShowDocs md={require('../../docs/useEvent.md')} />)
  .add('Demo', () => <Demo />);
