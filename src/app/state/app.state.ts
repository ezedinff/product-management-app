// remove b/c we break rule of lazy loading
// import { ProductState } from './../products/state/product.reducer';
import { UserState } from '../user/user.reducer';
export interface State {
    user: UserState;
}
