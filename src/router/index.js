import Layout from "@/components/Layout";
import SearchResults from "@/views/SearchResults";
import TorrentDetail from "@/views/Torrent";
import CategoryOverview from "@/views/CategoryOverview";
import Popular from "@/views/Popular";
import Recent from "@/views/Recent";
import CategoryDetail from "@/views/TorrentList";
import TorrentUpload from "@/views/TorrentUpload";
import VueRouter from "vue-router";

const routes = [
    {path: '/', redirect: {name: 'Popular'}},
    {
        path: '/', component: Layout, children: [
            {
                path: 'search',
                name: 'SearchResults',
                component: SearchResults,
                props: (route) => ({ searchQuery: route.query.query }),
                children: [
                    {path: ':torrentId', name: 'TorrentDetail', component: TorrentDetail}
                ]
            },
            {
                path: 'categories',
                name: 'CategoryOverview',
                component: CategoryOverview
            },
            {
                path: 'categories/popular',
                name: 'Popular',
                component: Popular,
                children: [
                    {path: ':torrentId', name: 'TorrentDetail', component: TorrentDetail}
                ]
            },
            {
                path: 'categories/recent',
                name: 'Recent',
                component: Recent,
                children: [
                    {path: ':torrentId', name: 'TorrentDetail', component: TorrentDetail}
                ]
            },
            {
                path: 'torrents',
                name: 'CategoryDetail',
                component: CategoryDetail,
                children: [
                    {path: ':torrentId', name: 'TorrentDetail', component: TorrentDetail}
                ]
            },
            {path: 'upload', name: 'TorrentUpload', component: TorrentUpload},
        ]
    }
];

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router