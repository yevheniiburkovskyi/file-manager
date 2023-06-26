import fsPromises from 'fs/promises';
import path from 'path';

const getDirectoryInfo = async (currentPathname) => {
  const list = await fsPromises.readdir(currentPathname);
  try {
    const listOfFiles = await Promise.all(
      list.map(async (item, i) => {
        const fileInfoObj = {};
        const filePath = path.join(currentPathname, item);
        const fileStat = await fsPromises.stat(filePath);
        fileInfoObj.name = item;
        fileInfoObj.type = fileStat.isDirectory() ? 'directory' : 'file';
        return fileInfoObj;
      })
    );

    const sortedListOfFiles = listOfFiles.sort((a, b) => {
      if (a.type === 'directory' && b.type !== 'directory') {
        return -1;
      } else if (a.type === 'directory' && b.type !== 'directory') {
        return 1;
      } else {
        return 0;
      }
    });
    console.table(sortedListOfFiles);
  } catch (error) {
    console.error(error);
  }
};

export default getDirectoryInfo;
