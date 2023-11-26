'use client';
import { Button } from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import copy from '@/content/copy';
import { useState } from 'react';
import styles from './SignForm.module.scss';

function SignForm() {
  const [nickName, setNickName] = useState<string>('');

  return (
    <form className={styles.signForm}>
      <h1 className="text-2xl">Hey, {nickName ? <span className="text-yellow-600">{nickName}</span> : 'user'}!</h1>
      <div>
        <p>{copy.greeting.text1}</p>
        <p>
          {copy.greeting.text2}
          <span className="text-yellow-600"> :-)</span>
        </p>
      </div>
      <Input
        label="Create a nickname:"
        name="nickname"
        type="text"
        value={nickName}
        onChange={e => setNickName(e.target.value)}
      />
      <Input label="Create a password:" name="password" type="password" />
      <Button text="Let's chat" main />
    </form>
  );
}

export default SignForm;
