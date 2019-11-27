import Http from '../utils/HTTP';
import _ from 'lodash';

import {
    SET_LIB,
    SET_FILTER,
    SET_PAGING_DATA,
    SET_SEARCH_WORD,
    SET_SCROLLY,
    SET_SCROLL_DIRECTION,
    SET_FILTER_SHOW,
    SET_FILTER_LIST,
    SET_FILTER_LIST_WITH_COUNT
} from './mutations.type';

const state = {
    // 바뀌는 데이터
    variableData: {
        category: [],
        creativeType: [],
        searchWord: '',
    },
    // 기본 세팅 데이터
    initData: {
        searchField: 'ALL',
        listSize: 5,
        status: 'Y',
    },
    // 라이브러리 데이터
    libList: [],

    // 페이징 데이터
    pagingData: {
        last: null,
        first: null,
        empty: null,
        number: 0,
    },
    checkScrollY: 0,
    checkScrollDirection: '',

    filterListNoCount: {
        category: [],
        creativeType: []
    },
    filterListWithCount: {
        category: [],
        creativeType: []
    },

    // Filter
    isFilterShow: false,
};

const getters = {
    libList: state => state.libList,
    variableData: state => state.variableData,
    pagingData: state => state.pagingData,
    checkScrollY: state => state.checkScrollY,
    checkScrollDirection: state => state.checkScrollDirection,
    isFilterShow: state => state.isFilterShow,
    filterListNoCount: state => state.filterListNoCount,
    filterListWithCount: state => state.filterListWithCount
};

const actions = {
    async fetchFilterList(context) {
        const getFilterList = (param) => {
            return Http.get(`/code/${param}`)
        };
        let creativeType = await getFilterList('T');
        let category = await getFilterList('C');

        let result = {
            category: category.data,
            creativeType: creativeType.data
        };
        context.commit(SET_FILTER_LIST, result);
    },
    async fetchFilterListWithCount(context) {
        const getFilterList = (param) => {
            return Http.get(`/code/count/${param}`)
        };
        let creativeType = await getFilterList('T');
        let category = await getFilterList('C');

        let result = {
            category: category.data,
            creativeType: creativeType.data
        };
        context.commit(SET_FILTER_LIST_WITH_COUNT, result);
    },

    /*fetchType(context, type) {
        return new Promise(resolve => {
            Http.get(`/code/${type}`)
                .then(({data}) => {
                    context.commit(SET_FILTER_LIST_CATEGORY, data);
                    resolve(data);
                })
                .catch(({response}) => {
                    console.log(response);
                });
        });
    },
    fetchTypeCount(context, type) {
        return new Promise(resolve => {
            Http.get(`/code/count/${type}`)
                .then(({data}) => {
                    context.commit(SET_FILTER_LIST_CREATIVETYPE, data);
                    resolve(data);
                })
                .catch(({response}) => {
                    console.log(response);
                });
        });
    },*/

    fetchLib(context, isFirst = false) {
        // 필수값
        let listSize = `?listSize=${state.initData.listSize}`;
        let page = isFirst ? `&page=0` : `&page=${state.pagingData.number + 1}`;
        let status = `&status=${state.initData.status}`;
        let searchWord = !_.isEmpty(state.variableData.searchWord)
            ? `&searchField=${state.initData.searchField}&keyword=${encodeURIComponent(state.variableData.searchWord)}`
            : ``;
        let category = function () {
            let str = '';
            if (!_.isEmpty(state.variableData.category)) {
                _.forEach(state.variableData.category, function (item) {
                    str += `&category=${item}`;
                });
            }
            return str;
        };
        let creativeType = function () {
            let str = '';
            if (!_.isEmpty(state.variableData.creativeType)) {
                _.forEach(state.variableData.creativeType, function (item) {
                    str += `&contentType=${item}`;
                });
            }
            return str;
        };

        let query = `${listSize}${page}${status}${searchWord}${category()}${creativeType()}`;
        return new Promise(resolve => {
            Http.get(`/board/user/list/${query}`)
                .then(res => {
                    let libContent = isFirst ? res.data.content : _.concat(state.libList, res.data.content)
                    let libPagingData = _.pick(res.data, [
                        'first',
                        'last',
                        'empty',
                        'number',
                    ]);
                    context.commit(SET_LIB, libContent);
                    context.commit(SET_PAGING_DATA, libPagingData);
                    resolve(res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        });
    },
    setFilter(context, payload) {
        context.commit(SET_FILTER, payload);
    },
    setSearchWord(context, payload) {
        context.commit(SET_SEARCH_WORD, payload);
    },
    setScrollY(context, direction) {
        context.commit(SET_SCROLLY, window.scrollY);
        context.commit(SET_SCROLL_DIRECTION, direction);
    },
    setFilterShow(context, payload) {
        context.commit(SET_FILTER_SHOW, payload);
    },
};
const mutations = {
    [SET_LIB](state, library) {
        state.libList = library;
    },
    [SET_FILTER](state, payload) {
        state.variableData = _.assign(state.variableData, payload);
    },
    [SET_PAGING_DATA](state, payload) {
        state.pagingData = _.assign(state.pagingData, payload);
    },
    [SET_SEARCH_WORD](state, payload) {
        state.variableData.searchWord = payload;
    },
    [SET_SCROLLY](state, payload) {
        state.checkScrollY = payload;
    },
    [SET_SCROLL_DIRECTION](state, payload) {
        state.checkScrollDirection = payload;
    },
    [SET_FILTER_SHOW](state, payload) {
        state.isFilterShow = payload;
    },
    [SET_FILTER_LIST](state, payload) {
        state.filterListNoCount = payload;
    },
    [SET_FILTER_LIST_WITH_COUNT](state, payload) {
        state.filterListWithCount = payload;
    }

};

export default {
    state,
    getters,
    actions,
    mutations,
};
