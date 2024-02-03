import path from "path";
import fsp from "fs/promises";

export const showContentTable = async (currentPath) => {
  const content = await fsp.readdir(currentPath);

  const tableData = await Promise.all(
    content.map(async (item) => {
      const itemPath = path.join(currentPath, item);

      const itemStats = await fsp.stat(itemPath);

      const itemType = itemStats.isDirectory() ? "directory" : "file";

      return {
        Name: item,
        Type: itemType,
      };
    })
  );

  const sortedTableData = tableData
    .sort((item) =>
      item.Name.localeCompare(item.Name, undefined, { sensitivity: "base" })
    )
    .sort((item) => (item.Type === "file") - (item.Type === "directory"));

  console.table(sortedTableData);
};
