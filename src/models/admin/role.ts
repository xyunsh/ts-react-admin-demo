import model from '../baseModel';
import { roleApi } from '@services/admin';
import { ADMIN_ROLE } from './index';

export default model(ADMIN_ROLE, roleApi); 
