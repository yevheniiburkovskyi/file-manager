const parseInput = (input) => {
  const clearInput = input.trim();
  const command = clearInput.split(' ')[0].trim();
  const args = clearInput
    .split(' ')
    .slice(1)
    .map((item) => item.trim())
    .filter((item) => item);
  return { command, args };
};

export default parseInput;
