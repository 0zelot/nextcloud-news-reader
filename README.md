# nextcloud-news-reader

Simple, unofficial Chrome extension for reading articles delivered by **Nextcloud News**. Created using **Vue3** and **TailwindCSS** compatible with **Manifest V3**.

This extension **is not** in Chrome Web Store because Google requires a verification fee to publish it there. This app was created primarily for personal use only.

### Installation

1. Make sure you have a properly installed [Nextcloud](https://nextcloud.com) with the [Nextcloud News](https://apps.nextcloud.com/apps/news) app.

2. Make sure you have Google Chrome or another **Chromium based browser** that supports Chrome extensions.

3. Download prepared extension [from here](https://github.com/0zelot/nextcloud-news-reader/releases/tag/latest) or build from source.

4. Unzip in a good, safe and **unchanging** location.

5. Run your Chromium based browser, go to **Settings -> Extensions**.

6. Enable **Developer mode** (slider in the upper right corner).

7. Click **Load unpacked** and select the folder location (see step 4).

8. Now your extension should be installed. You can open it's page and log in to your Nextcloud account on your Nextcloud instance.

After the first login, you have to manually sync data or wait a few minutes for the entries to be downloaded automatically from your server.

### Build from source

If for some reason you want to build this app on your own instead of using prepared version, follow this instruction.

1. Clone this repository.

2. Install all dependencies - `npm install`.

3. Run build script - `npm run build`.

A `dist` folder will be created in which the project will be built, ready to be imported in your Chromium based browser.

