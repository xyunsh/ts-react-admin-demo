import model from '../baseModel';
import { privilegeApi } from '@services/admin';
import { ADMIN_PRIVILEGE } from './index';

export default model(ADMIN_PRIVILEGE, privilegeApi); 
