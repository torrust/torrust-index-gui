import Layout from "@/components/Layout";
import TorrentDetail from "@/views/Torrent";
import CategoryOverview from "@/views/CategoryOverview";
import TorrentUpload from "@/views/TorrentUpload";
import VueRouter from "vue-router";
import Torrents from "@/views/Torrents";

const routes = [
    {
        path: '/',
        redirect: {
            name: 'TorrentList'
        }
    },
    {
        path: '/',
        component:
        Layout,
        children: [
            {
                path: 'categories',
                name: 'CategoryOverview',
                component: CategoryOverview
            },
            {
                path: 'torrent/:torrentId',
                name: 'TorrentDetail',
                component: TorrentDetail
            },
            {
                path: 'torrents/:sorting?',
                name: 'TorrentList',
                component: Torrents,
            },
            {
                path: 'upload',
                name: 'TorrentUpload',
                component: TorrentUpload
            },
        ]
    }
];

const router = new VueRouter({
    mode: 'history',
    routes
});

export default router