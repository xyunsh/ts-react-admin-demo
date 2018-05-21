import model from '../baseModel';
import { menuApi } from '@services/admin';
import { ADMIN_MENU } from './index';

export default model(ADMIN_MENU, menuApi); 
