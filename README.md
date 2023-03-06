# Refreshable Picture card #

<img src="https://github.com/dimagoltsman/refreshable-picture-card/raw/master/example1.png" height="400">

<img src="https://github.com/dimagoltsman/refreshable-picture-card/raw/master/example2.png" height="400">

```yaml
resources:
  - url: /hacsfiles/refreshable-picture-card/refreshable-picture-card.js
    type: module
```

Configuration is very easy, and can be done graphically.

You can set a picture from a URL or a picture from an entity attribute.

|        Name        |                        Description                        |             Required             |
| ------------------ | --------------------------------------------------------- | -------------------------------- |
| `title`            | Cart title                                                | no                               |
| `refresh_interval` | Time in seconds between refreshes. Defaults to 30 seconds | yes                              |
| `url`              | URL of the picture. Can be a local path.                  | mutually exclusive with `entity` |
| `entity`           | Picture entity                                            | mutually exclusive with `url`    |
| `attribute`        | Entity attribute                                          | no                               |
| `tap_action`       | Action on tap                                             | no                               |
| `noMargin`         | Whether to disable the margin around the picture.         | no                               |

Attribute picture example:

```yaml
type: 'custom:refreshable-picture-card'
title: My Mibox
refresh_interval: 3
entity: media_player.livingroom_mibox
attribute: entity_picture
```

url image example:

```yaml
type: 'custom:refreshable-picture-card'
title: My Mibox
refresh_interval: 3
url: /api/media_player_proxy/media_player.livingroom_mibox?token=11111111111111222222222233333333&cache=1589898123.724253
```

Reolink camera snap url example:

```yaml
type: 'custom:refreshable-picture-card'
title: Reolink Camera
refresh_interval: 1
url: http://192.168.1.174/cgi-bin/api.cgi?cmd=Snap&channel=0&rs=someString&user=username&password=password
```

Tap action example:

```yaml
type: 'custom:refreshable-picture-card'
title: Reolink Camera
refresh_interval: 1
url: http://192.168.1.174/cgi-bin/api.cgi?cmd=Snap&channel=0&rs=someString&user=username&password=password
tap_action:
  action: call-service
  service: remote.send_command
  data:
    entity_id: remote.living_room_remote
    command: b64:JgCgAJSSEg8QEBIPERAPMhEyDxERDxAxEDESLxAyEREPEREQEBAQlBARDxIQEBAREi8PMhEvEhAQMRExDzIREBARDhISDhAyEBEQEQ8REi8RAAdclJMRDxAREREPEREwEi8SEBARDzIQMhAwDzESEBARERAQEBKSEg8QEBAREREPMREyDjESDhIwETESLxEQEBEREBAQETAPERERERAQMRAADQUAAAAAAAAAAA==
```

no margin (full card picture) example:

```yaml
type: 'custom:refreshable-picture-card'
url: http://192.168.1.174/weatherForecast/weather.jpg
noMargin: true
```

navigate example (onclick, open url in new tab):

```yaml
type: 'custom:refreshable-picture-card'
title: Reolink Camera
refresh_interval: 1
url: http://192.168.1.174/cgi-bin/api.cgi?cmd=Snap&channel=0&rs=someString&user=username&password=password
tap_action:
  action: url
  url_path: https://github.com/dimagoltsman/refreshable-picture-card/
```

navigate_local example (onclick, change local/lovelace tab):

```yaml
type: 'custom:refreshable-picture-card'
title: Reolink Camera
refresh_interval: 1
url: http://192.168.1.174/cgi-bin/api.cgi?cmd=Snap&channel=0&rs=someString&user=username&password=password
tap_action:
  action: navigate
  navigation_path: camera
```

# you are also welcome to contribute #
