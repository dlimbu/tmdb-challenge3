import {Router} from "wpe-lightning-sdk";
import {getMovies, getSeries} from './api';

/**
 *  bind a data request to a specific route, before a page load
 *  the router will test for any data-binding. If there is, it will
 *  wait for the promise to resolve and load the correct page.
 *
 * @see docs: https://github.com/rdkcentral/Lightning-SDK/blob/feature/router/docs/plugins/router.md
 *
*/
export default () => {

    Router.boot(async()=> {
        // this will always be called
    });

    /**
     * @todo: inside this data-provider for the movies route
     * you must await for the getMovies() and invoke the data on the page
     */
    Router.before("movies", async ({page})=>{
        const movies = await getMovies();
        page.data = movies;
    }, 10 * 60 /* expires */);


    Router.before("series", async ({page})=>{
        const series = await getSeries();
        page.data = series;
    }, 10 * 60 /* expires */);

    /**
     * @todo:
     * add a data-provider for the new series route
     * and make sure you call grab the series from TMDBl
     * https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}
     */
}