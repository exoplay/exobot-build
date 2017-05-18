exobot-build
============

Tools for building exobot instances, plugins, and adapters

Installation
------------

* `npm install -g @exoplay/exobot-build`


Usage
-----

### Bot creation

`exobot new bot`

### Plugin bootstrapping

`exobot new plugin`

### Adapter bootstrapping

`exobot new adapter`

### Other commands

* `exobot build` builds an exobot instance where an `exobot.config.js` and
  `package.json` is located.
* `exobot watch` is `exobot build`, with a filesystem watcher to rebuild as
  source code changes.
* `exobot example` attempts to start up an example exobot from a folder
  containing source code for an adapter or plugin.
* `exobot run` builds and runs an exobot from an `exobot.config.js`.

Use `exobot --help` for more information.
