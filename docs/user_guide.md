# User guide

## Roles

There are only three roles:

- `Guest`: unauthenticated user.
- `User`: authenticated user.
- `Admin`: authenticated user with admin privileges.

> **NOTICE**: there is only one "admin" and it's the account of the first registered user.

## Upload a torrent

The torrent description supports markdown syntax. You can use it to add links, images, etc.

> **NOTICE** Only PNG images are supported at the moment.

You can add a PNG image with:

```text
![alternative description for the image](https://raw.githubusercontent.com/torrust/torrust-index-gui/develop/docs/media/torrust_logo.png)
```

The image will be proxied by the backend. This means that the image will be downloaded by the backend and served by the backend itself. The backend will cache the image but you have to make sure that the image is available at the URL you provided.

### Canonical Infohash Group

We only support standard fields in the torrent info dictionary.

```rust
pub struct TorrentInfoDictionary {
    pub name: String,
    pub pieces: Option<ByteBuf>,
    pub piece_length: i64,
    pub md5sum: Option<String>,
    pub length: Option<i64>,
    pub files: Option<Vec<TorrentFile>>,
    pub private: Option<u8>,
    pub path: Option<Vec<String>>,
    pub root_hash: Option<String>,
    pub source: Option<String>,
}
```

Check the data structure [TorrentInfoDictionary](https://github.com/torrust/torrust-index/blob/develop/src/models/torrent_file.rs) for an updated version of the supported fields.

We allow uploading torrents with other custom fields, however those extra fields are removed from the torrent `info` dictionary. That causes the infohash to change. We call the "Canonical Infohash" the resulting infohash after removing the non-standard fields from the `info` dictionary.

You can use the original infohash in URLs to navigate to the torrent details and you also have a list of original infohashes belonging to the same infohash group in the torrent details.

If you think there is an important field missing in the `info` dictionary, please open an issue.

## Categories

Torrents can have only one category. You have to assign a category to your torrent when you upload it.

If the "admin" deletes the category used by a torrent, the torrent category will be set to `null`.

## Tags

Torrents can have multiple tags. You can assign tags to your torrent when you upload it. Tags are created by the "admin" and users can only choose from the existing tags.

If the "admin" deletes a tag, the tag will be removed from all the torrents that use it.

## Notes

- The application does not support [BitTorrent Version 2][BEP_52].

[BEP_52]: https://www.bittorrent.org/beps/bep_0052.html
