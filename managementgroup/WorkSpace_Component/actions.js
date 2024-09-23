import { createAction } from 'redux-actions';
import * as Actions from './constants';
export const editorUpdatesAction = createAction(Actions.EDITOR_UPDATES);
export const propertiesUpdatesAction = createAction(Actions.EDITOR_PROPERTIES);
export const workspaceCreateAction = createAction(Actions.CREATE_WORKSPACE);