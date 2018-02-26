import * as React from 'react';

import { formatUnixtime } from '../../utils/utils';

export const Column = ({val}) => val;

export const DatetimeColumn = ({val}: {val: number}) => formatUnixtime(val);
