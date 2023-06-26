const getUsername = () => {
  const args = process.argv.slice(2);
  const username = args.join().split('=')[1];
  return username;
};

export default getUsername;
