const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE = 'page=';
const DEFAULT_HPP = '4';
const SEARCH_BASE = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}`;

export {
    DEFAULT_QUERY,
    PARAM_PAGE,
    DEFAULT_HPP,
    SEARCH_BASE
}
