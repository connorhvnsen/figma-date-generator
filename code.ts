// Function to generate a random date
function getRandomDate(start: Date, end: Date): string {

  const startTime = start.getTime();
  const endTime = end.getTime();
  const randomTime = startTime + Math.random() * (endTime - startTime);

  const date = new Date(randomTime);
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const month = monthNames[date.getMonth()];

  return `${date.getDate()} ${month} ${date.getFullYear()}`;
}

async function updateSelectedTextFields() {
  const selection = figma.currentPage.selection;

  if (selection.length === 0) {
    figma.notify("Please select a text field.");
    return;
  }

  // TODO – add UI for config
  const startDate = new Date(2023, 0, 1); // January 1, 2023
  const endDate = new Date(); // Today
  
  // Load fonts for all selected text nodes
  const fontPromises = selection.map(async (node) => {
    if (node.type === "TEXT") {
      const randomDate = getRandomDate(startDate, endDate);
      await figma.loadFontAsync(node.fontName as FontName);
      node.characters = randomDate.toString();
    }
  });

  // Wait for all font loading promises to resolve
  await Promise.all(fontPromises);

  figma.notify("Updated selected text fields with random dates.");
  figma.closePlugin();
}

updateSelectedTextFields();