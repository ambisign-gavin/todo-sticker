// @flow
import type { TodoActions } from './todo';
import type { FilterActions } from './filter';
import type { SortActions } from './sort';

export type Actions =
    | TodoActions
    | FilterActions
    | SortActions;
