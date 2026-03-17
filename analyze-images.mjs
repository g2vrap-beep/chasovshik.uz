import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';

async function analyzeImages() {
  const zai = await ZAI.create();
  
  const images = [
    '/home/z/my-project/upload/XXXL (1).jpg',
    '/home/z/my-project/upload/pasted_image_1773666507595.png',
    '/home/z/my-project/upload/pasted_image_1773666521289.png'
  ];
  
  const results = [];
  
  for (let i = 0; i < images.length; i++) {
    const imagePath = images[i];
    console.log(`Analyzing image ${i + 1}: ${imagePath}`);
    
    try {
      const imageBuffer = fs.readFileSync(imagePath);
      const base64Image = imageBuffer.toString('base64');
      const mimeType = imagePath.endsWith('.png') ? 'image/png' : 'image/jpeg';
      
      const response = await zai.chat.completions.createVision({
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Опиши подробно этот дизайн сайта часовщика. Какая структура, какие элементы, какой стиль, цветовая палитра, шрифты, расположение элементов, секции. Опиши всё максимально подробно для вёрстки.'
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:${mimeType};base64,${base64Image}`
                }
              }
            ]
          }
        ],
        thinking: { type: 'disabled' }
      });
      
      results.push({
        image: imagePath,
        analysis: response.choices[0]?.message?.content
      });
      
      console.log(`Image ${i + 1} analyzed successfully`);
    } catch (error) {
      console.error(`Error analyzing image ${i + 1}:`, error.message);
      results.push({
        image: imagePath,
        error: error.message
      });
    }
  }
  
  fs.writeFileSync('/home/z/my-project/image-analysis-results.json', JSON.stringify(results, null, 2));
  console.log('Analysis complete! Results saved to image-analysis-results.json');
}

analyzeImages();
