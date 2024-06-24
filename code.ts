// Function to generate a random date
function getRandomDate(): string {
  const date = new Date(2009, 10, 10);

  const month = date.toLocaleString('en-US', { month: 'long' });
  console.log(`Month: ${month}`) 
  // expected: November
  // actual: 11/10/2009, 00:00:00 AM

  return `${month}`;
}

async function updateSelectedTextFields() {
  const selection = figma.currentPage.selection;

  if (selection.length === 0) {
    figma.notify("Please select a text field.");
    return;
  }

  const randomDate = getRandomDate();

  // Load fonts for all selected text nodes
  const fontPromises = selection.map(async (node) => {
    if (node.type === "TEXT") {
      await figma.loadFontAsync(node.fontName as FontName);
      node.characters = randomDate;
    }
  });

  // Wait for all font loading promises to resolve
  await Promise.all(fontPromises);

  figma.notify("Updated selected text fields with random dates.");
  figma.closePlugin();
}

updateSelectedTextFields();