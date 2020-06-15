
import dom from "sketch/dom";
const properties = [
	'opacity',
	'blendingMode',
	'blur',
	'fills',
	'borders',
	'borderOptions',
	'shadows',
	'innerShadows',
	'alignment',
	'verticalAlignment',
	'kerning',
	'lineHeight',
	'paragraphSpacing',
	'textColor',
	'textTransform',
	'fontFamily',
	'fontSize',
	'fontWeight',
	'fontStyle',
	'fontVariant',
	'fontStretch',
	'textUnderline',
	'textStrikethrough',
	'fontAxes'
];

//testCommand
export default function(context) {
 
 

	const checkPropertyExistsOnPage = ({ page, properties }) => {
		return properties.forEach((item) => {
			if (String(item) === String(page)) return true;
		});
	};

   // get the base styles from the text layer
   // we will remove properties based on the other layer names
	const extractStyles = (page,properties) => {
 
    let baseStyles = []
  
    page.layers().forEach((layer) => {
			if (layer.class() === MSTextLayer) {

        const  allStyles =  {}
        
        properties.forEach(property =>{
          allStyles[property]= dom.fromNative(layer).style[property]
        }) 

        baseStyles.push({name : layer.name(), styles : allStyles , tokens:[] }) 
			}
    });
    
    return baseStyles
	};

	const doc = context.document
	const pages = doc.pages();

	const propertyPages = [];

	pages.forEach((page) => {
		const pageExists = checkPropertyExistsOnPage({
			page: page.name(),
			properties: properties
		});

		// get the base, throw an error if it doesn't exist
		if (String(page.name()) === 'Styles') {
      const extractedBaseStyles = extractStyles(page,properties);
      console.log(extractedBaseStyles)
		}

		if (pageExists) {
			propertyPages.push({ key: page.name(), page: page });
		}
	});
}
