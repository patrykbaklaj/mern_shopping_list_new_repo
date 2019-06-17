import axios from "axios";
import {
    GET_ITEMS,
    ADD_ITEM,
    DELETE_ITEM,
    ITEMS_LOADING
} from "../actions/types";

export const getItems = () => async dispatch => {
    dispatch(setItemsLoading());
    const response = await axios.get("/api/items");

    dispatch({
        type: GET_ITEMS,
        payload: response.data
    });
};

export const deleteItem = id => async dispatch => {
    await axios.delete(`/api/items/${id}`);
    dispatch({
        type: DELETE_ITEM,
        payload: id
    });
};

export const addItem = newItem => async dispatch => {
    const response = await axios.post("/api/items", newItem);

    dispatch({
        type: ADD_ITEM,
        payload: response.data
    });
};

export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    };
};
