import * as types from './actionTypes';
import {rootUrl,getHeaders,saveToken} from './ajaxConfig';

export function addGameSuccess(games) {
  return {
    type: types.ADD_GAME_SUCCESS,
    games
  };
}

export function removeGameSuccess(gameID) {
  return {
    type: types.REMOVE_GAME_SUCCESS,
    gameID
  };
}

export function saveElevenSuccess(game) {
  return {
    type: types.SAVE_ELEVEN_SUCCESS,
    game
  };
}

export function updateStat(game) {
  return {
    type: types.UPDATE_STAT_SUCCESS,
    game
  };
}

export function addGame(game) {
  const url = `${rootUrl}/api/games`;
  return async (dispatch,getState) => {
    const headers = await getHeaders();
    // dispatch(beginAjaxCall());
    try {
      const response = await fetch(url,{
        method: 'POST',
        headers,
        body: JSON.stringify(game)
      });
      const json = await response.json();
      if (json.success) {
        await dispatch(addGameSuccess(json.games));
        return { success: json.success };
      } else {
        return { success: json.success, message: json.message };
      }
    }
    catch (e) {
      // dispatch(ajaxCallError)
      console.error(e);
    }
  };
}

export function saveEleven(game,eleven) {
  const url = `${rootUrl}/api/games/eleven`;
  return async (dispatch,getState) => {
    const headers = await getHeaders();
    // dispatch(beginAjaxCall());
    try {
      const response = await fetch(url,{
        method: 'PUT',
        headers,
        body: JSON.stringify({game,eleven})
      });
      const json = await response.json();
      if (json.success) {
        await dispatch(saveElevenSuccess(json.game));
        return { success: json.success };
      } else {
        return { success: json.success, message: json.message };
      }
    }
    catch (e) {
      // dispatch(ajaxCallError)
      console.error(e);
    }
  };
}

export function saveGameAsFinished(game) {
  const url = `${rootUrl}/api/games`;
  return async (dispatch,getState) => {
    const headers = await getHeaders();
    // dispatch(beginAjaxCall());
    try {
      const response = await fetch(url,{
        method: 'PUT',
        headers,
        body: JSON.stringify({game})
      });
      const json = await response.json();
      if (json.success) {
        await dispatch(updateStat(json.game));
        return { success: json.success };
      } else {
        return { success: json.success, message: json.message };
      }
    }
    catch (e) {
      // dispatch(ajaxCallError)
      console.error(e);
    }
  };
}

export function subPlayer(game,playerOut,playerIn,minute) {
  const url = `${rootUrl}/api/games/sub`;
  return async (dispatch,getState) => {
    const headers = await getHeaders();
    // dispatch(beginAjaxCall());
    try {
      const response = await fetch(url,{
        method: 'PUT',
        headers,
        body: JSON.stringify({game,playerOut,playerIn,minute})
      });
      const json = await response.json();
      if (json.success) {
        await dispatch(updateStat(json.game));
        return { success: json.success };
      } else {
        return { success: json.success, message: json.message };
      }
    }
    catch (e) {
      // dispatch(ajaxCallError)
      console.error(e);
    }
  };
}
