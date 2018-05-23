import { isNumber } from 'lodash';
import * as moment from 'moment';

import { formatUnixtime } from '@utils/utils';

export const Column = ({val} : { val: any} ) => val || '';

export const DatetimeColumn = ({val}: {val: number|Date}) => {
    return val ? isNumber(val) ? formatUnixtime(val) : moment(val).format('YYYY-MM-DD HH:mm:ss') : '-';
}
