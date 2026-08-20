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

- [Article / BlogPosting](https://developers.google.com/search/docs/appearance/structured-data/article)
- [Breadcrumbs](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)
- [Claim Review (fact check)](https://developers.google.com/search/docs/appearance/structured-data/factcheck)
- [Course](https://developers.google.com/search/docs/appearance/structured-data/course)
- [Dataset](https://developers.google.com/search/docs/appearance/structured-data/dataset)
- [Discussion Forum](https://developers.google.com/search/docs/appearance/structured-data/discussion-forum)
- [Events](https://developers.google.com/search/docs/appearance/structured-data/event)
- [Faqs](https://developers.google.com/search/docs/appearance/structured-data/faqpage)
- [Job Posting](https://developers.google.com/search/docs/appearance/structured-data/job-posting)
- [Learning Resource / Practice Problems](https://developers.google.com/search/docs/appearance/structured-data/practice-problems)
- [LocalBusiness](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- [Movie](https://schema.org/Movie)
- [Organization](https://developers.google.com/search/docs/appearance/structured-data/organization)
- [Photo](https://developers.google.com/search/docs/appearance/structured-data/image-license-metadata)
- [Product](https://developers.google.com/search/docs/appearance/structured-data/product)
- [Profile Page](https://developers.google.com/search/docs/appearance/structured-data/profile-page)
- [Recipe](https://developers.google.com/search/docs/appearance/structured-data/recipe)
- [Review / Rating](https://developers.google.com/search/docs/appearance/structured-data/review-snippet)
- [Software App](https://developers.google.com/search/docs/appearance/structured-data/software-app)
- [Speakable](https://developers.google.com/search/docs/appearance/structured-data/speakable)
- [Vehicle Listing](https://developers.google.com/search/docs/appearance/structured-data/vehicle-listing)
- [Video](https://developers.google.com/search/docs/appearance/structured-data/video)
- [WebSite (sitelinks search box)](https://developers.google.com/search/docs/appearance/structured-data/sitelinks-searchbox)

The below are clientside only:
- Breadcrumbs
- Photos

You can easily integrate any of these schema types into your React components by importing the respective components from react-schema-markup.

There are more to come!

## Usage
Each component in react-schema-markup accepts props that are used to populate the structured data in JSON-LD format.

Below is an example of `RichBreadCrumbs`.

For more examples and usages please see the tests folder.

### SSR
Each component takes a Wrapper component ```ScriptWrap``` this is to allow to pass in custom scrip tags:

```tsx
import Script from 'next/script'
import { RichBreadCrumbs } from 'react-schema-markup'
...

<RichBreadCrumbs ScriptWrap={Script} />
```

`RichBreadCrumbs` **Component**

The Breadcrumbs component generates structured breadcrumb data for a website.
```tsx
import { RichBreadCrumbs } from 'react-schema-markup'
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

`RichArticle` **Component**

Generates structured data for an article or blog post.
```tsx
import { RichArticle } from 'react-schema-markup'
...

<RichArticle
  article={{
    headline: "Cliff Divers Report Surprisingly Good Water Pressure",
    description: "An investigation into the caves beneath Lakewood.",
    image: "https://casabonita.com/news/cliff-divers.jpg",
    authorName: "Chip McElroy",
    publisherName: "Casa Bonita Gazette",
    publisherLogo: "https://casabonita.com/logo.png",
    datePublished: "2026-01-05",
    url: "https://casabonita.com/news/cliff-divers",
  }}
/>
```
Props:
- `article.articleType` (`"Article" | "BlogPosting" | "NewsArticle"`): Optional, defaults to `"Article"`.
- `article.dateModified`: Optional, defaults to `article.datePublished`.

`RichReview` **Component**

Generates structured data for a single review and its rating.
```tsx
import { RichReview } from 'react-schema-markup'
...

<RichReview
  review={{
    itemReviewedName: "Casa Bonita",
    itemReviewedType: "LocalBusiness",
    authorName: "Chip McElroy",
    reviewBody: "The cliff divers alone are worth the trip.",
    ratingValue: 4,
  }}
/>
```
Props:
- `review.itemReviewedType`: Optional, defaults to `"Product"`.
- `review.bestRating` / `review.worstRating`: Optional, default to `5` and `1`.

`RichLocalBusiness` **Component**

Generates structured data for a physical business location.
```tsx
import { RichLocalBusiness } from 'react-schema-markup'
...

<RichLocalBusiness
  business={{
    name: "Casa Bonita",
    businessType: "FoodEstablishment",
    url: "https://casabonita.com",
    telephone: "+1-303-555-0100",
    priceRange: "$$",
    address: {
      streetAddress: "6715 W Colfax Ave",
      addressLocality: "Lakewood",
      addressRegion: "CO",
      postalCode: "80214",
      addressCountry: "US",
    },
    geo: { latitude: 39.7413, longitude: -105.0827 },
    openingHours: ["Mo-Su 11:00-21:00"],
  }}
/>
```
Props:
- `business.businessType`: Optional, defaults to `"LocalBusiness"` — set it to any [schema.org LocalBusiness subtype](https://schema.org/LocalBusiness) (e.g. `"Restaurant"`, `"Store"`) for a more specific rich result.

`RichWebSite` **Component**

Generates structured data that enables Google's sitelinks search box.
```tsx
import { RichWebSite } from 'react-schema-markup'
...

<RichWebSite
  website={{
    name: "Casa Bonita",
    url: "https://casabonita.com",
    searchUrlTemplate: "https://casabonita.com/search?q={search_term_string}",
  }}
/>
```
Props:
- `website.searchUrlTemplate`: Optional. When omitted, no `SearchAction` is included — pass it as a template containing `{search_term_string}` to enable the search box.

`RichRecipe` **Component**
```tsx
import { RichRecipe } from 'react-schema-markup'
...

<RichRecipe
  recipe={{
    name: "Casa Bonita Sopapillas",
    image: "https://casabonita.com/sopapillas.jpg",
    authorName: "Chip McElroy",
    recipeIngredient: ["2 cups flour", "1 tbsp honey"],
    recipeInstructions: ["Mix the dough.", "Fry until golden."],
  }}
/>
```

`RichVideo` **Component**
```tsx
import { RichVideo } from 'react-schema-markup'
...

<RichVideo
  video={{
    name: "Cliff Diving 101",
    thumbnailUrl: "https://casabonita.com/thumb.jpg",
    uploadDate: "2026-01-01",
  }}
/>
```

`RichJobPosting` **Component**
```tsx
import { RichJobPosting } from 'react-schema-markup'
...

<RichJobPosting
  job={{
    title: "Cliff Diver",
    description: "Must be unafraid of faux caves.",
    datePosted: "2026-01-01",
    hiringOrganizationName: "Casa Bonita",
    jobLocation: { addressLocality: "Lakewood", addressCountry: "US" },
  }}
/>
```
Set `job.remote` to `true` instead of `jobLocation` for telecommute roles.

`RichSoftwareApplication` **Component**
```tsx
import { RichSoftwareApplication } from 'react-schema-markup'
...

<RichSoftwareApplication
  app={{
    name: "Casa Bonita Cliff Diver Tracker",
    operatingSystem: "iOS",
    applicationCategory: "LifestyleApplication",
    ratingValue: 4.2,
    ratingCount: 850,
  }}
/>
```

`RichCourse` **Component**
```tsx
import { RichCourse } from 'react-schema-markup'
...

<RichCourse
  course={{
    name: "Intro to Cliff Diving",
    description: "Learn the basics of faux-cave cliff diving.",
    providerName: "Casa Bonita University",
  }}
/>
```

`RichClaimReview` **Component**
```tsx
import { RichClaimReview } from 'react-schema-markup'
...

<RichClaimReview
  claimReview={{
    url: "https://casabonita.com/fact-check/cliff-divers",
    claimReviewed: "Casa Bonita's cliff divers use a real cliff.",
    authorName: "Casa Bonita Fact Check",
    ratingValue: 2,
    alternateName: "Mostly False",
  }}
/>
```

`RichVehicle` **Component**
```tsx
import { RichVehicle } from 'react-schema-markup'
...

<RichVehicle
  vehicle={{
    name: "2023 Sopapilla Wagon",
    brand: "CasaMotors",
    model: "Sopapilla Wagon",
    price: "18999.00",
    currency: "USD",
    url: "https://casabonita.com/vehicles/sopapilla-wagon",
  }}
/>
```

`RichProfilePage` **Component**
```tsx
import { RichProfilePage } from 'react-schema-markup'
...

<RichProfilePage
  profile={{
    url: "https://casabonita.com/profiles/chip",
    personName: "Chip McElroy",
    interactionCount: 4200,
  }}
/>
```

`RichDiscussionForumPosting` **Component**
```tsx
import { RichDiscussionForumPosting } from 'react-schema-markup'
...

<RichDiscussionForumPosting
  posting={{
    url: "https://casabonita.com/forum/posts/1",
    text: "Best table for cliff-diving views?",
    authorName: "Chip McElroy",
    datePublished: "2026-01-20",
    upvoteCount: 42,
  }}
/>
```

`RichLearningResource` **Component**
```tsx
import { RichLearningResource } from 'react-schema-markup'
...

<RichLearningResource
  resource={{
    name: "Cliff Diving Safety Handout",
    url: "https://casabonita.com/learn/safety",
    educationalLevel: "Beginner",
  }}
/>
```
Set `resource.resourceType` to `"Quiz"` for practice-problem style content, defaults to `"LearningResource"`.

`RichSpeakable` **Component**
```tsx
import { RichSpeakable } from 'react-schema-markup'
...

<RichSpeakable
  speakable={{
    url: "https://casabonita.com/news/cliff-divers",
    cssSelectors: [".headline", ".summary"],
  }}
/>
```

`RichMovie` **Component**
```tsx
import { RichMovie } from 'react-schema-markup'
...

<RichMovie
  movie={{
    name: "Casa Bonita: The Motion Picture",
    directorName: "Chip McElroy",
    ratingValue: 3.8,
    ratingCount: 500,
  }}
/>
```

## Contributing
I welcome contributions to improve this project! If you’d like to contribute:

Fork the repository.
1. Clone your fork and create a new branch for your feature or bugfix.
2. Install dependencies and make your changes.
3. Write tests for new features and ensure all tests pass and that the test data is not in the least bit professional.
4. Open a pull request with a clear description of your changes.


