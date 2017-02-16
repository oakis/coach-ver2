import * as types from './actionTypes';
import {rootUrl,getHeaders} from './ajaxConfig';

export function addPlayerSuccess(players) {
  return {
    type: types.ADD_PLAYER_SUCCESS,
    players
  };
}

export function removePlayerSuccess(playerID) {
  return {
    type: types.REMOVE_PLAYER_SUCCESS,
    playerID
  };
}

export function addPlayer(player) {
  const url = `${rootUrl}/api/players/add`;
  return async (dispatch,getState) => {
    const headers = await getHeaders();
    // dispatch(beginAjaxCall());
    try {
      const response = await fetch(url,{
        method: 'POST',
        headers,
        body: JSON.stringify(player)
      });
      const json = await response.json();
      if (json.success) {
        await dispatch(addPlayerSuccess(json.players));
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

export function deletePlayer(playerID) {
  const url = `${rootUrl}/api/players/${playerID}`;
  return async (dispatch,getState) => {
    const headers = await getHeaders();
    // dispatch(beginAjaxCall());
    try {
      const response = await fetch(url,{
        method: 'DELETE',
        headers
      });
      const json = await response.json();
      if (json.success) {
        await dispatch(removePlayerSuccess(playerID));
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
