import Utility from "./utility";

const URIBuilder = {

    build: (requestURI, options, searchOptions ) => {

        let uri = `${requestURI}?`

        if(options){
            if(options.itemsPerPage){
                const size = options.itemsPerPage
                uri = uri + `size=${size}&`
            }

            if (options.sortBy && options.sortBy.length > 0){
                const field = Utility.camelToSnake(options.sortBy[0])
                const direction = options.sortDesc[0] ? 'desc' : 'asc';

                uri = uri + `sort=${field}&direction=${direction}&`
            }

            if (options.page){
                uri = uri + `page=${options.page}&`
            }
        }

        if (searchOptions && searchOptions.searchFor && searchOptions.searchIn){
            if(searchOptions.searchFor.trim() !== '' && searchOptions.searchIn.trim() !== ''){
                uri = uri + `search=${encodeURIComponent(searchOptions.searchFor)}&on=${searchOptions.searchIn}&`;
            }
        }else if (searchOptions && searchOptions.searchFor){
            if(searchOptions.searchFor.trim() !== ''){
                uri = uri + `search=${encodeURIComponent(searchOptions.searchFor)}`;
            }
        }

        return uri;
    }

}

export default URIBuilder;