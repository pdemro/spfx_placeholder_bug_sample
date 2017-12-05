## spfx_placeholder_bug_sample
This is a sample project which demonstrates the "see all" bug: https://github.com/SharePoint/sp-dev-docs/issues/1042

To reproduce -

1. Deploy the extension to the CDN & App Catalog
2. Deploy the extension to a modern communication site
3. Click the "see all" link from the out-of-box events web part

This bug also occures with the out-of-box news web part when more than 4 articles are added.  The extension remains missing when using the back button

## prototype

This is where you include your WebPart documentation.

?loadSPFX=true&debugManifestsFile=https://localhost:4321/temp/manifests.js&customActions={"87410d6e-ecea-436f-885b-57ed3e284e46":{"location":"ClientSideExtension.ApplicationCustomizer","properties":{"testMessage":"Hello as property!"}}}

### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.

### Build options

gulp clean - TODO
gulp test - TODO
gulp serve - TODO
gulp bundle - TODO
gulp package-solution - TODO
