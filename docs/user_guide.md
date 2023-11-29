# User guide

## Roles

There are only three roles:

- Guest: unauthenticated user.
- User: authenticated user.
- Admin: authenticated user with admin privileges.

> **NOTICE**: there is only one "admin" and it's the account of the first registered user.

## Upload a torrent

The torrent description supports markdown syntax. You can use it to add links, images, etc.

> **NOTICE** Only PNG images are supported at the moment.

You can add a PNG image with:

```text
![alternative description for the image](https://raw.githubusercontent.com/torrust/torrust-index-gui/develop/docs/media/torrust_logo.png)
```

The image will be proxied by the backend. This means that the image will be downloaded by the backend and served by the backend itself. The backend will cache the image but
you have to make sure that the image is available at the URL you provided.

## Categories

Torrents can have only one category. You have to assign a category to your torrent when you upload it.

If the "admin" deletes the category sued by a torrent, the torrent category will be set to `null`.

## Tags

Torrents can have multiple tags. You can assign tags to your torrent when you upload it. Tags are created by the "admin" and users can only choose from the existing tags.

If the "admin" deletes a tag, the tag will be removed from all the torrents that use it.
