import { Action } from '@ngrx/store';
import { Product } from '../product';

export enum ProductActionsTypes {
  ToggleProductCode = '[product] toggle product code',
  SetCurrentProduct = '[product] set current product',
  ClearCurrentProduct = '[product] clear current product',
  InitializeCurrentProduct = '[product] initialize current product',
  Load = '[product] Load',
  LoadSuccess = '[product] Load Success',
  LoadFail = '[product] Load Fail',
  UpdateProduct = '[product] update product',
  UpdateProductSuccess = '[product] update product success',
  UpdateProductFail = '[product] update product fail'
}

export class ToggleProductCode implements Action {
  readonly type = ProductActionsTypes.ToggleProductCode;
  constructor(public payload: boolean) {}
}

export class SetCurrentProduct implements Action {
  readonly type = ProductActionsTypes.SetCurrentProduct;
  constructor(public payload: Product) {}
}

export class ClearCurrentProduct implements Action {
  readonly type = ProductActionsTypes.ClearCurrentProduct;
}

export class InitializeCurrentProduct implements Action {
  readonly type = ProductActionsTypes.InitializeCurrentProduct;
}

export class Load implements Action {
  readonly type = ProductActionsTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = ProductActionsTypes.LoadSuccess;
  constructor(public payload: Product[]) {}
}

export class LoadFail implements Action {
  readonly type = ProductActionsTypes.LoadFail;
  constructor(public payload: string) {}
}

export class UpdateProduct implements Action {
  readonly type = ProductActionsTypes.UpdateProduct;
  constructor(public payload: Product) {}
}

export class UpdateProductSuccess implements Action {
  readonly type = ProductActionsTypes.UpdateProductSuccess;
  constructor(public payload: Product) {}
}

export class UpdateProductFail implements Action {
  readonly type = ProductActionsTypes.UpdateProductFail;
  constructor(public payload: string) {}
}

export type ProductActions =
  | ToggleProductCode
  | SetCurrentProduct
  | ClearCurrentProduct
  | InitializeCurrentProduct
  | Load
  | LoadSuccess
  | LoadFail
  | UpdateProduct
  | UpdateProductSuccess
  | UpdateProductFail;
