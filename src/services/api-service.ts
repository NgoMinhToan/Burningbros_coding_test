import request from 'umi-request';
import { GET_ITEM_LIST, SEARCH_ITEM_LIST } from './api-path';

export const getItemList = (params: DUMMY_JSON.TItemListParam) => {
    return request<DUMMY_JSON.TItemListResponse>(GET_ITEM_LIST, {
        params: params
    })
}
export const searchItemList = (params: DUMMY_JSON.TSearchParam) => {
    return request<DUMMY_JSON.TItemListResponse>(SEARCH_ITEM_LIST, {
        params: params
    })
}