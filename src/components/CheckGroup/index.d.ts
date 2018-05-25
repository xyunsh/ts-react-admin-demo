import * as React from 'react';
export interface ICheckGroupProps {
  dataApi?: string;
  params?: object;
  options?: Array[object];
  transformer?:(object) => object;
  style?: React.CSSProperties;
}

export default class CheckGroup extends React.Component<ICheckGroupProps, any> {}
