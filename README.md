# react-grid-layout-builder [Demo](http://damienleroux.github.io/react-grid-layout-builder/demo/index.html)

React-grid-layout-builder offers a React user interface to interact with the [react-grid-layout](https://github.com/STRML/react-grid-layout) configuration. 
Be careful:
* React-grid-layout-builder doesn't add additional features to existing React-grid-layout. Read more about [React-grid-layout features](https://github.com/STRML/react-grid-layout#features) if required.
* React-grid-layout-builder works only on [responsive react-grid-layout](https://github.com/STRML/react-grid-layout#responsive-usage). Any help on other React-grid-layout component is welcome :)

## Motivation

[React-grid-layout](https://github.com/STRML/react-grid-layout) is fun. I wanted to play with it without coding the configuration. So I tried to make a user-friendly editor. Happy to share it now :)

## Demos

1. [only one demo for now]((http://damienleroux.github.io/react-grid-layout-builder/demo/index.html)

![reactgridlayoutbuilderdemo](https://cloud.githubusercontent.com/assets/12717418/15196785/5ab09438-17ce-11e6-87dd-11bfc90c7526.gif)


## Installation

### To try it locally:

 - clone this repository
 - go into the cloned folder
 - cmd `npm i`
 - cmd `npm run start`
 - open url [http://localhost:3100/](http://localhost:3100/)

### To install as dependency:

Install the React-Grid-Layout-builder [package](https://www.npmjs.com/package/react-grid-layout-builder) package using [npm](https://www.npmjs.com/):

```bash
npm install react-grid-layout-builder
```

Include the following stylesheets in your application:

```
/node_modules/react-grid-layout-builder/css/styles.css
/node_modules/react-grid-layout/css/styles.css
/node_modules/react-resizable/css/styles.css

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="stylesheets/font-awesome/css/font-awesome.min.css">
```

This builder editor is graphically powered by [Bootstrap](http://getbootstrap.com/getting-started/)

Include the following stylesheets in your application:

```
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
```
Or create your own editor on the model given in [src/bootstrapEditor](https://github.com/damienleroux/react-grid-layout-builder/blob/master/src/bootstrapEditor.js). You'll be able to add fields or remove others
In that case, you'll have to wrap it with `connectReactGridLayoutBuilderToEditor`. Example:

```javascript

//YourOwnBuilderEditor is a copy of src/bootstrapEditor with your own style and your own fields
var ReactGridLayoutBuilder = connectReactGridLayoutBuilderToEditor(YourOwnBuilderEditor);
export default ReactGridLayoutBuilder;
```


This opening dock icon is graphically powered by [Bootstrap](http://fontawesome.io/)

Include the following stylesheets in your application if you use it:

```
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css">
```
Or put the editor anywhere else on your app.

## Features

React-grid-layout-builder is to use on the [responsive react-grid-layout](https://github.com/STRML/react-grid-layout#responsive-usage) only and can be used to:

* track any changes when playing with React-grid-layout
* edit number of columns on the fly
* edit breakpoints pixel value on the fly
* edit the height defined as basic row
* set all the grid as static

## Usage

All questions about the grid generation and the possible configurable options are presents on [react-grid-layout repository](https://github.com/STRML/react-grid-layout). I trust you know how to use react-grid-layout and will explain now how React-Grid-Layout-builder works. React-Grid-Layout-builder is used as a wrapper on an existing React-Grid-Layout component. To demonstrate how to us the builder, I'll try it on the [responsive react-grid-layout example](https://github.com/STRML/react-grid-layout#providing-grid-width)

To have the builder work with the [responsive react-grid-layout example](https://github.com/STRML/react-grid-layout#providing-grid-width), we must:

* import the connect function `connectReactGridLayoutBuilder` to track any change in the `react-grid-layout` component
* import the builder `ReactGridLayoutBuilder` to offer additional field to modify the react-grid-layout configuration
* put the react-grid-layout configuration into a state to be able to modify it from a callback
* sent the callback that modify the react-grid-layout configuration to both `connectReactGridLayoutBuilder` and `ReactGridLayoutBuilder`

### An example:

```javascript
import {Responsive, WidthProvider} from 'react-grid-layout';
import ReactGridLayoutBuilder, {connectReactGridLayoutBuilder} from 'react-grid-layout-builder';

//the responsive react-grid-layout is wrapped to be connected to the builder functions
const ResponsiveReactGridLayout = connectReactGridLayoutBuilder(WidthProvider(Responsive)); 

...
constructor() {
  super();
  //the grid layout is put on the state
  this.state.gridLayout = 
    layouts: getLayoutsFromSomewhere(),
    breakpoints: {lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0},
    cols: {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}
  }
}

//any update from the grid layout or from the builder will update the component state to update both ReactGridLayoutBuilder & ResponsiveReactGridLayout data
updateConfig = (newGridLayout) => {
  this.setState({gridLayout: newGridLayout});
}
  
//An additional props updateConfigFunc must be provided to ResponsiveReactGridLayout to be able to track relevant changes when playing with the grid layout component it-self
//The usual react grid layout configuration, put in the component state, is sent to the grid layout component.
render() {
  return (
    <div>
      <ReactGridLayoutBuilder reactGridLayout={this.props.conf} updateConfigFunc={this.props.updateConfig}/>
      <ResponsiveReactGridLayout className="layout" 
        {...this.state.gridLayout}
        updateConfigFunc={this.props.updateConfig}>
        <div key={"1"}>1</div>
        <div key={"2"}>2</div>
        <div key={"3"}>3</div>
      </ResponsiveReactGridLayout>
    </div>
  )
}
...
```

### API:

#### ReactGridLayoutBuilder
`<ReactGridLayoutBuilder/>` is a react component that renders fields to edit some of the [react-grid-layout possible props](https://github.com/STRML/react-grid-layout#grid-layout-props).

This component uses [Bootstrap](http://getbootstrap.com/getting-started/) & [React-Bootstrap](https://react-bootstrap.github.io/) for rendering the fields

The builder can be used to set:

```javascript
// If true, the container height swells and contracts to fit contents
autoSize: ?boolean = true,

// {name: pxVal}, e.g. {lg: 1200, md: 996, sm: 768, xs: 480}
// Breakpoint names are arbitrary but must match in the cols and layouts objects.
breakpoints: ?Object = {lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0},

// # of cols. This is a breakpoint -> cols map, e.g. {lg: 12, md: 10, ...}
cols: ?Object = {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2},

// If true, the layout will compact vertically
verticalCompact: ?boolean = true,

// Margin between items [x, y] in px.
margin: ?[number, number] = [10, 10],

// Rows have a static height, but you can change this based on breakpoints
// if you like.
rowHeight: ?number = 150,

//
// Flags
//
isDraggable: ?boolean = true,
isResizable: ?boolean = true,
```


#### connectReactGridLayoutBuilder

`connectReactGridLayoutBuilder` is a high order component wrapping the responsive react-grid-layout component to trigger a callback `updateConfig` when the layout is changed there. the callback has as parameter the [react-grid-layout possible props](https://github.com/STRML/react-grid-layout#grid-layout-props). 

```javascript
import {Responsive, WidthProvider} from 'react-grid-layout';
import {connectReactGridLayoutBuilder} from 'react-grid-layout-builder';

//the responsive react-grid-layout is wrapped to be connected to the builder functions
const ResponsiveReactGridLayout = connectReactGridLayoutBuilder(WidthProvider(Responsive)); 

...
constructor() {
  super();
  //the grid layout is put on the state
  this.state.gridLayout = 
    layouts: getLayoutsFromSomewhere(),
    breakpoints: {lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0},
    cols: {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}
  }
}

//any update from the grid layout or from the builder will update the component state to update both ReactGridLayoutBuilder & ResponsiveReactGridLayout data
updateConfig = (newGridLayout) => {
  this.setState({gridLayout: newGridLayout});
}
  
//An additional props updateConfigFunc must be provided to ResponsiveReactGridLayout to be able to track relevant changes when playing with the grid layout component it-self
//The usual react grid layout configuration, put in the component state, is sent to the grid layout component.
render() {
  return (
    <div>
      <ResponsiveReactGridLayout className="layout" 
        {...this.state.gridLayout}
        updateConfigFunc={this.props.updateConfig}>
        <div key={"1"}>1</div>
        <div key={"2"}>2</div>
        <div key={"3"}>3</div>
      </ResponsiveReactGridLayout>
    </div>
  )
}
...
```

#### withOpeningDock

`withOpeningDock` is a high order component used to have a react component displayed only if the user choose it. This is a simple UI component and you can choose to not use it if you want.

If you want to use it, wrap `ReactGridLayoutBuilder` with it:

```javascript
import ReactGridLayoutBuilder, {withOpeningDock} from '../../src';
const ReactGridLayoutBuilder = connectReactGridLayoutBuilder(WidthProvider(Responsive)); 
var DockedReactGridLayoutBuilder = withOpeningDock(ReactGridLayoutBuilder);

...
render() {
  return (
    <div>
      <DockedReactGridLayoutBuilder reactGridLayout={this.props.conf} updateConfigFunc={this.props.updateConfig}/>
      <ResponsiveReactGridLayout className="layout" 
        {...this.state.gridLayout}
        updateConfigFunc={this.props.updateConfig}>
        <div key={"1"}>1</div>
        <div key={"2"}>2</div>
        <div key={"3"}>3</div>
      </ResponsiveReactGridLayout>
    </div>
  )
}
...
```

## TODO List

- [ ] Get feedbacks and improve
- [ ] Transform the generated layout as static
- [ ] Choose which item is static or not
- [ ] Choose which item is displayed or not
- [ ] Provide an editor for not-responsive grid layout
- [ ] Provide an editor based on material UI
- [ ] Save or load a custom layout