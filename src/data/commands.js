export const commands = {
  navigaton: {
    up: 'up',
    cd: 'cd',
    ls: 'ls',
  },
  file: {
    cat: 'cat',
    add: 'add',
    rn: 'rn',
    cp: 'cp',
    mv: 'mv',
    rm: 'rm',
  },
  osCommands: {
    name: 'os',
    flags: {
      EOL: '--EOL',
      cpus: '--cpus',
      homedir: '--homedir',
      username: '--username',
      architecture: '--architecture',
    },
  },
  hash: 'hash',
  compress: 'compress',
  decompress: 'decompress',
};

const commandsString = `
  Navigation:
  ${commands.navigaton.up} - Go upper from current directory (when you are in the root folder this operation shouldn't change working directory)
  ${commands.navigaton.cd} path_to_directory - Go to dedicated folder from current directory (path_to_directory can be relative or absolute)
  ${commands.navigaton.ls} - Print in console list of all files and folders in current directory
  Files operations:
  ${commands.file.cat} <path_to_file> - Read file and print it's content in console
  ${commands.file.add} <new_file_name> - Create empty file in current working directory
  ${commands.file.rn} <path_to_file> <new_filename> - Rename file
  ${commands.file.cp} <path_to_file> <path_to_new_directory> - Copy file
  ${commands.file.mv} <path_to_file> <path_to_new_directory> - Move file
  ${commands.file.rm} <path_to_file> - Delete file
  Operation system:
  ${commands.osCommands.name} ${commands.osCommands.flags.EOL} - Get EOL
  ${commands.osCommands.name} ${commands.osCommands.flags.cpus} - Get host machine CPUs info
  ${commands.osCommands.name} ${commands.osCommands.flags.homedir} - Get home directory
  ${commands.osCommands.name} ${commands.osCommands.flags.username} - Get current system user name
  ${commands.osCommands.name} ${commands.osCommands.flags.architecture} - Get CPU architecture
  Hash calculation:
  ${commands.hash} <path_to_file> - Calculate hash for file and print it into console
  Compress and decompress operations:
  ${commands.compress} <path_to_file> <path_to_destination> - Compress file
  ${commands.decompress} <path_to_file> <path_to_destination> - Decompress
`;

export default commands;
export { commandsString };
