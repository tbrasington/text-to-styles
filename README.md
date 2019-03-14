![logo](https://github.com/tbrasington/text-to-styles/raw/master/assets/icon.png)

# Text to Styles

![demo of exporting text layers to text styles](https://github.com/tbrasington/text-to-styles/raw/master/artwork/text-to-styles.gif)


## What?

Generate all the Sketch text styles you have based on a config set up in your artboards. No more making and maintaining multiple variations! 

## Why?

If your text style system requires the use of different alignments or colour variations you are faced with either detaching styles, risking updates overwrite the tweaks you make or you manually have to create every style. 

This plugin aims to solve the generation and maintenance of Sketch text styles where you need colour and alignment variations of your text styles. 

## Installation

[![Install Text to Styles with Sketchpacks](http://sketchpacks-com.s3.amazonaws.com/assets/badges/sketchpacks-badge-install.png "Install Text to Styles with Sketchpacks")](https://sketchpacks.com/tbrasington/text-to-styles/install)

Either install via Sketchpacks, Sketch Runner or...

1. Download from the [releases page](https://github.com/tbrasington/text-to-styles/releases)
2. Unzip
3. Double Click on `text-to-styles.sketchplugin` 

## Text Style naming convention
This is an opinioated plugin on how Text Styles should be named. The naming convention is:

`Style Name/Colour/Alignment/Breakpoint Varation`

The breakpoint variation is optional.


## Your Page setup

There is a sample project under [sample/text-styles-sample.sketch](https://github.com/tbrasington/text-to-styles/blob/master/sample/text-styles-sample.sketch) to base your text and colour tokens off

You will need to set your Page structure and naming like this:

- Styles
- Colours or Colors
- Alignments

Please note that this is case sensitive! 

### Styles
Add your base text styles here. This plugin will pick up on:

- Font Family
- Font Size
- Font Weight
- Font Style
- Line Height
- Letter Spacing
- Text Transform (uppercase,lowercase)
- Paragraph Spacing

#### Breakpoint adjustments
If you wish to add breakpoint adjustment for styles use the following naming syntax for the layer

`Style Name/Breakpoint Variation`

e.g. 

`Heading 1/BP1`

The plugin will then split the name and add the breakpoint to the end of the text style name

### Colours
Add shapes here with the colour value you want to render. The name of the layer defines the name in the Text Style palette. 
Order is done alphabetically.

### Alignments
Add your alignments here by setting each text layer to your preffered alignment.
Order is set Left, Center, Right. 

## Commands

There are two commands available `Render Type Styles` and `Export JSON Tokens`

### Render Type Styles
Will generate all of your text styles into the Sketch Document and create a Page called "Rendered Styles" to show the output. Note this won't apply it to the styles themselves. It is recommended that you use this document now as a Library for your text styles.

### Export JSON Tokens

![demo of exporting text layers to json](https://github.com/tbrasington/text-to-styles/raw/master/artwork/text-to-json.gif)


This will export out the text styles and colour palettes as a JSON file to use in other applications. Perhaps your production code base or documentation. 

You will be presented with two options for formatting the text style json. Either an Array or an Object. Depending on your needs you may want the Object.


#### Array formatting 

```
{
    "name": "Style 1",
    "styles": {
        "fontFamily": "SFUIDisplay-Semibold",
        "fontSize": "28px",
        "lineHeight": "34px",
        "letterSpacing": "0.02em",
        "textTransform": "none"
    },
    "alignments": [
        "center",
        "right",
        "center"
    ],
    "adjustments": [
        {
            "name": "BP3",
            "styles": {
                "fontSize": "42px",
                "lineHeight": "48px",
                "letterSpacing": "0.03em"
            }
        }
    ]
}

```
#### Object formatting 

```
"Style 1": {
    "name": "Style 1",
    "styles": {
        "fontFamily": "SFUIDisplay-Semibold",
        "fontSize": "28px",
        "lineHeight": "34px",
        "letterSpacing": "0.02em",
        "textTransform": "none"
    },
    "alignments": [
        "center",
        "right",
        "center"
    ],
    "adjustments": [
        {
            "name": "BP3",
            "styles": {
                "fontSize": "42px",
                "lineHeight": "48px",
                "letterSpacing": "0.03em"
            }
        }
    ]
},
```



---

@tbrasington | tbrasington.com
