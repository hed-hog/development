function centerTextInTerminal(text) {
  // Get the terminal width
  const terminalWidth = process.stdout.columns;

  // If the terminal width is less than the length of the text, adjust
  if (text.length > terminalWidth - 4) {
    text = text.slice(0, terminalWidth - 4); // Remove part of the text that exceeds
  }

  // Calculate the empty space needed to center
  const sideSpaces = Math.max(
    0,
    Math.floor((terminalWidth - text.length - 2) / 2),
  );

  // Generate the centered text with spaces
  const centeredText = ' '.repeat(sideSpaces) + text + ' '.repeat(sideSpaces);

  // Add borders to the text
  const topLine = '┌' + '─'.repeat(centeredText.length) + '┐';
  const bottomLine = '└' + '─'.repeat(centeredText.length) + '┘';

  // Display the "box" with the centered text
  console.log(topLine);
  console.log('│' + centeredText + '│');
  console.log(bottomLine);
}

const args = process.argv.slice(2);

centerTextInTerminal(args[0]);
