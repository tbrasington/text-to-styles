import React from 'react'
import { View, Text} from 'react-sketchapp'
import dom from 'sketch/dom'

export const TypeLayout = (json) => (
    <View style={{
      "display" : "flex",
      "flexDirection" : "row"
    }}>{ 
      json.typography.map(style=> {
       return(
         <View 
          key={style.name}
          style={{ 
          "padding" : 24,
          "display" : "flex",
          "flexDirection" : "column"
          }}>
          <Text>{String(style.name)}</Text>
          
          <View name={`Styles ${style.name}`}
            style={{ 
            "display" : "flex",
            "flexDirection" : "column",
            marginBottom:24, 
          }}>
          {
            Object.keys(json.colours).map(colour=>{ 
              return (
                <Text key={`${style.name}/${colour}`} style={{marginBottom:24, flex:1, color: dom.Style.colorToString(json.colours[colour]),  ...style.styles}} name={`${String(style.name)}/${colour}`}>{String(style.name)}</Text>
              )
            })
          }
          </View>
        </View>
        )
      })
    }</View>)