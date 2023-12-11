# `kg-type` Web Component

<!-- BEGIN mktoc -->

- [What's this?](#whats-this)
- [Usage](#usage)
  - [Minimal example](#minimal-example)
  - [Options](#options)
  - [Complete example](#complete-example)
  - [Custom CSS](#custom-css)
- [Contributing](#contributing)
  - [Where to start?](#where-to-start)
  - [Tooling](#tooling)
- [License](#license)
<!-- END mktoc -->

## What's this?
[⬆️ Back to Top](#table-of-contents)

A pure JavaScript Web Component to write-out text letter by letter, and optionally remove it letter-by-letter. It's quite customizable and comes with sensible defaults.

## Usage

### Minimal example
```html
<kg-type words="Hello"></kg-type>
```

### Options

|Option|Default|Description|
|------|-------|-----------|
|`seperator`|`,`| Seperator to split provided words list at. |
|`cursor`|`_`| The curors behind letters, set to empty string to remove. |
|`words`| | A list of words to write out, seperated by the seperator (as defined above, or `,` by default) |
|`clear-interval`|`2000`| Time in milliseconds (ms) after which the word is cleared |
|`type-interval`|`150`| Time in milliseconds (ms) at which letters are written |
|`shuffle`|`false`| Set to `true` if words should be shuffled once before writing begins. |
|`delete-reverse`|`false`| Set to `true` to remove word letter by letter after writing |

Only `words` is required as all other values have defaults.

### Complete example

```html
Languages I like: <kg-type seperatpr="," cursor="|" words="Rust, JavaScript, Python, Go" clear-interval="3000" type-interval="100" shuffle="true" delete-reverse="true"></kg-type>
```

### Custom CSS

The component adapts the styles of its surrounding but three distinct values can be set using CSS custom properties:

```css
.custom-style {
    --kg-type-display: inline-block;
    --kg-type-color: #000;
    --kg-type-fontsize: 1rem;
}
```

## Contributing
[⬆️ Back to Top](#table-of-contents)

We love and welcome every form of contribution.

### Where to start?

Here are some good places to start:

* Issues with label [Good first issue](https://github.com/kevingimbel/kg-type/labels/good%20first%20issue)
* Issues with label [Documentation](https://github.com/kevingimbel/kg-type/labels/documentation)
* Providing example implementations or usage demos

### Tooling

- [mktoc](https://github.com/KevinGimbel/mktoc) is used for table of content generation in the README.md
- With `npm run dev` a static file server using the [nodejs http-server package](https://www.npmjs.com/package/http-server) is started, this is optional

## License
[⬆️ Back to Top](#table-of-contents)

MIT, see LICENSE file.