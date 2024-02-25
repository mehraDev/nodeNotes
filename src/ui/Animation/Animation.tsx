import React, { useEffect, useState } from 'react';

export enum AnimationName {
  slideInOut = 'slideInOut',
}

interface IAnimated {
  children: React.ReactNode;
  name: AnimationName;
  visible: boolean
}

const Animation: React.FC<IAnimated> = ({ children, name, visible }) => {

  switch (name) {
    case AnimationName.slideInOut:
      return <SlideInOutAnimation start={visible} end={!visible} >
                {children}
        </SlideInOutAnimation>;

    default:
      return <>{children}</>;
  }
};

const SlideInOutAnimation: React.FC<{ children: React.ReactNode,start:boolean,end:boolean,duration?:number }> = ({ children,start,end,duration = 500 }) => {
    const [translate, setTranslate] = useState('-100%');
    console.log(translate)
    useEffect(() => {
        if(start){
           setTimeout(()=>{
            setTranslate('0')
           },duration)
        }
        if(end){
            setTimeout(()=>{
                setTranslate('-100%')
            },duration)
        }
       }, [duration, end, start]);

    return <>{children}</>;
};

export default Animation;
