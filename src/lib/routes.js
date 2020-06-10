import {Router} from "wpe-lightning-sdk";

/**
 * @see docs: https://github.com/rdkcentral/Lightning-SDK/blob/feature/router/docs/plugins/router.md
 */

import {
     Main, Splash
} from '../pages';

export default () =>{

    // define where the browser should point to on boot
    Router.root('splash', Splash);
    // Add route for movies
    Router.route('movies', Main);
    /**
     * @todo:
     * uncomment this line
     * Router.route('home/series', Main);
     * or this:
     * Router.route('series', Main);
     *
     * how ever you wish to configure your route, you can attach the same
     * page to different routes, so it lets your re-use the instance (or destroy and lazy create)
     *
     * You also need to add the proper data-provider
     */
    
    Router.route('series', Main);

    Router.start();
}