import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer, PlaceholderContent, PlaceholderName
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'HelloWorldApplicationCustomizerStrings';

const LOG_SOURCE: string = 'HelloWorldApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IHelloWorldApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class HelloWorldApplicationCustomizer
  extends BaseApplicationCustomizer<IHelloWorldApplicationCustomizerProperties> {

  private _topPlaceholderLegacy: PlaceholderContent | undefined;
  private _bottomPlaceholder: PlaceholderContent | undefined;

  @override
  public onInit(): Promise<void> {
    console.log('HelloWorldApplicationCustomizer._renderPlaceHolders()');
    console.log('Available placeholders: ',
      this.context.placeholderProvider.placeholderNames.map(name => PlaceholderName[name]).join(', '));

    this.context.application.navigatedEvent.add(this, this.renderTop)
    //this.context.placeholderProvider.changedEvent.add(this, this.renderTop);
    //this.context.application._layoutChangedEvent.add(this, this.renderTop);
    //this.renderTop();

    return Promise.resolve();
  }

  //Thank you Waldek! https://github.com/SharePoint/sp-dev-docs/issues/1042#issuecomment-352686900
  private renderTop() {
    // Handling the top placeholder
    const topPlaceholder =
      this.context.placeholderProvider.tryCreateContent(
        PlaceholderName.Top,
        { onDispose: this._onDispose });

    // The extension should not assume that the expected placeholder is available.
    if (!topPlaceholder) {
      console.error('The expected placeholder (Top) was not found.');
      return;
    }

    if (topPlaceholder.domElement) {
      topPlaceholder.domElement.innerHTML = `Hello World spfx1.4 1.0.0.2`
    }
  }

  // This example comes from the online example which may be flawed https://github.com/SharePoint/sp-dev-docs/blob/master/docs/spfx/extensions/get-started/using-page-placeholder-with-extensions.md
  private renderTopLegacy() {
    // Handling the top placeholder
    if (!this._topPlaceholderLegacy) {
      this._topPlaceholderLegacy =
        this.context.placeholderProvider.tryCreateContent(
          PlaceholderName.Top,
          { onDispose: this._onDispose });

      // The extension should not assume that the expected placeholder is available.
      if (!this._topPlaceholderLegacy) {
        console.error('The expected placeholder (Top) was not found.');
        return;
      }

      if (this._topPlaceholderLegacy.domElement) {
        this._topPlaceholderLegacy.domElement.innerHTML = `Hello World spfx1.4 1.0.0.0`
      }

    }
  }


  private _onDispose(): void {
    console.log('[HelloWorldApplicationCustomizer._onDispose] Disposed custom top and bottom placeholders.');
  }
}
