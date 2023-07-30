import { ActionReducerMap } from "@ngrx/store";

import * as fromShopppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';

export interface AppState {
    shoppingList: fromShopppingList.State;
    auth: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    shoppingList: fromShopppingList.shoppingListReducer,
    auth: fromAuth.authReducer
}