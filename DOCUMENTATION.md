# react-with-dimension

[src/with-dimension.js:3-3](https://github.com/team-magneto/react-with-dimensions/blob/afe9694a30a9445ea9b22a0ced3125edba567219/src/with-dimension.js#L3-L3 "Source code on GitHub")

# withDimension

[src/with-dimension.js:16-79](https://github.com/team-magneto/react-with-dimensions/blob/afe9694a30a9445ea9b22a0ced3125edba567219/src/with-dimension.js#L16-L79 "Source code on GitHub")

Debounced React high order component to expose container width and height.

**Parameters**

-   `$0` **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)**  (optional, default `{}`)
    -   `$0.transform` **\[[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)](default (width, height) => ({ containerWidth: width, containerHeight: height }))** data transformation function, receives (width, height)
    -   `$0.containerStyle` **\[[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)](default {
            width: '100%',
            height: '100%',
            padding: 0,
            border: 0,
          })** style object to be added in wrapper container
    -   `$0.getHeight` **\[[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)](default (elem) => elem.getBoundingClientRect().height)** receives (element) and returns it's height
    -   `$0.getWidth` **\[[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)](default (elem) => elem.getBoundingClientRect().width)** receives (element) and returns it's width
    -   `$0.wait` **\[[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)](default 200)** event listening debounce wait time in milliseconds
