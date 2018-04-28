# react-qparams

One of the hardest parts of working with a SPA is keeping the applications internal state in sync with the URL bar. 
Conceptually, React follows this formula:

`f(state) := view`

But for SPA's it's closer to:

`f(state, url) := view`

However, it's difficult to keep the URL bar in sync with your internal state. There ends up being a lot of calls to `history.push` 
and `withRouter` in order to get the history instance. That is, at the core, what this module is for. 

## Installation

```sh
$ yarn add react-qparams query-string@5
```

Additionally, you need `react`, `react-dom`, `prop-types`, and `react-router-dom`, but you probably already have those. 

## Usage

```js
import QueryParams from "react-qparams";

function RenderView(props) {
  return (
    <QueryParams>
      {query => (
        <button onClick={() => query.setQuery({ tab: "other" })}>
          {query.tab || "default"}
        </button>
      )}
    </QueryParams>
  );
}
```

## Props

### `children` or `render`

A [render prop](https://reactjs.org/docs/render-props.html). Both `children` and `render` receive the same arguments:

* An object with all the query params in the url bar, along with
* A `setQuery` function that mutates the URL bar, and takes an object like `setState`


