import { Action } from '@ngrx/store';
import { Product } from '../product';

export enum ProductActionsTypes {
  ToggleProductCode = '[product] toggle product code',
  SetCurrentProduct = '[product] set current product',
  ClearCurrentProduct = '[product] clear current product',
  InitializeCurrentProduct = '[product] initialize current product',
  Load = '[product] Load',
  LoadSuccess = '[product] Load Success',
  LoadFail = '[product] Load Fail'
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

export type ProductActions =
  | ToggleProductCode
  | SetCurrentProduct
  | ClearCurrentProduct
  | InitializeCurrentProduct
  | Load
  | LoadSuccess
  | LoadFail;
