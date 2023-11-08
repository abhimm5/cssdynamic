// Generated automatically by nearley, version undefined
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }
var grammar = {
    Lexer: undefined,
    ParserRules: [
    {"name": "expression", "symbols": ["__", "main"], "postprocess": value => value[1]},
    {"name": "main", "symbols": ["statement", "__"], "postprocess": value => value.filter(val => val !== null)},
    {"name": "main", "symbols": ["statement", "__", "main"], "postprocess":  value => {
            return value.flat().filter(val => val !== null)
        }
        },
    {"name": "statement", "symbols": ["_", "hierarchy", "_", "components", "_", {"literal":"=","pos":43}, "_", "csstext", "_", {"literal":";","pos":51}], "postprocess": value => {return  {identifier:value[1].flat(),style:value[3].styling,attribute:value[3].attribute,value:value[7]}}},
    {"name": "statement", "symbols": ["_", "hierarchy", "_", "components", "_", {"literal":";","pos":67}], "postprocess": value => {return {identifier:value[1].flat(),style:value[3].styling,attribute:value[3].attribute}}},
    {"name": "statement", "symbols": ["_", "hierarchy", "_", {"literal":"[","pos":79}, "alphanumeric", {"literal":"]","pos":83}, "_", {"literal":"=","pos":87}, "_", "csstext", "_", {"literal":";","pos":95}], "postprocess": value => {return {identifier:value[1].flat(),attname:value[4],attvalue:value[9]}}},
    {"name": "statement", "symbols": ["root"], "postprocess": value => value.filter(val => val !== null)},
    {"name": "statement", "symbols": ["_", "hierarchy", "_", "components", "_", {"literal":"=","pos":117}, "_", "csstext", "__", "colon", "_", "cssvalue", "_", "styling", "_", {"literal":";","pos":137}], "postprocess":  
        value => {return  {identifier:value[1].flat(),style:value[3].styling,attribute:value[3].attribute,value:value[7],pseudoClass:[value[9]+value[11],value[13]]}} 
                     },
    {"name": "statement", "symbols": ["_", "hierarchy", "_", "components", "__", {"literal":":","pos":153}, "_", "cssvalue", "_", "styling", "_", {"literal":";","pos":165}], "postprocess": value => {return {identifier:value[1].flat(),style:value[3].styling,attribute:value[3].attribute,pseudoClass:[value[5]+value[7],value[8]]}}},
    {"name": "statement", "symbols": ["_", "hierarchy", "_", {"literal":"[","pos":177}, "alphanumeric", {"literal":"]","pos":181}, "_", {"literal":"=","pos":185}, "_", "csstext", "__", {"literal":":","pos":193}, "_", "cssvalue", "_", "styling", "_", {"literal":";","pos":205}], "postprocess": value => {return {identifier:value[1].flat(),attname:value[4],attvalue:value[9],pseudoClass:[value[11]+value[13],value[15]]}}},
    {"name": "colon", "symbols": [{"literal":":","pos":213}], "postprocess": value => value.join("")},
    {"name": "colon$string$1", "symbols": [{"literal":":"}, {"literal":":"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "colon", "symbols": ["colon$string$1"], "postprocess": value => value.join("")},
    {"name": "attr", "symbols": ["class", "id"], "postprocess": value => value.flat()},
    {"name": "attr", "symbols": ["id", "class"], "postprocess": value => value.flat()},
    {"name": "attr", "symbols": ["id"]},
    {"name": "attr", "symbols": ["class"]},
    {"name": "class", "symbols": [{"literal":".","pos":253}, "alphanumeric"], "postprocess": value => value.join("")},
    {"name": "class", "symbols": [{"literal":".","pos":261}, "alphanumeric", "class"], "postprocess": value => [value[0].concat(value[1]),value[2]].flat()},
    {"name": "id", "symbols": [{"literal":"#","pos":273}, "alphanumeric"], "postprocess": value => value.join("")},
    {"name": "id", "symbols": [{"literal":"#","pos":281}, "alphanumeric", "id"], "postprocess": value => [value[0].concat(value[1]),value[2]].flat()},
    {"name": "hierarchy", "symbols": ["selector", "_", "dab", "_", "selector"], "postprocess": value => value.filter(val => val !== null)},
    {"name": "hierarchy", "symbols": ["selector"]},
    {"name": "hierarchy", "symbols": ["selector", "_", "attr"], "postprocess": value => value.flat().filter(val => val !== null )},
    {"name": "hierarchy", "symbols": ["attr"], "postprocess": value => value.flat()},
    {"name": "selector", "symbols": ["alphanumeric"], "postprocess": value => value.join("")},
    {"name": "selector", "symbols": ["binder"], "postprocess": value => value.flat().filter(val => val !== null && val !== "[" &&val !== "]")},
    {"name": "selector", "symbols": ["alphanumeric", "_", {"literal":">","pos":345}, "_", "selector"], "postprocess": value => value.flat().filter(val => val !== null )},
    {"name": "selector", "symbols": ["binder", "_", {"literal":">","pos":359}, "_", "selector"], "postprocess": value => value.flat().filter(val => val !== null )},
    {"name": "components", "symbols": ["attribute"], "postprocess": value => {return {attribute:value[0]}}},
    {"name": "components", "symbols": ["styling"], "postprocess": value => {return {styling:value[0]}}},
    {"name": "components", "symbols": ["attribute", "_", "styling"], "postprocess":  value => {
                        let merge = value.filter(val => val !== null)
            return {attribute:merge[0],styling:value[2]}
        }  },
    {"name": "attribute", "symbols": [{"literal":"[","pos":395}, "_", "attribute_data", "_", {"literal":"]","pos":403}], "postprocess": value => value.filter(val => val !== null && val !== "[" &&val !== "]")},
    {"name": "attribute", "symbols": [{"literal":"[","pos":409}, "_", "attribute_data", "_", {"literal":"]","pos":417}, "_", "attribute"], "postprocess": value => value.flat().filter(val => val !== null && val !== "[" &&val !== "]")},
    {"name": "attribute_data", "symbols": ["alphanumeric", "_", {"literal":"=","pos":433}, "_", {"literal":"\"","pos":437}, "_", "alphanumeric", {"literal":"\"","pos":443}], "postprocess": value => value.filter(val => val !== null).join("")},
    {"name": "dab", "symbols": [{"literal":"+","pos":451}], "postprocess": value => value[0]},
    {"name": "root$string$1", "symbols": [{"literal":":"}, {"literal":"r"}, {"literal":"o"}, {"literal":"o"}, {"literal":"t"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "root", "symbols": ["_", "root$string$1", "_", "kvpair"], "postprocess": value => value[3][2]},
    {"name": "kvpair", "symbols": [{"literal":"{","pos":473}, "__", "root_data", "__", {"literal":"}","pos":481}]},
    {"name": "root_data", "symbols": ["identifier", "_", {"literal":":","pos":491}, "_", "literal", {"literal":";","pos":497}], "postprocess": value => { return {key:value[0],value:value[4].value,type:value[4].type}}},
    {"name": "root_data", "symbols": ["identifier", "_", {"literal":":","pos":507}, "_", "literal", {"literal":";","pos":513}, "__", "root_data"], "postprocess": value => { return [{key:value[0],value:value[4].value,type:value[4].type},value[7]].flat() }},
    {"name": "identifier", "symbols": ["variable"], "postprocess": value => value[0]},
    {"name": "identifier", "symbols": ["function"], "postprocess": value =>  { return {identifier:value[0][0],parameter:value[0][1]}}},
    {"name": "literal", "symbols": ["closure"], "postprocess": value =>  {return {value:value[0],type:"closure"}}},
    {"name": "literal", "symbols": ["array"], "postprocess": value =>  {return {value:value[0],type:"array"}}},
    {"name": "literal", "symbols": ["string"], "postprocess": value =>  {return {value:value[0],type:"string"}}},
    {"name": "literal", "symbols": ["styling"], "postprocess": value =>  {return {value:value[0],type:"styling"}}},
    {"name": "literal", "symbols": ["cssproperty"], "postprocess": value =>  {return {value:value[0],type:"cssproperty"}}},
    {"name": "variable$string$1", "symbols": [{"literal":"-"}, {"literal":"-"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "variable", "symbols": ["variable$string$1", "alphanumeric"], "postprocess": value => value[1]},
    {"name": "function", "symbols": ["variable", "_", "r_data", "_"], "postprocess": value => value.filter(val => val !== null)},
    {"name": "closure", "symbols": ["_", {"literal":"{","pos":597}, "function_data", "__", {"literal":"}","pos":603}], "postprocess": value =>   value[2]},
    {"name": "closure", "symbols": ["_", {"literal":"{","pos":611}, "_", {"literal":"}","pos":615}, "_"], "postprocess": value => value[2]},
    {"name": "array", "symbols": [{"literal":"[","pos":625}, "linear_data", {"literal":"]","pos":629}], "postprocess": value => value[1]},
    {"name": "string$ebnf$1", "symbols": [/./]},
    {"name": "string$ebnf$1", "symbols": [/./, "string$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "string", "symbols": [{"literal":"\"","pos":637}, "string$ebnf$1", {"literal":"\"","pos":642}], "postprocess": value => value[1].join("")},
    {"name": "string", "symbols": [{"literal":"\"","pos":648}, {"literal":"\"","pos":650}], "postprocess": value => null},
    {"name": "styling", "symbols": [{"literal":"{","pos":658}, "styling_data", "__", {"literal":"}","pos":664}], "postprocess":  value => {
        let v = value[1].split(";")
        let style = {}
                    for(let i = 0 ; i < v.length;i++){
                       let pair = v[i].split(":")
                       style[pair[0]] = pair[1]
        }
        return style
                 } },
    {"name": "styling", "symbols": [{"literal":"{","pos":670}, "_", {"literal":"}","pos":674}], "postprocess": value => value[1]},
    {"name": "styling", "symbols": [{"literal":"{","pos":680}, "_", "variable", "_", {"literal":"}","pos":688}], "postprocess": value => {return {binder:value[2],type:"variable"}}},
    {"name": "styling", "symbols": [{"literal":"{","pos":694}, "_", "function", {"literal":"}","pos":700}], "postprocess": value => {return {binder:value[2],type:"closure"}}},
    {"name": "r_data", "symbols": [{"literal":"(","pos":708}, "linear_data", {"literal":")","pos":712}], "postprocess": value => value[1]},
    {"name": "linear_data", "symbols": ["_", "alphanumeric", "_"], "postprocess": value => value.flat().filter(val => val !== null && val !== ",")},
    {"name": "linear_data", "symbols": ["_", "alphanumeric", "_", {"literal":",","pos":736}, "linear_data"], "postprocess": value => value.flat().filter(val => val !== null && val !== ",")},
    {"name": "linear_data", "symbols": ["_"]},
    {"name": "function_data", "symbols": ["__", "cssvalue", "_", {"literal":":","pos":756}, "_", "functionliteral", "_", {"literal":";","pos":764}], "postprocess": value => { return {key:value[1],value:value[5].value,type:value[5].type}}},
    {"name": "function_data$string$1", "symbols": [{"literal":"r"}, {"literal":"e"}, {"literal":"t"}, {"literal":"u"}, {"literal":"r"}, {"literal":"n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "function_data", "symbols": ["function_data$string$1", "_", "functionliteral"], "postprocess": value => { return {type:"return",value:value[2]}}},
    {"name": "function_data$string$2", "symbols": [{"literal":"r"}, {"literal":"e"}, {"literal":"t"}, {"literal":"u"}, {"literal":"r"}, {"literal":"n"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "function_data", "symbols": ["__", "function_data$string$2"], "postprocess": value => { return {type:"return",value:null}}},
    {"name": "function_data", "symbols": ["__", "cssvalue", "_", {"literal":":","pos":794}, "_", "functionliteral", "_", {"literal":";","pos":802}, "function_data"], "postprocess": value => { return [{key:value[1],value:value[5].value,type:value[5].type},value[8]].flat() }},
    {"name": "functionliteral", "symbols": ["string"], "postprocess": value =>  {return {value:value[0],type:"string"}}},
    {"name": "functionliteral", "symbols": ["boolean"], "postprocess": value =>  {return {value:value[0],type:"boolean"}}},
    {"name": "functionliteral", "symbols": ["array"], "postprocess": value =>  {return {value:value[0],type:"string"}}},
    {"name": "functionliteral", "symbols": ["variable"], "postprocess": value =>  {return {value:value[0],type:"identifier"}}},
    {"name": "styling_data", "symbols": ["__", "cssvalue", "_", {"literal":":","pos":844}, "cssproperty", {"literal":";","pos":848}], "postprocess": value => value.filter(val => val !== null).join("")},
    {"name": "styling_data", "symbols": ["__", "cssvalue", "_", {"literal":":","pos":860}, "cssproperty", {"literal":";","pos":864}, "styling_data"], "postprocess": value => value.flat().filter(val => val !== null).join("")},
    {"name": "cssvalue$ebnf$1", "symbols": [/[\w-]/]},
    {"name": "cssvalue$ebnf$1", "symbols": [/[\w-]/, "cssvalue$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "cssvalue", "symbols": ["cssvalue$ebnf$1"], "postprocess": value => value[0].join("")},
    {"name": "cssproperty$ebnf$1", "symbols": [/[\w\s.,()!#*+-/]/]},
    {"name": "cssproperty$ebnf$1", "symbols": [/[\w\s.,()!#*+-/]/, "cssproperty$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "cssproperty", "symbols": ["cssproperty$ebnf$1"], "postprocess": value => value[0].join("")},
    {"name": "csstext", "symbols": ["string"], "postprocess": value => value[0]},
    {"name": "csstext", "symbols": ["binder"], "postprocess": value => value[0]},
    {"name": "boolean$string$1", "symbols": [{"literal":"t"}, {"literal":"r"}, {"literal":"u"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "boolean", "symbols": ["boolean$string$1"]},
    {"name": "boolean$string$2", "symbols": [{"literal":"f"}, {"literal":"a"}, {"literal":"l"}, {"literal":"s"}, {"literal":"e"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "boolean", "symbols": ["boolean$string$2"]},
    {"name": "binder", "symbols": ["variable"], "postprocess": value =>  {return {binder:value[0],type:"variable"}}},
    {"name": "binder", "symbols": ["function"], "postprocess": value =>  {return {binder:value[0],type:"closure"}}},
    {"name": "binder", "symbols": ["variable", {"literal":"[","pos":930}, "_", "integer", "_", {"literal":"]","pos":938}], "postprocess": value =>  {return {binder:value[0] + "-" + value[3],type:"array"}}},
    {"name": "binder", "symbols": ["boolean"], "postprocess": value =>  {return {binder:value[0],type:"boolean"}}},
    {"name": "integer$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "integer$ebnf$1", "symbols": [/[0-9]/, "integer$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "integer", "symbols": ["integer$ebnf$1"], "postprocess": value => value[0].join("")},
    {"name": "alphanumeric$ebnf$1", "symbols": [/[\w]/]},
    {"name": "alphanumeric$ebnf$1", "symbols": [/[\w]/, "alphanumeric$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "alphanumeric", "symbols": ["alphanumeric$ebnf$1"], "postprocess": value => value[0].join("")},
    {"name": "__$ebnf$1", "symbols": []},
    {"name": "__$ebnf$1", "symbols": [/[\s]/, "__$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": function(d) {return null }},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": [/[ \t]/, "_$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": function(d) {return null }}
]
  , ParserStart: "expression"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
