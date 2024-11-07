# `react-schema-markup`

`react-schema-markup` is a simple and flexible Node package that allows React developers to easily generate structured data for Google Search and other search engines. It provides React components for various schema types, helping you to enrich your website with structured data and enhance your presence in search results, including rich results like carousels, product listings, and more.

This package aims to streamline the integration of [Google's Structured Data](https://developers.google.com/search/docs/appearance/structured-data) into your React app with pre-built React components that generate valid JSON-LD markup.

---

## Features

- **Easy to Use**: Integrates seamlessly with React, with no extra setup or boilerplate.
- **Supports Multiple Schema Types**: Provides components for various types of structured data (e.g., `Product`, `Breadcrumb`, `FAQ`, etc.).
- **SEO-Optimized**: Helps improve your website's visibility in search engines with structured data, enabling rich snippets, carousels, and more.
- **Fully Customizable**: You can customize the schema data for your specific needs while using the components.
- **Small & Lightweight**: The package is optimized for performance with minimal dependencies.
- **Automatic Breadcrumbs**: Using the <RichBreadCrumbs/> will automatically generate breadcrumb schema data for your website.




---

## Installation

You can install `react-schema-markup` via npm or yarn:

### Using npm:
```bash
npm install react-schema-markup
```

---

## Supported Schema Types

Here are some of the schema types that react-schema-markup currently supports:

- [Breadcrumbs](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)
- [Dataset](https://developers.google.com/search/docs/appearance/structured-data/dataset)
- [Events](https://developers.google.com/search/docs/appearance/structured-data/event)
- [Faqs](https://developers.google.com/search/docs/appearance/structured-data/faqpage)
- [Organization](https://developers.google.com/search/docs/appearance/structured-data/organization)
- [Photo](https://developers.google.com/search/docs/appearance/structured-data/image-license-metadata)
- [Product](https://developers.google.com/search/docs/appearance/structured-data/product)

The below are clientside only:
- Breadcrumbs
- Photos

You can easily integrate any of these schema types into your React components by importing the respective components from react-schema-markup.

There are more to come!

## Usage
Each component in react-schema-markup accepts props that are used to populate the structured data in JSON-LD format. Below is an example of `RichBreadCrumbs`. For more examples and usages please see the tests folder.

### SSR
Each component takes a Wrapper component ```ScriptWrap``` this is to allow to pass in custom scrip tags:

```tsx
import Script from 'next/script'
import RichBreadCrumbs from 'react-schema-markup/dist/RichBreadCrumbs'
...

<RichBreadCrumbs ScriptWrap={Script} />
```

`RichBreadCrumbs` **Component**

The Breadcrumbs component generates structured breadcrumb data for a website.
```tsx
import RichBreadCrumbs from 'react-schema-markup/dist/RichBreadCrumbs'
...

<RichBreadCrumbs/>
```

Given this url: https://www.example.com/tester/big/spender

This will produce:
```json
{
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.example.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Tester",
          "item": "https://www.example.com/tester"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Big",
          "item": "https://www.example.com/tester/big"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Spender",
          "item": "https://www.example.com/tester/big/spender"
        }
      ]
    }
```
Given this url which has a locale of en: https://www.example.com/en/tester

This will produce:
```json
{
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.example.com/en"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Tester",
          "item": "https://www.example.com/en/tester"
        }
      ]
    }
```
Props:
- `supportedLocales` (string[]): Optional parameter, to take into consideration locales.
- `includeTrailingSlash` (boolean): By default this is false.

If your url is like: https://www.example.com/subdirectory/cat

and you expect it to return:
```json
{
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.example.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Cat",
          "item": "https://www.example.com/subdirectory/cat"
        }
      ]
    }
```
Then this isn't for you and you're not invited to my birthday party, sort your directories out.

## Contributing
I welcome contributions to improve this project! If you’d like to contribute:

Fork the repository.
1. Clone your fork and create a new branch for your feature or bugfix.
2. Install dependencies and make your changes.
3. Write tests for new features and ensure all tests pass and that the test data is not in the least bit professional.
4. Open a pull request with a clear description of your changes.


