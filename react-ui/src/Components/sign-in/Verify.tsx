import { Button, Form, Input, InputNumber } from "antd"
import React, { useState, useRef } from 'react';
import type { InputNumberProps } from "antd";

const Verify: React.FC = () => {
  // return (
  //   sessionStorage.getItem("verified") === "True" ?

  // );
  const [inputValueSix, setInputValueSix] = useState<number | null>(null);
  const inputRef1 = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);
  const inputRef3 = useRef<HTMLInputElement>(null);
  const inputRef4 = useRef<HTMLInputElement>(null);
  const inputRef5 = useRef<HTMLInputElement>(null);
  const inputRef6 = useRef<HTMLInputElement>(null);
  
  return (
    <>
      <InputNumber autoFocus={true} controls={false} max={9} min={0} onChange={()=>{inputRef1.current!.focus()}}></InputNumber>
      <InputNumber ref={inputRef1} controls={false} max={9} min={0} onChange={()=>{inputRef2.current!.focus()}}></InputNumber>
      <InputNumber ref={inputRef2} controls={false} max={9} min={0} onChange={()=>{inputRef3.current!.focus()}}></InputNumber>
      <InputNumber ref={inputRef3} controls={false} max={9} min={0} onChange={()=>{inputRef4.current!.focus()}}></InputNumber>
      <InputNumber ref={inputRef4} controls={false} max={9} min={0} onChange={()=>{inputRef5.current!.focus()}}></InputNumber>
      <InputNumber value={inputValueSix} ref={inputRef5} controls={false} max={9} min={0} onChange={()=>{console.log('inOnChange');setInputValueSix(2)}}></InputNumber>
      <Button ref={inputRef6} type="primary" htmlType="submit">Submit</Button>
    </>
  )
}

export default Verify
