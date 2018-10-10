import { Action } from '@ngrx/store';
import { Product } from '../product';

// creating action types step 1
export enum ProductActionTypes {
    ToggleProductCode = '[PRODUCT] toggle product code',
    SetCurrentProduct = '[PRODUCT] set current product',
    ClearCurrentProduct = '[PRODUCT] clear current product',
    InitializeCurrentProduct = '[PRODUCT] intialize current product',
    Load = '[PRODUCT] load product',
    LoadSuccess = '[PRODUCT] loaded successfully',
    LoadFail = '[PRODUCT] loading product failed'
}

// creating action creater step 2
export class ToggleProductCode implements Action {
    readonly type = ProductActionTypes.ToggleProductCode;
    constructor(public payload: boolean) {}
}

export class SetCurrentProduct implements Action {
    readonly type = ProductActionTypes.SetCurrentProduct;
    constructor (public payload: Product) {}
}

export class ClearCurrentProduct implements Action {
    readonly type = ProductActionTypes.ClearCurrentProduct;
}

export class InitializeCurrentProduct implements Action {
    readonly type = ProductActionTypes.InitializeCurrentProduct;
}

export class Load implements Action {
    readonly type = ProductActionTypes.Load;
}

export class LoadSuccess implements Action {
    readonly type = ProductActionTypes.LoadSuccess;
    constructor(public payload: Product[]) {}
}

export class LoadFail implements Action {
    readonly type = ProductActionTypes.LoadFail;
    constructor(public payload: string) {}
}
// creating union type for the action creators step 3
// | pipe(OR) character used to union type
export type ProductActions =  ToggleProductCode
                            | SetCurrentProduct
                            | ClearCurrentProduct
                            | InitializeCurrentProduct
                            | Load
                            | LoadSuccess
                            | LoadFail;
