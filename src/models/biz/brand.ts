import model from '../baseModel';
import { brandApi } from '../../services/biz';

const brand = model('biz/brand', brandApi); 

export default brand;