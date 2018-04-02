# Changelog

## [Unreleased] (need to update branch gh-page when merged on "master")

## [2.0.0] - 04/02/2018

### Added

new version of this editor with Material-ui (thank to [@nywooz](https://github.com/nywooz) for contributing):

```javascript
import { MaterialUIReactGridLayoutBuilder } from 'react-grid-layout-builder';
```

Caveat: 

The material ui editor requires the bootstrap css for now for the grid layout. This will be fixed in future versions. (will required the latest version fo material-ui)


### Changed

#### default export removed

This package doesn't export the editor as default any more. The default export is replaced by two simple export. To migrate, replace 

```javascript
import ReactGridLayoutBuilder from 'react-grid-layout-builder';
```

with:

```javascript
import { BootstrapReactGridLayoutBuilder as ReactGridLayoutBuilder } from 'react-grid-layout-builder';
```

#### New Demo/dev Url for material-ui or bootstrap:

In dev mode, [http://localhost:3100/](http://localhost:3100/) is replaced by:

- [http://localhost:3100/bootstrap/index.html](http://localhost:3100/bootstrap/index.html) for bootstrap editor
- [http://localhost:3100/material-ui/index.html](http://localhost:3100/material-ui/index.html) for material-ui editor


## [1.0.0]

### Changed

- Update to `react` 16
- remove lib from git repo

