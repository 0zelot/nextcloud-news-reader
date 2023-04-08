import { local } from "chrome-storage-promises";

export default async () => {

    const options = (await local.get("options")).options;

    try {

        const folders = (await (await fetch(`${options.auth.url}/index.php/apps/news/api/v1-2/folders`, {
            headers: {
                "Authorization": `Basic ${options.auth.key}`
            }
        })).json()).folders;

        const feeds = (await (await fetch(`${options.auth.url}/index.php/apps/news/api/v1-2/feeds`, {
            headers: {
                "Authorization": `Basic ${options.auth.key}`
            }
        })).json()).feeds;

        for(const feed of feeds) {

            if(!feed.folderId) continue;

            const folder = folders.find(folder => folder.id == feed.folderId);
            if(!folder) continue;

            folder.feeds.push(feed.id);

        }

        const updated = Date.now();

        const formatted = {
            updated,
            data: {
                "/": []
            }
        }

        const list = (await (await fetch(`${options.auth.url}/index.php/apps/news/api/v1-2/items?type=3&batchSize=${options.settings ? options.settings?.batchSize : 6000}`, {
            headers: {
                "Authorization": `Basic ${options.auth.key}`
            }
        })).json()).items;

        for(const item of list) {

            formatted.data["/"].push(item);

            if(!formatted.data[`/FEED-${item.feedId}`]) formatted.data[`/FEED-${item.feedId}`] = [];
            formatted.data[`/FEED-${item.feedId}`].push(item);

            for(const folder of folders) {
                
                if(!folder.feeds.includes(item.feedId)) continue;

                if(!formatted.data[`/FOLDER-${folder.id}`]) formatted.data[`/FOLDER-${folder.id}`] = [];
                formatted.data[`/FOLDER-${folder.id}`].push(item);

            }

        }

        await local.set({items: formatted});

    } catch(err) {
        console.error(err);
        return err;
    }

}