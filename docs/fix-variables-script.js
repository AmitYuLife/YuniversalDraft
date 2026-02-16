// Simple script to bind white text and purple backgrounds to correct variables
// Paste this in Figma: Plugins → Development → Open Console

(async () => {
  await figma.loadAllPagesAsync();
  
  console.log('Fixing variable bindings...\n');
  
  // Get variables
  const localVariables = await figma.variables.getLocalVariablesAsync();
  const textOnPrimary = localVariables.find(v => v.name === 'text/on-primary');
  const surfacePrimary = localVariables.find(v => v.name === 'surface/primary');
  
  if (!textOnPrimary || !surfacePrimary) {
    console.error('Variables not found');
    return;
  }
  
  // Find Home frame
  let homeFrame = null;
  for (const page of figma.root.children) {
    homeFrame = page.findOne(n => n.name === 'Home');
    if (homeFrame) break;
  }
  
  if (!homeFrame) {
    console.error('Home frame not found');
    return;
  }
  
  // Fix white text elements
  console.log('Binding white text...');
  const textNodeIds = ['442:2012', '442:2013', '442:2176', '442:1925', '442:1926', '442:2435', '442:2437'];
  
  let textFixed = 0;
  for (const nodeId of textNodeIds) {
    const node = await figma.getNodeByIdAsync(nodeId);
    if (node && node.type === 'TEXT' && node.fills && node.fills !== figma.mixed && node.fills.length > 0) {
      await figma.loadFontAsync(node.fontName);
      
      // Keep existing fill but bind it to the variable
      const existingFill = node.fills[0];
      const newFill = {...existingFill};
      
      figma.variables.setBoundVariableForPaint(newFill, 'color', textOnPrimary);
      node.fills = [newFill];
      
      textFixed++;
      console.log(`  ✓ ${node.name.substring(0, 40)}`);
    }
  }
  
  console.log(`Fixed ${textFixed} text elements\n`);
  
  // Fix purple backgrounds
  console.log('Binding purple backgrounds...');
  const frameNodeIds = ['442:2174', '442:2434'];
  
  let framesFixed = 0;
  for (const nodeId of frameNodeIds) {
    const node = await figma.getNodeByIdAsync(nodeId);
    if (node && 'fills' in node && node.fills && node.fills !== figma.mixed && node.fills.length > 0) {
      // Keep existing fill but bind it to the variable
      const existingFill = node.fills[0];
      const newFill = {...existingFill};
      
      figma.variables.setBoundVariableForPaint(newFill, 'color', surfacePrimary);
      node.fills = [newFill];
      
      framesFixed++;
      console.log(`  ✓ ${node.name}`);
    }
  }
  
  console.log(`Fixed ${framesFixed} backgrounds\n`);
  console.log(`✅ Done: ${textFixed + framesFixed} elements bound to variables`);
  
  figma.notify('✅ Variable bindings applied', { timeout: 2000 });
})();
